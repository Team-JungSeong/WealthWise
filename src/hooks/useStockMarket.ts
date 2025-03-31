import { useState, useEffect } from 'react';
import { 
  StockData, 
  MarketIndex, 
  MarketSummary, 
  STOCK_MARKET_DATA, 
  MARKET_INDICES, 
  getMarketSummary 
} from '../data/stockMarketData';

interface StockMarketHook {
  allStocks: StockData[];
  indices: MarketIndex[];
  topGainers: StockData[];
  topLosers: StockData[];
  mostActive: StockData[];
  marketSummary: MarketSummary;
  isLoading: boolean;
  error: Error | null;
  searchStocks: (query: string) => StockData[];
  filterByPercentChange: (min: number, max: number) => StockData[];
  filterBySector: (sector: string) => StockData[];
}

const useStockMarket = (): StockMarketHook => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [allStocks, setAllStocks] = useState<StockData[]>([]);
  const [indices, setIndices] = useState<MarketIndex[]>([]);
  const [marketSummary, setMarketSummary] = useState<MarketSummary>({
    date: '',
    indices: [],
    topGainers: [],
    topLosers: [],
    mostActive: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // 실제 구현에서는 API 호출을 통해 데이터를 가져옵니다.
        // const response = await api.get('/stock-market/data');
        // setAllStocks(response.data.stocks);
        // setIndices(response.data.indices);
        // setMarketSummary(response.data.summary);
        
        // 임시 데이터 사용
        setTimeout(() => {
          setAllStocks(STOCK_MARKET_DATA);
          setIndices(MARKET_INDICES);
          setMarketSummary(getMarketSummary());
          setIsLoading(false);
        }, 500); // 실제 API 호출 시뮬레이션을 위한 지연
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch stock market data'));
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 주식 검색 함수
  const searchStocks = (query: string): StockData[] => {
    if (!query) return allStocks;
    
    const lowerQuery = query.toLowerCase();
    return allStocks.filter(
      stock => 
        stock.ticker.includes(query) || 
        stock.name.toLowerCase().includes(lowerQuery)
    );
  };

  // 등락률 기준 필터링
  const filterByPercentChange = (min: number, max: number): StockData[] => {
    return allStocks.filter(
      stock => stock.percentChange >= min && stock.percentChange <= max
    );
  };

  // 섹터별 필터링
  const filterBySector = (sector: string): StockData[] => {
    if (!sector) return allStocks;
    return allStocks.filter(stock => stock.sector === sector);
  };

  // 내보낼 객체 및 함수들
  return {
    allStocks,
    indices,
    topGainers: marketSummary.topGainers,
    topLosers: marketSummary.topLosers,
    mostActive: marketSummary.mostActive,
    marketSummary,
    isLoading,
    error,
    searchStocks,
    filterByPercentChange,
    filterBySector
  };
};

export default useStockMarket; 