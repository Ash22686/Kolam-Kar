import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { applySymmetry } from './utils/symmetry';
import './KolamCanvas.css';

const SNAP_THRESHOLD = 25;

const KolamCanvas = forwardRef(({
  drawMode, grid, symmetry, tool, color, thickness, paths, onDrawEnd
}, ref) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);
  const [dots, setDots] = useState([]);
  const [startPoint, setStartPoint] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useImperativeHandle(ref, () => ({
    exportAsPNG: (withDots) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      
      const exportCanvas = document.createElement('canvas');
      exportCanvas.width = canvas.width;
      exportCanvas.height = canvas.height;
      const ctx = exportCanvas.getContext('2d');
      const center = { x: canvas.width / 2, y: canvas.height / 2 };

      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

      if (withDots) {
        ctx.fillStyle = '#4a4a4a';
        dots.forEach(dot => {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 3, 0, 2 * Math.PI);
          ctx.fill();
        });
      }

      paths.forEach(path => {
        ctx.strokeStyle = path.color;
        ctx.lineWidth = path.thickness;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        const symmetricalPaths = applySymmetry(path.points, path.symmetry, center);
        symmetricalPaths.forEach(symPath => {
          if (path.tool === 'Circle' && symPath.length === 1) {
            const radius = Math.abs(path.radius);
            ctx.beginPath();
            ctx.arc(symPath[0].x, symPath[0].y, radius, 0, 2 * Math.PI);
            ctx.stroke();
          } else {
            ctx.beginPath();
            symPath.forEach((point, index) => (index === 0) ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y));
            ctx.stroke();
          }
        });
      });
      
      return exportCanvas.toDataURL('image/png');
    }
  }), [dots, paths]);

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const findNearestDot = (x, y) => {
    let nearestDot = null;
    let minDistance = Infinity;
    for (const dot of dots) {
      const distance = Math.sqrt((x - dot.x) ** 2 + (y - dot.y) ** 2);
      if (distance < minDistance && distance < SNAP_THRESHOLD) {
        minDistance = distance;
        nearestDot = dot;
      }
    }
    return nearestDot;
  };

  const findAbsoluteNearestDot = (x, y) => {
    if (dots.length === 0) return null;
    let nearestDot = dots[0];
    let minDistance = Infinity;
    for (const dot of dots) {
      const distance = Math.sqrt((x - dot.x) ** 2 + (y - dot.y) ** 2);
      if (distance < minDistance) {
        minDistance = distance;
        nearestDot = dot;
      }
    }
    return nearestDot;
  };

  const handleMouseMove = (e) => {
    const pos = getMousePos(e);
    setMousePos(pos);
    if (drawMode === 'freehand' && isDrawing) {
      setCurrentPath(prev => [...prev, pos]);
    }
  };

  const handleMouseDown = (e) => {
    const pos = getMousePos(e);
    if (drawMode === 'freehand') {
      setIsDrawing(true);
      setCurrentPath([pos]);
    } else {
      const nearestDot = findNearestDot(pos.x, pos.y);
      if (!nearestDot) return;
      
      if (tool === 'Circle') {
        const spacing = dots.length > 1 ? Math.abs(dots[1].x - dots[0].x) || Math.abs(dots[1].y - dots[0].y) : 50;
        onDrawEnd({ points: [nearestDot], tool: 'Circle', radius: spacing / 2, color, thickness, symmetry });
        return;
      }
      
      if (!startPoint) {
        setStartPoint(nearestDot);
      } else {
        onDrawEnd({ points: [startPoint, nearestDot], tool: 'Line', color, thickness, symmetry });
        setStartPoint(null);
      }
    }
  };
  
  const handleMouseUp = () => {
    if (drawMode === 'freehand' && isDrawing) {
      setIsDrawing(false);
      if (currentPath.length > 1) {
        onDrawEnd({ points: currentPath, tool: 'Curve', color, thickness, symmetry });
      }
      setCurrentPath([]);
    }
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gridSize = parseInt(grid.split('x')[0]);
    const padding = 60;
    const canvasSize = canvas.width;
    const spacing = (canvasSize - 2 * padding) / (gridSize - 1);
    const newDots = Array.from({ length: gridSize * gridSize }, (_, i) => ({
      x: padding + (i % gridSize) * spacing,
      y: padding + Math.floor(i / gridSize) * spacing,
    }));
    setDots(newDots);
    setStartPoint(null);
  }, [grid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const center = { x: canvas.width / 2, y: canvas.height / 2 };
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#4a4a4a';
    dots.forEach(dot => { ctx.beginPath(); ctx.arc(dot.x, dot.y, 3, 0, 2 * Math.PI); ctx.fill(); });

    paths.forEach(path => {
      ctx.strokeStyle = path.color;
      ctx.lineWidth = path.thickness;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (path.tool === 'Line' && path.points.length === 2) {
        const symmetricalStarts = applySymmetry([path.points[0]], path.symmetry, center);
        const symmetricalEnds = applySymmetry([path.points[1]], path.symmetry, center);

        for (let i = 0; i < symmetricalStarts.length; i++) {
          const snappedStart = findAbsoluteNearestDot(symmetricalStarts[i][0].x, symmetricalStarts[i][0].y);
          const snappedEnd = findAbsoluteNearestDot(symmetricalEnds[i][0].x, symmetricalEnds[i][0].y);

          if (snappedStart && snappedEnd) {
            ctx.beginPath();
            ctx.moveTo(snappedStart.x, snappedStart.y);
            ctx.lineTo(snappedEnd.x, snappedEnd.y);
            ctx.stroke();
          }
        }
      } else {
        const symmetricalPaths = applySymmetry(path.points, path.symmetry, center);
        symmetricalPaths.forEach(symPath => {
          if (path.tool === 'Circle' && symPath.length === 1) {
            const radius = Math.abs(path.radius);
            ctx.beginPath();
            ctx.arc(symPath[0].x, symPath[0].y, radius, 0, 2 * Math.PI);
            ctx.stroke();
          } else {
            ctx.beginPath();
            symPath.forEach((point, index) => (index === 0) ? ctx.moveTo(point.x, point.y) : ctx.lineTo(point.x, point.y));
            ctx.stroke();
          }
        });
      }
    });

    ctx.strokeStyle = color;
    ctx.lineWidth = thickness;

    if (drawMode === 'freehand' && currentPath.length > 1) {
      const symmetricalPaths = applySymmetry(currentPath, symmetry, center);
      symmetricalPaths.forEach(symPath => {
        ctx.beginPath();
        symPath.forEach((point, index) => {
          if (index === 0) { ctx.moveTo(point.x, point.y); } else { ctx.lineTo(point.x, point.y); }
        });
        ctx.stroke();
      });
    }

    if (drawMode === 'point-to-point' && startPoint) {
      const endPoint = findNearestDot(mousePos.x, mousePos.y) || mousePos;
      
      const symmetricalStarts = applySymmetry([startPoint], symmetry, center);
      const symmetricalEnds = applySymmetry([endPoint], symmetry, center);

      ctx.globalAlpha = 0.6;
      for (let i = 0; i < symmetricalStarts.length; i++) {
          const snappedStart = findAbsoluteNearestDot(symmetricalStarts[i][0].x, symmetricalStarts[i][0].y);
          const snappedEnd = findAbsoluteNearestDot(symmetricalEnds[i][0].x, symmetricalEnds[i][0].y);

          if (snappedStart && snappedEnd) {
            ctx.beginPath();
            ctx.moveTo(snappedStart.x, snappedStart.y);
            ctx.lineTo(snappedEnd.x, snappedEnd.y);
            ctx.stroke();
          }
      }
      ctx.globalAlpha = 1.0;
    }
    
    const snappedDotForIndicator = findNearestDot(mousePos.x, mousePos.y);
    if (drawMode === 'point-to-point' && snappedDotForIndicator) {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(snappedDotForIndicator.x, snappedDotForIndicator.y, 10, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }, [paths, currentPath, dots, color, thickness, symmetry, drawMode, startPoint, mousePos]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={800}
      className="kolam-canvas"
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
});

export default KolamCanvas;