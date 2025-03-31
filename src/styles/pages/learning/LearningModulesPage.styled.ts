import styled from 'styled-components';
import Card from '../../../components/common/Card';

export const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
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

export const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const FilterLabel = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dark};
  font-size: 0.875rem;
`;

export const FilterSelect = styled.select`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background-color: white;
  min-width: 200px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

export const SearchContainer = styled.div`
  flex: 1;
  min-width: 300px;
`;

export const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const ModuleCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const ModuleCardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ModuleCategory = styled.div<{ category: string }>`
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ category, theme }) => {
    switch (category) {
      case "BASIC_FINANCE":
        return theme.colors.primary;
      case "BUDGETING":
        return theme.colors.success;
      case "SAVING":
        return theme.colors.info;
      case "INVESTING":
        return theme.colors.warning;
      case "RETIREMENT":
        return "#8E24AA"; // 퍼플
      case "TAX_PLANNING":
        return "#FF6D00"; // 오렌지
      case "DEBT_MANAGEMENT":
        return theme.colors.danger;
      default:
        return theme.colors.text;
    }
  }};
`;

export const ModuleTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: ${({ theme }) => `${theme.spacing.xs} 0 ${theme.spacing.sm}`};
  line-height: 1.3;
`;

export const ModuleDescription = styled.p`
  color: ${({ theme }) => theme.colors.text}dd;
  font-size: 0.875rem;
  line-height: 1.5;
  flex: 1;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ModuleMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const ModuleMetaItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text}aa;
`;

export const DifficultyBadge = styled.span<{ level: string }>`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;
  margin-right: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ level, theme }) => {
    switch (level) {
      case "BEGINNER":
        return `${theme.colors.success}22`;
      case "INTERMEDIATE":
        return `${theme.colors.warning}22`;
      case "ADVANCED":
        return `${theme.colors.danger}22`;
      case "EXPERT":
        return `${theme.colors.dark}22`;
      default:
        return `${theme.colors.light}`;
    }
  }};
  color: ${({ level, theme }) => {
    switch (level) {
      case "BEGINNER":
        return theme.colors.success;
      case "INTERMEDIATE":
        return theme.colors.warning;
      case "ADVANCED":
        return theme.colors.danger;
      case "EXPERT":
        return theme.colors.dark;
      default:
        return theme.colors.text;
    }
  }};
`;

export const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case "COMPLETED":
        return `${theme.colors.success}22`;
      case "IN_PROGRESS":
        return `${theme.colors.warning}22`;
      case "NOT_STARTED":
        return `${theme.colors.light}`;
      default:
        return `${theme.colors.light}`;
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case "COMPLETED":
        return theme.colors.success;
      case "IN_PROGRESS":
        return theme.colors.warning;
      case "NOT_STARTED":
        return theme.colors.text;
      default:
        return theme.colors.text;
    }
  }};
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ width: number; status: string }>`
  width: ${({ width }) => `${width}%`};
  height: 100%;
  background-color: ${({ status, theme }) => {
    switch (status) {
      case "COMPLETED":
        return theme.colors.success;
      case "IN_PROGRESS":
        return theme.colors.warning;
      case "NOT_STARTED":
        return theme.colors.text;
      default:
        return theme.colors.primary;
    }
  }};
`;

export const NoResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

export const NoResultsIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text}55;
`;

export const NoResultsText = styled.p`
  color: ${({ theme }) => theme.colors.text}aa;
  font-size: 1.125rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;