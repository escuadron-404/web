import { useState } from "react";
import Navigation from "@/components/Navigation";
import CommunitySection from "@/components/CommunitySection";
import CorporateSection from "@/components/CorporateSection";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

export default function Home() {
  const [currentSection, setCurrentSection] = useState<'comunidad' | 'corporativo'>('comunidad');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, login, logout, loading } = useFirebaseAuth();

  return (
    <div className="bg-black text-white font-inter min-h-screen">
      <Navigation 
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        user={user}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onLogout={logout}
      />
      
      {/* User Welcome */}
      {user && (
        <div className="fixed top-20 left-0 right-0 z-40 black-card-enhanced mx-6 rounded-2xl p-4 text-center animate-slide-down border-purple-glow">
          <p className="font-medium">
            ¡Bienvenido, <span className="text-gradient-purple font-bold">{user.displayName || user.email?.split('@')[0]}</span>!
          </p>
        </div>
      )}

      {currentSection === 'comunidad' && <CommunitySection user={user} />}
      {currentSection === 'corporativo' && <CorporateSection />}
      
      <Footer />
      
      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={login}
        loading={loading}
      />
    </div>
  );
}
