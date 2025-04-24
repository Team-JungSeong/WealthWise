import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

type ActiveTab = 'findId' | 'resetPassword';

// 임시 이미지 URL (나중에 실제 이미지로 대체)
const financialImage = 'https://images.unsplash.com/photo-1606189934846-a527add8a77b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

const ForgotPasswordPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('findId');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
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
        
        <AuthForm onSubmit={handleSubmit}>
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