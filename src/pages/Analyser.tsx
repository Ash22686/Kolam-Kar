import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Search, Download, Zap } from "lucide-react";

const Analyser = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="gradient-hero py-16">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center text-white">
              <Badge variant="secondary" className="mb-4 gradient-sacred text-white border-0">
                <Search className="h-4 w-4 mr-2" />
                AI Analysis
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Kolam Analyser</h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Upload your Kolam designs and discover their hidden patterns, symmetry, and cultural significance
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Upload Section */}
              <Card className="shadow-medium border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="h-5 w-5 mr-2 text-primary" />
                    Upload Your Kolam
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Drop your image here</h3>
                    <p className="text-muted-foreground mb-4">or click to browse files</p>
                    <Button className="gradient-lotus text-white border-0">
                      Choose File
                    </Button>
                  </div>
                  <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                    <p>• Supports JPG, PNG, WEBP formats</p>
                    <p>• Maximum file size: 10MB</p>
                    <p>• Best results with clear, high-contrast images</p>
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Results */}
              <Card className="shadow-medium border-0">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-secondary" />
                    Analysis Results
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">
                    <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">Upload an image to see analysis</p>
                    <p className="text-sm">We'll detect patterns, symmetry, and cultural elements</p>
                  </div>
                  
                  <div className="space-y-4 opacity-50">
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold mb-2">Pattern Recognition</h4>
                      <p className="text-sm text-muted-foreground">Identifying geometric patterns and motifs...</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold mb-2">Symmetry Analysis</h4>
                      <p className="text-sm text-muted-foreground">Detecting rotational and reflective symmetries...</p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/50">
                      <h4 className="font-semibold mb-2">Cultural Context</h4>
                      <p className="text-sm text-muted-foreground">Understanding traditional significance...</p>
                    </div>
                  </div>

                  <Button className="w-full mt-6" variant="outline" disabled>
                    <Download className="h-4 w-4 mr-2" />
                    Download Analysis Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Analyser;