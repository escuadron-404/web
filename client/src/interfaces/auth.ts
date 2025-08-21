export interface User {
  email?: string;
  displayName?: string;
}

export interface CommunitySectionProps {
  user: User | null;
}

export interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
  loading: boolean;
}