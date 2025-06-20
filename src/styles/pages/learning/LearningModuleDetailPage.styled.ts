import styled from 'styled-components';
import { ModuleCategory } from './LearningModulesPage.styled';

export const PageHeader = styled.div`
  font-size: 0.85rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  a {
    text-decoration: none;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text}aa;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: underline;
    }
  }
`;

export const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const PageSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.text}dd;
  font-size: 1.125rem;
`;

export const ModuleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const ModuleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const ModuleInfo = styled.div`
  flex: 1;
`;

export const ModuleActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ModuleBadges = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

export const DetailModuleCategory = styled(ModuleCategory)`
  background-color: ${({ category, theme }) => {
    switch (category) {
      case "BASIC_FINANCE":
        return `${theme.colors.primary}22`;
      case "BUDGETING":
        return `${theme.colors.success}22`;
      case "SAVING":
        return `${theme.colors.info}22`;
      case "INVESTING":
        return `#3148f522`;
      case "RETIREMENT":
        return `${theme.colors.warning}22`;
      case "TAX_PLANNING":
        return `#9c66cb22`;
      case "DEBT_MANAGEMENT":
        return `${theme.colors.danger}22`;
      case "REAL_ESTATE":
        return `#ff7b0022`;
      case "ADVANCED_INVESTING":
        return `#ff480022`;
      case "INSURANCE":
        return `#E64A1922`;
      default:
        return `${theme.colors.text}22`;
    }
  }};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

export const DurationBadge = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;
  margin-right: ${({ theme }) => theme.spacing.sm};
  background-color: #FF6D0022;
  color: #FF6D00;
`;

export const ModuleProgress = styled.div`
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const ProgressFill = styled.div<{ width: number; color: string }>`
  width: ${({ width }) => `${width}%`};
  height: 100%;
  background-color: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

export const TabContainer = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing.md};
`;

export const TabButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TabButton = styled.button<{ isActive: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background-color: transparent;
  border: none;
  border-bottom: 3px solid ${({ isActive, theme }) => isActive ? theme.colors.primary : 'transparent'};
  color: ${({ isActive, theme }) => isActive ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ isActive }) => isActive ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const LessonsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const LessonItem = styled.div<{ isActive: boolean; isCompleted: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ isActive, theme }) => isActive ? theme.colors.primary + '11' : 'white'};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: ${({ theme, isActive }) => isActive ? theme.colors.primary + '22' : theme.colors.light};
  }
`;

export const LessonNumber = styled.div<{ isCompleted: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ isCompleted, theme }) => isCompleted ? theme.colors.success : theme.colors.primary}22;
  color: ${({ isCompleted, theme }) => isCompleted ? theme.colors.success : theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: ${({ theme }) => theme.spacing.md};
`;

export const LessonInfo = styled.div`
  flex: 1;
`;

export const LessonTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
`;

export const LessonStatus = styled.span<{ isCompleted: boolean }>`
  font-size: 0.875rem;
  color: ${({ isCompleted, theme }) => isCompleted ? theme.colors.success : theme.colors.text + 'aa'};
`;

export const ContentContainer = styled.div`
  line-height: 1.6;
  
  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    margin-top: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  img {
    max-width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    margin: ${({ theme }) => theme.spacing.md} 0;
  }
  
  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding-left: ${({ theme }) => theme.spacing.lg};
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;