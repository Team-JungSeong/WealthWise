import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase 구성 정보
// 실제 프로젝트에서는 환경 변수로 관리하는 것이 더 안전합니다.
const firebaseConfig = {
  apiKey: "AIzaSyBjGukVD8YPNh0tEq4Ud0mXzsvXkQhpq4s",
  authDomain: "wealthwise-71d31.firebaseapp.com",
  projectId: "wealthwise-71d31",
  storageBucket: "wealthwise-71d31.firebasestorage.app",
  messagingSenderId: "126422253161",
  appId: "1:126422253161:web:e01ecea95a0fe5bd612cf8",
  measurementId: "G-FKHLYLLP53"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase 서비스 내보내기
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export default app; 