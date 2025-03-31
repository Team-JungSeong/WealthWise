export interface StockData {
  ticker: string;
  name: string;
  currentPrice: number;
  priceChange: number;
  percentChange: number;
  marketCap: number; // 단위: 백만원
  volume: number; // 단위: 천주
  pe: number | null;
  dividendYield: number | null;
  sector: string;
}

export interface MarketIndex {
  name: string;
  currentValue: number;
  change: number;
  percentChange: number;
  lastUpdated: string;
}

export interface MarketSummary {
  date: string;
  indices: MarketIndex[];
  topGainers: StockData[];
  topLosers: StockData[];
  mostActive: StockData[];
}

export const SECTORS = [
  '전자/반도체',
  '금융',
  '자동차',
  '화학',
  '바이오/제약',
  '통신',
  'IT/소프트웨어',
  '유통',
  '철강/금속',
  '건설/건자재',
  '식품/음료',
  '에너지',
  '미디어/엔터테인먼트',
  '섬유/의류',
  '기계/장비'
];

export const STOCK_MARKET_DATA: StockData[] = [
  {
    ticker: '005930',
    name: '삼성전자',
    currentPrice: 85000,
    priceChange: 1500,
    percentChange: 1.8,
    marketCap: 508050000,
    volume: 12500,
    pe: 15.2,
    dividendYield: 2.1,
    sector: '전자/반도체'
  },
  {
    ticker: '000660',
    name: 'SK하이닉스',
    currentPrice: 142000,
    priceChange: 3000,
    percentChange: 2.2,
    marketCap: 103000000,
    volume: 8200,
    pe: 22.8,
    dividendYield: 1.2,
    sector: '전자/반도체'
  },
  {
    ticker: '051910',
    name: 'LG화학',
    currentPrice: 620000,
    priceChange: -12000,
    percentChange: -1.9,
    marketCap: 43800000,
    volume: 500,
    pe: 35.6,
    dividendYield: 0.8,
    sector: '화학'
  },
  {
    ticker: '035720',
    name: '카카오',
    currentPrice: 115000,
    priceChange: -2500,
    percentChange: -2.1,
    marketCap: 51200000,
    volume: 3200,
    pe: 42.3,
    dividendYield: 0.3,
    sector: 'IT/소프트웨어'
  },
  {
    ticker: '035420',
    name: 'NAVER',
    currentPrice: 320000,
    priceChange: 5000,
    percentChange: 1.6,
    marketCap: 52500000,
    volume: 2100,
    pe: 38.2,
    dividendYield: 0.5,
    sector: 'IT/소프트웨어'
  },
  {
    ticker: '005380',
    name: '현대자동차',
    currentPrice: 215000,
    priceChange: 3500,
    percentChange: 1.7,
    marketCap: 45900000,
    volume: 1800,
    pe: 12.3,
    dividendYield: 2.5,
    sector: '자동차'
  },
  {
    ticker: '000270',
    name: '기아',
    currentPrice: 92000,
    priceChange: 1200,
    percentChange: 1.3,
    marketCap: 37300000,
    volume: 2500,
    pe: 10.8,
    dividendYield: 3.1,
    sector: '자동차'
  },
  {
    ticker: '068270',
    name: '셀트리온',
    currentPrice: 280000,
    priceChange: -5000,
    percentChange: -1.8,
    marketCap: 38500000,
    volume: 1200,
    pe: 48.5,
    dividendYield: null,
    sector: '바이오/제약'
  },
  {
    ticker: '017670',
    name: 'SK텔레콤',
    currentPrice: 248000,
    priceChange: 2000,
    percentChange: 0.8,
    marketCap: 17800000,
    volume: 350,
    pe: 11.2,
    dividendYield: 4.8,
    sector: '통신'
  },
  {
    ticker: '015760',
    name: '한국전력',
    currentPrice: 24250,
    priceChange: -350,
    percentChange: -1.4,
    marketCap: 15600000,
    volume: 4500,
    pe: null,
    dividendYield: 2.2,
    sector: '에너지'
  }
];

export const MARKET_INDICES: MarketIndex[] = [
  {
    name: 'KOSPI',
    currentValue: 2950.78,
    change: 15.32,
    percentChange: 0.52,
    lastUpdated: '2023-09-21 15:30:00'
  },
  {
    name: 'KOSDAQ',
    currentValue: 920.45,
    change: 8.76,
    percentChange: 0.96,
    lastUpdated: '2023-09-21 15:30:00'
  },
  {
    name: 'KOSPI 200',
    currentValue: 385.62,
    change: 2.15,
    percentChange: 0.56,
    lastUpdated: '2023-09-21 15:30:00'
  }
];

export const getMarketSummary = (): MarketSummary => {
  const now = new Date();
  const dateString = now.toISOString().split('T')[0];
  
  // 상승, 하락, 거래량 많은 종목 정렬
  const sortedByGain = [...STOCK_MARKET_DATA].sort((a, b) => b.percentChange - a.percentChange);
  const sortedByLoss = [...STOCK_MARKET_DATA].sort((a, b) => a.percentChange - b.percentChange);
  const sortedByVolume = [...STOCK_MARKET_DATA].sort((a, b) => b.volume - a.volume);
  
  return {
    date: dateString,
    indices: MARKET_INDICES,
    topGainers: sortedByGain.slice(0, 5),
    topLosers: sortedByLoss.slice(0, 5),
    mostActive: sortedByVolume.slice(0, 5)
  };
};

export default {
  STOCK_MARKET_DATA,
  MARKET_INDICES,
  getMarketSummary
}; 