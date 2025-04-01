import React, { useState } from 'react';
import Layout from '../../components/common/Layout';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { LearningCategory } from '../../types';
import {
  PageHeader,
  PageTitle,
  PageSubtitle,
  FiltersContainer,
  FilterGroup,
  FilterLabel,
  FilterSelect,
  SearchContainer,
  ExpertsGrid,
  ExpertCard,
  ExpertHeader,
  ExpertAvatar,
  ExpertImage,
  ExpertInfo,
  ExpertName,
  RatingContainer,
  Rating,
  ReviewCount,
  Price,
  ExpertBio,
  SpecialtiesList,
  SpecialtyTag,
  ActionButton,
  NoResultsContainer,
  NoResultsText
} from '../../styles/pages/experts/ExpertsPage.styled';

// 가상의 전문가 데이터
const expertsMockData = [
  {
    id: '1',
    name: '김재원',
    avatarUrl: 'https://placehold.co/150',
    rating: 4.9,
    reviewCount: 128,
    hourlyRate: 80000,
    bio: '10년차 자산관리사로 개인 재무 설계 및 투자 포트폴리오 구성 전문가입니다. 누구나 이해하기 쉬운 맞춤형 재무 상담을 제공합니다.',
    specialties: [LearningCategory.Investing, LearningCategory.Retirement, LearningCategory.TaxPlanning]
  },
  {
    id: '2',
    name: '이민지',
    avatarUrl: 'https://placehold.co/150',
    rating: 4.8,
    reviewCount: 94,
    hourlyRate: 70000,
    bio: '부동산 투자 전문가로, 주택 구입부터 상업용 부동산 투자까지 다양한 경험을 가지고 있습니다. 시장 분석과 투자 전략 수립에 강점이 있습니다.',
    specialties: [LearningCategory.RealEstate, LearningCategory.Investing, LearningCategory.DebtManagement]
  },
  {
    id: '3',
    name: '박진호',
    avatarUrl: 'https://placehold.co/150',
    rating: 4.7,
    reviewCount: 76,
    hourlyRate: 75000,
    bio: '15년 경력의 세무사로, 세금 최적화 및 효율적인 자산 구조화에 전문성을 갖고 있습니다. 복잡한 세금 문제를 쉽게 풀어드립니다.',
    specialties: [LearningCategory.TaxPlanning, LearningCategory.Retirement, LearningCategory.Insurance]
  },
  {
    id: '4',
    name: '최수영',
    avatarUrl: 'https://placehold.co/150',
    rating: 4.9,
    reviewCount: 112,
    hourlyRate: 85000,
    bio: '주식 및 암호화폐 투자 전문가로, 기술적 분석과 펀더멘털 분석을 통한 투자 전략을 제시합니다. 누구나 쉽게 따라할 수 있는 투자 방법을 알려드립니다.',
    specialties: [LearningCategory.Investing, LearningCategory.AdvancedInvesting, LearningCategory.BasicFinance]
  },
  {
    id: '5',
    name: '정도윤',
    avatarUrl: 'https://placehold.co/150',
    rating: 4.6,
    reviewCount: 68,
    hourlyRate: 65000,
    bio: '가계부채 관리 및 부채 탈출 전략 전문가입니다. 당신의 재정 상황을 분석하고 부채 상환 계획을 세우는 데 도움을 드립니다.',
    specialties: [LearningCategory.DebtManagement, LearningCategory.Budgeting, LearningCategory.Saving]
  },
  {
    id: '6',
    name: '한지윤',
    avatarUrl: 'https://placehold.co/150',
    rating: 4.8,
    reviewCount: 87,
    hourlyRate: 75000,
    bio: '은퇴 계획 및 연금 설계 전문가입니다. 당신의 은퇴 후 생활을 위한 최적의 재정 전략을 함께 고민합니다.',
    specialties: [LearningCategory.Retirement, LearningCategory.Investing, LearningCategory.TaxPlanning]
  }
];

const ExpertsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [rating, setRating] = useState<string>('all');
  
  // 전문가 필터링
  const filteredExperts = expertsMockData.filter(expert => {
    // 검색어 필터링
    if (searchQuery && !expert.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !expert.bio.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // 전문 분야 필터링
    if (selectedSpecialty !== 'all' && !expert.specialties.includes(selectedSpecialty as LearningCategory)) {
      return false;
    }
    
    // 가격 범위 필터링
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      if (max && (expert.hourlyRate < min || expert.hourlyRate > max)) {
        return false;
      } else if (!max && expert.hourlyRate < min) {
        return false;
      }
    }
    
    // 평점 필터링
    if (rating !== 'all') {
      const minRating = parseFloat(rating);
      if (expert.rating < minRating) {
        return false;
      }
    }
    
    return true;
  });
  
  // 가격 포맷팅 함수
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
  };
  
  // 평점 렌더링 함수
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) {
      stars += '☆';
    }
    
    return stars;
  };

  return (
    <Layout>
      <PageHeader>
        <PageTitle>금융 전문가 상담</PageTitle>
        <PageSubtitle>
          당신의 재정 목표 달성을 위해 전문가의 맞춤형 상담을 받아보세요.
          각 분야 최고의 전문가들이 실질적인 도움을 드립니다.
        </PageSubtitle>
      </PageHeader>
      
      <FiltersContainer>
        <SearchContainer>
          <Input 
            placeholder="전문가 이름 또는 키워드로 검색" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            isFullWidth
          />
        </SearchContainer>
        
        <FilterGroup>
          <FilterLabel>전문 분야</FilterLabel>
          <FilterSelect 
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            <option value="all">모든 분야</option>
            <option value={LearningCategory.BasicFinance}>기본 금융</option>
            <option value={LearningCategory.Budgeting}>예산 관리</option>
            <option value={LearningCategory.DebtManagement}>부채 관리</option>
            <option value={LearningCategory.Investing}>투자</option>
            <option value={LearningCategory.AdvancedInvesting}>고급 투자</option>
            <option value={LearningCategory.RealEstate}>부동산</option>
            <option value={LearningCategory.Retirement}>은퇴</option>
            <option value={LearningCategory.TaxPlanning}>세금 계획</option>
            <option value={LearningCategory.Insurance}>보험</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>가격 범위</FilterLabel>
          <FilterSelect 
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            <option value="all">모든 가격</option>
            <option value="0-50000">5만원 이하</option>
            <option value="50000-70000">5만원 - 7만원</option>
            <option value="70000-90000">7만원 - 9만원</option>
            <option value="90000-">9만원 이상</option>
          </FilterSelect>
        </FilterGroup>
        
        <FilterGroup>
          <FilterLabel>평점</FilterLabel>
          <FilterSelect 
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="all">모든 평점</option>
            <option value="4.5">4.5 이상</option>
            <option value="4.0">4.0 이상</option>
            <option value="3.5">3.5 이상</option>
          </FilterSelect>
        </FilterGroup>
      </FiltersContainer>
      
      <ExpertsGrid>
        {filteredExperts.length > 0 ? (
          filteredExperts.map(expert => (
            <ExpertCard key={expert.id} variant="elevated">
              <ExpertHeader>
                <ExpertAvatar>
                  {expert.avatarUrl ? (
                    <ExpertImage src={expert.avatarUrl} alt={expert.name} />
                  ) : (
                    expert.name.charAt(0)
                  )}
                </ExpertAvatar>
                <ExpertInfo>
                  <ExpertName>{expert.name}</ExpertName>
                  <RatingContainer>
                    <Rating>{renderRating(expert.rating)}</Rating>
                    <ReviewCount>({expert.rating} / {expert.reviewCount}개 리뷰)</ReviewCount>
                  </RatingContainer>
                  <Price>시간당 {formatPrice(expert.hourlyRate)}</Price>
                </ExpertInfo>
              </ExpertHeader>
              
              <ExpertBio>{expert.bio}</ExpertBio>
              
              <SpecialtiesList>
                {expert.specialties.map(specialty => (
                  <SpecialtyTag key={specialty}>
                    {specialty === LearningCategory.BasicFinance && '기본 금융'}
                    {specialty === LearningCategory.Budgeting && '예산 관리'}
                    {specialty === LearningCategory.DebtManagement && '부채 관리'}
                    {specialty === LearningCategory.Investing && '투자'}
                    {specialty === LearningCategory.AdvancedInvesting && '고급 투자'}
                    {specialty === LearningCategory.RealEstate && '부동산'}
                    {specialty === LearningCategory.Retirement && '은퇴'}
                    {specialty === LearningCategory.TaxPlanning && '세금 계획'}
                    {specialty === LearningCategory.Insurance && '보험'}
                    {specialty === LearningCategory.Saving && '저축'}
                  </SpecialtyTag>
                ))}
              </SpecialtiesList>
              
              <ActionButton variant="primary">상담 예약하기</ActionButton>
            </ExpertCard>
          ))
        ) : (
          <NoResultsContainer>
            <NoResultsText>검색 결과가 없습니다. 다른 키워드로 검색해보세요.</NoResultsText>
            <Button variant="primary" onClick={() => {
              setSearchQuery('');
              setSelectedSpecialty('all');
              setPriceRange('all');
              setRating('all');
            }}>
              필터 초기화
            </Button>
          </NoResultsContainer>
        )}
      </ExpertsGrid>
    </Layout>
  );
};

export default ExpertsPage; 