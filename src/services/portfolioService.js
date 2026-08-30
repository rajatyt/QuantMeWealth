// Portfolio management service
// Currently uses mock data; swap with real API when ready
import { strategies } from '../data/mockData';

export function getStrategies(filter = 'all') {
  if (filter === 'all') return strategies;
  return strategies.filter((s) => s.category === filter);
}

export function getStrategyById(id) {
  return strategies.find((s) => s.id === id) || null;
}
