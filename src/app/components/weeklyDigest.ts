// Mock data for the Workforce → Overview weekly digest.
// Tweak copy here without touching layout code.

export const WEEKLY_DIGEST = {
  dateRange: 'Week of 5 – 11 May, 2026',
  subtitle:
    'What your agents read, found, and surfaced — for you to act on.',

  impactStats: [
    {
      label: 'Conversations read',
      value: '1,247',
      delta: 'this week',
      deltaTone: 'muted' as const,
      context: 'across 4 agents · live',
    },
    {
      label: 'Signals extracted',
      value: '2,847',
      delta: '↑ 18%',
      deltaTone: 'positive' as const,
      context: '12 signal types · 1,204 contacts',
    },
    {
      label: 'Findings surfaced',
      value: '17',
      delta: 'this week',
      deltaTone: 'muted' as const,
      context: '11 acted on · 6 open',
    },
    {
      label: 'Signal precision',
      value: '92%',
      delta: 'above 85% gate',
      deltaTone: 'positive' as const,
      context: 'measured by your dismissals',
    },
  ],

  topQuestions: [
    { question: 'Compatibility with sensitive skin?', count: 24, trend: '↑ from 12 last week', trendTone: 'positive' as const },
    { question: 'Shipping delays from Mumbai',         count: 18, trend: '↑ 45% week-on-week', trendTone: 'positive' as const },
    { question: 'Out-of-stock alerts',                 count: 11, trend: 'steady',             trendTone: 'muted' as const },
    { question: 'Refund policy',                       count: 9,  trend: '↓ 30% vs last month', trendTone: 'negative' as const },
    { question: 'Body Balm smell',                     count: 5,  trend: 'new this week',       trendTone: 'positive' as const },
  ],

  productMentions: [
    { product: 'Vitamin C Serum 30ml mentions', delta: '+4×', tone: 'positive' as const, context: '31 mentions vs ~7 daily baseline' },
    { product: 'Calm Serum mentions',           delta: '+18%', tone: 'positive' as const, context: '142 conversations this week' },
    { product: 'Body Balm mentions',            delta: '−22%', tone: 'negative' as const, context: 'winter line winding down' },
  ],

  notableMoments: [
    {
      id: 'saturday-response',
      headline: 'Saturday response times crept to 4h 12m.',
      body:
        "That's 4× your weekday average of 58m. 23 conversations went unanswered for hours — mostly product enquiries that came in overnight.",
      agentPrompt: 'Watch for slow weekend response times and ping me when reply times exceed 2× weekday average.',
    },
    {
      id: 'body-balm-returns',
      headline: 'Body Balm now accounts for 42% of returns.',
      body:
        'Only 18% of sales but 42% of returns this month. Three customers cited "stronger smell than expected" as the reason.',
      agentPrompt: 'Watch for return reasons clustering on a single product and surface the pattern.',
    },
    {
      id: 'pregnancy-safe',
      headline: '14 customers asked about pregnancy-safe products.',
      body:
        'Mostly on Retinol Night Oil. Asking about ingredients, safety during pregnancy, and breastfeeding compatibility — currently no clear answer in your catalogue.',
      agentPrompt: 'Watch for repeated questions about pregnancy-safe ingredients and flag the conversations.',
    },
  ],
};

export type WeeklyDigest = typeof WEEKLY_DIGEST;
export type ImpactStat = WeeklyDigest['impactStats'][number];
export type NotableMoment = WeeklyDigest['notableMoments'][number];
