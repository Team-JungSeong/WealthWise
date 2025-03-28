import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Breadcrumbs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-size: 0.875rem;
`;

const BreadcrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.text}aa;
  text-decoration: none;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BreadcrumbSeparator = styled.span`
  color: ${({ theme }) => theme.colors.text}aa;
`;

const PostContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
  }
`;

const MainContent = styled.div`
  flex: 1;
`;

const Sidebar = styled.div`
  width: 300px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
  }
`;

const PostHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PostCategory = styled.div`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background-color: ${({ theme }) => theme.colors.primary}11;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PostTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.75rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.text}aa;
  font-size: 0.875rem;
`;

const PostAuthorInfo = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary}22;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

const AuthorName = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dark};
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

const PostStatistics = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const PostContent = styled.div`
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  white-space: pre-line;
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const PostActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ActionButton = styled.button<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background-color: transparent;
  border: none;
  color: ${({ isActive, theme }) => isActive ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ isActive }) => isActive ? '500' : '400'};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CommentsSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CommentCount = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CommentForm = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1rem;
  resize: vertical;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const CommentItem = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const CommentDate = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text}aa;
`;

const CommentContent = styled.div`
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CommentActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const RelatedTopics = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TopicsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const TopicItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.xs} 0`};
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TopicIcon = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary}22;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
`;

const TopicText = styled.span`
  flex: 1;
`;

// 가상의 게시물 상세 데이터
const postDetail = {
  id: '1',
  category: 'investing',
  categoryName: '투자',
  title: '주식 투자를 처음 시작하는 방법',
  content: `안녕하세요, 금융 커뮤니티 여러분!

저는 최근에 월급을 모아 약간의 여유 자금이 생겨서 주식 투자를 시작해보려고 합니다. 하지만 어디서부터 시작해야 할지 막막하네요.

증권사 계좌는 개설했는데, 주식을 선택하는 기준이나 투자 전략 수립 방법, 그리고 주식 투자 초보자가 피해야 할 실수 등에 대해 조언을 구합니다.

월 100만원 정도를 투자할 계획이며, 단기보다는 중장기 투자를 생각하고 있습니다. 5~10년 정도의 시간적 여유는 있습니다.

다음과 같은 질문들이 있습니다:
1. 주식 투자 전에 꼭 알아야 할 기본 지식은 무엇인가요?
2. 종목 선택을 위한 기본적인 기준이 있을까요?
3. 초보자에게 추천하는 투자 방법이 있나요? (개별 주식 vs ETF vs 펀드)
4. 참고할 만한 책이나 웹사이트가 있다면 추천해주세요.

여러분의 경험과 조언이 큰 도움이 될 것 같습니다. 감사합니다!`,
  date: '2023-09-20',
  author: {
    id: 'user1',
    name: '김투자',
    avatar: 'K'
  },
  views: 1245,
  comments: [
    {
      id: 'c1',
      author: {
        id: 'user2',
        name: '이경험',
        avatar: 'L'
      },
      date: '2023-09-20',
      content: '저도 2년 전에 주식을 처음 시작했었는데요, 초보자라면 개별 주식보다 ETF로 시작하는 것을 추천드립니다. 특히 KODEX200 같은 인덱스 ETF가 안정적이에요. 책은 "주식 시장에서 살아남기"를 추천합니다.',
      likes: 5
    },
    {
      id: 'c2',
      author: {
        id: 'user3',
        name: '박배움',
        avatar: 'P'
      },
      date: '2023-09-21',
      content: '초보자가 가장 많이 하는 실수는 욕심을 내서 단기간에 큰 수익을 내려고 하는 것입니다. 장기적 관점에서 투자하시고, 분산 투자를 하세요. 그리고 투자 전에 꼭 비상금을 마련해두세요!',
      likes: 12
    },
    {
      id: 'c3',
      author: {
        id: 'user4',
        name: '최지식',
        avatar: 'C'
      },
      date: '2023-09-21',
      content: '주식 공부를 위해서는 회사의 재무제표를 읽는 법을 배우는 것이 좋습니다. "재무제표 모르면 주식투자 절대 하지마라"라는 책을 추천합니다. 또한 경제 뉴스를 매일 챙겨보세요.',
      likes: 8
    }
  ],
  likes: 56,
  isLiked: false
};

// 가상의 관련 토픽 데이터
const relatedTopics = [
  { id: '1', name: '주식투자 초보 가이드', count: 45 },
  { id: '2', name: 'ETF vs 개별주식', count: 32 },
  { id: '3', name: '재테크 시작하기', count: 67 },
  { id: '4', name: '장기투자 전략', count: 29 }
];

const ForumPostDetailPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(postDetail.isLiked);

  return (
    <Layout>
      <PageHeader>
        <Breadcrumbs>
          <BreadcrumbLink to="/">Home</BreadcrumbLink>
          <BreadcrumbSeparator>{'>'}</BreadcrumbSeparator>
          <BreadcrumbLink to="/community">Community</BreadcrumbLink>
          <BreadcrumbSeparator>{'>'}</BreadcrumbSeparator>
          <BreadcrumbLink to={`/community/post/${postId}`}>Post</BreadcrumbLink>
        </Breadcrumbs>
      </PageHeader>
      
      <PostContainer>
        <MainContent>
          <PostHeader>
            <PostCategory>{postDetail.categoryName}</PostCategory>
            <PostMeta>
              <span>{postDetail.date}</span>
              <span>Views: {postDetail.views}</span>
            </PostMeta>
          </PostHeader>
          <PostTitle>{postDetail.title}</PostTitle>
          <PostContent>{postDetail.content}</PostContent>
          <PostActions>
            <ActionButton isActive>Like</ActionButton>
            <ActionButton>Comment</ActionButton>
            <ActionButton>Share</ActionButton>
          </PostActions>
          <CommentsSection>
            <CommentCount>Comments</CommentCount>
            <CommentsList>
              {postDetail.comments.map(comment => (
                <CommentItem key={comment.id}>
                  <CommentHeader>
                    <CommentAuthor>
                      <AuthorAvatar>{comment.author.avatar}</AuthorAvatar>
                      <AuthorName>{comment.author.name}</AuthorName>
                    </CommentAuthor>
                    <CommentDate>{comment.date}</CommentDate>
                  </CommentHeader>
                  <CommentContent>{comment.content}</CommentContent>
                  <CommentActions>
                    <ActionButton>Like</ActionButton>
                    <ActionButton>Reply</ActionButton>
                  </CommentActions>
                </CommentItem>
              ))}
            </CommentsList>
            <CommentForm>
              <TextArea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
              />
              <Button variant="primary">Post</Button>
            </CommentForm>
          </CommentsSection>
          <RelatedTopics>
            <h3>Related Topics</h3>
            <TopicsList>
              {relatedTopics.map(topic => (
                <TopicItem key={topic.id}>
                  <TopicIcon>#</TopicIcon>
                  <TopicText>{topic.name}</TopicText>
                </TopicItem>
              ))}
            </TopicsList>
          </RelatedTopics>
        </MainContent>
        
        <Sidebar>
          <div style={{ marginBottom: '20px' }}>
            <Card variant="elevated">
              <h3>커뮤니티 가이드라인</h3>
              <p>서로를 존중하며 건설적인 대화를 나눠주세요.</p>
              <p>금융 조언은 참고용으로만 활용하시고, 중요한 결정은 전문가와 상담하세요.</p>
              <Button variant="light" isFullWidth>전체 가이드라인 보기</Button>
            </Card>
          </div>
          
          <Card variant="elevated">
            <h3>인기 토픽</h3>
            <TopicsList>
              {relatedTopics.map(topic => (
                <TopicItem key={topic.id}>
                  <TopicIcon>#</TopicIcon>
                  <TopicText>{topic.name}</TopicText>
                </TopicItem>
              ))}
            </TopicsList>
          </Card>
        </Sidebar>
      </PostContainer>
    </Layout>
  );
};

export default ForumPostDetailPage; 