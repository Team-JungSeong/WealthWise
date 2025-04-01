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
} from "../../styles/pages/dashboard/DashboardPage.styled";

const DashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { summary, assetsData, expensesData, goals, isLoading } =
    useFinancialData(user?.id);
  const theme = useTheme();

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
          재정 상태를 한눈에 파악하고 목표 달성 과정을 추적하세요.
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
                <ProgressFill width={summary.savingsRate} color="#8BC34A" />
              </ProgressBar>
            </ProgressContainer>

            <ProgressContainer>
              <ProgressHeader>
                <ProgressTitle>월 지출</ProgressTitle>
                <ProgressValue style={{ color: "#EF6C00" }}>
                  -{formatNumber(summary.monthlyExpenses)}원
                </ProgressValue>
              </ProgressHeader>
              <ProgressBar>
                <ProgressFill
                  width={
                    (summary.monthlyExpenses / summary.monthlyIncome) * 100
                  }
                  color="#FF9800"
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

        <GoalsCard
          title="금융 목표"
          variant="elevated"
          footer={
            <Link to="/goals">
              <Button variant="link">목표 더보기</Button>
            </Link>
          }
        >
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
                      <TargetAmount>{formatNumber(goal.target)}원</TargetAmount>
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
      </DashboardGrid>
    </Layout>
  );
};

export default DashboardPage;
