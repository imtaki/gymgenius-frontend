import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { Dumbbell } from "lucide-react";
import Link from "next/link";

export default function NavBar() {
    const navItems = [
      { id: 1, href: "features", name: "Features" },
      { id: 2, href: "benefits", name: "Benefits" },
      { id: 3, href: "pricing", name: "Pricing" }
    ]
    return (
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Dumbbell className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">GymGenius</span>
              <Badge variant="secondary" className="hidden sm:inline-flex">AI Powered</Badge>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) =>
                <Link key={item.id} href={item.href} className="text-muted-foreground hover:text-foreground transition-colors"
                >{item.name}</Link>
              )}
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">Sign In</Button>
              <Button size="sm">Get Started</Button>
            </div>
          </div>
        </div>
      </header>
    )
}