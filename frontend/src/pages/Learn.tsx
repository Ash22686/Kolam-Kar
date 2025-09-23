import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Play, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  History,
  Sparkles,
  Heart
} from "lucide-react";

const Learn = () => {
  const categories = [
    {
      title: "Beginner",
      description: "Start your Kolam journey",
      gradient: "gradient-hero",
      lessons: [
        { title: "What is Kolam?", duration: "5 min", type: "Article" },
        { title: "Basic Dot Patterns", duration: "8 min", type: "Tutorial" },
        { title: "Simple Lines & Curves", duration: "12 min", type: "Video" },
      ]
    },
    {
      title: "Intermediate", 
      description: "Develop your skills",
      gradient: "gradient-lotus",
      lessons: [
        { title: "Symmetry Principles", duration: "15 min", type: "Tutorial" },
        { title: "Complex Patterns", duration: "20 min", type: "Video" },
        { title: "Cultural Variations", duration: "10 min", type: "Article" },
      ]
    },
    {
      title: "Advanced",
      description: "Master the art form",
      gradient: "gradient-sacred", 
      lessons: [
        { title: "Festival Kolams", duration: "25 min", type: "Video" },
        { title: "Mathematical Beauty", duration: "18 min", type: "Article" },
        { title: "Teaching Others", duration: "30 min", type: "Course" },
      ]
    }
  ];

  const featured = [
    {
      title: "History of Kolam Art",
      description: "Discover the ancient origins and evolution of this beautiful tradition",
      icon: <History className="h-6 w-6" />,
      type: "Documentary",
      duration: "45 min",
      rating: 4.9
    },
    {
      title: "Sacred Geometry in Kolam",
      description: "Understanding the mathematical principles behind traditional patterns",
      icon: <Sparkles className="h-6 w-6" />,
      type: "Course",
      duration: "2 hours", 
      rating: 4.8
    },
    {
      title: "Festival Kolam Traditions",
      description: "Learn about special designs for different celebrations and seasons",
      icon: <Heart className="h-6 w-6" />,
      type: "Article Series",
      duration: "30 min",
      rating: 4.7
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="gradient-sacred py-16">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center text-white">
              <Badge variant="secondary" className="mb-4 gradient-hero text-white border-0">
                <BookOpen className="h-4 w-4 mr-2" />
                Educational Hub
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Learn Kolam Art</h1>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                Discover the rich history, cultural significance, and techniques of traditional Kolam patterns
              </p>
            </div>
          </div>
        </section>

        {/* Learning Levels */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choose Your Learning Path</h2>
              <p className="text-muted-foreground">Progress from basic concepts to advanced techniques</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {categories.map((category, index) => (
                <Card key={category.title} className="overflow-hidden border-0 shadow-medium hover:shadow-lotus transition-all duration-300 hover:-translate-y-1">
                  <div className={`h-2 ${category.gradient}`} />
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{category.title}</CardTitle>
                        <p className="text-muted-foreground text-sm">{category.description}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {category.lessons.length} lessons
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      {category.lessons.map((lesson, lessonIndex) => (
                        <div key={lessonIndex} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${category.gradient}`} />
                            <div>
                              <p className="font-medium text-sm">{lesson.title}</p>
                              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{lesson.duration}</span>
                                <span>•</span>
                                <span>{lesson.type}</span>
                              </div>
                            </div>
                          </div>
                          <Play className="h-4 w-4 text-muted-foreground" />
                        </div>
                      ))}
                    </div>
                    <Button className="w-full" variant="outline">
                      Start Learning
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Content */}
        <section className="py-16 bg-muted/20">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Learning</h2>
              <p className="text-muted-foreground">Deep dive into the cultural and artistic aspects of Kolam</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((item, index) => (
                <Card key={index} className="border-0 shadow-medium hover:shadow-lotus transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="gradient-lotus p-3 rounded-xl text-white group-hover:animate-lotus-pulse">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3">{item.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {item.duration}
                            </span>
                            <span>{item.type}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                            <span>{item.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="ghost" className="w-full justify-between group/btn">
                      <span>Start Learning</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-6">
            <Card className="gradient-hero text-white border-0 shadow-glow">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="flex items-center justify-center mb-2">
                      <Users className="h-6 w-6 mr-2" />
                      <span className="text-2xl font-bold">5,000+</span>
                    </div>
                    <p className="text-white/80">Active Learners</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-2">
                      <BookOpen className="h-6 w-6 mr-2" />
                      <span className="text-2xl font-bold">150+</span>
                    </div>
                    <p className="text-white/80">Learning Resources</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center mb-2">
                      <Star className="h-6 w-6 mr-2" />
                      <span className="text-2xl font-bold">4.8</span>
                    </div>
                    <p className="text-white/80">Average Rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Learn;