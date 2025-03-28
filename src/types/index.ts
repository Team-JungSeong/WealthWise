// 사용자 프로필 관련 타입
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  financialGoals: FinancialGoal[];
  riskTolerance: RiskTolerance;
  incomeDetails: IncomeDetails;
  expenseDetails: ExpenseDetails;
  assets: Asset[];
  debts: Debt[];
  createdAt: Date;
  updatedAt: Date;
}

export enum RiskTolerance {
  VeryLow = "VERY_LOW",
  Low = "LOW",
  Medium = "MEDIUM",
  High = "HIGH",
  VeryHigh = "VERY_HIGH"
}

export interface FinancialGoal {
  id: string;
  title: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: Date;
  category: GoalCategory;
  priority: number;
}

export enum GoalCategory {
  Retirement = "RETIREMENT",
  HomePurchase = "HOME_PURCHASE",
  Education = "EDUCATION",
  DebtPayoff = "DEBT_PAYOFF",
  EmergencyFund = "EMERGENCY_FUND",
  Travel = "TRAVEL",
  Other = "OTHER"
}

export interface IncomeDetails {
  salary: number;
  frequency: IncomeFrequency;
  additionalIncome: AdditionalIncome[];
}

export enum IncomeFrequency {
  Weekly = "WEEKLY",
  Biweekly = "BIWEEKLY",
  Monthly = "MONTHLY",
  Quarterly = "QUARTERLY",
  Annually = "ANNUALLY"
}

export interface AdditionalIncome {
  source: string;
  amount: number;
  frequency: IncomeFrequency;
}

export interface ExpenseDetails {
  monthlyExpenses: MonthlyExpense[];
  totalMonthly: number;
}

export interface MonthlyExpense {
  category: ExpenseCategory;
  amount: number;
  essential: boolean;
}

export enum ExpenseCategory {
  Housing = "HOUSING",
  Utilities = "UTILITIES",
  Food = "FOOD",
  Transportation = "TRANSPORTATION",
  Healthcare = "HEALTHCARE",
  Insurance = "INSURANCE",
  Entertainment = "ENTERTAINMENT",
  Education = "EDUCATION",
  Savings = "SAVINGS",
  Debt = "DEBT",
  Other = "OTHER"
}

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  value: number;
  growthRate?: number;
  notes?: string;
}

export enum AssetType {
  Cash = "CASH",
  Stocks = "STOCKS",
  Bonds = "BONDS",
  RealEstate = "REAL_ESTATE",
  Retirement = "RETIREMENT",
  Other = "OTHER"
}

export interface Debt {
  id: string;
  name: string;
  type: DebtType;
  amount: number;
  interestRate: number;
  minimumPayment: number;
  payoffDate?: Date;
}

export enum DebtType {
  StudentLoan = "STUDENT_LOAN",
  Mortgage = "MORTGAGE",
  CreditCard = "CREDIT_CARD",
  PersonalLoan = "PERSONAL_LOAN",
  AutoLoan = "AUTO_LOAN",
  MedicalDebt = "MEDICAL_DEBT",
  Other = "OTHER"
}

// 학습 모듈 관련 타입
export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: LearningCategory;
  difficulty: DifficultyLevel;
  duration: number; // 분 단위
  lessons: Lesson[];
  completionStatus: CompletionStatus;
  prerequisites?: string[];
}

export enum LearningCategory {
  BasicFinance = "BASIC_FINANCE",
  Budgeting = "BUDGETING",
  Saving = "SAVING",
  Investing = "INVESTING",
  Retirement = "RETIREMENT",
  TaxPlanning = "TAX_PLANNING",
  DebtManagement = "DEBT_MANAGEMENT",
  Insurance = "INSURANCE",
  RealEstate = "REAL_ESTATE",
  AdvancedInvesting = "ADVANCED_INVESTING"
}

export enum DifficultyLevel {
  Beginner = "BEGINNER",
  Intermediate = "INTERMEDIATE",
  Advanced = "ADVANCED",
  Expert = "EXPERT"
}

export enum CompletionStatus {
  NotStarted = "NOT_STARTED",
  InProgress = "IN_PROGRESS",
  Completed = "COMPLETED"
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  resourceLinks?: string[];
  quiz?: Quiz;
  isCompleted: boolean;
}

export interface Quiz {
  id: string;
  questions: Question[];
  passingScore: number;
  userScore?: number;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  userAnswerIndex?: number;
  explanation: string;
}

// 시뮬레이션 관련 타입
export interface SimulationResult {
  id: string;
  type: SimulationType;
  createdAt: Date;
  parameters: any;
  results: any;
}

export enum SimulationType {
  Budget = "BUDGET",
  Investment = "INVESTMENT",
  Loan = "LOAN",
  Retirement = "RETIREMENT"
}

export interface BudgetParameters {
  income: number;
  expenses: MonthlyExpense[];
  savingsGoal: number;
}

export interface BudgetResults {
  monthlyNetIncome: number;
  recommendedBudget: RecommendedBudget;
  projectedSavings: number;
  savingsDeficit: number;
}

export interface RecommendedBudget {
  categories: {
    category: ExpenseCategory;
    recommended: number;
    current: number;
    difference: number;
  }[];
}

export interface InvestmentParameters {
  initialInvestment: number;
  monthlyContribution: number;
  timeHorizon: number; // 연 단위
  riskProfile: RiskTolerance;
  goalAmount?: number;
}

export interface InvestmentResults {
  projectedEndValue: number;
  interestEarned: number;
  contributions: number;
  yearlyProjections: YearlyProjection[];
  successProbability?: number;
}

export interface YearlyProjection {
  year: number;
  value: number;
  contributions: number;
  interestEarned: number;
}

// 커뮤니티 관련 타입
export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: UserMinimal;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  comments: Comment[];
  tags: string[];
}

export interface Comment {
  id: string;
  content: string;
  author: UserMinimal;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
}

export interface UserMinimal {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface ExpertProfile extends UserMinimal {
  specialties: LearningCategory[];
  bio: string;
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  availability: Availability[];
}

export interface Availability {
  dayOfWeek: number; // 0-6 (일-토)
  startTime: string; // 24시간 형식 (HH:MM)
  endTime: string; // 24시간 형식 (HH:MM)
} 