import SectionHeader from '../ui/SectionHeader';
import FaqItem from './FaqItem';
import { faqData } from '../../data/faqData';

export default function FaqSection() {
  return (
    <section id="faq" className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        badge="Transparency"
        title="Frequently Asked Questions"
        className="mb-12"
      />

      <div className="space-y-4">
        {faqData.map((item, i) => (
          <FaqItem key={i} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
}
