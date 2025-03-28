import React, { useState, useEffect } from 'react';
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
  color: ${({ theme }) => `${theme.colors.text}dd`};
  font-size: 1.125rem;
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

const RadioContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.xs} 0;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
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
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ResultItem = styled.div`
  text-align: center;
`;

const ResultLabel = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text}aa;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ResultValue = styled.div`
  font-size: 1.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f9f9f9;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.xl} 0;
`;

const ScheduleTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: ${({ theme }) => theme.spacing.lg} 0;
`;

const TableHeader = styled.th`
  padding: ${({ theme }) => theme.spacing.sm};
  background-color: ${({ theme }) => theme.colors.light};
  text-align: left;
  font-weight: 600;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TableCell = styled.td`
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.light}50;
  }
`;

const LoanSimulationPage: React.FC = () => {
  // 대출 시뮬레이션 상태값
  const [loanAmount, setLoanAmount] = useState('100000000');
  const [interestRate, setInterestRate] = useState('4.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [paymentMethod, setPaymentMethod] = useState('annuity'); // 원리금균등(annuity) vs 원금균등(principal)
  const [showResults, setShowResults] = useState(false);
  
  // 결과 계산
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [paymentSchedule, setPaymentSchedule] = useState<Array<{
    period: number;
    payment: number;
    principal: number;
    interest: number;
    balance: number;
  }>>([]);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12; // 월 이자율
    const term = (parseFloat(loanTerm) || 0) * 12; // 개월 수
    
    let monthlyPay = 0;
    let totalPay = 0;
    let totalInt = 0;
    
    if (paymentMethod === 'annuity') {
      // 원리금균등상환 (Annuity Payment)
      if (rate === 0) {
        // 이자율이 0인 경우
        monthlyPay = principal / term;
        totalPay = principal;
        totalInt = 0;
      } else {
        // 이자율이 0이 아닌 경우
        monthlyPay = principal * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
        totalPay = monthlyPay * term;
        totalInt = totalPay - principal;
      }
    } else {
      // 원금균등상환 (Principal Payment)
      const principalPayment = principal / term;
      let remainingPrincipal = principal;
      let totalPayment = 0;
      
      for (let i = 0; i < term; i++) {
        const interestPayment = remainingPrincipal * rate;
        const payment = principalPayment + interestPayment;
        
        totalPayment += payment;
        remainingPrincipal -= principalPayment;
      }
      
      // 첫 달 상환액 (가장 높음)
      monthlyPay = principalPayment + (principal * rate);
      totalPay = totalPayment;
      totalInt = totalPayment - principal;
    }
    
    // 결과 설정
    setMonthlyPayment(monthlyPay);
    setTotalPayment(totalPay);
    setTotalInterest(totalInt);
    
    // 상환 스케줄 계산
    const schedule = [];
    let balance = principal;
    
    if (paymentMethod === 'annuity') {
      // 원리금균등상환 스케줄
      for (let i = 1; i <= Math.min(term, 36); i++) { // 최대 36개월(3년)까지만 표시
        const interest = balance * rate;
        const principalPaid = monthlyPay - interest;
        balance -= principalPaid;
        
        schedule.push({
          period: i,
          payment: monthlyPay,
          principal: principalPaid,
          interest: interest,
          balance: Math.max(0, balance)
        });
      }
    } else {
      // 원금균등상환 스케줄
      const principalPayment = principal / term;
      
      for (let i = 1; i <= Math.min(term, 36); i++) { // 최대 36개월(3년)까지만 표시
        const interest = balance * rate;
        const payment = principalPayment + interest;
        balance -= principalPayment;
        
        schedule.push({
          period: i,
          payment: payment,
          principal: principalPayment,
          interest: interest,
          balance: Math.max(0, balance)
        });
      }
    }
    
    setPaymentSchedule(schedule);
    setShowResults(true);
  };
  
  // 금액 포맷팅 함수
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ko-KR', { 
      style: 'currency', 
      currency: 'KRW',
      maximumFractionDigits: 0 
    }).format(value);
  };

  return (
    <Layout>
      <PageHeader>
        <Link to="/simulations" style={{ display: 'block', marginBottom: '1rem', color: 'inherit' }}>
          ← 모든 시뮬레이션으로 돌아가기
        </Link>
        <PageTitle>대출 시뮬레이션</PageTitle>
        <PageSubtitle>
          대출 금액, 이자율, 상환 기간을 설정하여 월 상환금과 총 상환금액을 계산해 보세요.
          원리금균등상환과 원금균등상환 중 상환 방식을 선택할 수 있습니다.
        </PageSubtitle>
      </PageHeader>
      
      <div>
        <Card variant="elevated">
          <FormContainer>
            <FormRow>
              <FormCol>
                <FormGroup>
                  <FormLabel>대출 금액</FormLabel>
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="대출 금액을 입력하세요"
                  />
                </FormGroup>
              </FormCol>
              <FormCol>
                <FormGroup>
                  <FormLabel>연 이자율 (%)</FormLabel>
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="연 이자율을 입력하세요"
                    step="0.1"
                  />
                </FormGroup>
              </FormCol>
            </FormRow>
            
            <FormRow>
              <FormCol>
                <FormGroup>
                  <FormLabel>대출 기간 (년)</FormLabel>
                  <SliderContainer>
                    <Slider
                      type="range"
                      min="1"
                      max="40"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                    />
                    <SliderLabel>
                      <span>1년</span>
                      <span>{loanTerm}년</span>
                      <span>40년</span>
                    </SliderLabel>
                  </SliderContainer>
                </FormGroup>
              </FormCol>
            </FormRow>
            
            <FormRow>
              <FormCol>
                <FormGroup>
                  <FormLabel>상환 방식</FormLabel>
                  <RadioContainer>
                    <RadioLabel>
                      <input
                        type="radio"
                        value="annuity"
                        checked={paymentMethod === 'annuity'}
                        onChange={() => setPaymentMethod('annuity')}
                      />
                      원리금균등상환
                    </RadioLabel>
                    <RadioLabel>
                      <input
                        type="radio"
                        value="principal"
                        checked={paymentMethod === 'principal'}
                        onChange={() => setPaymentMethod('principal')}
                      />
                      원금균등상환
                    </RadioLabel>
                  </RadioContainer>
                </FormGroup>
              </FormCol>
            </FormRow>
            
            <ActionButtons>
              <Button variant="primary" isFullWidth onClick={calculateLoan}>
                계산하기
              </Button>
            </ActionButtons>
          </FormContainer>
          
          {showResults && (
            <>
              <ResultsContainer>
                <ResultItem>
                  <ResultLabel>
                    {paymentMethod === 'annuity' ? '월 상환금' : '첫 달 상환금'}
                  </ResultLabel>
                  <ResultValue>{formatCurrency(monthlyPayment)}</ResultValue>
                </ResultItem>
                <ResultItem>
                  <ResultLabel>총 상환금액</ResultLabel>
                  <ResultValue>{formatCurrency(totalPayment)}</ResultValue>
                </ResultItem>
                <ResultItem>
                  <ResultLabel>총 이자</ResultLabel>
                  <ResultValue>{formatCurrency(totalInterest)}</ResultValue>
                </ResultItem>
              </ResultsContainer>
              
              <ChartContainer>
                {/* 이 부분에 실제 차트를 구현할 수 있습니다 */}
                <div>상환 계획 차트</div>
              </ChartContainer>
              
              <h3>상환 스케줄 (최초 3년)</h3>
              <div style={{ overflowX: 'auto' }}>
                <ScheduleTable>
                  <thead>
                    <tr>
                      <TableHeader>회차</TableHeader>
                      <TableHeader>상환금</TableHeader>
                      <TableHeader>원금</TableHeader>
                      <TableHeader>이자</TableHeader>
                      <TableHeader>잔액</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentSchedule.map((row) => (
                      <TableRow key={row.period}>
                        <TableCell>{row.period}회</TableCell>
                        <TableCell>{formatCurrency(row.payment)}</TableCell>
                        <TableCell>{formatCurrency(row.principal)}</TableCell>
                        <TableCell>{formatCurrency(row.interest)}</TableCell>
                        <TableCell>{formatCurrency(row.balance)}</TableCell>
                      </TableRow>
                    ))}
                  </tbody>
                </ScheduleTable>
              </div>
            </>
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default LoanSimulationPage; 