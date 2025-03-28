import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

// 차트 데이터 타입 (실제로는 D3.js나 다른 차트 라이브러리 사용)
type ChartData = {
  categories: string[];
  values: number[];
  colors: string[];
};

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PageSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.text}dd;
  font-size: 1.125rem;
`;

const DashboardGrid = styled.div`
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

const FinancialOverviewCard = styled(Card)`
  grid-column: span 8;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: span 6;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: span 1;
  }
`;

const GoalsCard = styled(Card)`
  grid-column: span 4;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-column: span 6;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: span 1;
  }
`;

const AssetsDebtsCard = styled(Card)`
  grid-column: span 6;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: span 1;
  }
`;

const SpendingCard = styled(Card)`
  grid-column: span 6;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: span 1;
  }
`;

const LearningProgressCard = styled(Card)`
  grid-column: span 6;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: span 1;
  }
`;

const SimulationResultsCard = styled(Card)`
  grid-column: span 6;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-column: span 1;
  }
`;

const ChartContainer = styled.div`
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

// 차트를 간단히 시뮬레이션하는 컴포넌트 (실제 구현에서는 D3.js 등으로 대체)
interface PieChartProps {
  data: ChartData;
}

const PieChartSimulation = styled.div.attrs<PieChartProps>(({ data }) => ({
  style: {
    background: `conic-gradient(${
      data.categories.map((_, i) => 
        `${data.colors[i]} ${i > 0 
          ? data.values.slice(0, i).reduce((a, b) => a + b, 0) / data.values.reduce((a, b) => a + b, 0) * 100
          : 0}% ${data.values.slice(0, i + 1).reduce((a, b) => a + b, 0) / data.values.reduce((a, b) => a + b, 0) * 100}%`
      ).join(', ')
    })`,
  },
}))<PieChartProps>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const BarChartSimulation = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-bottom: 30px;
`;

const BarColumn = styled.div<{ height: number; color: string }>`
  width: 30px;
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

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.md};
  justify-content: center;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const LegendColor = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  background-color: ${({ color }) => color};
  border-radius: 4px;
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

const LegendLabel = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
`;

const ProgressContainer = styled.div`
  margin: ${({ theme }) => `${theme.spacing.md} 0`};
`;

const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ProgressTitle = styled.h4`
  margin: 0;
  font-weight: 500;
  font-size: 1rem;
`;

const ProgressValue = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
`;

const ProgressFill = styled.div<{ width: number; color: string }>`
  width: ${({ width }) => `${width}%`};
  height: 100%;
  background-color: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const GoalsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const GoalItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.sm} 0`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const GoalIcon = styled.div<{ bgColor: string }>`
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

const GoalInfo = styled.div`
  flex: 1;
`;

const GoalName = styled.h4`
  margin: 0;
  font-weight: 500;
  font-size: 1rem;
`;

const GoalProgress = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const GoalProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
`;

const GoalProgressFill = styled.div<{ width: number; color: string }>`
  width: ${({ width }) => `${width}%`};
  height: 100%;
  background-color: ${({ color }) => color};
`;

const GoalAmount = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text}aa;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.dark};
`;

const LearningModulesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const LearningModuleItem = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.sm} 0`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ModuleIcon = styled.div<{ level: string }>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: ${({ level, theme }) => 
    level === 'beginner' ? theme.colors.success : 
    level === 'intermediate' ? theme.colors.warning : theme.colors.danger}22;
  color: ${({ level, theme }) => 
    level === 'beginner' ? theme.colors.success : 
    level === 'intermediate' ? theme.colors.warning : theme.colors.danger};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const ModuleInfo = styled.div`
  flex: 1;
`;

const ModuleName = styled.h4`
  margin: 0;
  font-weight: 500;
  font-size: 1rem;
`;

const ModuleProgress = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const ModuleProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
`;

const ModuleProgressFill = styled.div<{ width: number; color: string }>`
  width: ${({ width }) => `${width}%`};
  height: 100%;
  background-color: ${({ color }) => color};
`;

const ModuleStatus = styled.span<{ status: string }>`
  font-size: 0.75rem;
  color: ${({ status, theme }) => 
    status === 'completed' ? theme.colors.success : 
    status === 'in-progress' ? theme.colors.warning : theme.colors.text}aa;
`;

const SimulationResultsList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const SimulationResultItem = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const SimulationIcon = styled.div<{ type: string }>`
  width: 50px;
  height: 50px;
  border-radius: ${({ theme }) => theme.borderRadius.circle};
  background-color: ${({ type, theme }) => 
    type === 'budget' ? theme.colors.primary : 
    type === 'investment' ? theme.colors.success : 
    type === 'retirement' ? theme.colors.warning : theme.colors.info}22;
  color: ${({ type, theme }) => 
    type === 'budget' ? theme.colors.primary : 
    type === 'investment' ? theme.colors.success : 
    type === 'retirement' ? theme.colors.warning : theme.colors.info};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const SimulationName = styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  font-weight: 500;
  font-size: 1rem;
`;

const SimulationResult = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.dark};
`;

const SimulationDate = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text}aa;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const DashboardPage: React.FC = () => {
  // 예시 데이터 - 실제로는 API에서 받아올 것
  const [assetsData] = useState<ChartData>({
    categories: ['현금', '주식', '부동산', '퇴직금', '기타'],
    values: [25, 30, 20, 15, 10],
    colors: ['#3366FF', '#00C853', '#FFD600', '#FF6D00', '#8E24AA']
  });
  
  const [expensesData] = useState<ChartData>({
    categories: ['주거비', '식비', '교통비', '생활비', '여가', '의료비'],
    values: [30, 25, 15, 10, 15, 5],
    colors: ['#3366FF', '#00C853', '#FFD600', '#FF6D00', '#8E24AA', '#00BCD4']
  });
  
  // 금융 목표 예시 데이터
  const financialGoals = [
    { id: 1, name: '비상금 마련', progress: 85, target: 10000000, current: 8500000, icon: '💰', color: '#3366FF' },
    { id: 2, name: '주택 구입', progress: 45, target: 300000000, current: 135000000, icon: '🏠', color: '#00C853' },
    { id: 3, name: '은퇴 준비', progress: 30, target: 500000000, current: 150000000, icon: '🏖️', color: '#FFD600' }
  ];
  
  // 학습 모듈 예시 데이터
  const learningModules = [
    { id: 1, name: '금융 기초 이해하기', progress: 100, status: 'completed', level: 'beginner', icon: '📚' },
    { id: 2, name: '예산 관리의 기술', progress: 75, status: 'in-progress', level: 'beginner', icon: '📊' },
    { id: 3, name: '투자 포트폴리오 구성', progress: 20, status: 'in-progress', level: 'intermediate', icon: '📈' }
  ];
  
  // 시뮬레이션 결과 예시 데이터
  const simulationResults = [
    { id: 1, name: '월 예산 계획', result: '350,000원 절약 가능', date: '2023-04-15', type: 'budget', icon: '📊' },
    { id: 2, name: '투자 수익률 예측', result: '연 7.5% 예상', date: '2023-04-10', type: 'investment', icon: '📈' },
    { id: 3, name: '은퇴 자금 시뮬레이션', result: '목표의 68% 달성 예상', date: '2023-04-05', type: 'retirement', icon: '🏖️' },
    { id: 4, name: '대출 상환 계획', result: '5년 단축 가능', date: '2023-04-01', type: 'loan', icon: '💳' }
  ];
  
  // 금융 요약 정보 예시 데이터
  const financialSummary = {
    totalAssets: 250000000,
    totalDebts: 80000000,
    netWorth: 170000000,
    monthlyIncome: 4500000,
    monthlyExpenses: 3200000,
    monthlySavings: 1300000,
    savingsRate: 28.9
  };
  
  // 숫자 포맷팅 함수
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('ko-KR').format(num);
  };
  
  return (
    <Layout>
      <PageHeader>
        <PageTitle>금융 대시보드</PageTitle>
        <PageSubtitle>당신의 재정 상태를 한눈에 파악하고 목표 달성 과정을 추적하세요.</PageSubtitle>
      </PageHeader>
      
      <DashboardGrid>
        <FinancialOverviewCard
          title="재무 요약"
          variant="elevated"
        >
          <div>
            <ProgressContainer>
              <ProgressHeader>
                <ProgressTitle>총 자산</ProgressTitle>
                <ProgressValue>{formatNumber(financialSummary.totalAssets)}원</ProgressValue>
              </ProgressHeader>
              <ProgressBar>
                <ProgressFill 
                  width={100} 
                  color="#3366FF" 
                />
              </ProgressBar>
            </ProgressContainer>
            
            <ProgressContainer>
              <ProgressHeader>
                <ProgressTitle>총 부채</ProgressTitle>
                <ProgressValue>{formatNumber(financialSummary.totalDebts)}원</ProgressValue>
              </ProgressHeader>
              <ProgressBar>
                <ProgressFill 
                  width={(financialSummary.totalDebts / financialSummary.totalAssets) * 100} 
                  color="#F44336" 
                />
              </ProgressBar>
            </ProgressContainer>
            
            <ProgressContainer>
              <ProgressHeader>
                <ProgressTitle>순자산</ProgressTitle>
                <ProgressValue>{formatNumber(financialSummary.netWorth)}원</ProgressValue>
              </ProgressHeader>
              <ProgressBar>
                <ProgressFill 
                  width={(financialSummary.netWorth / financialSummary.totalAssets) * 100} 
                  color="#00C853" 
                />
              </ProgressBar>
            </ProgressContainer>
            
            <ProgressContainer>
              <ProgressHeader>
                <ProgressTitle>월 소득</ProgressTitle>
                <ProgressValue>{formatNumber(financialSummary.monthlyIncome)}원</ProgressValue>
              </ProgressHeader>
            </ProgressContainer>
            
            <ProgressContainer>
              <ProgressHeader>
                <ProgressTitle>월 지출</ProgressTitle>
                <ProgressValue>{formatNumber(financialSummary.monthlyExpenses)}원</ProgressValue>
              </ProgressHeader>
              <ProgressBar>
                <ProgressFill 
                  width={(financialSummary.monthlyExpenses / financialSummary.monthlyIncome) * 100} 
                  color="#FFD600" 
                />
              </ProgressBar>
            </ProgressContainer>
            
            <ProgressContainer>
              <ProgressHeader>
                <ProgressTitle>월 저축</ProgressTitle>
                <ProgressValue>{formatNumber(financialSummary.monthlySavings)}원 ({financialSummary.savingsRate}%)</ProgressValue>
              </ProgressHeader>
              <ProgressBar>
                <ProgressFill 
                  width={financialSummary.savingsRate} 
                  color="#00BCD4" 
                />
              </ProgressBar>
            </ProgressContainer>
          </div>
        </FinancialOverviewCard>
        
        <GoalsCard
          title="금융 목표"
          variant="elevated"
          footer={
            <Link to="/profile#goals">
              <Button variant="link">모든 목표 보기</Button>
            </Link>
          }
        >
          <GoalsList>
            {financialGoals.map(goal => (
              <GoalItem key={goal.id}>
                <GoalIcon bgColor={goal.color}>{goal.icon}</GoalIcon>
                <GoalInfo>
                  <GoalName>{goal.name}</GoalName>
                  <GoalProgress>
                    <GoalProgressBar>
                      <GoalProgressFill width={goal.progress} color={goal.color} />
                    </GoalProgressBar>
                    <GoalAmount>
                      {formatNumber(goal.current)}원 / {formatNumber(goal.target)}원
                    </GoalAmount>
                  </GoalProgress>
                </GoalInfo>
              </GoalItem>
            ))}
          </GoalsList>
        </GoalsCard>
        
        <AssetsDebtsCard
          title="자산 분포"
          variant="elevated"
        >
          <ChartContainer>
            <PieChartSimulation data={assetsData} />
          </ChartContainer>
          <Legend>
            {assetsData.categories.map((category, i) => (
              <LegendItem key={category}>
                <LegendColor color={assetsData.colors[i]} />
                <LegendLabel>{category} ({assetsData.values[i]}%)</LegendLabel>
              </LegendItem>
            ))}
          </Legend>
        </AssetsDebtsCard>
        
        <SpendingCard
          title="지출 분석"
          variant="elevated"
        >
          <ChartContainer>
            <BarChartSimulation>
              {expensesData.categories.map((category, i) => (
                <BarColumn 
                  key={category} 
                  height={expensesData.values[i] * 2.5} 
                  color={expensesData.colors[i]}
                  data-value={`${expensesData.values[i]}%`}
                />
              ))}
            </BarChartSimulation>
          </ChartContainer>
          <Legend>
            {expensesData.categories.map((category, i) => (
              <LegendItem key={category}>
                <LegendColor color={expensesData.colors[i]} />
                <LegendLabel>{category}</LegendLabel>
              </LegendItem>
            ))}
          </Legend>
        </SpendingCard>
        
        <LearningProgressCard
          title="학습 진행 상황"
          variant="elevated"
          footer={
            <Link to="/learning">
              <Button variant="link">모든 학습 모듈 보기</Button>
            </Link>
          }
        >
          <LearningModulesList>
            {learningModules.map(module => (
              <LearningModuleItem key={module.id}>
                <ModuleIcon level={module.level}>{module.icon}</ModuleIcon>
                <ModuleInfo>
                  <ModuleName>{module.name}</ModuleName>
                  <ModuleProgress>
                    <ModuleProgressBar>
                      <ModuleProgressFill 
                        width={module.progress} 
                        color={
                          module.level === 'beginner' ? '#00C853' : 
                          module.level === 'intermediate' ? '#FFD600' : '#F44336'
                        } 
                      />
                    </ModuleProgressBar>
                    <ModuleStatus status={module.status}>
                      {module.status === 'completed' ? '완료' : 
                       module.status === 'in-progress' ? '진행 중' : '시작 전'}
                    </ModuleStatus>
                  </ModuleProgress>
                </ModuleInfo>
              </LearningModuleItem>
            ))}
          </LearningModulesList>
        </LearningProgressCard>
        
        <SimulationResultsCard
          title="최근 시뮬레이션 결과"
          variant="elevated"
          footer={
            <Link to="/simulations">
              <Button variant="link">모든 시뮬레이션 보기</Button>
            </Link>
          }
        >
          <SimulationResultsList>
            {simulationResults.map(sim => (
              <SimulationResultItem key={sim.id}>
                <SimulationIcon type={sim.type}>{sim.icon}</SimulationIcon>
                <SimulationName>{sim.name}</SimulationName>
                <SimulationResult>{sim.result}</SimulationResult>
                <SimulationDate>{sim.date}</SimulationDate>
              </SimulationResultItem>
            ))}
          </SimulationResultsList>
        </SimulationResultsCard>
      </DashboardGrid>
    </Layout>
  );
};

export default DashboardPage; 