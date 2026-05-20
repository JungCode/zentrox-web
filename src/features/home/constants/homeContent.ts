import type { HomeTemplate, HomeWorkflow } from '../types';

const HOME_TEMPLATES: HomeTemplate[] = [
  {
    symbol: 'mail',
    title: 'Email Classifier',
    description: 'Automatically sort incoming support tickets using LLMs.',
  },
  {
    symbol: 'database',
    title: 'Data Scraper',
    description: 'Sync web content directly to your cloud warehouse.',
  },
  {
    symbol: 'monitoring',
    title: 'Sentiment Tracker',
    description: 'Monitor brand mentions across social channels in real-time.',
  },
];

const HOME_WORKFLOWS: HomeWorkflow[] = [
  {
    name: 'Customer Onboarding v2',
    status: 'Active',
    updated: 'Modified 2h ago',
  },
  {
    name: 'Invoice Extraction Flow',
    status: 'Paused',
    updated: 'Modified 5h ago',
  },
  {
    name: 'Internal Knowledge Base Sync',
    status: 'Active',
    updated: 'Modified 1d ago',
  },
];

const HOME_METRICS_BARS = [28, 42, 34, 68, 52, 30, 44];

const HOME_METRICS_LABELS = ['Mon', 'Wed', 'Fri', 'Sun'];

const HOME_FOOTER_LINKS = [
  'Product',
  'Features',
  'Pricing',
  'Privacy',
  'Terms',
];

export {
  HOME_FOOTER_LINKS,
  HOME_METRICS_BARS,
  HOME_METRICS_LABELS,
  HOME_TEMPLATES,
  HOME_WORKFLOWS,
};
