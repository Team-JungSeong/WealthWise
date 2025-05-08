import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/common/Layout";
import Button from "../../components/common/Button";
import {
  PageHeader,
  PageTitle,
  PageSubtitle,
  SimulationsGrid,
  SimulationCard,
  SimulationIcon,
  SimulationTitle,
  SimulationDescription,
  RecentSimulationsSection,
  SectionTitle,
  RecentItemsGrid,
  RecentItemCard,
  RecentItemHeader,
  RecentItemType,
  RecentItemDate,
  ResultValue,
} from "../../styles/pages/simulations/SimulationsPage.styled";

const SimulationsPage: React.FC = () => {
  // 가상의 최근 시뮬레이션 결과 데이터
  const recentSimulations = [
    {
      id: "1",
      type: "예산 시뮬레이션",
      date: "2023-09-15",
      result: "월 저축 가능액: 500,000원",
      summary: "월 수입 3,000,000원 기준 최적화 예산 분석",
    },
    {
      id: "2",
      type: "투자 시뮬레이션",
      date: "2023-09-10",
      result: "30년 후 예상 금액: 245,000,000원",
      summary: "월 200,000원 적립식 투자 시뮬레이션",
    },
    {
      id: "3",
      type: "은퇴 시뮬레이션",
      date: "2023-09-05",
      result: "은퇴 자금 목표 달성률: 65%",
      summary: "65세 은퇴, 월 300만원 생활비 기준",
    },
  ];

  return (
    <Layout>
      <PageHeader>
        <PageTitle>금융 시뮬레이션</PageTitle>
        <PageSubtitle>
          다양한 금융 상황을 시뮬레이션하여 최적의 의사결정을 내리는 데 도움을
          받으세요. 미래 재정 상태를 예측하고 목표 달성을 위한 계획을
          세워보세요.
        </PageSubtitle>
      </PageHeader>

      <SimulationsGrid>
        <SimulationCard variant="elevated">
          <SimulationIcon>💰</SimulationIcon>
          <SimulationTitle>예산 시뮬레이션</SimulationTitle>
          <SimulationDescription>
            수입과 지출을 분석하여 최적의 예산 계획을 수립합니다. 불필요한
            지출을 줄이고 저축을 늘리는 방법을 찾아보세요.
          </SimulationDescription>
          <Link to="/simulations/budget">
            <Button variant="primary" isFullWidth>
              시작하기
            </Button>
          </Link>
        </SimulationCard>

        <SimulationCard variant="elevated">
          <SimulationIcon>📈</SimulationIcon>
          <SimulationTitle>투자 시뮬레이션</SimulationTitle>
          <SimulationDescription>
            다양한 투자 방식과 기간, 수익률을 설정하여 미래 자산 가치를
            예측해봅니다. 정기 적립식, 일시 투자 등 다양한 투자 방식의 결과를
            비교해 보세요.
          </SimulationDescription>
          <Link to="/simulations/investment">
            <Button variant="primary" isFullWidth>
              시작하기
            </Button>
          </Link>
        </SimulationCard>

        <SimulationCard variant="elevated">
          <SimulationIcon>🏖️</SimulationIcon>
          <SimulationTitle>은퇴 시뮬레이션</SimulationTitle>
          <SimulationDescription>
            은퇴 후 필요한 자금과 현재 저축 계획으로 목표 달성 가능 여부를
            확인합니다. 편안한 노후 생활을 위한 최적의 저축 및 투자 계획을
            세워보세요.
          </SimulationDescription>
          <Link to="/simulations/retirement">
            <Button variant="primary" isFullWidth>
              시작하기
            </Button>
          </Link>
        </SimulationCard>

        <SimulationCard variant="elevated">
          <SimulationIcon>🏠</SimulationIcon>
          <SimulationTitle>대출 시뮬레이션</SimulationTitle>
          <SimulationDescription>
            다양한 대출 조건과 상환 방식에 따른 총 비용과 월 상환액을
            계산합니다. 주택 대출, 개인 대출 등 다양한 대출 상품의 비용을 비교해
            보세요.
          </SimulationDescription>
          <Link to="/simulations/loan">
            <Button variant="primary" isFullWidth>
              시작하기
            </Button>
          </Link>
        </SimulationCard>
      </SimulationsGrid>

      <RecentSimulationsSection>
        <SectionTitle>최근 시뮬레이션 결과</SectionTitle>

        <RecentItemsGrid>
          {recentSimulations.map((simulation) => (
            <RecentItemCard key={simulation.id} variant="outlined">
              <RecentItemHeader>
                <RecentItemType>{simulation.type}</RecentItemType>
                <RecentItemDate>{simulation.date}</RecentItemDate>
              </RecentItemHeader>
              <ResultValue>{simulation.result}</ResultValue>
              <p>{simulation.summary}</p>
              <Button variant="link">결과 자세히 보기</Button>
            </RecentItemCard>
          ))}
        </RecentItemsGrid>
      </RecentSimulationsSection>
    </Layout>
  );
};

export default SimulationsPage;
