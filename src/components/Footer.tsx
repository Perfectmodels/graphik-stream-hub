
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-graphik-grey border-t border-graphik-light-grey mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">Graphik'Studio</h3>
            <p className="text-gray-300 mb-4">
              Le meilleur du streaming, de l'IPTV et du gaming, accessible à tous !
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-graphik-blue transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-graphik-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-graphik-blue transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-graphik-blue transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/streaming-video" className="text-gray-300 hover:text-white transition-colors">
                  Streaming Vidéo
                </Link>
              </li>
              <li>
                <Link to="/streaming-audio" className="text-gray-300 hover:text-white transition-colors">
                  Streaming Audio
                </Link>
              </li>
              <li>
                <Link to="/iptv" className="text-gray-300 hover:text-white transition-colors">
                  IPTV
                </Link>
              </li>
              <li>
                <Link to="/gaming" className="text-gray-300 hover:text-white transition-colors">
                  Gaming
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-gray-300 hover:text-white transition-colors">
                  Administration
                </Link>
              </li>
              <li>
                <Link to="/subscribe" className="text-gray-300 hover:text-white transition-colors">
                  S'abonner
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Légal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/mentions-legales" className="text-gray-300 hover:text-white transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-graphik-light-grey mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Graphik'Studio. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
