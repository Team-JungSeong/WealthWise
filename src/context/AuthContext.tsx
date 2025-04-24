import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile as firebaseUpdateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../firebase/config';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phoneNumber?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string, phoneNumber?: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  updateUserProfile: (data: { name?: string; avatar?: File }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || '',
          email: firebaseUser.email || '',
          avatar: firebaseUser.photoURL || undefined
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      // 로그아웃 실패 시 별도 처리 없음
    }
  };

  const signup = async (email: string, password: string, name: string, phoneNumber?: string): Promise<boolean> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      await firebaseUpdateProfile(firebaseUser, {
        displayName: name
      });
      
      return true;
    } catch (error) {
      return false;
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      return false;
    }
  };

  const updateUserProfile = async (data: { name?: string; avatar?: File }): Promise<boolean> => {
    try {
      if (!auth.currentUser) return false;

      const updates: { displayName?: string; photoURL?: string } = {};
      if (data.name) updates.displayName = data.name;

      await firebaseUpdateProfile(auth.currentUser, updates);
      
      setUser(prev => prev ? {
        ...prev,
        name: data.name || prev.name,
        avatar: updates.photoURL || prev.avatar
      } : null);

      return true;
    } catch (error) {
      return false;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signup,
    resetPassword,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};