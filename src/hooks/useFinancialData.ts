import { useState, useEffect } from 'react';

export interface FinancialSummary {
  totalAssets: number;
  totalDebts: number;
  netWorth: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlySavings: number;
  savingsRate: number;
}

export interface ChartData {
  categories: string[];
  values: number[];
  colors: string[];
}

export interface FinancialGoal {
  id: number;
  name: string;
  progress: number;
  target: number;
  current: number;
  icon: string;
  color: string;
}

export interface FinancialData {
  summary: FinancialSummary;
  assetsData: ChartData;
  expensesData: ChartData;
  goals: FinancialGoal[];
  isLoading: boolean;
  error: Error | null;
}

const MOCK_FINANCIAL_DATA = {
  summary: {
    totalAssets: 250000000,
    totalDebts: 80000000,
    netWorth: 170000000,
    monthlyIncome: 4500000,
    monthlyExpenses: 3200000,
    monthlySavings: 1300000,
    savingsRate: 28.9,
  },
  assetsData: {
    categories: ["현금", "주식", "부동산", "퇴직금", "기타"],
    values: [25, 30, 20, 15, 10],
    colors: ["#3366FF", "#00C853", "#FFD600", "#FF6D00", "#8E24AA"],
  },
  expensesData: {
    categories: ["주거비", "식비", "교통비", "생활비", "여가", "의료비"],
    values: [30, 25, 15, 10, 15, 5],
    colors: ["#3366FF", "#00C853", "#FFD600", "#FF6D00", "#8E24AA", "#00BCD4"],
  },
  goals: [
    {
      id: 1,
      name: "비상금 마련",
      progress: 85,
      target: 10000000,
      current: 8500000,
      icon: "💰",
      color: "#3A7A41",
    },
    {
      id: 2,
      name: "주택 구입",
      progress: 45,
      target: 300000000,
      current: 135000000,
      icon: "🏠",
      color: "#3A7A41",
    },
    {
      id: 3,
      name: "은퇴 준비",
      progress: 30,
      target: 500000000,
      current: 150000000,
      icon: "🏖️",
      color: "#3A7A41",
    },
  ],
};

export const useFinancialData = (userId?: string): FinancialData => {
  const [data, setData] = useState<Omit<FinancialData, 'isLoading' | 'error'> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // 실제 구현에서는 API 호출을 통해 데이터를 가져옵니다.
        // const response = await api.get(`/users/${userId}/financial-data`);
        // setData(response.data);
        
        // 임시 데이터 사용
        setTimeout(() => {
          setData(MOCK_FINANCIAL_DATA);
          setIsLoading(false);
        }, 500); // 실제 API 호출 시뮬레이션을 위한 지연
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch financial data'));
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return {
    summary: data?.summary || MOCK_FINANCIAL_DATA.summary,
    assetsData: data?.assetsData || MOCK_FINANCIAL_DATA.assetsData,
    expensesData: data?.expensesData || MOCK_FINANCIAL_DATA.expensesData,
    goals: data?.goals || MOCK_FINANCIAL_DATA.goals,
    isLoading,
    error,
  };
};

export default useFinancialData; 