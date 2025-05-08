import styled from 'styled-components';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';

export const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const PageSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.text}dd;
  font-size: 1.125rem;
`;

export const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 200px;
`;

export const FilterLabel = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.dark};
  font-size: 0.875rem;
`;

export const FilterSelect = styled.select`
  height: 42px;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  background-color: white;
  width: 200px;

  /* 화살표 위치 조정을 위한 스타일 추가 */
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 16px;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: none;
  }
`;

export const SearchContainer = styled.div`
  min-width: 500px;
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ExpertsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const ExpertCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 300px;
  position: relative;
  padding-bottom: 10px;
`;

export const ExpertHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ExpertAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary}22;
  margin-right: ${({ theme }) => theme.spacing.md};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ExpertImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ExpertInfo = styled.div`
  flex: 1;
`;

export const ExpertName = styled.h3`
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 1.25rem;
`;

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const Rating = styled.div`
  color: ${({ theme }) => theme.colors.warning};
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

export const ReviewCount = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text}aa;
`;

export const Price = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ExpertBio = styled.p`
  height: 100px;
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3; // 최대 3줄로 제한
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SpecialtiesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;
export const SpecialtyTag = styled.span`
  background-color: ${({ theme }) => theme.colors.primary}11;
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.875rem;
  font-weight: 500;
`;

export const ActionButton = styled(Button)`
  position: absolute;
  bottom: 10px;
  right: 0;
  margin: 0 20px;
  width: calc(100% - 40px);
`;

export const NoResultsContainer = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  grid-column: 1 / -1;
`;

export const NoResultsText = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.text}aa;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;