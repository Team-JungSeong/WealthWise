import styled from 'styled-components';

export const PageHeader = styled.div`
  font-size: 0.85rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  a {
    text-decoration: none;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text}aa;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
      text-decoration: underline;
    }
  }
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

export const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const StepIndicator = styled.div<{ isActive: boolean; isCompleted: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 20px;
    right: -50%;
    width: 100%;
    height: 2px;
    background-color: ${({ isCompleted, theme }) => 
      isCompleted ? theme.colors.primary : theme.colors.border};
    z-index: 0;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
    
    &:not(:last-child)::after {
      display: none;
    }
  }
`;

export const StepCircle = styled.div<{ isActive: boolean; isCompleted: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ isActive, isCompleted, theme }) => 
    isCompleted ? theme.colors.success :
    isActive ? theme.colors.primary : 'white'};
  border: 2px solid ${({ isActive, isCompleted, theme }) => 
    isCompleted ? theme.colors.success :
    isActive ? theme.colors.primary : theme.colors.border};
  color: ${({ isActive, isCompleted, theme }) => 
    (isActive || isCompleted) ? 'white' : theme.colors.text};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  z-index: 1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: 0;
  }
`;

export const StepLabel = styled.div<{ isActive: boolean; isCompleted: boolean }>`
  font-weight: ${({ isActive }) => isActive ? '600' : '400'};
  color: ${({ isActive, isCompleted, theme }) => 
    isCompleted ? theme.colors.success :
    isActive ? theme.colors.primary : theme.colors.text};
  text-align: center;
`;

export const FormContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export const FormRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

export const FormCol = styled.div<{ width?: string }>`
  flex: ${({ width }) => width || '1'};
`;

export const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: 500;
`;

export const SliderContainer = styled.div`
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

export const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const Slider = styled.input`
  width: 100%;
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const ResultValue = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => `${theme.spacing.md} 0`};
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f9f9f9;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

export const ProgressFill = styled.div<{ width: number; color: string }>`
  width: ${({ width }) => `${width}%`};
  height: 100%;
  background-color: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;