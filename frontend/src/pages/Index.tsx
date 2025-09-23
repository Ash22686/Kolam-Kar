import { Layout } from "@/components/Layout";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Zap, 
  Palette, 
  BookOpen, 
  ShoppingBag, 
  Search,
  ArrowRight,
  Users,
  Award,
  Heart
} from "lucide-react";

const Index = () => {
  const features = [
    {
      title: "Analyser",
      description: "Upload your Kolam designs for a detailed analysis of patterns, symmetry, and cultural significance.",
      icon: <Search className="h-6 w-6" />,
      gradient: "gradient-sacred",
      href: "/analyser",
      features: ["Pattern Recognition", "Symmetry Analysis", "Cultural Context", "Export Results"]
    },
    {
      title: "Generator", 
      description: "Create stunning Kolam designs using AI from text prompts or by transforming existing images.",
      icon: <Sparkles className="h-6 w-6" />,
      gradient: "gradient-lotus",
      href: "/generator",
      features: ["Text-to-Kolam", "Image-to-Kolam", "Custom Parameters", "High Resolution Export"]
    },
    {
      title: "Playground",
      description: "An interactive canvas to draw your own Kolam patterns with real-time symmetry assistance.",
      icon: <Palette className="h-6 w-6" />,
      gradient: "gradient-hero",
      href: "/playground", 
      features: ["Interactive Drawing", "Symmetry Tools", "Pattern Library", "Save & Share"]
    },
    // ... (Your other features can remain the same)
  ];

  return (
    <Layout>
      {/* Hero Section */}
       <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Background Video */}
        <video
          src="/kolam.mp4" 
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-10"
        />
        
        {/* Overlay for Text Readability */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-20" />

        {/* Centered Content */}
        <div className="relative z-30 container mx-auto px-4 lg:px-6 animate-fade-in">
          
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto">
           Weaving Pixels into Patterns
            
          </h1>
          
          <p className="text-lg lg:text-x mb-8 leading-relaxed max-w-2xl mx-auto block gradient-lotus bg-clip-text text-transparent mt-2">
           Experience the timeless beauty of Kolam, powered by artificial intelligence.

          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-lotus text-white border-0 shadow-lotus hover:shadow-glow transition-all">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
              Explore Features
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Powerful Tools for Every Creator
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive suite of tools helps you explore the beautiful world of Kolam art, whether you're a beginner or an expert.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 gradient-hero">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 mr-2" />
                <span className="text-2xl lg:text-3xl font-bold">10K+</span>
              </div>
              <p className="text-white/80">Active Users</p>
            </div>
            <div className="text-white">
              <div className="flex items-center justify-center mb-2">
                <Sparkles className="h-6 w-6 mr-2" />
                <span className="text-2xl lg:text-3xl font-bold">50K+</span>
              </div>
              <p className="text-white/80">Designs Created</p>
            </div>
            <div className="text-white">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-6 w-6 mr-2" />
                <span className="text-2xl lg:text-3xl font-bold">500+</span>
              </div>
              <p className="text-white/80">Patterns Library</p>
            </div>
            <div className="text-white">
              <div className="flex items-center justify-center mb-2">
                <Heart className="h-6 w-6 mr-2" />
                <span className="text-2xl lg:text-3xl font-bold">98%</span>
              </div>
              <p className="text-white/80">User Satisfaction</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;