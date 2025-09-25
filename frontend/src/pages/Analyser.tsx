"use client";

import { useState, useRef } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Search, Download, Zap } from "lucide-react";

const Analyser = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResults(null);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      setResults(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:8000/math_analysis", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Failed to analyse image");
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
      alert("Error analyzing the image");
    } finally {
      setLoading(false);
    }
  };

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
                  <div
                    className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${dragOver ? "border-primary/70 bg-primary/10" : "border-border"
                      }`}
                    onClick={handleChooseFile}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                  >
                    <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Drop your image here</h3>
                    <p className="text-muted-foreground mb-4">or click to browse files</p>

                    {/* Hidden file input */}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />

                    {/* CORRECTED BUTTON */}
                    <Button
                      className="gradient-lotus text-white border-0 w-full cursor-pointer mt-2"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents the click from reaching the parent div
                        handleChooseFile();
                      }}
                    >
                      Choose File
                    </Button>
                    {/* END OF CORRECTION */}

                    {file && (
                      <p className="mt-2 text-sm text-muted-foreground">{file.name}</p>
                    )}
                  </div>

                  <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                    <p>• Supports JPG, PNG, WEBP formats</p>
                    <p>• Maximum file size: 10MB</p>
                    <p>• Best results with clear, high-contrast images</p>
                  </div>

                  {file && (
                    <Button className="w-full mt-6" onClick={handleUpload} disabled={loading}>
                      {loading ? "Analyzing..." : "Analyze Kolam"}
                    </Button>
                  )}
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
                  {results ? (
                    <div className="space-y-6 text-center">
                      <div>
                        <h4 className="font-semibold mb-2">Symmetry Analysis</h4>
                        <img
                          src={results.symmetry}
                          alt="Symmetry Analysis"
                          className="mx-auto border rounded-lg"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Fractal Dimension</h4>
                        <img
                          src={results.fractal_dimension}
                          alt="Fractal Dimension"
                          className="mx-auto border rounded-lg"
                        />
                      </div>
                      <Button
                        className="w-full mt-6"
                        variant="outline"
                        onClick={() => {
                          const a = document.createElement("a");
                          a.href = results.symmetry;
                          a.download = "symmetry.png";
                          a.click();
                        }}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Symmetry Analysis
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">Upload an image to see analysis</p>
                      <p className="text-sm">We'll detect patterns, symmetry, and cultural elements</p>
                    </div>
                  )}
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