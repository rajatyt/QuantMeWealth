import { FaBoltLightning, FaBrain, FaShieldHalved, FaCloudArrowUp } from 'react-icons/fa6';
import SectionHeader from '../ui/SectionHeader';
import EdgeCard from './EdgeCard';
import { edgePillars } from '../../data/edgePillars';

const iconMap = {
  FaBoltLightning,
  FaBrain,
  FaShieldHalved,
  FaCloudArrowUp,
};

export default function EdgeSection() {
  return (
    <section id="edge" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Technological Moat"
          title="Built for Microsecond Alpha Extraction"
          subtitle="Our proprietary stack combines modern hardware acceleration, predictive ML models, and strict risk guardrails."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {edgePillars.map((pillar, i) => (
            <EdgeCard
              key={i}
              icon={iconMap[pillar.icon]}
              iconColor={pillar.iconColor}
              title={pillar.title}
              description={pillar.description}
              metric={pillar.metric}
              metricColor={pillar.metricColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
