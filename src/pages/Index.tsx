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
import heroLotus from "@/assets/hero-lotus.png";

const Index = () => {
  const features = [
    {
      title: "Analyser",
      description: "Upload your Kolam designs and get detailed analysis of patterns, symmetry, and cultural significance.",
      icon: <Search className="h-6 w-6" />,
      gradient: "gradient-sacred",
      href: "/analyser",
      features: ["Pattern Recognition", "Symmetry Analysis", "Cultural Context", "Export Results"]
    },
    {
      title: "Generator", 
      description: "Create stunning Kolam designs using AI with text prompts or transform existing images.",
      icon: <Sparkles className="h-6 w-6" />,
      gradient: "gradient-lotus",
      href: "/generator",
      features: ["Text-to-Kolam", "Image-to-Kolam", "Custom Parameters", "High Resolution Export"]
    },
    {
      title: "Playground",
      description: "Interactive canvas to draw and create your own Kolam patterns with real-time symmetry.",
      icon: <Palette className="h-6 w-6" />,
      gradient: "gradient-hero",
      href: "/playground", 
      features: ["Interactive Drawing", "Symmetry Tools", "Pattern Library", "Save & Share"]
    },
    {
      title: "Learn",
      description: "Discover the rich history, cultural significance, and techniques of traditional Kolam art.",
      icon: <BookOpen className="h-6 w-6" />,
      gradient: "gradient-sacred",
      href: "/learn",
      features: ["Historical Context", "Step-by-step Tutorials", "Cultural Stories", "Video Guides"]
    },
    {
      title: "Marketplace",
      description: "Buy and sell unique Kolam designs, connect with artists and discover new patterns.",
      icon: <ShoppingBag className="h-6 w-6" />,
      gradient: "gradient-lotus", 
      href: "/marketplace",
      features: ["Browse Designs", "Artist Profiles", "Secure Payments", "Commercial Licenses"]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero kolam-pattern">
        <div className="container mx-auto px-4 lg:px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-in">
              <Badge variant="secondary" className="mb-6 gradient-lotus text-white border-0 shadow-lotus">
                <Zap className="h-4 w-4 mr-2" />
                AI-Powered Kolam Creation
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Discover the Art of
                <span className="block gradient-lotus bg-clip-text text-transparent">
                  Design & Culture
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-white/90 mb-8 leading-relaxed">
                Create, analyze, and learn traditional Kolam patterns with modern AI technology. 
                Connect with ancient wisdom through digital innovation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="gradient-lotus text-white border-0 shadow-lotus hover:shadow-glow transition-all">
                  Start Creating
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="relative animate-float">
              <div className="absolute inset-0 gradient-lotus rounded-full blur-3xl opacity-20 animate-lotus-pulse" />
              <img 
                src={heroLotus} 
                alt="Beautiful Kolam Pattern" 
                className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 gradient-lotus rounded-full opacity-60 animate-float" />
        <div className="absolute top-40 right-20 w-6 h-6 gradient-sacred rounded-full opacity-40 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-20 w-3 h-3 gradient-lotus rounded-full opacity-50 animate-float" style={{ animationDelay: '2s' }} />
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Powerful Tools for Every Creator
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're a beginner or expert, our comprehensive suite of tools helps you 
              explore the beautiful world of Kolam art.
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
