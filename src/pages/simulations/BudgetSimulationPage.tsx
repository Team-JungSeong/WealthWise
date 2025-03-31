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
  StepsContainer,
  StepIndicator,
  StepCircle,
  StepLabel,
  FormContainer,
  FormGroup,
  FormLabel,
  ExpensesContainer,
  ExpenseItem,
  ActionButtons,
  ResultsContainer,
  ResultValue,
  CategoryContainer,
  CategoryLabel,
  CategoryName,
  CategoryValue,
  ProgressBar,
  ProgressFill,
} from '../../styles/pages/simulations/BudgetSimulationPage.styled';

const expenseCategories = [
  { id: 'housing', name: '주거비', color: '#3366FF' },
  { id: 'food', name: '식비', color: '#00C853' },
  { id: 'transportation', name: '교통비', color: '#FFD600' },
  { id: 'utilities', name: '공과금', color: '#FF6D00' },
  { id: 'entertainment', name: '여가/문화', color: '#8E24AA' },
  { id: 'others', name: '기타', color: '#607D8B' },
];

const BudgetSimulationPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [income, setIncome] = useState('');
  const [savingsGoal, setSavingsGoal] = useState('');
  const [expenses, setExpenses] = useState<{[key: string]: string}>(
    expenseCategories.reduce((acc, category) => ({...acc, [category.id]: ''}), {})
  );
  
  const totalExpenses = Object.values(expenses)
    .reduce((sum, value) => sum + (parseInt(value) || 0), 0);
  
  const handleExpenseChange = (categoryId: string, value: string) => {
    setExpenses(prev => ({
      ...prev,
      [categoryId]: value
    }));
  };
  
  const handleNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };
  
  const handlePreviousStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const formatCurrency = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
  };
  
  // 시뮬레이션 결과 데이터 (실제로는 계산이 필요)
  const simulationResults = {
    monthlyNetIncome: parseInt(income) || 0,
    totalExpenses: totalExpenses,
    savingsGoal: parseInt(savingsGoal) || 0,
    remainingForSavings: (parseInt(income) || 0) - totalExpenses,
    savingsDeficit: Math.max(0, (parseInt(savingsGoal) || 0) - ((parseInt(income) || 0) - totalExpenses)),
    recommendedBudget: expenseCategories.map(category => ({
      category,
      current: parseInt(expenses[category.id]) || 0,
      recommended: Math.round(((parseInt(income) || 0) - (parseInt(savingsGoal) || 0)) * 
        (category.id === 'housing' ? 0.3 :
        category.id === 'food' ? 0.2 :
        category.id === 'transportation' ? 0.15 :
        category.id === 'utilities' ? 0.1 :
        category.id === 'entertainment' ? 0.15 : 0.1))
    }))
  };
  
  return (
    <Layout>
      <PageHeader>
        <Link to="/simulations">← 모든 시뮬레이션으로 돌아가기</Link>
        <PageTitle>예산 시뮬레이션</PageTitle>
        <PageSubtitle>
          월 수입과 지출을 분석하여 최적의 예산 계획을 수립하고,
          재정 목표 달성을 위한 저축 계획을 세워보세요.
        </PageSubtitle>
      </PageHeader>
      
      <StepsContainer>
        {[
          { number: 1, label: '수입 정보' },
          { number: 2, label: '지출 정보' },
          { number: 3, label: '결과 확인' }
        ].map(step => (
          <StepIndicator 
            key={step.number}
            isActive={currentStep === step.number}
            isCompleted={currentStep > step.number}
          >
            <StepCircle 
              isActive={currentStep === step.number}
              isCompleted={currentStep > step.number}
            >
              {currentStep > step.number ? '✓' : step.number}
            </StepCircle>
            <StepLabel 
              isActive={currentStep === step.number}
              isCompleted={currentStep > step.number}
            >
              {step.label}
            </StepLabel>
          </StepIndicator>
        ))}
      </StepsContainer>
      
      <Card variant="elevated">
        {currentStep === 1 && (
          <FormContainer>
            <h2>수입 정보</h2>
            <p>월별 수입과 저축 목표를 입력하세요.</p>
            
            <FormGroup>
              <FormLabel>월 수입</FormLabel>
              <Input 
                type="number"
                placeholder="예: 3000000"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                isFullWidth
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>월 저축 목표</FormLabel>
              <Input 
                type="number"
                placeholder="예: 1000000"
                value={savingsGoal}
                onChange={(e) => setSavingsGoal(e.target.value)}
                isFullWidth
              />
            </FormGroup>
            
            <ActionButtons>
              <div></div>
              <Button variant="primary" onClick={handleNextStep}>다음</Button>
            </ActionButtons>
          </FormContainer>
        )}
        
        {currentStep === 2 && (
          <FormContainer>
            <h2>지출 정보</h2>
            <p>카테고리별 월 평균 지출액을 입력하세요.</p>
            
            <ExpensesContainer>
              {expenseCategories.map(category => (
                <ExpenseItem key={category.id}>
                  <FormLabel style={{ width: '120px', margin: 0 }}>{category.name}</FormLabel>
                  <Input 
                    type="number"
                    placeholder="0"
                    value={expenses[category.id]}
                    onChange={(e) => handleExpenseChange(category.id, e.target.value)}
                    isFullWidth
                  />
                </ExpenseItem>
              ))}
            </ExpensesContainer>
            
            <ActionButtons>
              <Button variant="light" onClick={handlePreviousStep}>이전</Button>
              <Button variant="primary" onClick={handleNextStep}>결과 확인</Button>
            </ActionButtons>
          </FormContainer>
        )}
        
        {currentStep === 3 && (
          <FormContainer>
            <h2>예산 시뮬레이션 결과</h2>
            <p>입력하신 정보를 바탕으로 분석한 예산 시뮬레이션 결과입니다.</p>
            
            <ResultsContainer>
              <Card variant="outlined">
                <h3>수입 및 지출 요약</h3>
                <ResultValue>{formatCurrency(simulationResults.monthlyNetIncome)}</ResultValue>
                <p>월 수입</p>
                
                <ResultValue>{formatCurrency(simulationResults.totalExpenses)}</ResultValue>
                <p>총 지출</p>
                
                <ResultValue>{formatCurrency(simulationResults.remainingForSavings)}</ResultValue>
                <p>저축 가능액</p>
                
                {simulationResults.savingsDeficit > 0 && (
                  <>
                    <ResultValue style={{ color: '#F44336' }}>{formatCurrency(simulationResults.savingsDeficit)}</ResultValue>
                    <p>저축 목표 부족액</p>
                  </>
                )}
              </Card>
              
              <Card variant="outlined">
                <h3>추천 예산 배분</h3>
                <p>저축 목표를 고려한 최적의 예산 배분입니다.</p>
                
                {simulationResults.recommendedBudget.map(item => (
                  <CategoryContainer key={item.category.id}>
                    <CategoryLabel>
                      <CategoryName>{item.category.name}</CategoryName>
                      <CategoryValue>
                        {formatCurrency(item.recommended)} 
                        {item.current > item.recommended ? 
                          ` (${formatCurrency(item.current - item.recommended)} 초과)` : 
                          item.current < item.recommended ? 
                          ` (${formatCurrency(item.recommended - item.current)} 여유)` : ''}
                      </CategoryValue>
                    </CategoryLabel>
                    <ProgressBar>
                      <ProgressFill 
                        width={Math.min(100, (item.current / item.recommended) * 100)}
                        color={item.current > item.recommended ? '#F44336' : item.category.color}
                      />
                    </ProgressBar>
                  </CategoryContainer>
                ))}
              </Card>
            </ResultsContainer>
            
            <div>
              <h3>분석 결과</h3>
              <p>
                {simulationResults.remainingForSavings >= simulationResults.savingsGoal ?
                  `현재 지출 패턴으로는 월 저축 목표인 ${formatCurrency(simulationResults.savingsGoal)}을 달성할 수 있습니다. ` +
                  `예상 월 저축액은 ${formatCurrency(simulationResults.remainingForSavings)}입니다.` :
                  `현재 지출 패턴으로는 월 저축 목표인 ${formatCurrency(simulationResults.savingsGoal)}을 달성할 수 없습니다. ` +
                  `저축 목표를 달성하려면 지출을 ${formatCurrency(simulationResults.savingsDeficit)} 줄여야 합니다.`
                }
              </p>
              <p>
                위 추천 예산을 참고하여 각 카테고리별 지출을 조정해보세요.
                특히 초과된 항목에서 지출을 줄인다면 저축 목표에 더 가까워질 수 있습니다.
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

export default BudgetSimulationPage; 