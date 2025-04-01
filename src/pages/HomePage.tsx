import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/common/Layout";
import {
  Hero,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  ButtonGroup,
  StyledButton,
  HeroImageContainer,
  HeroImage,
  Section,
  SectionTitle,
  FeaturesGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  TestimonialsContainer,
  TestimonialCard,
  Quote,
  Author,
  Avatar,
  AuthorInfo,
  AuthorName,
  AuthorTitle,
  CTASection,
  CTATitle,
  CTAText,
} from "../styles/pages/HomePage.styled";

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

  const containerRef = useRef<HTMLDivElement>(null);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // 터치 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

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
        <TestimonialsContainer
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
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
          WealthWise와 함께라면 복잡한 금융 세계도 쉽게 이해할 수 있습니다.
          <br />
          지금 무료로 가입하고 맞춤형 금융 교육과 도구를 활용해 더 나은 재정적
          미래를 설계하세요.
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
