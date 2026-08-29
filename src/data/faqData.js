export const faqData = [
  {
    question: 'How does capital custody work? Do I transfer funds to QuantMeWealth?',
    answer: 'No. QuantMeWealth operates on a strictly non-custodial model. Your capital resides exclusively in your own institutional or preferred brokerage account (e.g. Zerodha, Interactive Brokers, Motilal Oswal, Finvasia). Our algorithms execute trades via encrypted, zero-withdrawal API tokens.',
  },
  {
    question: 'What is the minimum capital requirement to deploy?',
    answer: 'Due to exchange margin requirements and multi-leg risk parity sizing, our retail client pool starts at ₹25 Lakhs (~$30,000 USD). Institutional and HNW individual bespoke portfolios start at ₹1 Crore+ (~$120,000 USD).',
  },
  {
    question: 'How do your algorithms handle sudden market flash crashes?',
    answer: 'All strategies are embedded with automated hardware and software circuit breakers. If market volatility or portfolio delta exceeds preset Value-at-Risk (VaR) bands, the engine instantly neutralizes open exposures or transitions into protective gamma-long tail hedges.',
  },
  {
    question: 'What is the fee structure for managed strategies?',
    answer: 'We align directly with our partners through a standard quantitative model: 0% to 1.5% management fee and a 15-20% performance fee with a strict high-water mark. We only profit when your portfolio exceeds previous all-time peaks.',
  },
];
