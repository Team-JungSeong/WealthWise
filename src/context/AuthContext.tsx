import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
}

// 기본 임시 사용자 객체를 컴포넌트 외부로 이동
const defaultUser: User = {
  id: "1",
  name: "김투자",
  email: "investor@example.com",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // 기본적으로 유저를 설정하여 로그인된 상태로 시작
  const [user, setUser] = useState<User | null>(defaultUser);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   // 로컬 스토리지에서 사용자 정보가 있으면 그것을 사용, 없으면 기본 사용자 유지
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   } else {
  //     // 로컬 스토리지에 기본 사용자 저장
  //     localStorage.setItem("user", JSON.stringify(defaultUser));
  //   }
  //   setIsLoading(false);
  // }, []); // 의존성 배열에서 defaultUser 제거 - 컴포넌트 마운트 시 한 번만 실행

  useEffect(() => {
    // 기존 데이터 삭제 후 기본 사용자로 설정
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(defaultUser));
    setUser(defaultUser);
    setIsLoading(false);
  }, []);
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      // 실제 구현에서는 API 호출로 대체
      // const response = await api.post('/auth/login', { email, password });

      // 임시 로그인 구현
      const mockUser: User = {
        id: "1",
        name: "김투자",
        email: email,
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // 로그아웃 시에도 기본 사용자로 설정하여 항상 로그인된 상태 유지
    setUser(defaultUser);
    localStorage.setItem("user", JSON.stringify(defaultUser));
  };

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      setIsLoading(true);
      // 실제 구현에서는 API 호출로 대체
      // const response = await api.post('/auth/signup', { name, email, password });

      // 임시 회원가입 구현
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isAuthenticated: true, // 항상 인증된 상태로 설정
    isLoading,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
