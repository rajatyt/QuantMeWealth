import { useState } from 'react';
import SectionHeader from '../ui/SectionHeader';
import StrategyFilters from './StrategyFilters';
import StrategyCard from './StrategyCard';
import StrategyModal from './StrategyModal';
import { strategies } from '../../data/strategies';

export default function StrategiesSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedStrategy, setSelectedStrategy] = useState(null);

  const filteredStrategies =
    activeFilter === 'all'
      ? strategies
      : strategies.filter((s) => s.category === activeFilter);

  return (
    <section id="strategies" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Systematic Portfolio Engines"
          title="Engineered Quantitative Strategies"
          subtitle="Mathematically verified, regime-adaptive models engineered for ultra-low drawdowns and high capital efficiency."
          className="mb-12"
        />

        <StrategyFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStrategies.map((strategy) => (
            <StrategyCard
              key={strategy.id}
              strategy={strategy}
              onInspect={setSelectedStrategy}
            />
          ))}
        </div>
      </div>

      {selectedStrategy && (
        <StrategyModal
          strategy={selectedStrategy}
          onClose={() => setSelectedStrategy(null)}
        />
      )}
    </section>
  );
}
