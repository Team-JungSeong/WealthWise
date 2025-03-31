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

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

export const SectionHeader = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ProfileSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const ProfileCard = styled(Card)`
  height: 100%;
`;

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary}22;
  margin-right: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${({ theme }) => theme.colors.primary};
  overflow: hidden;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ProfileInfo = styled.div`
  flex: 1;
`;

export const ProfileName = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const ProfileEmail = styled.p`
  color: ${({ theme }) => theme.colors.text}aa;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const ProgressContainer = styled.div`
  margin: ${({ theme }) => `${theme.spacing.md} 0`};
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const ProgressTitle = styled.h4`
  margin: 0;
  font-weight: 500;
  font-size: 1rem;
`;

export const ProgressValue = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ width: number; color: string }>`
  width: ${({ width }) => `${width}%`};
  height: 100%;
  background-color: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const FormRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;