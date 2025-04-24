import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AuthContainer,
  FormSide,
  Logo,
  AuthForm,
  InputGroup,
  FormActions,
  FormFooter,
  FormLink,
  TabContainer,
  Tab,
  SuccessMessage,
  ErrorMessage,
  ImageSide,
  AuthImage
} from '../../styles/pages/auth/ForgotPasswordPage.styled';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/config';

type ActiveTab = 'findId' | 'resetPassword';

// 임시 이미지 URL (나중에 실제 이미지로 대체)
const financialImage = 'https://images.unsplash.com/photo-1606189934846-a527add8a77b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

const ForgotPasswordPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('findId');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmitFindId = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!name) {
      setError('이름을 입력해주세요.');
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Firestore에서 사용자 이름으로 검색
      const usersRef = collection(firestore, 'users');
      const q = query(
        usersRef, 
        where('name', '==', name)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        setError('입력하신 정보와 일치하는 계정을 찾을 수 없습니다.');
        return;
      }
      
      // 일치하는 사용자의 이메일 가져오기
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      const foundEmail = userData.email;
      
      // 이메일 일부 마스킹 처리 (앞부분만 보여주고 나머지는 '*'로 대체)
      const maskedEmail = foundEmail.replace(/^(.{3})(.*)(@.*)$/, '$1***$3');
      
      setSuccess(`입력하신 정보와 일치하는 이메일이 ${maskedEmail} 입니다.`);
      
    } catch (err) {
      console.error(err);
      setError('계정 찾기 과정에서 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }
    
    try {
      setIsLoading(true);
      const result = await resetPassword(email);
      
      if (result) {
        setSuccess('비밀번호 재설정 링크가 이메일로 전송되었습니다. 이메일을 확인해주세요.');
      } else {
        setError('비밀번호 재설정 이메일 발송에 실패했습니다. 입력한 이메일을 확인해주세요.');
      }
    } catch (err) {
      console.error(err);
      setError('비밀번호 재설정 이메일 발송에 실패했습니다. 입력한 이메일을 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tab: ActiveTab) => {
    setActiveTab(tab);
    setError('');
    setSuccess('');
  };

  return (
    <AuthContainer>
      <FormSide>
        <Logo as={Link} to="/">WealthWise</Logo>
        
        <TabContainer>
          <Tab 
            $isActive={activeTab === 'findId'} 
            onClick={() => handleTabChange('findId')}
            type="button"
          >
            아이디 찾기
          </Tab>
          <Tab 
            $isActive={activeTab === 'resetPassword'} 
            onClick={() => handleTabChange('resetPassword')}
            type="button"
          >
            비밀번호 찾기
          </Tab>
        </TabContainer>
        
        {activeTab === 'findId' ? (
          <AuthForm onSubmit={handleSubmitFindId}>
            {success && <SuccessMessage>{success}</SuccessMessage>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <InputGroup>
              <Input
                type="text"
                label="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름을 입력하세요"
                isFullWidth
                required
              />
            </InputGroup>
            
            <InputGroup>
              <Input
                type="tel"
                label="전화번호"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="전화번호를 입력하세요 (예: 010-1234-5678)"
                isFullWidth
                required
              />
            </InputGroup>
            
            <FormActions>
              <Button
                type="submit"
                variant="primary"
                isFullWidth
                isLoading={isLoading}
              >
                아이디 찾기
              </Button>
            </FormActions>
          </AuthForm>
        ) : (
          <AuthForm onSubmit={handleSubmitResetPassword}>
            {success && <SuccessMessage>{success}</SuccessMessage>}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <InputGroup>
              <Input
                type="email"
                label="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
                isFullWidth
                required
              />
            </InputGroup>
            
            <FormActions>
              <Button
                type="submit"
                variant="primary"
                isFullWidth
                isLoading={isLoading}
              >
                비밀번호 재설정 링크 받기
              </Button>
            </FormActions>
          </AuthForm>
        )}
        
        <FormFooter>
          <p>
            <FormLink as={Link} to="/login">로그인</FormLink> 또는 <FormLink as={Link} to="/signup">회원가입</FormLink>
          </p>
        </FormFooter>
      </FormSide>
      
      <ImageSide>
        <AuthImage src={financialImage} alt="Financial security illustration" />
      </ImageSide>
    </AuthContainer>
  );
};

export default ForgotPasswordPage; 