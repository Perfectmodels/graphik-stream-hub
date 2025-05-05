
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogIn } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Accueil", path: "/" },
    { name: "Streaming Vidéo", path: "/streaming-video" },
    { name: "Streaming Audio", path: "/streaming-audio" },
    { name: "IPTV", path: "/iptv" },
    { name: "Gaming", path: "/gaming" },
    { name: "À Propos", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-graphik-light-grey">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-graphik-blue via-graphik-purple to-graphik-lightblue bg-clip-text text-transparent">
            Graphik'Studio
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? "active-nav-link" : ""}`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* User actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" size="sm" className="border-graphik-blue text-white hover:bg-graphik-blue/20">
              <LogIn className="mr-2 h-4 w-4" /> Se connecter
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="bg-graphik-blue hover:bg-graphik-blue/80">
              <User className="mr-2 h-4 w-4" /> S'inscrire
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-graphik-grey border-t border-graphik-light-grey animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`py-2 px-4 rounded-md ${
                    isActive(item.path)
                      ? "bg-graphik-blue/20 text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-graphik-light-grey">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full border-graphik-blue text-white hover:bg-graphik-blue/20">
                    <LogIn className="mr-2 h-4 w-4" /> Se connecter
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-graphik-blue hover:bg-graphik-blue/80">
                    <User className="mr-2 h-4 w-4" /> S'inscrire
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
