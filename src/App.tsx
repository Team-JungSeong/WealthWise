import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import './App.css';

// 페이지 (나중에 구현)
import HomePage from './pages/HomePage';
// 아직 구현되지 않은 페이지들은 일단 주석 처리
// import ProfilePage from './pages/ProfilePage';
// import DashboardPage from './pages/DashboardPage';
// import LearningModulesPage from './pages/LearningModulesPage';
// import LearningModuleDetailPage from './pages/LearningModuleDetailPage';
// import SimulationsPage from './pages/SimulationsPage';
// import BudgetSimulationPage from './pages/BudgetSimulationPage';
// import InvestmentSimulationPage from './pages/InvestmentSimulationPage';
// import RetirementSimulationPage from './pages/RetirementSimulationPage';
// import LoanSimulationPage from './pages/LoanSimulationPage';
// import CommunityPage from './pages/CommunityPage';
// import ForumPostDetailPage from './pages/ForumPostDetailPage';
// import ExpertsPage from './pages/ExpertsPage';

// 테마
const theme = {
  colors: {
    primary: '#3366FF',
    secondary: '#6C63FF',
    success: '#00C853',
    warning: '#FFD600',
    danger: '#F44336',
    info: '#2196F3',
    light: '#F5F5F5',
    dark: '#333333',
    background: '#FFFFFF',
    text: '#333333',
    border: '#E0E0E0',
  },
  fonts: {
    primary: "'Roboto', sans-serif",
    heading: "'Poppins', sans-serif",
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    circle: '50%',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    lg: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    xl: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  },
};

const AppContainer = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* 아직 구현되지 않은 라우트는 주석 처리 */}
            {/* <Route path="/profile" element={<ProfilePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/learning" element={<LearningModulesPage />} />
            <Route path="/learning/:moduleId" element={<LearningModuleDetailPage />} />
            <Route path="/simulations" element={<SimulationsPage />} />
            <Route path="/simulations/budget" element={<BudgetSimulationPage />} />
            <Route path="/simulations/investment" element={<InvestmentSimulationPage />} />
            <Route path="/simulations/retirement" element={<RetirementSimulationPage />} />
            <Route path="/simulations/loan" element={<LoanSimulationPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/community/post/:postId" element={<ForumPostDetailPage />} />
            <Route path="/experts" element={<ExpertsPage />} /> */}
          </Routes>
        </Router>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
