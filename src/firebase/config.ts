import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase 구성 정보
// 실제 프로젝트에서는 환경 변수로 관리하는 것이 더 안전합니다.
const firebaseConfig = {
  apiKey: "AIzaSyDifrzjP4UbwrjMwvDdxeJEZ55oyn2VXl8",
  authDomain: "wealthwise-14208.firebaseapp.com",
  projectId: "wealthwise-14208",
  storageBucket: "wealthwise-14208.appspot.com",
  messagingSenderId: "957493961648",
  appId: "1:957493961648:web:cdabfc71a3c511ed47ac75",
  measurementId: "G-59DPV3PXWK"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firebase 서비스 내보내기
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export default app; 