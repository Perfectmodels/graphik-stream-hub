
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Settings } from "lucide-react";

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

        {/* Admin & Subscribe buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <Link to="/admin">
            <Button size="sm" variant="outline" className="bg-graphik-dark border-graphik-light-grey hover:bg-graphik-light-grey/20">
              <Settings size={16} className="mr-1" />
              Admin
            </Button>
          </Link>
          <Link to="/subscribe">
            <Button size="sm" className="bg-graphik-blue hover:bg-graphik-blue/80">
              S'abonner
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
              <div className="pt-4 border-t border-graphik-light-grey space-y-3">
                <Link to="/admin" onClick={() => setIsOpen(false)} className="block">
                  <Button variant="outline" className="w-full bg-graphik-dark border-graphik-light-grey hover:bg-graphik-light-grey/20">
                    <Settings size={16} className="mr-1" />
                    Admin
                  </Button>
                </Link>
                <Link to="/subscribe" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-graphik-blue hover:bg-graphik-blue/80">
                    S'abonner
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
