import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../components/common/Layout';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const PageHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.dark};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PageSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.text}dd;
  font-size: 1.125rem;
`;

const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const StepIndicator = styled.div<{ isActive: boolean; isCompleted: boolean }>`
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

const StepCircle = styled.div<{ isActive: boolean; isCompleted: boolean }>`
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

const StepLabel = styled.div<{ isActive: boolean; isCompleted: boolean }>`
  font-weight: ${({ isActive }) => isActive ? '600' : '400'};
  color: ${({ isActive, isCompleted, theme }) => 
    isCompleted ? theme.colors.success :
    isActive ? theme.colors.primary : theme.colors.text};
  text-align: center;
`;

const FormContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FormRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const FormCol = styled.div<{ width?: string }>`
  flex: ${({ width }) => width || '1'};
`;

const FormGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: 500;
`;

const SliderContainer = styled.div`
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Slider = styled.input`
  width: 100%;
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ResultValue = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => `${theme.spacing.md} 0`};
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f9f9f9;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.light};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
  margin: ${({ theme }) => theme.spacing.md} 0;
`;

const ProgressFill = styled.div<{ width: number; color: string }>`
  width: ${({ width }) => `${width}%`};
  height: 100%;
  background-color: ${({ color }) => color};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const RetirementSimulationPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  // 시뮬레이션 파라미터
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [lifeExpectancy, setLifeExpectancy] = useState('85');
  const [currentSavings, setCurrentSavings] = useState('10000000');
  const [monthlySavings, setMonthlySavings] = useState('500000');
  const [expectedReturn, setExpectedReturn] = useState('6');
  const [inflationRate, setInflationRate] = useState('3');
  const [monthlyExpenses, setMonthlyExpenses] = useState('3000000');
  
  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };
  
  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const formatCurrency = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
  };
  
  // 은퇴 시뮬레이션 계산
  const calculateRetirementResults = () => {
    const currentAgeValue = parseInt(currentAge) || 30;
    const retirementAgeValue = parseInt(retirementAge) || 65;
    const lifeExpectancyValue = parseInt(lifeExpectancy) || 85;
    const currentSavingsValue = parseFloat(currentSavings) || 0;
    const monthlySavingsValue = parseFloat(monthlySavings) || 0;
    const expectedReturnValue = parseFloat(expectedReturn) || 0;
    const inflationRateValue = parseFloat(inflationRate) || 0;
    const monthlyExpensesValue = parseFloat(monthlyExpenses) || 0;
    
    // 은퇴까지 남은 연수
    const yearsToRetirement = retirementAgeValue - currentAgeValue;
    
    // 은퇴 기간 연수
    const retirementDuration = lifeExpectancyValue - retirementAgeValue;
    
    // 인플레이션 반영 은퇴 생활비 (월)
    const inflatedMonthlyExpenses = monthlyExpensesValue * Math.pow(1 + inflationRateValue / 100, yearsToRetirement);
    
    // 은퇴 필요 자금 (인출율 4% 가정)
    const withdrawalRate = 0.04; // 연 4%
    const requiredRetirementFund = (inflatedMonthlyExpenses * 12) / withdrawalRate;
    
    // 은퇴시 예상 저축액
    const monthlyRate = expectedReturnValue / 100 / 12;
    const totalMonths = yearsToRetirement * 12;
    
    let projectedSavings = currentSavingsValue;
    for (let i = 0; i < totalMonths; i++) {
      projectedSavings = (projectedSavings + monthlySavingsValue) * (1 + monthlyRate);
    }
    
    // 목표 달성률
    const achievementRate = Math.min(100, (projectedSavings / requiredRetirementFund) * 100);
    
    // 월 추가 저축 필요액
    let additionalSavingsNeeded = 0;
    if (projectedSavings < requiredRetirementFund) {
      // 간단한 근사치 계산 (실제로는 더 복잡한 계산이 필요)
      const shortfall = requiredRetirementFund - projectedSavings;
      const futureValueFactor = ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
      additionalSavingsNeeded = shortfall / futureValueFactor;
    }
    
    return {
      yearsToRetirement,
      retirementDuration,
      inflatedMonthlyExpenses: Math.round(inflatedMonthlyExpenses),
      requiredRetirementFund: Math.round(requiredRetirementFund),
      projectedSavings: Math.round(projectedSavings),
      achievementRate: Math.round(achievementRate),
      additionalSavingsNeeded: Math.round(additionalSavingsNeeded)
    };
  };

  const results = calculateRetirementResults();

  return (
    <Layout>
      <PageHeader>
        <Link to="/simulations">← 모든 시뮬레이션으로 돌아가기</Link>
        <PageTitle>은퇴 시뮬레이션</PageTitle>
        <PageSubtitle>
          은퇴 후 필요한 자금과 현재 저축 계획으로 목표 달성 가능 여부를 확인합니다.
          편안한 노후 생활을 위한 최적의 저축 및 투자 계획을 세워보세요.
        </PageSubtitle>
      </PageHeader>
      
      <Card variant="elevated">
        {currentStep === 1 && (
          <FormContainer>
            <FormRow>
              <FormCol>
                <FormGroup>
                  <FormLabel>현재 나이</FormLabel>
                  <Input
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(e.target.value)}
                  />
                </FormGroup>
              </FormCol>
              <FormCol>
                <FormGroup>
                  <FormLabel>은퇴 예정 나이</FormLabel>
                  <Input
                    type="number"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(e.target.value)}
                  />
                </FormGroup>
              </FormCol>
            </FormRow>
            <FormRow>
              <FormCol>
                <FormGroup>
                  <FormLabel>은퇴 후 생활 기간</FormLabel>
                  <Input
                    type="number"
                    value={lifeExpectancy}
                    onChange={(e) => setLifeExpectancy(e.target.value)}
                  />
                </FormGroup>
              </FormCol>
            </FormRow>
            <FormRow>
              <FormCol>
                <FormGroup>
                  <FormLabel>현재 저축액</FormLabel>
                  <Input
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(e.target.value)}
                  />
                </FormGroup>
              </FormCol>
              <FormCol>
                <FormGroup>
                  <FormLabel>월 저축액</FormLabel>
                  <Input
                    type="number"
                    value={monthlySavings}
                    onChange={(e) => setMonthlySavings(e.target.value)}
                  />
                </FormGroup>
              </FormCol>
            </FormRow>
            <FormRow>
              <FormCol>
                <FormGroup>
                  <FormLabel>예상 수익률</FormLabel>
                  <Input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(e.target.value)}
                  />
                </FormGroup>
              </FormCol>
              <FormCol>
                <FormGroup>
                  <FormLabel>인플레이션율</FormLabel>
                  <Input
                    type="number"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(e.target.value)}
                  />
                </FormGroup>
              </FormCol>
            </FormRow>
            <FormRow>
              <FormCol>
                <FormGroup>
                  <FormLabel>월 생활비</FormLabel>
                  <Input
                    type="number"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(e.target.value)}
                  />
                </FormGroup>
              </FormCol>
            </FormRow>
            <ActionButtons>
              <Button variant="light" onClick={handlePreviousStep}>이전</Button>
              <Button variant="primary" onClick={handleNextStep}>다음</Button>
            </ActionButtons>
          </FormContainer>
        )}

        {currentStep === 2 && (
          <FormContainer>
            <ResultsContainer>
              <ResultValue>
                {formatCurrency(results.projectedSavings)}
              </ResultValue>
              <ResultValue>
                {formatCurrency(results.requiredRetirementFund)}
              </ResultValue>
            </ResultsContainer>
            <ProgressBar>
              <ProgressFill 
                width={results.achievementRate} 
                color={
                  results.achievementRate >= 100 ? '#00C853' : 
                  results.achievementRate >= 70 ? '#FFD600' : '#F44336'
                } 
              />
            </ProgressBar>
            <SliderContainer>
              <SliderLabel>
                <span>0%</span>
                <span>100%</span>
              </SliderLabel>
              <Slider
                type="range"
                min="0"
                max="100"
                value={results.achievementRate}
                onChange={(e) => {
                  // Handle range change
                }}
              />
            </SliderContainer>
            <ActionButtons>
              <Button variant="light" onClick={handlePreviousStep}>이전</Button>
              <Button variant="primary" onClick={handleNextStep}>다음</Button>
            </ActionButtons>
          </FormContainer>
        )}

        {currentStep === 3 && (
          <FormContainer>
            <ResultsContainer>
              <ResultValue>
                {formatCurrency(results.additionalSavingsNeeded)}
              </ResultValue>
            </ResultsContainer>
            <ActionButtons>
              <Button variant="light" onClick={handlePreviousStep}>이전</Button>
              <Button variant="primary">결과 저장하기</Button>
            </ActionButtons>
          </FormContainer>
        )}
      </Card>
    </Layout>
  );
};

export default RetirementSimulationPage; 