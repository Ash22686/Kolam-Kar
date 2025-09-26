import { useState, useRef } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Image, Download, Settings, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Generator = () => {
  const [activeTab, setActiveTab] = useState("text");
  const [prompt, setPrompt] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedSymmetry, setSelectedSymmetry] = useState("6-fold");
  const [dotGridSize, setDotGridSize] = useState([7]);
  const [complexity, setComplexity] = useState([5]);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);
  
  // *** IMPORTANT: Replace this with your actual ngrok URL ***
  const api_url = "https://gazelle-choice-visually.ngrok-free.app";

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "generated_kolam.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    const endpoint = activeTab === 'text' ? `${api_url}/generate_image` : `${api_url}/img_img_gen`;
    
    let body;
    let headers = {};

    if (activeTab === 'text') {
      if (!prompt) {
        setError("Please enter a description for the Kolam.");
        setIsLoading(false);
        return;
      }
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify({
        user_input: prompt,
        symmetry: selectedSymmetry,
        dot_grid_size: dotGridSize[0],
        complexity: complexity[0],
      });
    } else {
      if (!uploadedImage) {
        setError("Please upload an image to transform.");
        setIsLoading(false);
        return;
      }
      body = new FormData();
      body.append('file', uploadedImage);
      body.append('user_input', prompt || "transform this image into a kolam");
      body.append('symmetry', selectedSymmetry);
      body.append('dot_grid_size', dotGridSize[0]);
      body.append('complexity', complexity[0]);
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: headers,
        body: body,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "An unknown error occurred");
      }

      const data = await response.json();
      setGeneratedImage(data.result);

    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="gradient-lotus py-16">
          {/* ... header content ... */}
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Input Section */}
              <div className="space-y-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
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
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageChange}
                          className="hidden"
                          accept="image/*"
                        />
                        <div 
                          className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer"
                          onClick={() => fileInputRef.current.click()}
                        >
                          {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="mx-auto h-32 rounded-md" />
                          ) : (
                            <>
                              <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                              <p className="text-muted-foreground">Drop an image to transform into Kolam style</p>
                              <Button className="mt-4" variant="outline">Choose Image</Button>
                            </>
                          )}
                        </div>
                         <Textarea 
                          placeholder="Optional: add a text prompt to guide the transformation..."
                          className="min-h-20 mt-4"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                        />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Parameters */}
                <Card className="shadow-medium border-0">
                  <CardHeader>
                     {/* ... parameters card header ... */}
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Symmetry</label>
                      <div className="flex gap-2">
                        {["4-fold", "6-fold", "8-fold"].map((symmetry) => (
                           <Button 
                             key={symmetry}
                             variant="outline" 
                             size="sm"
                             className={selectedSymmetry === symmetry ? "gradient-lotus text-white border-0" : ""}
                             onClick={() => setSelectedSymmetry(symmetry)}
                           >
                             {symmetry}
                           </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Dot Grid Size</label>
                      <div className="px-2">
                        <Slider value={dotGridSize} onValueChange={setDotGridSize} max={15} min={3} step={2} />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>3x3</span>
                          <span>{dotGridSize[0]}x{dotGridSize[0]}</span>
                          <span>15x15</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Complexity</label>
                      <div className="px-2">
                        <Slider value={complexity} onValueChange={setComplexity} max={10} min={1} />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Simple</span>
                          <span>Intricate</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  className="w-full gradient-lotus text-white border-0 shadow-lotus" 
                  onClick={handleGenerate} 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4 mr-2" />
                  )}
                  {isLoading ? "Generating..." : "Generate Kolam"}
                </Button>
                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
              </div>

              {/* Preview Section */}
              <Card className="shadow-medium border-0">
                <CardHeader>
                  <CardTitle>Generated Kolam</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square bg-muted/20 rounded-lg flex items-center justify-center mb-6">
                    {isLoading ? (
                      <div className="text-center text-muted-foreground">
                        <Loader2 className="h-16 w-16 mx-auto mb-4 animate-spin opacity-50" />
                        <p>Generating your masterpiece...</p>
                      </div>
                    ) : generatedImage ? (
                      <img src={generatedImage} alt="Generated Kolam" className="rounded-lg max-h-full max-w-full" />
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg mb-2">Your Kolam will appear here</p>
                        <p className="text-sm">Configure parameters and click generate</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-3">
                    <Button className="flex-1" variant="outline" disabled={!generatedImage || isLoading} onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-2" />
                      Download PNG
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