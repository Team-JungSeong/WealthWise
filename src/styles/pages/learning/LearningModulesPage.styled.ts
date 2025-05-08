import styled from 'styled-components';
import Card from '../../../components/common/Card';
import { getInputSize } from '../../../components/common/Input';
import Button from 'src/components/common/Button';

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
  align-items: center;
  justify-content: flex-start;
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

export const FilterSelect = styled.select<{ size?: 'sm' | 'md' | 'lg' }>`
  ${({ size = 'md', theme }) => getInputSize(size, theme)}  
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background-color: white;
  min-width: 200px;

  /* 화살표 위치 조정을 위한 스타일 추가 */
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
      background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%233A7A41' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='18 15 12 9 6 15'%3e%3c/polyline%3e%3c/svg%3e");
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

export const ModuleTopItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
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
      return "#3148f5";
    case "RETIREMENT":
      return theme.colors.warning;
    case "TAX_PLANNING":
      return "#9c66cb";
    case "DEBT_MANAGEMENT":
      return theme.colors.danger;
    case "REAL_ESTATE":
      return "#ff7b00";
    case "ADVANCED_INVESTING":
      return "#ff4800";
    case "INSURANCE":
      return "#E64A19";
      default:
        return theme.colors.text;
    }
  }};
`;
export const ModuleMiddleItem = styled.div`
  height:auto;
`;
export const ModuleTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: ${({ theme }) => `${theme.spacing.xs} 0 ${theme.spacing.sm}`};
  line-height: 1.3;
`;

export const ModuleDescription = styled.p`
  height: 70px;
  color: ${({ theme }) => theme.colors.text}dd;
  font-size: 0.875rem;
  line-height: 1.5;
  flex: 1;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;
export const ModuleBottomItem = styled.div`
  width: 100%;
`;
export const ModuleMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
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
  background-color: ${({ level, theme }) => {
    switch (level) {
      case "BEGINNER":
        return `${theme.colors.info}22`;
      case "INTERMEDIATE":
        return `${theme.colors.success}22`;
      case "ADVANCED":
        return `${theme.colors.warning}22`;
      case "EXPERT":
        return `${theme.colors.danger}22`;
      default:
        return `${theme.colors.light}`;
    }
  }};
  color: ${({ level, theme }) => {
    switch (level) {
      case "BEGINNER":
        return theme.colors.info;
      case "INTERMEDIATE":
        return theme.colors.success;
      case "ADVANCED":
        return theme.colors.warning;
      case "EXPERT":
        return theme.colors.danger;
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
        return `${theme.colors.success}`;
      case "IN_PROGRESS":
        return `${theme.colors.warning}`;
      case "NOT_STARTED":
        return `${theme.colors.light}`;
      default:
        return `${theme.colors.light}`;
    }
  }};
  color: ${({ status, theme }) => {
    switch (status) {
      case "COMPLETED":
        return theme.colors.background;
      case "IN_PROGRESS":
        return theme.colors.background;
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
  background-color:#ededed;
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

export const CustomStatusButton = styled(Button)`
   margin-top: ${({ theme }) => theme.spacing.md};
  &:hover {
    /* 상태별 호버 색상 */
    ${props => props.variant === 'secondary' && `
      background-color: rgb(58, 122, 65);
    `}
    
    ${props => props.variant === 'light' && `
      background-color: rgb(58, 122, 65);
      color: #FFFFFF;
    `}
  }
`;