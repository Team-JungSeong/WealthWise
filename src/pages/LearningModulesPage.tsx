import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { LearningCategory, DifficultyLevel, CompletionStatus } from '../types';

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

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const FilterLabel = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dark};
  font-size: 0.875rem;
`;

const FilterSelect = styled.select`
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

const SearchContainer = styled.div`
  flex: 1;
  min-width: 300px;
`;

const ModulesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ModuleCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ModuleCardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ModuleCategory = styled.div<{ category: string }>`
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ category, theme }) => {
    switch(category) {
      case 'BASIC_FINANCE': return theme.colors.primary;
      case 'BUDGETING': return theme.colors.success;
      case 'SAVING': return theme.colors.info;
      case 'INVESTING': return theme.colors.warning;
      case 'RETIREMENT': return '#8E24AA'; // 퍼플
      case 'TAX_PLANNING': return '#FF6D00'; // 오렌지
      case 'DEBT_MANAGEMENT': return theme.colors.danger;
      default: return theme.colors.text;
    }
  }};
`;

const ModuleTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: ${({ theme }) => `${theme.spacing.xs} 0 ${theme.spacing.sm}`};
  line-height: 1.3;
`;

const ModuleDescription = styled.p`
  color: ${({ theme }) => theme.colors.text}dd;
  font-size: 0.875rem;
  line-height: 1.5;
  flex: 1;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ModuleMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ModuleMetaItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text}aa;
`;

const DifficultyBadge = styled.span<{ level: string }>`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;
  margin-right: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ level, theme }) => {
    switch(level) {
      case 'BEGINNER': return `${theme.colors.success}22`;
      case 'INTERMEDIATE': return `${theme.colors.warning}22`;
      case 'ADVANCED': return `${theme.colors.danger}22`;
      case 'EXPERT': return `${theme.colors.dark}22`;
      default: return `${theme.colors.light}`;
    }
  }};
  color: ${({ level, theme }) => {
    switch(level) {
      case 'BEGINNER': return theme.colors.success;
      case 'INTERMEDIATE': return theme.colors.warning;
      case 'ADVANCED': return theme.colors.danger;
      case 'EXPERT': return theme.colors.dark;
      default: return theme.colors.text;
    }
  }};
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.75rem;
  font-weight: 500;
  background-color: ${({ status, theme }) => {
    switch(status) {
      case 'COMPLETED': return `${theme.colors.success}22`;
      case 'IN_PROGRESS': return `${theme.colors.warning}22`;
      case 'NOT_STARTED': return `${theme.colors.light}`;
      default: return `${theme.colors.light}`;
    }
  }};
  color: ${({ status, theme }) => {
    switch(status) {
      case 'COMPLETED': return theme.colors.success;
      case 'IN_PROGRESS': return theme.colors.warning;
      case 'NOT_STARTED': return theme.colors.text;
      default: return theme.colors.text;
    }
  }};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
`;

const ProgressFill = styled.div<{ width: number; status: string }>`
  width: ${({ width }) => `${width}%`};
  height: 100%;
  background-color: ${({ status, theme }) => {
    switch(status) {
      case 'COMPLETED': return theme.colors.success;
      case 'IN_PROGRESS': return theme.colors.warning;
      case 'NOT_STARTED': return theme.colors.text;
      default: return theme.colors.primary;
    }
  }};
`;

const NoResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const NoResultsIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text}55;
`;

const NoResultsText = styled.p`
  color: ${({ theme }) => theme.colors.text}aa;
  font-size: 1.125rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const getCategoryLabel = (category: string): string => {
  switch(category) {
    case 'BASIC_FINANCE': return '금융 기초';
    case 'BUDGETING': return '예산 관리';
    case 'SAVING': return '저축';
    case 'INVESTING': return '투자';
    case 'RETIREMENT': return '은퇴 계획';
    case 'TAX_PLANNING': return '세금 계획';
    case 'DEBT_MANAGEMENT': return '부채 관리';
    case 'INSURANCE': return '보험';
    case 'REAL_ESTATE': return '부동산';
    case 'ADVANCED_INVESTING': return '고급 투자';
    default: return '기타';
  }
};

const getDifficultyLabel = (difficulty: string): string => {
  switch(difficulty) {
    case 'BEGINNER': return '초급';
    case 'INTERMEDIATE': return '중급';
    case 'ADVANCED': return '고급';
    case 'EXPERT': return '전문가';
    default: return '기타';
  }
};

const getStatusLabel = (status: string): string => {
  switch(status) {
    case 'COMPLETED': return '완료';
    case 'IN_PROGRESS': return '진행 중';
    case 'NOT_STARTED': return '시작 전';
    default: return '기타';
  }
};

// 학습 모듈 타입 정의
interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: number; // 분 단위
  completionStatus: string;
  progress: number; // 0-100
  lessons: number;
  completedLessons: number;
}

const LearningModulesPage: React.FC = () => {
  // 필터 상태
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // 예시 데이터
  const learningModules: LearningModule[] = [
    {
      id: '1',
      title: '금융 기초 이해하기',
      description: '금융의 기본 개념부터 시작하는 초급자를 위한 모듈입니다. 돈의 기능, 금융 시스템의 작동 원리, 기본적인 금융 용어를 배웁니다.',
      category: 'BASIC_FINANCE',
      difficulty: 'BEGINNER',
      duration: 120,
      completionStatus: 'COMPLETED',
      progress: 100,
      lessons: 5,
      completedLessons: 5
    },
    {
      id: '2',
      title: '스마트한 예산 관리',
      description: '효율적인 예산 계획을 수립하고 지출을 관리하는 방법을 배웁니다. 다양한 예산 수립 기법과 지출 추적 도구를 소개합니다.',
      category: 'BUDGETING',
      difficulty: 'BEGINNER',
      duration: 90,
      completionStatus: 'IN_PROGRESS',
      progress: 75,
      lessons: 4,
      completedLessons: 3
    },
    {
      id: '3',
      title: '저축의 기술',
      description: '효과적인 저축 전략과 다양한 저축 상품에 대해 알아봅니다. 목표 저축, 비상금 마련, 자동 저축 방법 등을 학습합니다.',
      category: 'SAVING',
      difficulty: 'BEGINNER',
      duration: 60,
      completionStatus: 'NOT_STARTED',
      progress: 0,
      lessons: 3,
      completedLessons: 0
    },
    {
      id: '4',
      title: '투자 포트폴리오 구성',
      description: '다양한 투자 자산과 포트폴리오 구성 원칙을 배웁니다. 위험 분산, 자산 배분, 리밸런싱 전략을 학습합니다.',
      category: 'INVESTING',
      difficulty: 'INTERMEDIATE',
      duration: 150,
      completionStatus: 'IN_PROGRESS',
      progress: 30,
      lessons: 6,
      completedLessons: 2
    },
    {
      id: '5',
      title: '은퇴를 위한 재정 계획',
      description: '성공적인 은퇴를 위한 장기적인 재정 계획과 투자 전략을 배웁니다. 은퇴 자금 계산, 인출 전략, 사회보장제도 활용법을 다룹니다.',
      category: 'RETIREMENT',
      difficulty: 'INTERMEDIATE',
      duration: 180,
      completionStatus: 'NOT_STARTED',
      progress: 0,
      lessons: 7,
      completedLessons: 0
    },
    {
      id: '6',
      title: '효율적인 세금 계획',
      description: '세금을 최소화하고 재무 목표를 달성하기 위한 합법적인 세금 계획 전략을 배웁니다. 소득세, 투자세, 상속세 계획을 다룹니다.',
      category: 'TAX_PLANNING',
      difficulty: 'ADVANCED',
      duration: 200,
      completionStatus: 'NOT_STARTED',
      progress: 0,
      lessons: 8,
      completedLessons: 0
    },
    {
      id: '7',
      title: '현명한 부채 관리',
      description: '건강한 부채 사용법과 부채 감소 전략을 배웁니다. 신용점수 관리, 대출 종류별 특성, 부채 상환 우선순위 설정을 다룹니다.',
      category: 'DEBT_MANAGEMENT',
      difficulty: 'BEGINNER',
      duration: 110,
      completionStatus: 'COMPLETED',
      progress: 100,
      lessons: 5,
      completedLessons: 5
    },
    {
      id: '8',
      title: '주식 투자의 기본',
      description: '주식 시장의 작동 원리와 기본적인 주식 투자 전략을 배웁니다. 기업 분석, 가치 평가, 매수/매도 타이밍을 학습합니다.',
      category: 'INVESTING',
      difficulty: 'INTERMEDIATE',
      duration: 160,
      completionStatus: 'IN_PROGRESS',
      progress: 50,
      lessons: 6,
      completedLessons: 3
    }
  ];
  
  // 필터링된 모듈 목록
  const filteredModules = learningModules.filter(module => {
    // 카테고리 필터
    if (categoryFilter !== 'ALL' && module.category !== categoryFilter) {
      return false;
    }
    
    // 난이도 필터
    if (difficultyFilter !== 'ALL' && module.difficulty !== difficultyFilter) {
      return false;
    }
    
    // 상태 필터
    if (statusFilter !== 'ALL' && module.completionStatus !== statusFilter) {
      return false;
    }
    
    // 검색어 필터
    if (searchQuery && !module.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !module.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  return (
    <Layout>
      <PageHeader>
        <PageTitle>학습 모듈</PageTitle>
        <PageSubtitle>개인화된 금융 교육을 통해 재정 지식을 쌓고 현명한 결정을 내리세요.</PageSubtitle>
      </PageHeader>
      
      <FiltersContainer>
        <FilterGroup>
          <FilterLabel>카테고리</FilterLabel>
          <FilterSelect
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="ALL">모든 카테고리</option>
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
            <option value="ALL">모든 난이도</option>
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
            <option value="ALL">모든 상태</option>
            <option value="COMPLETED">완료</option>
            <option value="IN_PROGRESS">진행 중</option>
            <option value="NOT_STARTED">시작 전</option>
          </FilterSelect>
        </FilterGroup>
        
        <SearchContainer>
          <Input
            label="검색"
            placeholder="모듈 이름 또는 설명 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            isFullWidth
          />
        </SearchContainer>
      </FiltersContainer>
      
      {filteredModules.length > 0 ? (
        <ModulesGrid>
          {filteredModules.map((module) => (
            <ModuleCard
              key={module.id}
              variant="elevated"
              isHoverable
              footer={
                <Link to={`/learning/${module.id}`}>
                  <Button variant="primary" isFullWidth>
                    {module.completionStatus === 'NOT_STARTED'
                      ? '시작하기'
                      : module.completionStatus === 'IN_PROGRESS'
                      ? '계속하기'
                      : '다시 보기'}
                  </Button>
                </Link>
              }
            >
              <ModuleCardContent>
                <ModuleCategory category={module.category}>
                  {getCategoryLabel(module.category)}
                </ModuleCategory>
                <ModuleTitle>{module.title}</ModuleTitle>
                <ModuleDescription>{module.description}</ModuleDescription>
                
                <ModuleMeta>
                  <ModuleMetaItem>
                    <DifficultyBadge level={module.difficulty}>
                      {getDifficultyLabel(module.difficulty)}
                    </DifficultyBadge>
                  </ModuleMetaItem>
                  <ModuleMetaItem>
                    {module.duration}분
                  </ModuleMetaItem>
                </ModuleMeta>
                
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
              setCategoryFilter('ALL');
              setDifficultyFilter('ALL');
              setStatusFilter('ALL');
              setSearchQuery('');
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