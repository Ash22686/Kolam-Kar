import { useState, useRef } from "react";
import axios from "axios";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import KolamCanvas from "@/components/KolamCanvas";
import {
  Undo2, Redo2, Download, Save, Grid3X3, Circle,
  Minus, RotateCcw, Paintbrush, Share2, MousePointer, Spline
} from "lucide-react";

const Playground = () => {
  const [drawMode, setDrawMode] = useState("point-to-point");
  const [selectedGrid, setSelectedGrid] = useState("7x7");
  const [selectedSymmetry, setSelectedSymmetry] = useState("6-fold");
  const [selectedTool, setSelectedTool] = useState("Line");
  const [color, setColor] = useState("#000000");
  const [thickness, setThickness] = useState(4);
  const [history, setHistory] = useState([]);
  const [undoStack, setUndoStack] = useState([]);

  const canvasRef = useRef(null);

  const handleDrawEnd = (newPath) => {
    setHistory(prev => [...prev, newPath]);
    setUndoStack([]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const lastPath = history[history.length - 1];
    setUndoStack(prev => [...prev, lastPath]);
    setHistory(prev => prev.slice(0, -1));
  };

  const handleRedo = () => {
    if (undoStack.length === 0) return;
    const nextPath = undoStack[undoStack.length - 1];
    setHistory(prev => [...prev, nextPath]);
    setUndoStack(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setHistory([]);
    setUndoStack([]);
  };

  const handleDownload = (withDots) => {
    if (canvasRef.current) {
      const dataUrl = canvasRef.current.exportAsPNG(withDots);
      if (dataUrl) {
        const link = document.createElement('a');
        link.download = `kolam-design-${withDots ? 'with-dots' : 'no-dots'}.png`;
        link.href = dataUrl;
        link.click();
      }
    }
  };

  const handleSave = async () => {
    if (history.length === 0) {
      alert("Canvas is empty! Draw something to save.");
      return;
    }
    const kolamData = {
      name: "My Kolam Design",
      grid: selectedGrid,
      symmetry: selectedSymmetry,
      paths: history,
    };
    try {
      await axios.post('/api/kolams', kolamData);
      alert("Your design has been saved!");
    } catch (error) {
      console.error("Failed to save design:", error);
      alert("Error: Could not save your design.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 dark:bg-background">
        <section className="py-8">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid lg:grid-cols-4 gap-8">
              <Card className="lg:col-span-1 shadow-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-card">
                <CardHeader>
                  <CardTitle className="text-xl">Controls</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Mode</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant={drawMode === 'point-to-point' ? "default" : "outline"} onClick={() => setDrawMode('point-to-point')} className={drawMode === 'point-to-point' ? 'bg-indigo-600 text-white' : ''}><MousePointer className="h-4 w-4 mr-2" />Point</Button>
                      <Button variant={drawMode === 'freehand' ? "default" : "outline"} onClick={() => setDrawMode('freehand')} className={drawMode === 'freehand' ? 'bg-indigo-600 text-white' : ''}><Spline className="h-4 w-4 mr-2" />Freehand</Button>
                    </div>
                  </div>
                  <Separator />
                  {drawMode === 'point-to-point' && (
                    <div>
                      <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Shapes</h4>
                      <div className="space-y-2">
                        <Button variant={selectedTool === 'Line' ? 'secondary' : 'outline'} className="w-full justify-start" onClick={() => setSelectedTool("Line")}><Minus className="h-4 w-4 mr-2" />Line</Button>
                        <Button variant={selectedTool === 'Circle' ? 'secondary' : 'outline'} className="w-full justify-start" onClick={() => setSelectedTool("Circle")}><Circle className="h-4 w-4 mr-2" />Circle</Button>
                      </div>
                      <Separator className="my-6" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center text-gray-800 dark:text-gray-200"><Grid3X3 className="h-4 w-4 mr-2" />Grid</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {["3x3", "5x5", "7x7", "9x9", "11x11", "13x13"].map((grid) => (
                        <Button key={grid} variant={selectedGrid === grid ? 'secondary' : 'outline'} size="sm" onClick={() => setSelectedGrid(grid)}>{grid}</Button>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                     <h4 className="font-semibold mb-3 flex items-center text-gray-800 dark:text-gray-200"><Paintbrush className="h-4 w-4 mr-2" />Brush</h4>
                     <div className="space-y-4">
                       <div>
                         <label htmlFor="color-picker" className="text-sm font-medium mb-2 block">Color</label>
                         <input id="color-picker" type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 p-1 bg-transparent border border-gray-300 dark:border-gray-700 rounded-md cursor-pointer"/>
                       </div>
                       <div>
                         <label htmlFor="thickness-slider" className="text-sm font-medium mb-2 block">Thickness: {thickness}px</label>
                         <input id="thickness-slider" type="range" min="1" max="30" value={thickness} onChange={(e) => setThickness(Number(e.target.value))} className="w-full"/>
                       </div>
                     </div>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-3">Symmetry</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {["2-fold", "4-fold", "6-fold", "8-fold"].map((symmetry) => (
                        <Button key={symmetry} variant={selectedSymmetry === symmetry ? 'secondary' : 'outline'} size="sm" onClick={() => setSelectedSymmetry(symmetry)}>{symmetry}</Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="lg:col-span-3 space-y-6">
                <Card className="shadow-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-card">
                  <CardContent className="p-2 sm:p-4">
                    <div className="aspect-square bg-white dark:bg-card border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden relative">
                      <div className="absolute top-4 right-4 z-10 flex gap-2">
                        <Button variant="outline" size="icon" onClick={handleUndo} disabled={history.length === 0}><Undo2 className="h-4 w-4" /></Button>
                        <Button variant="outline" size="icon" onClick={handleRedo} disabled={undoStack.length === 0}><Redo2 className="h-4 w-4" /></Button>
                        <Button variant="destructive" size="icon" onClick={handleClear} disabled={history.length === 0}><RotateCcw className="h-4 w-4" /></Button>
                      </div>
                      <KolamCanvas
                        ref={canvasRef}
                        drawMode={drawMode}
                        grid={selectedGrid}
                        symmetry={selectedSymmetry}
                        tool={selectedTool}
                        color={color}
                        thickness={thickness}
                        paths={history}
                        onDrawEnd={handleDrawEnd}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-lg border-gray-200 dark:border-gray-800 bg-white dark:bg-card">
                  <CardContent className="p-4 flex flex-wrap gap-3">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleSave}><Save className="h-4 w-4 mr-2" />Save Design</Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline"><Download className="h-4 w-4 mr-2" />Download PNG</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleDownload(true)}>
                          With Grid Dots
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload(false)}>
                          Without Grid Dots
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline"><Share2 className="h-4 w-4 mr-2" />Share</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Playground;