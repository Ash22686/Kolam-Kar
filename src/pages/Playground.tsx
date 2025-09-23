import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Palette, 
  Undo2, 
  Redo2, 
  Download, 
  Save, 
  Grid3X3, 
  Circle, 
  Minus,
  RotateCcw
} from "lucide-react";

const Playground = () => {
  const [selectedGrid, setSelectedGrid] = useState("5x5");
  const [selectedSymmetry, setSelectedSymmetry] = useState("6-fold");
  const [selectedTool, setSelectedTool] = useState("Curve");
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="gradient-hero py-12">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center text-white">
              <Badge variant="secondary" className="mb-4 gradient-lotus text-white border-0">
                <Palette className="h-4 w-4 mr-2" />
                Interactive Canvas
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Kolam Playground</h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Create your own Kolam patterns with our interactive drawing canvas and symmetry tools
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid lg:grid-cols-4 gap-6">
              {/* Tools Sidebar */}
              <Card className="lg:col-span-1 shadow-medium border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Drawing Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Grid Settings */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Grid3X3 className="h-4 w-4 mr-2" />
                      Grid Setup
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {["3x3", "5x5", "7x7", "9x9", "11x11", "13x13"].map((grid) => (
                        <Button 
                          key={grid}
                          variant="outline" 
                          size="sm"
                          className={selectedGrid === grid ? "gradient-lotus text-white border-0" : ""}
                          onClick={() => setSelectedGrid(grid)}
                        >
                          {grid}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Drawing Tools */}
                  <div>
                    <h4 className="font-semibold mb-3">Shapes</h4>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        className={`w-full justify-start ${selectedTool === "Line" ? "gradient-sacred text-white border-0" : ""}`}
                        onClick={() => setSelectedTool("Line")}
                      >
                        <Minus className="h-4 w-4 mr-2" />
                        Line
                      </Button>
                      <Button 
                        variant="outline" 
                        className={`w-full justify-start ${selectedTool === "Circle" ? "gradient-sacred text-white border-0" : ""}`}
                        onClick={() => setSelectedTool("Circle")}
                      >
                        <Circle className="h-4 w-4 mr-2" />
                        Circle
                      </Button>
                      <Button 
                        variant="outline" 
                        className={`w-full justify-start ${selectedTool === "Curve" ? "gradient-sacred text-white border-0" : ""}`}
                        onClick={() => setSelectedTool("Curve")}
                      >
                        <Palette className="h-4 w-4 mr-2" />
                        Curve
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Symmetry */}
                  <div>
                    <h4 className="font-semibold mb-3">Symmetry</h4>
                    <div className="space-y-2">
                      {["4-fold", "6-fold", "8-fold"].map((symmetry) => (
                        <Button 
                          key={symmetry}
                          variant="outline" 
                          size="sm" 
                          className={`w-full ${selectedSymmetry === symmetry ? "gradient-lotus text-white border-0" : ""}`}
                          onClick={() => setSelectedSymmetry(symmetry)}
                        >
                          {symmetry}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Actions */}
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Undo2 className="h-4 w-4 mr-2" />
                      Undo
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Redo2 className="h-4 w-4 mr-2" />
                      Redo
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Canvas Area */}
              <div className="lg:col-span-3 space-y-6">
                {/* Canvas */}
                <Card className="shadow-medium border-0">
                  <CardContent className="p-6">
                    <div className="aspect-square bg-card border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Grid3X3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg mb-2">Interactive Canvas</p>
                        <p className="text-sm">Select tools and start drawing your Kolam</p>
                        <p className="text-xs mt-2 opacity-75">Real-time symmetry rendering enabled</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <Card className="shadow-medium border-0">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Button className="gradient-lotus text-white border-0 shadow-lotus">
                        <Save className="h-4 w-4 mr-2" />
                        Save Design
                      </Button>
                      <Button variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download PNG
                      </Button>
                      <Button variant="outline">
                        Share Creation
                      </Button>
                    </div>
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