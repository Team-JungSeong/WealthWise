import styled from 'styled-components';
import Card from '../../../components/common/Card';

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

export const SimulationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const SimulationCard = styled(Card)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const SimulationIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.primary};
`;

export const SimulationTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const SimulationDescription = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex: 1;
  line-height: 1.6;
`;

export const RecentSimulationsSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.75rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const RecentItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const RecentItemCard = styled(Card)`
  display: flex;
  flex-direction: column;
`;

export const RecentItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const RecentItemType = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
`;

export const RecentItemDate = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text}aa;
`;

export const ResultValue = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;