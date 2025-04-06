import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/common/Layout";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
// import { LearningCategory, DifficultyLevel, CompletionStatus } from "../../types";
import {
  PageHeader,
  PageTitle,
  PageSubtitle,
  FiltersContainer,
  FilterGroup,
  FilterLabel,
  FilterSelect,
  SearchContainer,
  ModulesGrid,
  ModuleCard,
  ModuleCardContent,
  ModuleCategory,
  ModuleTitle,
  ModuleDescription,
  ModuleMeta,
  ModuleMetaItem,
  DifficultyBadge,
  StatusBadge,
  ProgressBar,
  ProgressFill,
  NoResultsContainer,
  NoResultsIcon,
  NoResultsText,
  ModuleTopItem,
  ModuleBottomItem,
  CustomStatusButton,
  ModuleMiddleItem,
} from "../../styles/pages/learning/LearningModulesPage.styled";

const getCategoryLabel = (category: string): string => {
  switch (category) {
    case "BASIC_FINANCE":
      return "금융 기초";
    case "BUDGETING":
      return "예산 관리";
    case "SAVING":
      return "저축";
    case "INVESTING":
      return "투자";
    case "RETIREMENT":
      return "노후 계획";
    case "TAX_PLANNING":
      return "세금 계획";
    case "DEBT_MANAGEMENT":
      return "부채 관리";
    case "INSURANCE":
      return "보험";
    case "REAL_ESTATE":
      return "부동산";
    case "ADVANCED_INVESTING":
      return "고급 투자";
    default:
      return "기타";
  }
};

const getDifficultyLabel = (difficulty: string): string => {
  switch (difficulty) {
    case "BEGINNER":
      return "초급";
    case "INTERMEDIATE":
      return "중급";
    case "ADVANCED":
      return "고급";
    case "EXPERT":
      return "전문가";
    default:
      return "기타";
  }
};

const getStatusLabel = (status: string): string => {
  switch (status) {
    case "COMPLETED":
      return "완료";
    case "IN_PROGRESS":
      return "진행 중";
    case "NOT_STARTED":
      return "시작 전";
    default:
      return "기타";
  }
};

// 학습 모듈 타입 정의
interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  completionStatus: string;
  progress: number; // 0-100
  lessons: number;
  completedLessons: number;
}

const LearningModulesPage: React.FC = () => {
  // 필터 상태
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 예시 데이터
  const learningModules: LearningModule[] = [
    {
      id: "1",
      title: "금융 기초 이해하기",
      description:
        "금융의 기본 개념부터 시작하는 초급자를 위한 모듈입니다. 돈의 기능, 금융 시스템의 작동 원리, 기본적인 금융 용어를 배웁니다.",
      category: "BASIC_FINANCE",
      difficulty: "BEGINNER",
      completionStatus: "COMPLETED",
      progress: 100,
      lessons: 5,
      completedLessons: 5,
    },
    {
      id: "2",
      title: "스마트한 예산 관리",
      description:
        "효율적인 예산 계획을 수립하고 지출을 관리하는 방법을 배웁니다. 다양한 예산 수립 기법과 지출 추적 도구를 소개합니다.",
      category: "BUDGETING",
      difficulty: "BEGINNER",
      completionStatus: "IN_PROGRESS",
      progress: 75,
      lessons: 4,
      completedLessons: 3,
    },
    {
      id: "3",
      title: "저축의 기술",
      description:
        "효과적인 저축 전략과 다양한 저축 상품에 대해 알아봅니다. 목표 저축, 비상금 마련, 자동 저축 방법 등을 학습합니다.",
      category: "SAVING",
      difficulty: "BEGINNER",
      completionStatus: "NOT_STARTED",
      progress: 0,
      lessons: 3,
      completedLessons: 0,
    },
    {
      id: "4",
      title: "투자 포트폴리오 구성",
      description:
        "다양한 투자 자산과 포트폴리오 구성 원칙을 배웁니다. 위험 분산, 자산 배분, 리밸런싱 전략을 학습합니다.",
      category: "INVESTING",
      difficulty: "INTERMEDIATE",
      completionStatus: "IN_PROGRESS",
      progress: 30,
      lessons: 6,
      completedLessons: 2,
    },
    {
      id: "5",
      title: "은퇴를 위한 재정 계획",
      description:
        "성공적인 은퇴를 위한 장기적인 재정 계획과 투자 전략을 배웁니다. 은퇴 자금 계산, 인출 전략, 사회보장제도 활용법을 다룹니다.",
      category: "RETIREMENT",
      difficulty: "EXPERT",
      completionStatus: "NOT_STARTED",
      progress: 0,
      lessons: 7,
      completedLessons: 0,
    },
    {
      id: "6",
      title: "효율적인 세금 계획",
      description:
        "세금을 최소화하고 재무 목표를 달성하기 위한 합법적인 세금 계획 전략을 배웁니다. 소득세, 투자세, 상속세 계획을 다룹니다.",
      category: "TAX_PLANNING",
      difficulty: "ADVANCED",
      completionStatus: "NOT_STARTED",
      progress: 0,
      lessons: 8,
      completedLessons: 0,
    },
    {
      id: "7",
      title: "현명한 부채 관리",
      description:
        "건강한 부채 사용법과 부채 감소 전략을 배웁니다. 신용점수 관리, 대출 종류별 특성, 부채 상환 우선순위 설정을 다룹니다.",
      category: "DEBT_MANAGEMENT",
      difficulty: "BEGINNER",
      completionStatus: "COMPLETED",
      progress: 100,
      lessons: 5,
      completedLessons: 5,
    },
    {
      id: "8",
      title: "부동산 투자의 기초",
      description:
        "부동산 시장의 기본 원리와 투자 전략을 배웁니다. 부동산 가치 평가, 투자 유형, 리스크 관리를 학습합니다.",
      category: "REAL_ESTATE",
      difficulty: "INTERMEDIATE",
      completionStatus: "IN_PROGRESS",
      progress: 0,
      lessons: 6,
      completedLessons: 0,
    },
    {
      id: "9",
      title: "고급 투자 전략 마스터하기",
      description:
        "고급 투자 기법과 포트폴리오 관리 전략을 심층적으로 탐구합니다. 복합적인 투자 접근법과 고급 분석 기술을 학습합니다.",
      category: "ADVANCED_INVESTING",
      difficulty: "INTERMEDIATE",
      completionStatus: "IN_PROGRESS",
      progress: 80,
      lessons: 5,
      completedLessons: 4,
    },
    {
      id: "10",
      title: "보험 및 재무 리스크 관리",
      description:
        "보험 상품의 이해와 개인 재무 리스크 관리 전략을 배웁니다. 다양한 보험 유형, 보장 범위, 재무 안전망 구축 방법을 학습합니다.",
      category: "INSURANCE",
      difficulty: "INTERMEDIATE",
      completionStatus: "IN_PROGRESS",
      progress: 30,
      lessons: 10,
      completedLessons: 3,
    },
  ];

  // 필터링된 모듈 목록
  const filteredModules = learningModules.filter((module) => {
    // 카테고리 필터
    if (categoryFilter !== "ALL" && module.category !== categoryFilter) {
      return false;
    }

    // 난이도 필터
    if (difficultyFilter !== "ALL" && module.difficulty !== difficultyFilter) {
      return false;
    }

    // 상태 필터
    if (statusFilter !== "ALL" && module.completionStatus !== statusFilter) {
      return false;
    }

    // 검색어 필터
    if (
      searchQuery &&
      !module.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !module.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <Layout>
      <PageHeader>
        <PageTitle>학습 모듈</PageTitle>
        <PageSubtitle>
          개인화된 금융 교육을 통해 재정 지식을 쌓고 현명한 결정을 내리세요.
        </PageSubtitle>
      </PageHeader>

      <FiltersContainer>
        <FilterGroup>
          <FilterLabel>카테고리</FilterLabel>
          <FilterSelect
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="ALL">카테고리 선택</option>
            <option value="BASIC_FINANCE">금융 기초</option>
            <option value="BUDGETING">예산 관리</option>
            <option value="SAVING">저축</option>
            <option value="INVESTING">투자</option>
            <option value="RETIREMENT">은퇴 계획</option>
            <option value="TAX_PLANNING">세금 계획</option>
            <option value="DEBT_MANAGEMENT">부채 관리</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>난이도</FilterLabel>
          <FilterSelect
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="ALL">난이도 선택</option>
            <option value="BEGINNER">초급</option>
            <option value="INTERMEDIATE">중급</option>
            <option value="ADVANCED">고급</option>
            <option value="EXPERT">전문가</option>
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>상태</FilterLabel>
          <FilterSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">상태 선택</option>
            <option value="COMPLETED">완료</option>
            <option value="IN_PROGRESS">진행 중</option>
            <option value="NOT_STARTED">시작 전</option>
          </FilterSelect>
        </FilterGroup>

        <SearchContainer>
          <Input
            label="검색"
            placeholder="검색어를 입력하세요."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            isFullWidth
          />
        </SearchContainer>
      </FiltersContainer>

      {filteredModules.length > 0 ? (
        <ModulesGrid>
          {filteredModules.map((module) => (
            <ModuleCard key={module.id} variant="elevated" isHoverable>
              <ModuleCardContent>
                <ModuleTopItem>
                  <ModuleCategory category={module.category}>
                    {getCategoryLabel(module.category)}
                  </ModuleCategory>
                  <ModuleMetaItem>
                    <DifficultyBadge level={module.difficulty}>
                      {getDifficultyLabel(module.difficulty)}
                    </DifficultyBadge>
                  </ModuleMetaItem>
                </ModuleTopItem>

                <ModuleMiddleItem>
                  <ModuleTitle>{module.title}</ModuleTitle>
                  <ModuleDescription>{module.description}</ModuleDescription>
                </ModuleMiddleItem>

                <ModuleBottomItem>
                  <ModuleMeta>
                    <ModuleMetaItem>
                      <StatusBadge status={module.completionStatus}>
                        {getStatusLabel(module.completionStatus)}
                      </StatusBadge>
                    </ModuleMetaItem>
                    <ModuleMetaItem>
                      {module.completedLessons}/{module.lessons} 강의
                    </ModuleMetaItem>
                  </ModuleMeta>

                  <ProgressBar>
                    <ProgressFill
                      width={module.progress}
                      status={module.completionStatus}
                    />
                  </ProgressBar>

                  <Link to={`/learning/${module.id}`}>
                    <CustomStatusButton
                      variant={
                        module.completionStatus === "NOT_STARTED"
                          ? "secondary"
                          : module.completionStatus === "IN_PROGRESS"
                          ? "secondary"
                          : "light"
                      }
                      isFullWidth
                    >
                      {module.completionStatus === "NOT_STARTED"
                        ? "시작하기"
                        : module.completionStatus === "IN_PROGRESS"
                        ? "계속하기"
                        : "다시 보기"}
                    </CustomStatusButton>
                  </Link>
                </ModuleBottomItem>
              </ModuleCardContent>
            </ModuleCard>
          ))}
        </ModulesGrid>
      ) : (
        <NoResultsContainer>
          <NoResultsIcon>🔍</NoResultsIcon>
          <NoResultsText>검색 조건에 맞는 학습 모듈이 없습니다.</NoResultsText>
          <Button
            variant="primary"
            onClick={() => {
              setCategoryFilter("ALL");
              setDifficultyFilter("ALL");
              setStatusFilter("ALL");
              setSearchQuery("");
            }}
          >
            필터 초기화
          </Button>
        </NoResultsContainer>
      )}
    </Layout>
  );
};

export default LearningModulesPage;
