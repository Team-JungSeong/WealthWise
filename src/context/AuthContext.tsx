import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { auth, firestore } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setIsLoading(true);
      if (firebaseUser) {
        // Firebase 사용자 객체를 애플리케이션 User 형식으로 변환
        const appUser: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || '사용자',
          email: firebaseUser.email || '',
          avatar: firebaseUser.photoURL || undefined,
        };
        setUser(appUser);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // 컴포넌트 언마운트 시 이벤트 리스너 해제
    return () => unsubscribe();
  }, []); 

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      console.log("회원가입 시도:", { email, name });
      
      // Authentication에 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      console.log("Firebase 인증 사용자 생성 성공:", firebaseUser.uid);
      
      // 사용자 프로필 업데이트 (이름 설정)
      await updateProfile(firebaseUser, {
        displayName: name
      });
      console.log("사용자 프로필 업데이트 성공");
      
      // Firestore에 사용자 정보 저장
      await setDoc(doc(firestore, "users", firebaseUser.uid), {
        id: firebaseUser.uid,
        name: name,
        email: email,
        createdAt: new Date()
      });
      console.log("Firestore에 사용자 정보 저장 성공");
      
      return true;
    } catch (error) {
      console.error('회원가입 실패:', error);
      // 더 자세한 오류 정보 출력
      if (error instanceof Error) {
        console.error('오류 메시지:', error.message);
        console.error('오류 스택:', error.stack);
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      console.error('Password reset failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signup,
    resetPassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 