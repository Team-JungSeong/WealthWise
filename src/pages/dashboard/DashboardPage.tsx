import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "styled-components";
import Layout from "../../components/common/Layout";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";
import useFinancialData from "../../hooks/useFinancialData";
import {
  PageHeader,
  PageTitle,
  PageSubtitle,
  DashboardGrid,
  FinancialOverviewCard,
  ProgressContainer,
  ProgressHeader,
  ProgressTitle,
  ProgressValue,
  ProgressBar,
  ProgressFill,
  GoalsCard,
  GoalsList,
  GoalItem,
  GoalIcon,
  GoalInfo,
  GoalTitle,
  GoalName,
  Amount,
  CurrentAmount,
  TargetAmount,
  GoalProgressBar,
  GoalProgressFill,
  AssetsDebtsCard,
  ChartContainer,
  PieChartSimulation,
  Legend,
  LegendItem,
  LegendColor,
  LegendLabel,
  SpendingCard,
  BarChartSimulation,
  BarColumn,
  LearningProgressCard,
  LearningModulesList,
  LearningModuleItem,
  ModuleIcon,
  ModuleInfo,
  ModuleName,
  ModuleProgress,
  ModuleProgressBar,
  ModuleProgressFill,
  ModuleStatus,
  SimulationResultsCard,
  SimulationResultsList,
  SimulationResultItem,
  SimulationIcon,
  SimulationName,
  SimulationResult,
  SimulationDate
} from "../../styles/pages/dashboard/DashboardPage.styled";

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { summary, assetsData, expensesData, goals, isLoading } = useFinancialData(user?.id);
  const theme = useTheme();

  // 학습 모듈 예시 데이터
  const learningModules = [
    {
      id: 1,
      name: "금융 기초 이해하기",
      progress: 100,
      status: "completed",
      level: "beginner",
      icon: "📚",
    },
    {
      id: 2,
      name: "예산 관리의 기술",
      progress: 75,
      status: "in-progress",
      level: "beginner",
      icon: "📊",
    },
    {
      id: 3,
      name: "투자 포트폴리오 구성",
      progress: 20,
      status: "in-progress",
      level: "intermediate",
      icon: "📈",
    },
  ];

  // 시뮬레이션 결과 예시 데이터
  const simulationResults = [
    {
      id: 1,
      name: "월 예산 계획",
      result: "350,000원 절약 가능",
      date: "2023-04-15",
      type: "budget",
      icon: "📊",
    },
    {
      id: 2,
      name: "투자 수익률 예측",
      result: "연 7.5% 예상",
      date: "2023-04-10",
      type: "investment",
      icon: "📈",
    },
    {
      id: 3,
      name: "은퇴 자금 시뮬레이션",
      result: "목표의 68% 달성 예상",
      date: "2023-04-05",
      type: "retirement",
      icon: "🏖️",
    },
    {
      id: 4,
      name: "대출 상환 계획",
      result: "5년 단축 가능",
      date: "2023-04-01",
      type: "loan",
      icon: "💳",
    },
  ];

  // 숫자 포맷팅 함수
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("ko-KR").format(num);
  };

  if (isLoading) {
    return (
      <Layout>
        <div>데이터를 불러오는 중입니다...</div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <div>
          <p>로그인이 필요한 페이지입니다.</p>
          <Link to="/login">
            <Button>로그인하기</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader>
        <PageTitle>{user?.name}님의 금융 대시보드</PageTitle>
        <PageSubtitle>
          당신의 재정 상태를 한눈에 파악하고 목표 달성 과정을 추적하세요.
        </PageSubtitle>
      </PageHeader>

      <DashboardGrid>
        <FinancialOverviewCard title="재정 현황" variant="elevated">
          <div>
            <ProgressContainer style={{ margin: `0 0 ${theme.spacing.lg}` }}>
              <ProgressHeader>
                <ProgressTitle>총 자산</ProgressTitle>
                <ProgressValue style={{ color: "#2E7D32" }}>
                  {formatNumber(summary.totalAssets)}원
                </ProgressValue>
              </ProgressHeader>
              <ProgressBar>
                <ProgressFill width={100} color="#3A7A41" />
              </ProgressBar>
            </ProgressContainer>

            <ProgressContainer>
              <ProgressHeader>
                <ProgressTitle>월 소득</ProgressTitle>
                <ProgressValue style={{ color: "#1976D2" }}>
                  {formatNumber(summary.monthlyIncome)}원
                </ProgressValue>
              </ProgressHeader>
              <ProgressBar>
                <ProgressFill width={100} color="#42A5F5" />
              </ProgressBar>
            </ProgressContainer>

            <ProgressContainer>
              <ProgressHeader>
                <ProgressTitle>월 저축</ProgressTitle>
                <ProgressValue style={{ color: "#689F38" }}>
                  {formatNumber(summary.monthlySavings)}원 (
                  {summary.savingsRate}%)
                </ProgressValue>
              </ProgressHeader>
              <ProgressBar>
                <ProgressFill
                  width={summary.savingsRate}
                  color="#8BC34A"
                />
              </ProgressBar>
            </ProgressContainer>

            <ProgressContainer>
              <ProgressHeader>
                <ProgressTitle>총 부채</ProgressTitle>
                <ProgressValue style={{ color: "#E64A19" }}>
                  {formatNumber(summary.totalDebts)}원
                </ProgressValue>
              </ProgressHeader>
              <ProgressBar>
                <ProgressFill
                  width={(summary.totalDebts / summary.totalAssets) * 100}
                  color="#FF5722"
                />
              </ProgressBar>
            </ProgressContainer>
          </div>
        </FinancialOverviewCard>

        <GoalsCard title="금융 목표" variant="elevated">
          <GoalsList>
            {goals.map((goal) => (
              <GoalItem key={goal.id}>
                <GoalIcon bgColor={goal.color}>{goal.icon}</GoalIcon>
                <GoalInfo>
                  <GoalTitle>
                    <GoalName>{goal.name}</GoalName>
                    <Amount>
                      <CurrentAmount>
                        {formatNumber(goal.current)}원
                      </CurrentAmount>
                      {" / "}
                      <TargetAmount>
                        {formatNumber(goal.target)}원
                      </TargetAmount>
                    </Amount>
                  </GoalTitle>
                  <GoalProgressBar>
                    <GoalProgressFill
                      width={goal.progress}
                      color={goal.color}
                    />
                  </GoalProgressBar>
                </GoalInfo>
              </GoalItem>
            ))}
          </GoalsList>
        </GoalsCard>

        <AssetsDebtsCard title="자산 분배" variant="elevated">
          <ChartContainer>
            <PieChartSimulation data={assetsData} />
          </ChartContainer>
          <Legend>
            {assetsData.categories.map((category, index) => (
              <LegendItem key={index}>
                <LegendColor color={assetsData.colors[index]} />
                <LegendLabel>
                  {category} ({assetsData.values[index]}%)
                </LegendLabel>
              </LegendItem>
            ))}
          </Legend>
        </AssetsDebtsCard>

        <SpendingCard title="지출 분석" variant="elevated">
          <ChartContainer>
            <BarChartSimulation>
              {expensesData.categories.map((category, index) => (
                <BarColumn
                  key={index}
                  height={expensesData.values[index] * 2}
                  color={expensesData.colors[index]}
                  data-value={`${expensesData.values[index]}%`}
                />
              ))}
            </BarChartSimulation>
          </ChartContainer>
          <Legend>
            {expensesData.categories.map((category, index) => (
              <LegendItem key={index}>
                <LegendColor color={expensesData.colors[index]} />
                <LegendLabel>
                  {category} ({expensesData.values[index]}%)
                </LegendLabel>
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
            {learningModules.map((module) => (
              <LearningModuleItem key={module.id}>
                <ModuleIcon level={module.level}>{module.icon}</ModuleIcon>
                <ModuleInfo>
                  <ModuleName>{module.name}</ModuleName>
                  <ModuleProgress>
                    <ModuleProgressBar>
                      <ModuleProgressFill
                        width={module.progress}
                        color={
                          module.level === "beginner"
                            ? "#00C853"
                            : module.level === "intermediate"
                            ? "#FFD600"
                            : "#F44336"
                        }
                      />
                    </ModuleProgressBar>
                    <ModuleStatus status={module.status}>
                      {module.status === "completed"
                        ? "완료"
                        : module.status === "in-progress"
                        ? "진행 중"
                        : "시작 전"}
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
            {simulationResults.map((sim) => (
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
