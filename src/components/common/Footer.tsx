import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.light};
  margin-top: ${({ theme }) => `${theme.spacing.xl}`};
  padding: ${({ theme }) =>
    `${theme.spacing.lg} ${theme.spacing.lg} ${theme.spacing.md}`};
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  margin: 0 auto;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Column = styled.div`
  flex: 1;
  max-width: 200px;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: ${({ theme }) => theme.spacing.sm};
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: white;
`;

const FooterLink = styled(Link)`
  display: block;
  color: ${({ theme }) => theme.colors.light}dd;
  text-decoration: none;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  transition: all 0.2s ease-in-out;

  &:hover {
    color: white;
  }
`;

const ExternalLink = styled.a`
  display: block;
  color: ${({ theme }) => theme.colors.light}dd;
  text-decoration: none;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  transition: all 0.2s ease-in-out;

  &:hover {
    color: white;
  }
`;

const Text = styled.p`
  color: ${({ theme }) => theme.colors.light}dd;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: 1.5;
`;

const LogoColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  // margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const LogoText = styled.div`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 1.75rem;
  color: white;
  padding-right: ${({ theme }) => theme.spacing.md};
  margin-right: ${({ theme }) => theme.spacing.md};
  border-right: 1px solid ${({ theme }) => theme.colors.light}66;
`;

const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.light}33;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
    align-items: flex-start;
  }
`;

const Copyright = styled.div`
  color: ${({ theme }) => theme.colors.light}aa;
  font-size: 0.875rem;
  padding-left: ${({ theme }) => theme.spacing.sm};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding-right: ${({ theme }) => theme.spacing.sm};
`;

const SocialLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.light}dd;
  font-size: 0.875rem;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus {
    color: blue;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoColumn>
          <LogoText>WealthWise</LogoText>
          <Text>
            맞춤형 학습 경험과 시뮬레이션 도구로 재정 목표를 달성하세요.
          </Text>
        </LogoColumn>

        <LinksContainer>
          <Column>
            <Title>플랫폼</Title>
            <FooterLink to="/dashboard">대시보드</FooterLink>
            <FooterLink to="/learning">학습 모듈</FooterLink>
            <FooterLink to="/simulations">시뮬레이션</FooterLink>
            <FooterLink to="/community">커뮤니티</FooterLink>
            <FooterLink to="/experts">전문가 연결</FooterLink>
          </Column>

          <Column>
            <Title>리소스</Title>
            <FooterLink to="/blog">블로그</FooterLink>
            <FooterLink to="/faq">자주 묻는 질문</FooterLink>
            <FooterLink to="/glossary">금융 용어 사전</FooterLink>
            <FooterLink to="/guides">가이드</FooterLink>
            <FooterLink to="/calculator">계산기</FooterLink>
          </Column>

          <Column>
            <Title>회사 소개</Title>
            <FooterLink to="/about">회사 소개</FooterLink>
            <FooterLink to="/careers">채용 정보</FooterLink>
            <FooterLink to="/press">언론 보도</FooterLink>
            <FooterLink to="/contact">문의하기</FooterLink>
            <FooterLink to="/partners">파트너십</FooterLink>
          </Column>

          <Column>
            <Title>법적 고지</Title>
            <FooterLink to="/terms">이용약관</FooterLink>
            <FooterLink to="/privacy">개인정보처리방침</FooterLink>
            <FooterLink to="/security">보안 정책</FooterLink>
            <FooterLink to="/disclaimer">법적 고지사항</FooterLink>
          </Column>
        </LinksContainer>
      </FooterContent>

      <BottomBar>
        <Copyright>
          &copy; {new Date().getFullYear()} WealthWise. All rights reserved.
          &#124; Design by WealthWise
        </Copyright>
        <SocialLinks>
          <SocialLink
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            페이스북
          </SocialLink>
          <SocialLink
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            트위터
          </SocialLink>
          <SocialLink
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            인스타그램
          </SocialLink>
          <SocialLink
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            링크드인
          </SocialLink>
          <SocialLink
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            유튜브
          </SocialLink>
        </SocialLinks>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;
