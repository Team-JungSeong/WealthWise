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
  color: ${({ theme }) => `${theme.colors.text}dd`};
  font-size: 1.125rem;
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

export const RadioContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.xs} 0;
`;

export const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
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
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const ResultItem = styled.div`
  text-align: center;
`;

export const ResultLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text}aa;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const ResultValue = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f9f9f9;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

export const ScheduleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

export const TableHeader = styled.th`
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.light};
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.light}50;
  }
`;