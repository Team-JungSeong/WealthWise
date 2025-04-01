import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/common/Layout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import {
  PageHeader,
  PageTitle,
  PageSubtitle,
  SearchAndFilters,
  CommunityContainer,
  MainContent,
  Sidebar,
  CategoryTabs,
  CategoryTab,
  PostList,
  PostItem,
  PostHeader,
  PostCategory,
  PostDate,
  PostTitle,
  PostExcerpt,
  PostFooter,
  PostStats,
  PostAuthor,
  AuthorAvatar,
  AuthorName,
  Pagination,
  PageButton,
  TrendingTopics,
  TopicsList,
  TopicItem,
  TopicIcon,
  TopicText,
  TopicCount,
} from '../../styles/pages/community/CommunityPage.styled';

// 가상의 카테고리 데이터
const categories = [
  { id: 'all', name: '전체' },
  { id: 'investing', name: '투자' },
  { id: 'savings', name: '저축' },
  { id: 'budgeting', name: '예산관리' },
  { id: 'debt', name: '부채관리' },
  { id: 'retirement', name: '은퇴계획' },
  { id: 'tax', name: '세금' },
  { id: 'housing', name: '주택/부동산' },
  { id: 'insurance', name: '보험' },
  { id: 'career', name: '직업/수입' }
];

// 가상의 게시물 데이터
const posts = [
  {
    id: '1',
    category: 'investing',
    title: '주식 투자를 처음 시작하는 방법',
    excerpt: '주식 투자를 시작하려고 하는데 어디서부터 시작해야 할지 모르겠습니다. 초보자가 시작하기 좋은 방법이나 조언 부탁드립니다.',
    date: '2023-09-20',
    author: {
      id: 'user1',
      name: '김투자',
      avatar: 'K'
    },
    views: 1245,
    comments: 32,
    likes: 56
  },
  {
    id: '2',
    category: 'debt',
    title: '학자금 대출 상환 전략',
    excerpt: '대학 졸업 후 학자금 대출을 가장 효과적으로 상환하는 방법이 궁금합니다. 원리금 균등 상환과 원금 균등 상환 중 어떤 방식이 더 유리할까요?',
    date: '2023-09-18',
    author: {
      id: 'user2',
      name: '이대출',
      avatar: 'L'
    },
    views: 879,
    comments: 24,
    likes: 41
  },
  {
    id: '3',
    category: 'retirement',
    title: '30대에 시작하는 은퇴 준비',
    excerpt: '아직 30대 초반이지만 은퇴 준비를 시작하려고 합니다. 어떤 금융 상품을 활용하는 것이 좋을까요? 연금 저축? IRP? 추천 부탁드립니다.',
    date: '2023-09-15',
    author: {
      id: 'user3',
      name: '박미래',
      avatar: 'P'
    },
    views: 1567,
    comments: 45,
    likes: 89
  },
  {
    id: '4',
    category: 'budgeting',
    title: '효과적인 가계부 작성법',
    excerpt: '가계부를 작성하려고 하는데 어떤 방식으로 해야 효과적인가요? 앱을 사용하시나요 아니면 엑셀이나 수기로 작성하시나요?',
    date: '2023-09-12',
    author: {
      id: 'user4',
      name: '최예산',
      avatar: 'C'
    },
    views: 932,
    comments: 28,
    likes: 37
  },
  {
    id: '5',
    category: 'housing',
    title: '전세 vs 월세 vs 구매, 어떤 선택이 좋을까?',
    excerpt: '현재 전세 계약이 만료되어 갱신 또는 이사를 고민 중입니다. 전세, 월세, 매매 중 어떤 선택이 재정적으로 더 유리할까요?',
    date: '2023-09-10',
    author: {
      id: 'user5',
      name: '정주택',
      avatar: 'J'
    },
    views: 2103,
    comments: 56,
    likes: 73
  }
];

// 가상의 인기 토픽 데이터
const trendingTopics = [
  { id: '1', name: '인플레이션 대응 방법', count: 125 },
  { id: '2', name: '주택담보대출 금리 상승', count: 98 },
  { id: '3', name: '주식시장 전망', count: 87 },
  { id: '4', name: '재테크 초보 시작하기', count: 76 },
  { id: '5', name: '연말정산 꿀팁', count: 65 }
];

const CommunityPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPosts = posts.filter(post => 
    (activeCategory === 'all' || post.category === activeCategory) &&
    (searchQuery === '' || 
     post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <Layout>
      <PageHeader>
        <PageTitle>커뮤니티</PageTitle>
        <PageSubtitle>
          재정 관련 질문을 하고 다른 사용자들의 경험과 조언을 얻으세요.
          모두가 함께 성장하는 금융 커뮤니티에 참여하세요.
        </PageSubtitle>
      </PageHeader>
      
      <SearchAndFilters>
        <Input 
          placeholder="검색어를 입력하세요" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          leftIcon={<span>🔍</span>}
          style={{ flex: 1 }}
        />
        <Button variant="primary">질문하기</Button>
      </SearchAndFilters>
      
      <CommunityContainer>
        <MainContent>
          <CategoryTabs>
            {categories.map(category => (
              <CategoryTab 
                key={category.id}
                $isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </CategoryTab>
            ))}
          </CategoryTabs>
          
          <PostList>
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <PostItem key={post.id}>
                  <PostHeader>
                    <PostCategory>
                      {categories.find(c => c.id === post.category)?.name}
                    </PostCategory>
                    <PostDate>{post.date}</PostDate>
                  </PostHeader>
                  <Link to={`/community/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <PostTitle>{post.title}</PostTitle>
                  </Link>
                  <PostExcerpt>{post.excerpt}</PostExcerpt>
                  <PostFooter>
                    <PostStats>
                      <span>👁️ {post.views}</span>
                      <span>💬 {post.comments}</span>
                      <span>👍 {post.likes}</span>
                    </PostStats>
                    <PostAuthor>
                      <AuthorAvatar>{post.author.avatar}</AuthorAvatar>
                      <AuthorName>{post.author.name}</AuthorName>
                    </PostAuthor>
                  </PostFooter>
                </PostItem>
              ))
            ) : (
              <div style={{ padding: '40px 0', textAlign: 'center' }}>
                <p>검색 결과가 없습니다.</p>
                <Button 
                  variant="light" 
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                >
                  필터 초기화
                </Button>
              </div>
            )}
          </PostList>
          
          <Pagination>
            <PageButton>«</PageButton>
            <PageButton $isActive>1</PageButton>
            <PageButton>2</PageButton>
            <PageButton>3</PageButton>
            <PageButton>4</PageButton>
            <PageButton>5</PageButton>
            <PageButton>»</PageButton>
          </Pagination>
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
            <TrendingTopics>
              <h3>인기 토픽</h3>
              <TopicsList>
                {trendingTopics.map(topic => (
                  <TopicItem key={topic.id}>
                    <TopicIcon>#</TopicIcon>
                    <TopicText>{topic.name}</TopicText>
                    <TopicCount>{topic.count}</TopicCount>
                  </TopicItem>
                ))}
              </TopicsList>
            </TrendingTopics>
          </Card>
        </Sidebar>
      </CommunityContainer>
    </Layout>
  );
};

export default CommunityPage; 