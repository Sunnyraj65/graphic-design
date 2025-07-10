import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <NavLink to="/" className="text-2xl font-bold bg-gradient-creative bg-clip-text text-transparent">
            Sunny raj
          </NavLink>
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/gallery" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`
              }
            >
              Gallery
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-primary ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`
              }
            >
              About
            </NavLink>
          </nav>
        </div>
        <NavLink to="/admin">
          <Button variant="admin" size="sm">
            <Settings className="w-4 h-4" />
            Admin
          </Button>
        </NavLink>
      </div>
    </header>
  );
}