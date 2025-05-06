
import React from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface AdminMobileHeaderProps {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

const AdminMobileHeader: React.FC<AdminMobileHeaderProps> = ({ 
  isMobileMenuOpen, 
  toggleMobileMenu 
}) => {
  return (
    <header className="md:hidden bg-graphik-grey border-b border-graphik-light-grey">
      <div className="px-4 py-3 flex justify-between items-center">
        <Link to="/admin/dashboard" className="inline-block">
          <span className="text-xl font-bold bg-gradient-to-r from-graphik-blue via-graphik-purple to-graphik-lightblue bg-clip-text text-transparent">
            Graphik'Admin
          </span>
        </Link>
        <button
          onClick={toggleMobileMenu}
          className="text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default AdminMobileHeader;
