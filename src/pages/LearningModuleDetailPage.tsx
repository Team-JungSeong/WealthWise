import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { DifficultyLevel, LearningCategory } from '../types';

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

const ModuleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ModuleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const ModuleInfo = styled.div`
  flex: 1;
`;

const ModuleActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const ModuleBadges = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const Badge = styled.span<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor}22;
  color: ${({ bgColor }) => bgColor};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.875rem;
  font-weight: 500;
`;

const ModuleProgress = styled.div`
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const ProgressFill = styled.div<{ width: number; color: string }>`
  width: ${({ width }) => `${width}%`};
  height: 100%;
  background-color: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const TabContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TabButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TabButton = styled.button<{ isActive: boolean }>`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  background-color: transparent;
  border: none;
  border-bottom: 3px solid ${({ isActive, theme }) => isActive ? theme.colors.primary : 'transparent'};
  color: ${({ isActive, theme }) => isActive ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ isActive }) => isActive ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const LessonsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const LessonItem = styled.div<{ isActive: boolean; isCompleted: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ isActive, theme }) => isActive ? theme.colors.primary + '11' : 'white'};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    background-color: ${({ theme, isActive }) => isActive ? theme.colors.primary + '22' : theme.colors.light};
  }
`;

const LessonNumber = styled.div<{ isCompleted: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ isCompleted, theme }) => isCompleted ? theme.colors.success : theme.colors.primary}22;
  color: ${({ isCompleted, theme }) => isCompleted ? theme.colors.success : theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-right: ${({ theme }) => theme.spacing.md};
`;

const LessonInfo = styled.div`
  flex: 1;
`;

const LessonTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
`;

const LessonStatus = styled.span<{ isCompleted: boolean }>`
  font-size: 0.875rem;
  color: ${({ isCompleted, theme }) => isCompleted ? theme.colors.success : theme.colors.text + 'aa'};
`;

const ContentContainer = styled.div`
  line-height: 1.6;
  
  h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
    margin-top: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  img {
    max-width: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    margin: ${({ theme }) => theme.spacing.md} 0;
  }
  
  ul, ol {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding-left: ${({ theme }) => theme.spacing.lg};
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

// 가상의 모듈 데이터
const moduleData = {
  id: '1',
  title: '금융 기초 이해하기',
  description: '금융의 기본 개념과 원리를 이해하고 일상 생활에서 금융 결정을 내리는 데 필요한 지식을 습득합니다.',
  category: LearningCategory.BasicFinance,
  difficulty: DifficultyLevel.Beginner,
  duration: 120, // 분 단위
  progress: 25,
  lessons: [
    {
      id: '1',
      title: '금융이란 무엇인가?',
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
      `
    },
    {
      id: '2',
      title: '예금과 이자 이해하기',
      isCompleted: false,
      content: ''
    },
    {
      id: '3',
      title: '대출과 신용의 기본',
      isCompleted: false,
      content: ''
    },
    {
      id: '4',
      title: '투자의 기초 개념',
      isCompleted: false,
      content: ''
    },
    {
      id: '5',
      title: '리스크와 수익의 관계',
      isCompleted: false,
      content: ''
    }
  ]
};

const LearningModuleDetailPage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const [activeTab, setActiveTab] = useState<'content' | 'resources'>('content');
  const [activeLessonId, setActiveLessonId] = useState(moduleData.lessons[0].id);
  
  const activeLesson = moduleData.lessons.find(lesson => lesson.id === activeLessonId);
  
  return (
    <Layout>
      <PageHeader>
        <Link to="/learning">← 모든 학습 모듈로 돌아가기</Link>
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
                <Badge bgColor="#3366FF">
                  {moduleData.category === LearningCategory.BasicFinance && '기본 금융'}
                  {moduleData.category === LearningCategory.Budgeting && '예산 관리'}
                  {moduleData.category === LearningCategory.Investing && '투자'}
                </Badge>
                <Badge bgColor="#00C853">
                  {moduleData.difficulty === DifficultyLevel.Beginner && '초급'}
                  {moduleData.difficulty === DifficultyLevel.Intermediate && '중급'}
                  {moduleData.difficulty === DifficultyLevel.Advanced && '고급'}
                </Badge>
                <Badge bgColor="#FF6D00">소요 시간: {moduleData.duration}분</Badge>
              </ModuleBadges>
            </ModuleInfo>
            
            <ModuleActions>
              <Button variant="primary">계속 학습하기</Button>
            </ModuleActions>
          </ModuleHeader>
        </Card>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: '0 0 250px' }}>
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
                    {lesson.isCompleted ? '✓' : index + 1}
                  </LessonNumber>
                  <LessonInfo>
                    <LessonTitle>{lesson.title}</LessonTitle>
                    <LessonStatus isCompleted={lesson.isCompleted}>
                      {lesson.isCompleted ? '완료' : '미완료'}
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
                    isActive={activeTab === 'content'} 
                    onClick={() => setActiveTab('content')}
                  >
                    학습 내용
                  </TabButton>
                  <TabButton 
                    isActive={activeTab === 'resources'} 
                    onClick={() => setActiveTab('resources')}
                  >
                    추가 자료
                  </TabButton>
                </TabButtons>
                
                {activeTab === 'content' && activeLesson && (
                  <div>
                    <h2>{activeLesson.title}</h2>
                    <ContentContainer dangerouslySetInnerHTML={{ __html: activeLesson.content }} />
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                      <Button 
                        variant="light"
                        disabled={activeLessonId === moduleData.lessons[0].id}
                        onClick={() => {
                          const currentIndex = moduleData.lessons.findIndex(l => l.id === activeLessonId);
                          if (currentIndex > 0) {
                            setActiveLessonId(moduleData.lessons[currentIndex - 1].id);
                          }
                        }}
                      >
                        이전 단원
                      </Button>
                      <Button 
                        variant="primary"
                        disabled={activeLessonId === moduleData.lessons[moduleData.lessons.length - 1].id}
                        onClick={() => {
                          const currentIndex = moduleData.lessons.findIndex(l => l.id === activeLessonId);
                          if (currentIndex < moduleData.lessons.length - 1) {
                            setActiveLessonId(moduleData.lessons[currentIndex + 1].id);
                          }
                        }}
                      >
                        다음 단원
                      </Button>
                    </div>
                  </div>
                )}
                
                {activeTab === 'resources' && (
                  <div>
                    <h3>추천 참고 자료</h3>
                    <ul>
                      <li><a href="#">금융 기초 용어 사전</a></li>
                      <li><a href="#">금융 시스템 개요 도표</a></li>
                      <li><a href="#">한국은행 경제교육 자료</a></li>
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