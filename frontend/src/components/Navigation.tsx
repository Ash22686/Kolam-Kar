import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
    }
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  const navItems = [
    { name: "Analyser", path: "/analyser" },
    { name: "Generator", path: "/generator" },
    { name: "Playground", path: "/playground" },
    { name: "Marketplace", path: "/marketplace" },
  ];

  const isActive = (path) => location.pathname === path;

  const navClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
    isHomePage && !isScrolled
      ? 'bg-transparent'
      : 'bg-card/80 backdrop-blur-md border-b border-border'
  }`;
  
  const linkColorClass = isHomePage && !isScrolled ? 'text-white/90 hover:text-white' : 'text-muted-foreground hover:text-primary';
  const activeLinkColorClass = isHomePage && !isScrolled ? 'text-white' : 'text-primary';

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            {/* MODIFIED PART: Removed background, padding, and shadow classes */}
            <div className="w-10 h-10 transition-all duration-300">
              <img src={"/logo.png"} alt="KolamKar" className="w-full h-full object-contain" />
            </div>
            <span className={`text-xl font-bold transition-colors ${isHomePage && !isScrolled ? 'text-white' : 'text-primary'}`}>
              KolamKar
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                  isActive(item.path) ? activeLinkColorClass : linkColorClass
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 gradient-lotus rounded-full" />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="/placeholder-user.jpg" alt="User" />
                      <AvatarFallback className="gradient-sacred text-white">
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">My Account</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        user@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button asChild variant="ghost" className={linkColorClass}>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild className="gradient-lotus text-white border-0 shadow-lotus">
                  <Link to="/login">Sign Up</Link>
                </Button>
              </div>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className={`md:hidden ${isHomePage && !isScrolled ? 'text-white' : 'text-primary'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-card border-b border-border shadow-medium animate-slide-up">
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-smooth ${
                    isActive(item.path)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Separator />
               {!isLoggedIn && (
                  <div className="pt-2">
                     <Button asChild className="w-full gradient-lotus text-white border-0 shadow-lotus">
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>Sign Up / Sign In</Link>
                     </Button>
                  </div>
               )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};