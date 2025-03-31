import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

const Main = styled.main`
  padding-top: 60px; // 헤더의 높이만큼 패딩 추가
  min-height: calc(100vh - 60px); // 화면 전체 높이에서 헤더 높이 빼기
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  flex: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: ${({ theme }) =>
    `${theme.spacing.lg} ${theme.spacing.md} ${theme.spacing.xl}`};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.sm}`};
  }
`;

const Layout: React.FC<LayoutProps> = ({ children, hideFooter = false }) => {
  return (
    <>
      <Header />
      <Main>
        <ContentContainer>{children}</ContentContainer>
        {!hideFooter && <Footer />}
      </Main>
    </>
  );
};

export default Layout;
