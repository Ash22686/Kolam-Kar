import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Image, Download, Settings } from "lucide-react";

const Generator = () => {
  const [selectedSymmetry, setSelectedSymmetry] = useState("6-fold");
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="gradient-lotus py-16">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center text-white">
              <Badge variant="secondary" className="mb-4 gradient-hero text-white border-0">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Generation
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Kolam Generator</h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Create stunning Kolam designs using AI with text prompts or transform existing images
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Input Section */}
              <div className="space-y-6">
                <Tabs defaultValue="text" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="text" className="flex items-center">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Text-to-Kolam
                    </TabsTrigger>
                    <TabsTrigger value="image" className="flex items-center">
                      <Image className="h-4 w-4 mr-2" />
                      Image-to-Kolam
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="text" className="space-y-6">
                    <Card className="shadow-medium border-0">
                      <CardHeader>
                        <CardTitle>Describe Your Kolam</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Textarea 
                          placeholder="Create a Pongal lotus kolam with 8-fold symmetry using dots and curving lines..."
                          className="min-h-32"
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="image" className="space-y-6">
                    <Card className="shadow-medium border-0">
                      <CardHeader>
                        <CardTitle>Upload Reference Image</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                          <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">Drop an image to transform into Kolam style</p>
                          <Button className="mt-4" variant="outline">Choose Image</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Parameters */}
                <Card className="shadow-medium border-0">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Parameters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Symmetry</label>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={selectedSymmetry === "4-fold" ? "gradient-lotus text-white border-0" : ""}
                          onClick={() => setSelectedSymmetry("4-fold")}
                        >
                          4-fold
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={selectedSymmetry === "6-fold" ? "gradient-lotus text-white border-0" : ""}
                          onClick={() => setSelectedSymmetry("6-fold")}
                        >
                          6-fold
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className={selectedSymmetry === "8-fold" ? "gradient-lotus text-white border-0" : ""}
                          onClick={() => setSelectedSymmetry("8-fold")}
                        >
                          8-fold
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Dot Grid Size</label>
                      <div className="px-2">
                        <Slider defaultValue={[7]} max={15} min={3} step={2} />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>3x3</span>
                          <span>15x15</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Complexity</label>
                      <div className="px-2">
                        <Slider defaultValue={[5]} max={10} min={1} />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Simple</span>
                          <span>Intricate</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button className="w-full gradient-lotus text-white border-0 shadow-lotus">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Kolam
                </Button>
              </div>

              {/* Preview Section */}
              <Card className="shadow-medium border-0">
                <CardHeader>
                  <CardTitle>Generated Kolam</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-muted/20 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-center text-muted-foreground">
                      <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">Your Kolam will appear here</p>
                      <p className="text-sm">Configure parameters and click generate</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="flex-1" variant="outline" disabled>
                      <Download className="h-4 w-4 mr-2" />
                      Download PNG
                    </Button>
                    <Button className="flex-1" variant="outline" disabled>
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Generator;