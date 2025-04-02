import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AuthContainer,
  FormSide,
  Logo,
  AuthForm,
  FormTitle,
  InputGroup,
  FormActions,
  FormFooter,
  FormLink,
  Divider,
  SocialButtons,
  ImageSide,
  AuthImage,
  ErrorMessage
} from '../../styles/pages/auth/LoginPage.styled';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';
// import financialImage from '../../assets/images/financial-illustration.jpg';

// 임시 이미지 URL (나중에 실제 이미지로 대체)
const financialImage = 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    
    try {
      setIsLoading(true);
      const result = await login(email, password);
      if (result) {
        navigate('/'); // 메인 페이지로 이동
      } else {
        setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      }
    } catch (err) {
      console.error(err);
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} 로그인 시도`);
    // 소셜 로그인 구현
  };

  return (
    <AuthContainer>
      <FormSide>
        <Logo as={Link} to="/">WealthWise</Logo>
        <AuthForm onSubmit={handleSubmit}>
          <FormTitle>로그인</FormTitle>
          
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
          
          <InputGroup>
            <Input
              type="password"
              label="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              isFullWidth
              required
            />
          </InputGroup>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
            <FormLink as={Link} to="/forgot-password">아이디/비밀번호 찾기</FormLink>
          </div>
          
          <FormActions>
            <Button
              type="submit"
              variant="primary"
              isFullWidth
              isLoading={isLoading}
            >
              로그인
            </Button>
          </FormActions>
          
          <Divider>
            <span>또는</span>
          </Divider>
          
          <SocialButtons>
            <Button 
              variant="secondary" 
              onClick={() => handleSocialLogin('google')}
              isFullWidth
            >
              Google로 로그인
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => handleSocialLogin('facebook')}
              isFullWidth
            >
              Facebook으로 로그인
            </Button>
          </SocialButtons>
          
          <FormFooter>
            <p>
              계정이 없으신가요? <FormLink as={Link} to="/signup">회원가입</FormLink>
            </p>
          </FormFooter>
        </AuthForm>
      </FormSide>
      
      <ImageSide>
        <AuthImage src={financialImage} alt="Financial management illustration" />
      </ImageSide>
    </AuthContainer>
  );
};

export default LoginPage; 