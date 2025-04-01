import styled from 'styled-components';
import Card from '../../../components/common/Card';

export interface ChartData {
  categories: string[];
  values: number[];
  colors: string[];
}

export const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.dark};
`;

export const PageSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.text}dd;
  font-size: 1.125rem;
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const FinancialOverviewCard = styled(Card)`
  grid-column: span 8;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: span 6;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: span 1;
  }
`;

export const GoalsCard = styled(Card)`
  grid-column: span 4;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: span 6;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: span 1;
  }
`;

export const AssetsDebtsCard = styled(Card)`
  grid-column: span 6;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: span 1;
  }
`;

export const SpendingCard = styled(Card)`
  grid-column: span 6;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: span 1;
  }
`;

// export const LearningProgressCard = styled(Card)`
//   grid-column: span 6;

//   @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
//     grid-column: span 1;
//   }
// `;

// export const SimulationResultsCard = styled(Card)`
//   grid-column: span 6;

//   @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
//     grid-column: span 1;
//   }
// `;

export const ChartContainer = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;


// 차트를 간단히 시뮬레이션하는 컴포넌트 (실제 구현에서는 D3.js 등으로 대체)
export const PieChartSimulation = styled.div.attrs<{ data: ChartData }>(({ data }) => ({
  style: {
    background: `conic-gradient(${data.categories
      .map(
        (_, i) =>
          `${data.colors[i]} ${
            i > 0
              ? (data.values.slice(0, i).reduce((a, b) => a + b, 0) /
                  data.values.reduce((a, b) => a + b, 0)) *
                100
              : 0
          }% ${
            (data.values.slice(0, i + 1).reduce((a, b) => a + b, 0) /
              data.values.reduce((a, b) => a + b, 0)) *
            100
          }%`
      )
      .join(", ")})`,
  },
}))<{ data: ChartData }>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export const BarChartSimulation = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 90%;
  height: 100%;
  padding-bottom: 10%;
`;

export const BarColumn = styled.div<{ height: number; color: string }>`
  width: 40px;
  height: ${({ height }) => `${height}%`};
  background-color: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  position: relative;
  transition: height 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  &::after {
    content: attr(data-value);
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const Legend = styled.div`
  margin: 0 auto;
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  justify-content: center;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

export const LegendColor = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  background-color: ${({ color }) => color};
  border-radius: 4px;
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

export const LegendLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const ProgressContainer = styled.div`
  margin: ${({ theme }) => `${theme.spacing.md} 0`};
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const ProgressTitle = styled.h4`
  margin: 0;
  font-weight: 500;
  font-size: 1rem;
`;

export const ProgressValue = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ width: number; color: string }>`
  width: ${({ width }) => `${width}%`};
  height: 100%;
  background-color: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

export const GoalsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const GoalItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.sm} 0`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

export const GoalIcon = styled.div<{ bgColor: string }>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: ${({ bgColor }) => bgColor}22;
  color: ${({ bgColor }) => bgColor};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

export const GoalInfo = styled.div`
  flex: 1;
`;

export const GoalName = styled.h4`
  margin: 0;
  font-weight: 500;
  font-size: 1rem;
`;

export const GoalTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
`;

export const Amount = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const GoalProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
`;

export const GoalProgressFill = styled.div<{ width: number; color: string }>`
  width: ${({ width }) => `${width}%`};
  height: 100%;
  background-color: ${({ color }) => color};
`;

export const CurrentAmount = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text}aa;
`;

export const TargetAmount = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text}aa;
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.dark};
`;

// export const LearningModulesList = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: ${({ theme }) => theme.spacing.sm};
// `;

// export const LearningModuleItem = styled.div`
//   display: flex;
//   align-items: center;
//   padding: ${({ theme }) => `${theme.spacing.sm} 0`};
//   // border-bottom: 1px solid ${({ theme }) => theme.colors.border};
//   transition: all 0.3s ease;

//     &:last-child {
//       border-bottom: none;
//     }
      
//     &:hover {
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//     transform: translateY(-5px);
//   }
// `;

// export const ModuleIcon = styled.div<{ level: string }>`
//   width: 40px;
//   height: 40px;
//   border-radius: ${({ theme }) => theme.borderRadius.circle};
//   background-color: ${({ level, theme }) =>
//     level === "beginner"
//       ? theme.colors.success
//       : level === "intermediate"
//       ? theme.colors.warning
//       : theme.colors.danger}22;
//   color: ${({ level, theme }) =>
//     level === "beginner"
//       ? theme.colors.success
//       : level === "intermediate"
//       ? theme.colors.warning
//       : theme.colors.danger};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 1.25rem;
//   margin-right: ${({ theme }) => theme.spacing.sm};
//   transition: transform 0.3s ease;
  
//   &:hover {
//     transform: scale(1.1);
//   }
// `;

// export const ModuleInfo = styled.div`
//   flex: 1;
// `;

// export const ModuleName = styled.h4`
//   margin: 0;
//   font-weight: 500;
//   font-size: 1rem;
// `;

// export const ModuleProgress = styled.div`
//   display: flex;
//   align-items: center;
//   gap: ${({ theme }) => theme.spacing.xs};
// `;

// export const ModuleProgressBar = styled.div`
//   flex: 1;
//   height: 4px;
//   background-color: ${({ theme }) => theme.colors.light};
//   border-radius: ${({ theme }) => theme.borderRadius.sm};
//   overflow: hidden;
// `;

// export const ModuleProgressFill = styled.div<{ width: number; color: string }>`
//   width: ${({ width }) => `${width}%`};
//   height: 100%;
//   background-color: ${({ color }) => color};
// `;

// export const ModuleStatus = styled.span<{ status: string }>`
//   font-size: 0.75rem;
//   color: ${({ status, theme }) =>
//     status === "completed"
//       ? theme.colors.success
//       : status === "in-progress"
//       ? theme.colors.warning
//       : theme.colors.text}aa;
// `;

// export const SimulationResultsList = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: ${({ theme }) => theme.spacing.md};

//   @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
//     grid-template-columns: 1fr;
//   }
// `;

// export const SimulationResultItem = styled.div`
//   border: 1px solid ${({ theme }) => theme.colors.border};
//   border-radius: ${({ theme }) => theme.borderRadius.md};
//   padding: ${({ theme }) => theme.spacing.md};
//   text-align: center;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   transition: all 0.2s ease;

//   &:hover {
//     border-color: ${({ theme }) => theme.colors.primary};
//     box-shadow: ${({ theme }) => theme.shadows.md};
//   }
// `;

// export const SimulationIcon = styled.div<{ type: string }>`
//   width: 50px;
//   height: 50px;
//   border-radius: ${({ theme }) => theme.borderRadius.circle};
//   background-color: ${({ type, theme }) =>
//     type === "budget"
//       ? theme.colors.primary
//       : type === "investment"
//       ? theme.colors.success
//       : type === "retirement"
//       ? theme.colors.warning
//       : theme.colors.info}22;
//   color: ${({ type, theme }) =>
//     type === "budget"
//       ? theme.colors.primary
//       : type === "investment"
//       ? theme.colors.success
//       : type === "retirement"
//       ? theme.colors.warning
//       : theme.colors.info};
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 1.5rem;
//   margin-bottom: ${({ theme }) => theme.spacing.sm};
// `;

// export const SimulationName = styled.h4`
//   margin: 0 0 ${({ theme }) => theme.spacing.xs};
//   font-weight: 500;
//   font-size: 1rem;
// `;

// export const SimulationResult = styled.p`
//   margin: 0;
//   font-weight: 700;
//   font-size: 1.25rem;
//   color: ${({ theme }) => theme.colors.dark};
// `;

// export const SimulationDate = styled.span`
//   font-size: 0.75rem;
//   color: ${({ theme }) => theme.colors.text}aa;
//   margin-top: ${({ theme }) => theme.spacing.xs};
// `;