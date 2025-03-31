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
  FormContainer,
  FormRow,
  FormCol,
  FormGroup,
  FormLabel,
  SliderContainer,
  SliderLabel,
  Slider,
  ActionButtons,
  ResultsContainer,
  ResultValue
} from '../../styles/pages/simulations/RetirementSimulationPage.styled';

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