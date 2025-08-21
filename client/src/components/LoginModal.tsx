import { Lock, User, X } from "lucide-react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginModalProps } from "@/interfaces/auth";

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
  loading,
}: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const idHash = useId();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onLogin(email, password);
      setEmail("");
      setPassword("");
      onClose();
    } catch (_) {
      // Error handling is done in the hook
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="black-card-enhanced rounded-3xl p-8 max-w-md w-full mx-4 animate-scale-in border-purple-glow">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gradient-purple">
            Iniciar Sesión
          </h3>
          <p className="text-gray-400 mt-2">
            Accede a tu cuenta de desarrollador
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label
              htmlFor={`loginEmail${idHash}`}
              className="block text-sm font-semibold mb-2 text-gray-200"
            >
              Email
            </Label>
            <Input
              type="email"
              id={`loginEmail${idHash}`}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 input-enhanced rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              placeholder="tu@email.com"
              data-testid="input-login-email"
            />
          </div>
          <div>
            <Label
              htmlFor={`loginPassword${idHash}`}
              className="block text-sm font-semibold mb-2 text-gray-200"
            >
              Contraseña
            </Label>
            <Input
              type="password"
              id={`loginPassword${idHash}`}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 input-enhanced rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
              placeholder="••••••••"
              data-testid="input-login-password"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-purple-600 bg-transparent border-purple-500 rounded focus:ring-purple-500"
                data-testid="checkbox-remember"
              />
              <span className="ml-2 text-sm text-gray-300">Recordarme</span>
            </label>
            <button
              type="button"
              className="text-sm text-purple-400 hover:text-purple-300"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-login-submit"
          >
            {loading ? (
              <div className="spinner mx-auto" />
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Iniciar Sesión
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            ¿No tienes cuenta?{" "}
            <button
              type="button"
              className="text-purple-400 hover:text-purple-300 font-medium"
            >
              Regístrate aquí
            </button>
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          data-testid="button-close-modal"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
