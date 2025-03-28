import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Layout from "../components/common/Layout";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const Hero = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.xl} 0`};
  margin-bottom: ${({ theme }) => `${theme.spacing.xl}`};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    text-align: center;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

const HeroContent = styled.div`
  flex: 1;
  max-width: 630px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 100%;
    order: 2;
  }
`;

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.dark};
  line-height: 1.2;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text}dd;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.125rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const StyledButton = styled(Button)`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  font-weight: 500;
`;

const HeroImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: 1;
    justify-content: center;
    width: 100%;
  }
`;

const HeroImage = styled.img`
  width: 610px;
  height: 580px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: opacity 1s ease-in-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 80%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

const Section = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xl} 0`};
`;

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.dark};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.75rem;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.primary};
`;

const FeatureTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.dark};
`;

const FeatureDescription = styled.p`
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`;

const TestimonialsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  padding: ${({ theme }) => theme.spacing.md} 0;
  margin: 0 -${({ theme }) => theme.spacing.md};
  padding: 0 ${({ theme }) => theme.spacing.md}
    ${({ theme }) => theme.spacing.md};

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.light};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary}88;
  }
`;

const TestimonialCard = styled(Card)`
  min-width: 300px;
  max-width: 400px;
  flex: 0 0 auto;
`;

const Quote = styled.blockquote`
  font-style: italic;
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  line-height: 1.6;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-right: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.p`
  font-weight: 600;
  margin: 0;
`;

const AuthorTitle = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text}aa;
  margin: 0;
`;

const CTASection = styled.section`
  background-color: ${({ theme }) => theme.colors.primary}11;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin: ${({ theme }) => `${theme.spacing.xl} 0`};
  text-align: center;
`;

const CTATitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.dark};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.75rem;
  }
`;

const CTAText = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;

const HomePage: React.FC = () => {
  const heroImages = [
    "https://images.unsplash.com/photo-1554768804-50c1e2b50a6e?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1621264448270-9ef00e88a935?q=80&w=2757&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1726065235203-4368c41c6f19?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=2606&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <Layout>
      <Hero>
        <HeroContent>
          <HeroTitle>당신만의 금융 전문가, WealthWise</HeroTitle>
          <HeroSubtitle>
            WealthWise는 복잡한 금융 세계를 쉽게 이해할 수 있도록 도와드립니다.
            <br />
            개인 맞춤형 교육과 실용적인 도구로 재무 목표를 달성하고 안정적인
            경제 미래를 준비하세요.
          </HeroSubtitle>
          <ButtonGroup>
            <Link to="/profile">
              <StyledButton variant="primary" size="lg">
                무료로 시작하기
              </StyledButton>
            </Link>
          </ButtonGroup>
        </HeroContent>
        <HeroImageContainer>
          {heroImages.map((src, index) => (
            <HeroImage
              key={index}
              src={src}
              alt={`금융 교육 플랫폼 이미지 ${index + 1}`}
              style={{
                opacity: index === currentImageIndex ? 1 : 0,
                position: index === currentImageIndex ? "relative" : "absolute",
              }}
            />
          ))}
        </HeroImageContainer>
      </Hero>

      <Section>
        <SectionTitle>맞춤형 금융 교육 플랫폼</SectionTitle>
        <FeaturesGrid>
          <FeatureCard variant="elevated">
            <FeatureIcon>📊</FeatureIcon>
            <FeatureTitle>개인화된 금융 프로필</FeatureTitle>
            <FeatureDescription>
              당신의 재정 상황과 목표를 분석하여 맞춤형 학습 경로와 추천 사항을
              제공합니다.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard variant="elevated">
            <FeatureIcon>🎓</FeatureIcon>
            <FeatureTitle>인터랙티브 학습 모듈</FeatureTitle>
            <FeatureDescription>
              기초부터 고급까지, 단계별 학습 과정과 실전 시뮬레이션으로 금융
              지식을 체득하세요.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard variant="elevated">
            <FeatureIcon>🧮</FeatureIcon>
            <FeatureTitle>금융 시뮬레이션 도구</FeatureTitle>
            <FeatureDescription>
              예산 계획, 투자, 대출, 은퇴 준비까지 다양한 시뮬레이션으로 최적의
              재정 결정을 내리세요.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard variant="elevated">
            <FeatureIcon>📈</FeatureIcon>
            <FeatureTitle>데이터 시각화 대시보드</FeatureTitle>
            <FeatureDescription>
              재무 상태와 목표 달성 과정을 직관적인 차트와 그래프로 한눈에
              파악하세요.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard variant="elevated">
            <FeatureIcon>👥</FeatureIcon>
            <FeatureTitle>커뮤니티 지원</FeatureTitle>
            <FeatureDescription>
              비슷한 목표를 가진 사용자들과 경험을 공유하고, 금융 전문가의
              조언을 받으세요.
            </FeatureDescription>
          </FeatureCard>
          <FeatureCard variant="elevated">
            <FeatureIcon>🎮</FeatureIcon>
            <FeatureTitle>게이미피케이션 요소</FeatureTitle>
            <FeatureDescription>
              배지, 레벨, 챌린지 등의 게임 요소로 학습 과정이 더욱 재미있고 지속
              가능해집니다.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </Section>

      <Section>
        <SectionTitle>사용자 후기</SectionTitle>
        <TestimonialsContainer>
          <TestimonialCard variant="outlined">
            <Quote>
              "WealthWise를 통해 금융에 대한 두려움이 사라졌어요. 개인화된 학습
              경로와 시뮬레이션 도구 덕분에 자신감을 갖고 투자를 시작할 수
              있었습니다."
            </Quote>
            <Author>
              <Avatar>김</Avatar>
              <AuthorInfo>
                <AuthorName>김지영</AuthorName>
                <AuthorTitle>마케팅 매니저, 30세</AuthorTitle>
              </AuthorInfo>
            </Author>
          </TestimonialCard>
          <TestimonialCard variant="outlined">
            <Quote>
              "복잡한 재무 계획이 이렇게 쉬워질 수 있다니 놀라웠어요. 은퇴
              시뮬레이션을 통해 매월 얼마를 저축해야 하는지 정확히 알게 되었고,
              이제 목표가 명확해졌습니다."
            </Quote>
            <Author>
              <Avatar>이</Avatar>
              <AuthorInfo>
                <AuthorName>이상우</AuthorName>
                <AuthorTitle>소프트웨어 엔지니어, 35세</AuthorTitle>
              </AuthorInfo>
            </Author>
          </TestimonialCard>
          <TestimonialCard variant="outlined">
            <Quote>
              "대학생인 저에게 WealthWise는 금융 교육의 혁명이었어요. 학자금
              대출 관리와 첫 직장에서의 재정 준비에 대한 실질적인 조언이 매우
              유용했습니다."
            </Quote>
            <Author>
              <Avatar>박</Avatar>
              <AuthorInfo>
                <AuthorName>박민준</AuthorName>
                <AuthorTitle>대학생, 23세</AuthorTitle>
              </AuthorInfo>
            </Author>
          </TestimonialCard>
          <TestimonialCard variant="outlined">
            <Quote>
              "은퇴를 앞두고 불안했는데, WealthWise의 은퇴 계획 도구가 큰 도움이
              되었어요. 이제 제 자산이 얼마나 오래 지속될지 정확히 알고 있어
              마음이 편합니다."
            </Quote>
            <Author>
              <Avatar>최</Avatar>
              <AuthorInfo>
                <AuthorName>최영희</AuthorName>
                <AuthorTitle>교사, 58세</AuthorTitle>
              </AuthorInfo>
            </Author>
          </TestimonialCard>
        </TestimonialsContainer>
      </Section>

      <CTASection>
        <CTATitle>지금 바로 재정 건강을 개선하세요</CTATitle>
        <CTAText>
          WealthWise와 함께라면 복잡한 금융 세계도 쉽게 이해할 수 있습니다. 지금
          무료로 가입하고 맞춤형 금융 교육과 도구를 활용해 더 나은 재정적 미래를
          설계하세요.
        </CTAText>
        <Link to="/profile">
          <StyledButton variant="primary" size="lg">
            무료 계정 만들기
          </StyledButton>
        </Link>
      </CTASection>
    </Layout>
  );
};

export default HomePage;
