import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Button from '../../components/common/Button';
import {
  PageHeader,
  Breadcrumbs,
  BreadcrumbLink,
  PostContainer,
  Sidebar,
  PostTitle,
  PostMeta,
  PostAuthorInfo,
  AuthorAvatar,
  AuthorName,
  PostStatistics,
  PostContent,
  PostActions,
  ActionButton,
  CommentsSection,
  CommentCount,
  CommentForm,
  TextArea,
  CommentsList,
  CommentItem,
  CommentHeader,
  CommentContent,
  CommentActions,
  RelatedTopics,
  TopicsList,
  TopicItem,
  TopicIcon,
  TopicText,
  WidgetTitle,
  WidgetContent
} from '../../styles/pages/community/ForumPostDetailPage.styled';

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

  const handleLikeClick = () => {
    setIsLiked(prev => !prev);
  };

  return (
    <Layout>
      <PageHeader>
        <Breadcrumbs>
          <BreadcrumbLink to="/">Home</BreadcrumbLink>
          <BreadcrumbLink to="/community">Community</BreadcrumbLink>
          <BreadcrumbLink to={`/community/post/${postId}`}>Post</BreadcrumbLink>
        </Breadcrumbs>
      </PageHeader>
      
      <PostContainer>
        <PostTitle>{postDetail.title}</PostTitle>
        <PostMeta>
          <PostAuthorInfo>
            <AuthorAvatar>{postDetail.author.avatar}</AuthorAvatar>
            <AuthorName>{postDetail.author.name}</AuthorName>
          </PostAuthorInfo>
          <PostStatistics.Container>
            <PostStatistics.Date>{postDetail.date}</PostStatistics.Date>
            <PostStatistics.Category>{postDetail.categoryName}</PostStatistics.Category>
            <PostStatistics.Views>{postDetail.views} views</PostStatistics.Views>
          </PostStatistics.Container>
        </PostMeta>
        <PostContent>{postDetail.content}</PostContent>
        <PostActions>
          <ActionButton variant="primary" isActive={isLiked} onClick={handleLikeClick}>
            {isLiked ? 'Liked' : 'Like'}
          </ActionButton>
          <ActionButton variant="secondary">Comment</ActionButton>
          <ActionButton variant="tertiary">Share</ActionButton>
        </PostActions>
        <CommentsSection>
          <CommentCount>Comments</CommentCount>
          <CommentsList>
            {postDetail.comments.map(comment => (
              <CommentItem key={comment.id}>
                <CommentHeader>
                  <AuthorAvatar>{comment.author.avatar}</AuthorAvatar>
                  <AuthorName>{comment.author.name}</AuthorName>
                </CommentHeader>
                <CommentContent>{comment.content}</CommentContent>
                <CommentActions>
                  <ActionButton variant="primary">Like</ActionButton>
                  <ActionButton variant="secondary">Reply</ActionButton>
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
            <ActionButton variant="primary">Post</ActionButton>
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
      </PostContainer>
      
      <Sidebar>
        <WidgetTitle>Community Guidelines</WidgetTitle>
        <WidgetContent>
          <p>Respect each other and have constructive conversations.</p>
          <p>Use financial advice as a reference only and consult with a professional for important decisions.</p>
          <Button variant="light" isFullWidth>View Full Guidelines</Button>
        </WidgetContent>
      </Sidebar>
      
      <Sidebar>
        <WidgetTitle>Popular Topics</WidgetTitle>
        <WidgetContent>
          <TopicsList>
            {relatedTopics.map(topic => (
              <TopicItem key={topic.id}>
                <TopicIcon>#</TopicIcon>
                <TopicText>{topic.name}</TopicText>
              </TopicItem>
            ))}
          </TopicsList>
        </WidgetContent>
      </Sidebar>
    </Layout>
  );
};

export default ForumPostDetailPage; 