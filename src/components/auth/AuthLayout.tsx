
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerAction?: React.ReactNode;
  backLink?: {
    to: string;
    label: string;
  };
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  title,
  subtitle,
  children,
  footerAction,
  backLink
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-graphik-dark px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <span className="text-3xl font-bold bg-gradient-to-r from-graphik-blue via-graphik-purple to-graphik-lightblue bg-clip-text text-transparent">
              Graphik'Studio
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-6 mb-2">{title}</h1>
          <p className="text-gray-400">{subtitle}</p>
        </div>

        <Card className="bg-graphik-grey border-graphik-light-grey p-6">
          {children}

          {footerAction && (
            <div className="mt-6 pt-6 border-t border-graphik-light-grey text-center">
              {footerAction}
            </div>
          )}
        </Card>

        {backLink && (
          <div className="mt-8 text-center">
            <Link
              to={backLink.to}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {backLink.label}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
