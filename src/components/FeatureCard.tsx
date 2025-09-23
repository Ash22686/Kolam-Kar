import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  gradient: string;
  href: string;
  features: string[];
}

export const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  gradient, 
  href, 
  features 
}: FeatureCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 shadow-medium hover:shadow-lotus transition-all duration-500 hover:-translate-y-2">
      <div className={`h-2 ${gradient}`} />
      <CardContent className="p-6 gradient-card">
        <div className="flex items-start space-x-4 mb-4">
          <div className={`p-3 rounded-xl ${gradient} text-white shadow-medium group-hover:animate-lotus-pulse`}>
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
          </div>
        </div>
        
        <div className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full gradient-lotus mr-3" />
              {feature}
            </div>
          ))}
        </div>

        <Link to={href}>
          <Button 
            variant="ghost" 
            className="w-full group/btn justify-between hover:bg-primary/5 transition-smooth"
          >
            <span>Explore {title}</span>
            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};