// Stock market data service
// Currently uses mock data; swap with real API when ready
import { tickerSymbols, performanceData } from '../data/mockData';

export function getTickerSymbols() {
  return tickerSymbols;
}

export function getPerformanceData(timeframe = '3Y') {
  return performanceData[timeframe] || performanceData['3Y'];
}
