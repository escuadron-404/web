import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

interface User {
  email?: string;
  displayName?: string;
}

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (auth) {
      // Real Firebase auth state listener
      const unsubscribe = auth.onAuthStateChanged((firebaseUser: any) => {
        if (firebaseUser) {
          setUser({
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0]
          });
        } else {
          setUser(null);
        }
      });

      return unsubscribe;
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      if (auth) {
        // Real Firebase login
        await auth.signInWithEmailAndPassword(email, password);
        toast({
          title: "¡Bienvenido de vuelta!",
          description: "Has iniciado sesión exitosamente",
        });
      } else {
        // Demo mode simulation
        const userName = email.split('@')[0];
        setUser({ email, displayName: userName });
        toast({
          title: `¡Bienvenido, ${userName}!`,
          description: "Modo demo activo - Firebase no configurado",
        });
      }
    } catch (error: any) {
      let errorMessage = 'Error al iniciar sesión. Verifica tus credenciales.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Usuario no encontrado. Verifica tu email.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Contraseña incorrecta.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email inválido.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Demasiados intentos. Intenta más tarde.';
      }
      
      toast({
        title: "Error de autenticación",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (auth) {
        await auth.signOut();
      } else {
        // Demo mode
        setUser(null);
      }
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al cerrar sesión",
        variant: "destructive",
      });
    }
  };

  return {
    user,
    loading,
    login,
    logout
  };
}
