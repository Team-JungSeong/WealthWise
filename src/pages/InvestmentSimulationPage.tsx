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

const RadioContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.sm} 0;
  flex-wrap: wrap;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  
  input {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const InvestmentSimulationPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  
  // 시뮬레이션 파라미터
  const [initialAmount, setInitialAmount] = useState('1000000');
  const [monthlyContribution, setMonthlyContribution] = useState('100000');
  const [years, setYears] = useState('20');
  const [riskLevel, setRiskLevel] = useState('moderate');
  const [expectedReturn, setExpectedReturn] = useState('7');
  
  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };
  
  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const formatCurrency = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
  };
  
  const calculateInvestmentResults = () => {
    const initial = parseFloat(initialAmount) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const period = parseInt(years) || 0;
    const rate = parseFloat(expectedReturn) || 0;
    
    const monthlyRate = rate / 100 / 12;
    const totalMonths = period * 12;
    
    let futureValue = initial;
    let totalContributions = initial;
    
    for (let i = 1; i <= totalMonths; i++) {
      futureValue = (futureValue + monthly) * (1 + monthlyRate);
      totalContributions += monthly;
    }
    
    return {
      futureValue: Math.round(futureValue),
      totalContributions,
      interestEarned: Math.round(futureValue - totalContributions)
    };
  };
  
  const results = calculateInvestmentResults();
  
  const getReturnRangeByRisk = (risk: string) => {
    switch (risk) {
      case 'veryLow': return { min: 2, max: 4 };
      case 'low': return { min: 4, max: 6 };
      case 'moderate': return { min: 6, max: 8 };
      case 'high': return { min: 8, max: 12 };
      case 'veryHigh': return { min: 10, max: 15 };
      default: return { min: 6, max: 8 };
    }
  };
  
  const handleRiskChange = (risk: string) => {
    setRiskLevel(risk);
    const returns = getReturnRangeByRisk(risk);
    setExpectedReturn(((returns.min + returns.max) / 2).toString());
  };

  return (
    <Layout>
      <Card>
        <PageHeader>
          <PageTitle>투자 시뮬레이션</PageTitle>
          <PageSubtitle>투자 시뮬레이션을 통해 투자 결과를 예측해보세요.</PageSubtitle>
        </PageHeader>
        
        {currentStep === 1 && (
          <FormContainer>
            <h2>초기 투자 정보</h2>
            <p>투자 시뮬레이션을 위한 기본 정보를 입력하세요.</p>
            
            <FormGroup>
              <FormLabel>초기 투자 금액</FormLabel>
              <Input 
                type="number"
                placeholder="예: 1000000"
                value={initialAmount}
                onChange={(e) => setInitialAmount(e.target.value)}
                isFullWidth
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>월 적립액</FormLabel>
              <Input 
                type="number"
                placeholder="예: 100000"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                isFullWidth
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>투자 기간 (년)</FormLabel>
              <SliderContainer>
                <SliderLabel>
                  <span>1년</span>
                  <span>{years}년</span>
                  <span>50년</span>
                </SliderLabel>
                <Slider 
                  type="range" 
                  min="1" 
                  max="50" 
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                />
              </SliderContainer>
            </FormGroup>
            
            <ActionButtons>
              <div></div>
              <Button variant="primary" onClick={handleNextStep}>다음</Button>
            </ActionButtons>
          </FormContainer>
        )}
        
        {currentStep === 2 && (
          <FormContainer>
            <h2>예상 수익률</h2>
            <p>투자 위험도에 따른 예상 수익률을 설정하세요.</p>
            
            <FormGroup>
              <FormLabel>투자 위험도</FormLabel>
              <RadioContainer>
                <RadioLabel>
                  <input 
                    type="radio" 
                    name="riskLevel" 
                    value="veryLow"
                    checked={riskLevel === 'veryLow'}
                    onChange={() => handleRiskChange('veryLow')}
                  />
                  매우 낮음 (2~4%)
                </RadioLabel>
                <RadioLabel>
                  <input 
                    type="radio" 
                    name="riskLevel" 
                    value="low"
                    checked={riskLevel === 'low'}
                    onChange={() => handleRiskChange('low')}
                  />
                  낮음 (4~6%)
                </RadioLabel>
                <RadioLabel>
                  <input 
                    type="radio" 
                    name="riskLevel" 
                    value="moderate"
                    checked={riskLevel === 'moderate'}
                    onChange={() => handleRiskChange('moderate')}
                  />
                  중간 (6~8%)
                </RadioLabel>
                <RadioLabel>
                  <input 
                    type="radio" 
                    name="riskLevel" 
                    value="high"
                    checked={riskLevel === 'high'}
                    onChange={() => handleRiskChange('high')}
                  />
                  높음 (8~12%)
                </RadioLabel>
                <RadioLabel>
                  <input 
                    type="radio" 
                    name="riskLevel" 
                    value="veryHigh"
                    checked={riskLevel === 'veryHigh'}
                    onChange={() => handleRiskChange('veryHigh')}
                  />
                  매우 높음 (10~15%)
                </RadioLabel>
              </RadioContainer>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>연간 예상 수익률 (%)</FormLabel>
              <Input 
                type="number"
                placeholder="예: 7"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(e.target.value)}
                isFullWidth
              />
              <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '4px' }}>
                실제 수익률은 시장 상황에 따라 달라질 수 있습니다.
              </p>
            </FormGroup>
            
            <ActionButtons>
              <Button variant="light" onClick={handlePreviousStep}>이전</Button>
              <Button variant="primary" onClick={handleNextStep}>결과 확인</Button>
            </ActionButtons>
          </FormContainer>
        )}
        
        {currentStep === 3 && (
          <FormContainer>
            <h2>투자 시뮬레이션 결과</h2>
            <p>입력하신 정보를 바탕으로 분석한 투자 시뮬레이션 결과입니다.</p>
            
            <ResultsContainer>
              <Card variant="outlined">
                <h3>투자 결과 요약</h3>
                <ResultValue>{formatCurrency(results.futureValue)}</ResultValue>
                <p>{years}년 후 예상 금액</p>
                
                <ResultValue>{formatCurrency(results.totalContributions)}</ResultValue>
                <p>총 납입액</p>
                
                <ResultValue>{formatCurrency(results.interestEarned)}</ResultValue>
                <p>총 수익금</p>
                
                <p>투자 수익률: 연 {expectedReturn}%</p>
              </Card>
              
              <Card variant="outlined">
                <h3>투자 성장 그래프</h3>
                <ChartContainer>
                  {/* 실제로는 여기에 D3.js 등을 이용한 차트 표시 */}
                  그래프 영역 (실제 구현 시 차트 라이브러리 사용)
                </ChartContainer>
              </Card>
            </ResultsContainer>
            
            <div>
              <h3>분석 결과</h3>
              <p>
                초기 투자금 {formatCurrency(parseInt(initialAmount))}와 
                월 {formatCurrency(parseInt(monthlyContribution))}의 적립식 투자로 
                {years}년 후에는 약 {formatCurrency(results.futureValue)}의 
                자산을 형성할 수 있을 것으로 예상됩니다.
              </p>
              <p>
                이는 총 납입액 {formatCurrency(results.totalContributions)} 대비 
                {formatCurrency(results.interestEarned)}의 수익을 얻는 것입니다.
                복리의 효과로 시간이 지날수록 수익이 가속화됩니다.
              </p>
              <p>
                투자 금액이나 기간을 조정하여 다른 시나리오도 시뮬레이션해보세요.
              </p>
            </div>
            
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

export default InvestmentSimulationPage; 