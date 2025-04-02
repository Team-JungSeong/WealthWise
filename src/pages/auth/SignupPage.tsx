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

// 임시 이미지 URL (나중에 실제 이미지로 대체)
const financialImage = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!name || !email || !password || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }
    
    try {
      setIsLoading(true);
      console.log('회원가입 함수 호출:', { email, password, name });
      const result = await signup(email, password, name);
      if (result) {
        navigate('/');
      } else {
        setError('회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      console.error(err);
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    console.log(`${provider} 회원가입 시도`);
    // 소셜 회원가입 구현
  };

  return (
    <AuthContainer>
      <FormSide>
        <Logo as={Link} to="/">WealthWise</Logo>
        <AuthForm onSubmit={handleSubmit}>
          <FormTitle>회원가입</FormTitle>
          
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
              placeholder="비밀번호를 입력하세요 (6자 이상)"
              isFullWidth
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Input
              type="password"
              label="비밀번호 확인"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 입력하세요"
              isFullWidth
              required
            />
          </InputGroup>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <FormActions>
            <Button
              type="submit"
              variant="primary"
              isFullWidth
              isLoading={isLoading}
            >
              회원가입
            </Button>
          </FormActions>
          
          <Divider>
            <span>또는</span>
          </Divider>
          
          <SocialButtons>
            <Button 
              variant="secondary" 
              onClick={() => handleSocialSignup('google')}
              isFullWidth
            >
              Google로 회원가입
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => handleSocialSignup('facebook')}
              isFullWidth
            >
              Facebook으로 회원가입
            </Button>
          </SocialButtons>
          
          <FormFooter>
            <p>
              이미 계정이 있으신가요? <FormLink as={Link} to="/login">로그인</FormLink>
            </p>
          </FormFooter>
        </AuthForm>
      </FormSide>
      
      <ImageSide>
        <AuthImage src={financialImage} alt="Financial planning illustration" />
      </ImageSide>
    </AuthContainer>
  );
};

export default SignupPage; 