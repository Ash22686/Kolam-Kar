import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Star,
  Download,
  Heart,
  Eye,
  User,
  Sparkles
} from "lucide-react";

const Marketplace = () => {
  const categories = [
    { name: "Featured", count: 24, active: true },
    { name: "Traditional", count: 156 },
    { name: "Modern", count: 89 },
    { name: "Festival", count: 67 },
    { name: "Simple", count: 134 },
    { name: "Complex", count: 78 },
  ];

  const designs = [
    {
      id: 1,
      title: "Sacred Lotus Mandala",
      artist: "Priya Sharma", 
      price: "$12",
      rating: 4.9,
      downloads: 234,
      image: "gradient-lotus",
      featured: true
    },
    {
      id: 2,
      title: "Pongal Festival Design",
      artist: "Ravi Kumar",
      price: "$8",
      rating: 4.7,
      downloads: 156,
      image: "gradient-sacred",
      featured: false
    },
    {
      id: 3,
      title: "Geometric Harmony",
      artist: "Lakshmi Devi",
      price: "$15",
      rating: 4.8,
      downloads: 189,
      image: "gradient-hero",
      featured: true
    },
    {
      id: 4,
      title: "Simple Dots Pattern",
      artist: "Arjun Nair",
      price: "$5",
      rating: 4.6,
      downloads: 298,
      image: "gradient-lotus",
      featured: false
    },
    {
      id: 5,
      title: "Wedding Kolam",
      artist: "Meera Iyer",
      price: "$20",
      rating: 4.9,
      downloads: 67,
      image: "gradient-sacred",
      featured: true
    },
    {
      id: 6,
      title: "Daily Practice Set",
      artist: "Divya Rao",
      price: "$10",
      rating: 4.5,
      downloads: 445,
      image: "gradient-hero",
      featured: false
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="gradient-lotus py-16">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center text-white">
              <Badge variant="secondary" className="mb-4 gradient-hero text-white border-0">
                <ShoppingBag className="h-4 w-4 mr-2" />
                Design Marketplace
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Kolam Marketplace</h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Discover unique Kolam designs from talented artists worldwide. Buy, sell, and share beautiful patterns.
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="py-8 border-b bg-card">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search designs..." 
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button className="gradient-sacred text-white border-0">
                  Upload Design
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-6 bg-muted/20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant={category.active ? "default" : "outline"}
                  size="sm"
                  className={category.active ? "gradient-lotus text-white border-0" : ""}
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Designs Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {designs.map((design) => (
                <Card key={design.id} className="group overflow-hidden border-0 shadow-medium hover:shadow-lotus transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  {/* Design Preview */}
                  <div className={`aspect-square ${design.image} relative`}>
                    {design.featured && (
                      <Badge className="absolute top-3 left-3 gradient-sacred text-white border-0">
                        <Sparkles className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="secondary">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                          {design.title}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <Avatar className="h-5 w-5 mr-2">
                            <AvatarFallback className="text-xs">
                              <User className="h-3 w-3" />
                            </AvatarFallback>
                          </Avatar>
                          <span>{design.artist}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-primary">{design.price}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        <span>{design.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Download className="h-4 w-4 mr-1" />
                        <span>{design.downloads}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full gradient-lotus text-white border-0">
                      Purchase & Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Designs
              </Button>
            </div>
          </div>
        </section>

        {/* Artist Spotlight */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Artists</h2>
              <p className="text-muted-foreground">Discover talented creators in our community</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {["Priya Sharma", "Ravi Kumar", "Lakshmi Devi"].map((artist, index) => (
                <Card key={artist} className="text-center border-0 shadow-medium hover:shadow-lotus transition-all duration-300">
                  <CardContent className="p-6">
                    <Avatar className="h-16 w-16 mx-auto mb-4">
                      <AvatarFallback className="gradient-hero text-white text-lg">
                        {artist.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-lg mb-2">{artist}</h3>
                    <p className="text-muted-foreground text-sm mb-4">Traditional Kolam Artist</p>
                    <div className="grid grid-cols-2 gap-4 text-center mb-4">
                      <div>
                        <div className="font-bold">{[45, 32, 28][index]}</div>
                        <div className="text-xs text-muted-foreground">Designs</div>
                      </div>
                      <div>
                        <div className="font-bold">{[1.2, 0.8, 1.5][index]}k</div>
                        <div className="text-xs text-muted-foreground">Sales</div>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Marketplace;