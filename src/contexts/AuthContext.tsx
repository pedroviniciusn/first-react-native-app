import * as React from 'react';
import { User } from 'firebase/auth';

interface AuthProviderProps {
  children: React.ReactNode;
}

type AuthValuesType = {
  user: null | User;
  loading: boolean;
  setUser: (value: null | User) => void;
  setLoading: (value: boolean) => void;
};

const defaultProvider: AuthValuesType = {
  user: null,
  loading: false,
  setUser: () => null,
  setLoading: () => Boolean,
};

const AuthContext = React.createContext(defaultProvider);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(false);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
