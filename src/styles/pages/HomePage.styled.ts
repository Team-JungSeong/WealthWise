import styled from 'styled-components';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';

export const Hero = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.xl} 0`};
  margin-bottom: ${({ theme }) => `${theme.spacing.xl}`};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    text-align: center;
    gap: ${({ theme }) => theme.spacing.xl};
  }
`;

export const HeroContent = styled.div`
  flex: 1;
  max-width: 630px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 100%;
    order: 2;
  }
`;

export const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.dark};
  line-height: 1.2;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 2rem;
  }
`;

export const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text}dd;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.125rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

export const StyledButton = styled(Button)`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  font-weight: 500;
`;

export const HeroImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    order: 1;
    justify-content: center;
    width: 100%;
  }
`;

export const HeroImage = styled.img`
  width: 610px;
  height: 580px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: opacity 1s ease-in-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 80%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 100%;
  }
`;

export const Section = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xl} 0`};
`;

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.dark};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.75rem;
  }
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
`;

export const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.primary};
`;

export const FeatureTitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.dark};
`;

export const FeatureDescription = styled.p`
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`;

export const TestimonialsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  margin: 0 -${({ theme }) => theme.spacing.md};
  padding: 0 ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.md};

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.light};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.primary}88;
  }
`;

export const TestimonialCard = styled(Card)`
  min-width: 300px;
  max-width: 400px;
  flex: 0 0 auto;
`;

export const Quote = styled.blockquote`
  font-style: italic;
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  line-height: 1.6;
`;

export const Author = styled.div`
  display: flex;
  align-items: center;
`;

export const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  margin-right: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.3rem;
  font-weight: 600;
`;

export const AuthorInfo = styled.div``;

export const AuthorName = styled.p`
  font-weight: 600;
  margin: 0;
`;

export const AuthorTitle = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text}aa;
  margin: 0;
`;

export const CTASection = styled.section`
  background-color: ${({ theme }) => theme.colors.primary}11;
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin: ${({ theme }) => `${theme.spacing.xl} 0`};
  text-align: center;
`;

export const CTATitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.dark};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1.75rem;
  }
`;

export const CTAText = styled.p`
  font-size: 1.125rem;
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
  }
`;