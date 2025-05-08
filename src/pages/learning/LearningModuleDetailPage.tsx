import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../../components/common/Layout";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import { DifficultyLevel, LearningCategory } from "../../types";
import {
  PageHeader,
  PageTitle,
  PageSubtitle,
  ModuleContainer,
  ModuleHeader,
  ModuleInfo,
  ModuleActions,
  ModuleBadges,
  ModuleProgress,
  ProgressBar,
  ProgressFill,
  TabContainer,
  TabButtons,
  TabButton,
  LessonsList,
  LessonItem,
  LessonNumber,
  LessonInfo,
  LessonTitle,
  LessonStatus,
  ContentContainer,
  DurationBadge,
  DetailModuleCategory,
} from "../../styles/pages/learning/LearningModuleDetailPage.styled";
import { DifficultyBadge } from "src/styles/pages/learning/LearningModulesPage.styled";

// 가상의 모듈 데이터
const moduleData = {
  id: "1",
  title: "금융 기초 이해하기",
  description:
    "금융의 기본 개념과 원리를 이해하고 일상 생활에서 금융 결정을 내리는 데 필요한 지식을 습득합니다.",
  category: LearningCategory.BasicFinance,
  difficulty: DifficultyLevel.Beginner,
  duration: 120, // 분 단위
  progress: 25,
  lessons: [
    {
      id: "1",
      title: "금융이란 무엇인가?",
      isCompleted: true,
      content: `
        <h2>금융의 정의와 중요성</h2>
        
        <p>금융(Finance)은 자금의 조달, 운용, 분배와 관련된 모든 활동을 의미합니다. 개인, 기업, 정부 등 모든 경제 주체들은 금융 활동을 통해 필요한 자금을 조달하고 잉여 자금을 운용합니다.</p>
        
        <p>금융은 현대 경제 시스템의 핵심이며, 다음과 같은 이유로 중요합니다:</p>
        
        <ul>
          <li>경제 활동의 촉진 - 필요한 곳에 자금을 공급함으로써 경제 활동을 활성화</li>
          <li>리스크 관리 - 불확실성과 위험을 분산하고 관리</li>
          <li>자원의 효율적 배분 - 자금이 가장 효율적으로 사용될 수 있는 곳으로 배분</li>
          <li>경제적 안정성 - 예측 가능한 금융 환경 조성</li>
        </ul>
        
        <h2>금융 시스템의 구성요소</h2>
        
        <p>금융 시스템은 크게 다음과 같은 요소로 구성됩니다:</p>
        
        <ol>
          <li><strong>금융 기관</strong>: 은행, 증권사, 보험사, 투자회사 등</li>
          <li><strong>금융 시장</strong>: 주식시장, 채권시장, 외환시장, 파생상품시장 등</li>
          <li><strong>금융 상품</strong>: 예금, 대출, 주식, 채권, 보험, 펀드 등</li>
          <li><strong>금융 감독 기관</strong>: 중앙은행, 금융감독원 등</li>
        </ol>
        
        <p>이러한 금융 시스템의 이해는 개인의 재무 관리와 경제적 의사결정에 필수적입니다.</p>
      `,
    },
    {
      id: "2",
      title: "예금과 이자 이해하기",
      isCompleted: false,
      content: `
        <p>예금(Deposit)은 금융 기관에 돈을 맡기는 행위를 말합니다. 예금은 가장 기본적인 금융 상품으로, 안전하게 자금을 보관하고 이자 수익을 얻는 방법입니다.</p>

        <h3>예금의 종류</h3>

        <ul>
          <li><strong>보통예금</strong>: 입출금이 자유로운 예금으로, 낮은 이자율이 적용됩니다.</li>
          <li><strong>정기예금</strong>: 일정 기간 동안 예치하는 조건으로 상대적으로 높은 이자율을 제공합니다.</li>
          <li><strong>정기적금</strong>: 매월 일정액을 납입하여 목돈을 마련하는 예금 상품입니다.</li>
          <li><strong>양도성예금증서(CD)</strong>: 은행이 발행하는 양도 가능한 예금 증서로, 만기 전에도 시장에서 매매할 수 있습니다.</li>
        </ul>

        <h2>이자의 이해</h2>

        <p>이자(Interest)는 돈을 빌려주거나 예치한 대가로 받는 금전적 보상입니다. 예금자 입장에서는 자금을 금융기관에 맡겨준 대가로 받는 수익입니다.</p>

        <h3>이자 계산 방식</h3>

        <p>이자는 다음과 같은 방식으로 계산됩니다:</p>

        <ul>
          <li><strong>단리</strong>: 원금에 대해서만 이자가 발생합니다. 
            <br>계산식: 원금 × 이자율 × 기간</li>
          <li><strong>복리</strong>: 원금뿐 아니라 발생한 이자에 대해서도 이자가 붙습니다.
            <br>계산식: 원금 × (1 + 이자율)^기간</li>
        </ul>

        <h3>예시: 단리와 복리의 차이</h3>

        <p>100만원을 연 5%의 이자로 3년간 예치할 경우:</p>

        <ul>
          <li><strong>단리</strong>: 1,000,000 × 0.05 × 3 = 150,000원의 이자 발생</li>
          <li><strong>복리</strong>: 1,000,000 × (1 + 0.05)³ - 1,000,000 = 157,625원의 이자 발생</li>
        </ul>

        <p>복리는 시간이 갈수록 단리보다 더 많은 이자를 가져다줍니다. 이것이 바로 '복리의 마법'이라고 불리는 이유입니다.</p>

        <h2>이자율에 영향을 미치는 요인</h2>

        <ul>
          <li><strong>중앙은행 기준금리</strong>: 중앙은행이 설정한 기준 금리가 시장 이자율의 기초가 됩니다.</li>
          <li><strong>예금 기간</strong>: 일반적으로 예치 기간이 길수록 높은 이자율이 적용됩니다.</li>
          <li><strong>예금 금액</strong>: 일정 금액 이상 예치할 경우 우대 이자율을 제공하는 경우가 있습니다.</li>
          <li><strong>경제 상황</strong>: 인플레이션, 경기 상황 등 경제 환경에 따라 이자율이 변동합니다.</li>
        </ul>

        <h2>예금자 보호 제도</h2>

        <p>예금자 보호 제도는 금융기관이 파산하거나 지급불능 상태가 되었을 때 예금자의 자산을 보호하기 위한 제도입니다. 한국의 경우, 예금보험공사에서 1인당 5천만원까지 원금과 이자를 보호합니다.</p>

        <h2>현명한 예금 관리 전략</h2>

        <ul>
          <li>비상금은 입출금이 자유로운 보통예금에 보관하세요.</li>
          <li>목적과 기간에 맞는 예금 상품을 선택하세요.</li>
          <li>다양한 금융기관의 이자율을 비교하고 선택하세요.</li>
          <li>이자 수익에 대한 세금 효과를 고려하세요.</li>
          <li>인플레이션을 감안하여 실질 수익률을 계산하세요.</li>
        </ul>

        <p>예금은 안전하지만 일반적으로 낮은 수익률을 제공합니다. 따라서 장기적인 자산 증식을 위해서는 다양한 투자 방법을 함께 고려하는 것이 중요합니다.</p>`,
    },
    {
      id: "3",
      title: "대출과 신용의 기본",
      isCompleted: false,
      content: "",
    },
    {
      id: "4",
      title: "투자의 기초 개념",
      isCompleted: false,
      content: "",
    },
    {
      id: "5",
      title: "리스크와 수익의 관계",
      isCompleted: false,
      content: "",
    },
  ],
};

const LearningModuleDetailPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { moduleId } = useParams<{ moduleId: string }>();
  const [activeTab, setActiveTab] = useState<"content" | "resources">(
    "content"
  );
  const [activeLessonId, setActiveLessonId] = useState(
    moduleData.lessons[0].id
  );

  const activeLesson = moduleData.lessons.find(
    (lesson) => lesson.id === activeLessonId
  );

  return (
    <Layout>
      <PageHeader>
        <Link to="/learning">&lt; 학습 모듈로 돌아가기</Link>
        <PageTitle>{moduleData.title}</PageTitle>
        <PageSubtitle>{moduleData.description}</PageSubtitle>
      </PageHeader>

      <ModuleContainer>
        <Card variant="elevated">
          <ModuleHeader>
            <ModuleInfo>
              <ModuleProgress>
                <div>학습 진행도: {moduleData.progress}%</div>
                <ProgressBar>
                  <ProgressFill width={moduleData.progress} color="#3366FF" />
                </ProgressBar>
              </ModuleProgress>

              <ModuleBadges>
                {/* 카테고리 뱃지 */}
                <DetailModuleCategory $category={moduleData.category}>
                  {moduleData.category === LearningCategory.BasicFinance &&
                    "금융 기초"}
                  {moduleData.category === LearningCategory.Budgeting &&
                    "예산 관리"}
                  {moduleData.category === LearningCategory.Saving && "저축"}
                  {moduleData.category === LearningCategory.Investing && "투자"}
                  {moduleData.category === LearningCategory.RealEstate &&
                    "노후 계획"}
                  {moduleData.category === LearningCategory.TaxPlanning &&
                    "세금 계획"}
                  {moduleData.category === LearningCategory.DebtManagement &&
                    "부채 관리"}
                  {moduleData.category === LearningCategory.Insurance && "보험"}
                  {moduleData.category === LearningCategory.RealEstate &&
                    "부동산"}
                  {moduleData.category === LearningCategory.AdvancedInvesting &&
                    "고급 투자"}
                </DetailModuleCategory>

                {/* 난이도 뱃지 */}
                <DifficultyBadge $level={moduleData.difficulty}>
                  {moduleData.difficulty === DifficultyLevel.Beginner && "초급"}
                  {moduleData.difficulty === DifficultyLevel.Intermediate &&
                    "중급"}
                  {moduleData.difficulty === DifficultyLevel.Advanced && "고급"}
                </DifficultyBadge>

                {/* 소요 시간 뱃지 */}
                <DurationBadge>
                  소요 시간: {moduleData.duration}분
                </DurationBadge>
              </ModuleBadges>
            </ModuleInfo>

            <ModuleActions>
              <Button variant="primary" size="md">
                계속 학습하기
              </Button>
            </ModuleActions>
          </ModuleHeader>
        </Card>

        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: "0 0 250px" }}>
            <h3>학습 목차</h3>
            <LessonsList>
              {moduleData.lessons.map((lesson, index) => (
                <LessonItem
                  key={lesson.id}
                  isActive={lesson.id === activeLessonId}
                  isCompleted={lesson.isCompleted}
                  onClick={() => setActiveLessonId(lesson.id)}
                >
                  <LessonNumber isCompleted={lesson.isCompleted}>
                    {lesson.isCompleted ? "✓" : index + 1}
                  </LessonNumber>
                  <LessonInfo>
                    <LessonTitle>{lesson.title}</LessonTitle>
                    <LessonStatus isCompleted={lesson.isCompleted}>
                      {lesson.isCompleted ? "완료" : "미완료"}
                    </LessonStatus>
                  </LessonInfo>
                </LessonItem>
              ))}
            </LessonsList>
          </div>

          <div style={{ flex: 1 }}>
            <Card variant="outlined">
              <TabContainer>
                <TabButtons>
                  <TabButton
                    isActive={activeTab === "content"}
                    onClick={() => setActiveTab("content")}
                  >
                    학습 내용
                  </TabButton>
                  <TabButton
                    isActive={activeTab === "resources"}
                    onClick={() => setActiveTab("resources")}
                  >
                    추가 자료
                  </TabButton>
                </TabButtons>

                {activeTab === "content" && activeLesson && (
                  <div style={{ position: "relative", paddingBottom: "90px" }}>
                    <h2>{activeLesson.title}</h2>
                    <ContentContainer
                      dangerouslySetInnerHTML={{ __html: activeLesson.content }}
                    />

                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        position: "absolute",
                        bottom: "0",
                      }}
                    >
                      <Button
                        variant="light"
                        disabled={activeLessonId === moduleData.lessons[0].id}
                        onClick={() => {
                          const currentIndex = moduleData.lessons.findIndex(
                            (l) => l.id === activeLessonId
                          );
                          if (currentIndex > 0) {
                            setActiveLessonId(
                              moduleData.lessons[currentIndex - 1].id
                            );
                          }
                        }}
                      >
                        이전 단원
                      </Button>
                      <Button
                        variant="primary"
                        disabled={
                          activeLessonId ===
                          moduleData.lessons[moduleData.lessons.length - 1].id
                        }
                        onClick={() => {
                          const currentIndex = moduleData.lessons.findIndex(
                            (l) => l.id === activeLessonId
                          );
                          if (currentIndex < moduleData.lessons.length - 1) {
                            setActiveLessonId(
                              moduleData.lessons[currentIndex + 1].id
                            );
                          }
                        }}
                      >
                        다음 단원
                      </Button>
                    </div>
                  </div>
                )}

                {activeTab === "resources" && (
                  <div>
                    <h3>추천 참고 자료</h3>
                    <ul>
                      <li>
                        <a href="/resources/financial-terms">
                          금융 기초 용어 사전
                        </a>
                      </li>
                      <li>
                        <a href="/resources/financial-system">
                          금융 시스템 개요 도표
                        </a>
                      </li>
                      <li>
                        <a href="/resources/bank-education">
                          한국은행 경제교육 자료
                        </a>
                      </li>
                    </ul>

                    <h3>추천 도서</h3>
                    <ul>
                      <li>경제학 콘서트 - 팀 하포드</li>
                      <li>부의 추월차선 - 엠제이 드마코</li>
                      <li>돈의 심리학 - 모건 하우절</li>
                    </ul>
                  </div>
                )}
              </TabContainer>
            </Card>
          </div>
        </div>
      </ModuleContainer>
    </Layout>
  );
};

export default LearningModuleDetailPage;
