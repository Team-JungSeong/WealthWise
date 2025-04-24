import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile as firebaseUpdateProfile
} from 'firebase/auth';
import { auth, firestore, storage } from '../firebase/config';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

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

  const signup = async (email: string, password: string, name: string, phoneNumber?: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      console.log("회원가입 시도:", { email, name, phoneNumber });
      
      // Authentication에 사용자 생성
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      console.log("Firebase 인증 사용자 생성 성공:", firebaseUser.uid);
      
      // 사용자 프로필 업데이트 (이름 설정)
      await firebaseUpdateProfile(firebaseUser, {
        displayName: name
      });
      console.log("사용자 프로필 업데이트 성공");
      
      // Firestore에 사용자 정보 저장
      await setDoc(doc(firestore, "users", firebaseUser.uid), {
        id: firebaseUser.uid,
        name: name,
        email: email,
        phoneNumber: phoneNumber || '',
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

  const updateUserProfile = async (data: { name?: string; avatar?: File }): Promise<boolean> => {
    try {
      if (!auth.currentUser || !user) {
        console.error('사용자가 로그인되어 있지 않습니다.');
        return false;
      }

      setIsLoading(true);
      const currentUser = auth.currentUser;
      const updateData: { name?: string; photoURL?: string } = {};
      const firestoreUpdateData: { name?: string; avatar?: string } = {};

      // 이름 업데이트
      if (data.name && data.name !== user.name) {
        updateData.name = data.name;
        firestoreUpdateData.name = data.name;
      }

      // 프로필 사진 업로드 및 업데이트
      if (data.avatar) {
        // 스토리지에 파일 업로드
        const storageRef = ref(storage, `profile_images/${currentUser.uid}/${data.avatar.name}`);
        await uploadBytes(storageRef, data.avatar);
        
        // 업로드된 파일의 URL 가져오기
        const downloadURL = await getDownloadURL(storageRef);
        
        updateData.photoURL = downloadURL;
        firestoreUpdateData.avatar = downloadURL;
      }

      // 업데이트할 내용이 있는 경우에만 처리
      if (Object.keys(updateData).length > 0) {
        // Firebase Authentication 프로필 업데이트
        await firebaseUpdateProfile(currentUser, {
          displayName: updateData.name,
          photoURL: updateData.photoURL
        });

        // Firestore에 사용자 정보 업데이트
        const userRef = doc(firestore, "users", currentUser.uid);
        await updateDoc(userRef, firestoreUpdateData);

        // 상태 업데이트
        setUser(prevUser => {
          if (!prevUser) return null;
          return {
            ...prevUser,
            name: data.name || prevUser.name,
            avatar: firestoreUpdateData.avatar || prevUser.avatar
          };
        });
      }

      return true;
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      if (error instanceof Error) {
        console.error('오류 메시지:', error.message);
      }
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
    resetPassword,
    updateUserProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 