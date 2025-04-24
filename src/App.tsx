import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import "./App.css";
import theme from "./styles/theme";
import { AuthProvider } from "./context/AuthContext";

// 페이지 (나중에 구현)
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/profile/ProfilePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import LearningModulesPage from "./pages/learning/LearningModulesPage";
import ExpertsPage from "./pages/experts/ExpertsPage";
import LearningModuleDetailPage from "./pages/learning/LearningModuleDetailPage";
import SimulationsPage from "./pages/simulations/SimulationsPage";
import BudgetSimulationPage from "./pages/simulations/BudgetSimulationPage";
import InvestmentSimulationPage from "./pages/simulations/InvestmentSimulationPage";
import RetirementSimulationPage from "./pages/simulations/RetirementSimulationPage";
import CommunityPage from "./pages/community/CommunityPage";
import ForumPostDetailPage from "./pages/community/ForumPostDetailPage";
import LoanSimulationPage from "./pages/simulations/LoanSimulationPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

const AppContainer = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  min-height: 100vh;
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppContainer>
          <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/learning" element={<LearningModulesPage />} />
              <Route
                path="/learning/:moduleId"
                element={<LearningModuleDetailPage />}
              />
              <Route path="/simulations" element={<SimulationsPage />} />
              <Route
                path="/simulations/budget"
                element={<BudgetSimulationPage />}
              />
              <Route
                path="/simulations/investment"
                element={<InvestmentSimulationPage />}
              />
              <Route
                path="/simulations/retirement"
                element={<RetirementSimulationPage />}
              />
              <Route path="/simulations/loan" element={<LoanSimulationPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route
                path="/community/post/:postId"
                element={<ForumPostDetailPage />}
              />
              <Route path="/experts" element={<ExpertsPage />} />
            </Routes>
          </Router>
        </AppContainer>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
