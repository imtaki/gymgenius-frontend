import { 
  Dumbbell, 
  Target, 
  TrendingUp, 
  Calendar, 
  Users, 
  Zap,
  BarChart3,
  Apple,
  ChevronRight,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
    <footer className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Dumbbell className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold">GymGenius</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                The AI-powered fitness platform that helps you achieve your health and wellness goals with personalized training and nutrition guidance.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon">
                  <Users className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Calendar className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <TrendingUp className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; {currentYear} GymGenius. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
}