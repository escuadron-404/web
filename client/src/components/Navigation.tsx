import { useState, useEffect } from "react";
import { Code, Menu, X } from "lucide-react";

interface User {
  email?: string;
  displayName?: string;
}

interface NavigationProps {
  currentSection: 'comunidad' | 'corporativo';
  onSectionChange: (section: 'comunidad' | 'corporativo') => void;
  user: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
}

export default function Navigation({ 
  currentSection, 
  onSectionChange, 
  user, 
  onLoginClick, 
  onLogout 
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (section: 'comunidad' | 'corporativo') => {
    onSectionChange(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`glass fixed w-full top-0 z-50 transition-all duration-300 border-b border-purple-500/20 ${isScrolled ? 'bg-black/95' : 'bg-black/10'}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center animate-float">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gradient-purple">Escuadrón 404</h1>
              <p className="text-xs text-gray-400">Dev Community</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleSectionClick('comunidad')}
              className={`font-medium transition-colors relative group ${
                currentSection === 'comunidad' ? 'text-purple-400' : 'text-white hover:text-purple-400'
              }`}
              data-testid="nav-comunidad"
            >
              Comunidad
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all group-hover:w-full"></span>
            </button>
            <button
              onClick={() => handleSectionClick('corporativo')}
              className={`font-medium transition-colors relative group ${
                currentSection === 'corporativo' ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400'
              }`}
              data-testid="nav-corporativo"
            >
              Corporativo
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all group-hover:w-full"></span>
            </button>
            
            {user ? (
              <button 
                onClick={onLogout}
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover-lift"
                data-testid="button-logout"
              >
                Cerrar Sesión
              </button>
            ) : (
              <button 
                onClick={onLoginClick}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover-lift"
                data-testid="button-login"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg glass-card"
            aria-label="Abrir menú de navegación"
            aria-expanded={isMobileMenuOpen}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        
        {isMobileMenuOpen && (
          <div className="md:hidden mt-6 space-y-4 glass-card rounded-2xl p-6 animate-slide-down">
            <button
              onClick={() => handleSectionClick('comunidad')}
              className={`block w-full text-left font-medium py-2 transition-colors ${
                currentSection === 'comunidad' ? 'text-purple-400' : 'text-white hover:text-purple-400'
              }`}
              data-testid="mobile-nav-comunidad"
            >
              Comunidad
            </button>
            <button
              onClick={() => handleSectionClick('corporativo')}
              className={`block w-full text-left font-medium py-2 transition-colors ${
                currentSection === 'corporativo' ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400'
              }`}
              data-testid="mobile-nav-corporativo"
            >
              Corporativo
            </button>
            
            {user ? (
              <button 
                onClick={onLogout}
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                data-testid="mobile-button-logout"
              >
                Cerrar Sesión
              </button>
            ) : (
              <button 
                onClick={onLoginClick}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                data-testid="mobile-button-login"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
