// src/components/utils/symmetry.js
export const applySymmetry = (path, symmetry, center) => {
    const folds = parseInt(symmetry.split('-')[0]);
    if (isNaN(folds) || folds <= 1) {
      return [path];
    }
  
    const angle = (2 * Math.PI) / folds;
    const symmetricalPaths = [];
  
    for (let i = 0; i < folds; i++) {
      const currentAngle = i * angle;
      const rotatedPath = path.map(point => {
        const dx = point.x - center.x;
        const dy = point.y - center.y;
        const newX = dx * Math.cos(currentAngle) - dy * Math.sin(currentAngle) + center.x;
        const newY = dx * Math.sin(currentAngle) + dy * Math.cos(currentAngle) + center.y;
        return { x: newX, y: newY };
      });
      symmetricalPaths.push(rotatedPath);
    }
  
    return symmetricalPaths;
};