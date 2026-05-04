import {
  CubeIcon,
  GitBranchIcon,
  HouseIcon,
  SparkleIcon,
  SquaresFourIcon,
  UserCircleIcon,
  WrenchIcon,
} from '@phosphor-icons/react';
import { ComponentType } from 'react';

import { WorkflowProviderApp } from '@/shared/api/workflow/schemas';
import { GoogleFormIcon, GoogleSheetIcon } from '@/shared/assets/icons';

import {
  IconByAppProviderKey,
  ProviderAppMetadataRecordType,
  ProviderAppMetadataType,
} from '../types';
import type { AppProviderSelectOption } from '../types/graph';

export const APP_PROVIDER_CATEGORIES: {
  Icon: ComponentType<{ className?: string; size?: number }>;
  id: string;
  label: string;
}[] = [
  { Icon: HouseIcon, id: 'Home', label: 'Home' },
  { Icon: SquaresFourIcon, id: 'Apps', label: 'Apps' },
  { Icon: SparkleIcon, id: 'AI', label: 'AI' },
  { Icon: GitBranchIcon, id: 'Flow controls', label: 'Flow controls' },
  { Icon: WrenchIcon, id: 'Utilities', label: 'Utilities' },
  { Icon: CubeIcon, id: 'Products', label: 'Products' },
  { Icon: UserCircleIcon, id: 'Custom', label: 'Custom' },
];

/** Mock app providers shown in the AppSelectorDialog */
export const MOCK_APP_PROVIDERS: AppProviderSelectOption[] = [
  {
    category: 'Apps',
    description: 'Collect data via forms',
    icon: GoogleFormIcon,
    id: 'google-forms',
    name: 'Google Forms',
  },
  {
    category: 'Communication',
    description: 'Send messages to channels',
    icon: GoogleSheetIcon,
    id: 'slack',
    name: 'Slack',
  },
  {
    category: 'Communication',
    description: 'Send and receive emails',
    icon: GoogleFormIcon,

    id: 'gmail',
    name: 'Gmail',
  },
  {
    category: 'Productivity',
    description: 'Manage pages and databases',
    icon: GoogleFormIcon,

    id: 'notion',
    name: 'Notion',
  },
  {
    category: 'Developer Tools',
    description: 'Code repositories and CI',
    icon: GoogleFormIcon,

    id: 'github',
    name: 'GitHub',
  },
  {
    category: 'Apps',
    description: 'Spreadsheet data processing',
    icon: GoogleFormIcon,

    id: 'google-sheets',
    name: 'Google Sheets',
  },
  {
    category: 'Productivity',
    description: 'Calendar and scheduling events',
    icon: GoogleFormIcon,

    id: 'google-calendar',
    name: 'Google Calendar',
  },
  {
    category: 'Finance',
    description: 'Payment processing',
    icon: GoogleFormIcon,

    id: 'stripe',
    name: 'Stripe',
  },
  {
    category: 'Sales & CRM',
    description: 'CRM and marketing automation',
    icon: GoogleFormIcon,

    id: 'hubspot',
    name: 'HubSpot',
  },
  {
    category: 'Communication',
    description: 'Community messaging',
    icon: GoogleFormIcon,

    id: 'discord',
    name: 'Discord',
  },
  {
    category: 'Productivity',
    description: 'Database and spreadsheets',
    icon: GoogleFormIcon,

    id: 'airtable',
    name: 'Airtable',
  },
  {
    category: 'Productivity',
    description: 'Cloud file storage',
    icon: GoogleFormIcon,

    id: 'google-drive',
    name: 'Google Drive',
  },
];

/** Built-in automation tools – flow controls, utilities, AI */
export const BUILT_IN_TOOLS: AppProviderSelectOption[] = [
  {
    category: 'AI',
    description: 'Generate text with AI',
    icon: GoogleFormIcon,

    id: 'ai-assistant',
    name: 'AI Assistant',
  },
  {
    category: 'Flow controls',
    description: 'Stop a workflow from running',
    icon: GoogleFormIcon,

    id: 'filter',
    name: 'Filter',
  },
  {
    category: 'Utilities',
    description: 'Transform data formats',
    icon: GoogleFormIcon,

    id: 'formatter',
    name: 'Formatter',
  },
  {
    category: 'Flow controls',
    description: 'Branch your workflow',
    icon: GoogleFormIcon,

    id: 'paths',
    name: 'Paths',
  },
  {
    category: 'Utilities',
    description: 'Pause your workflow',
    icon: GoogleFormIcon,

    id: 'delay',
    name: 'Delay',
  },
  {
    category: 'Developer Tools',
    description: 'Send or receive HTTP requests',
    icon: GoogleFormIcon,

    id: 'webhooks',
    name: 'Webhooks',
  },
  {
    category: 'Developer Tools',
    description: 'Run custom JavaScript or Python',
    icon: GoogleFormIcon,

    id: 'code',
    name: 'Code',
  },
];

export const ProviderAppMetadataRecord: ProviderAppMetadataRecordType = {
  [WorkflowProviderApp.Facebook]: {
    category: 'Communication',
    description: 'Social media platform',
    icon: GoogleFormIcon,
    id: WorkflowProviderApp.Facebook,
    name: 'Facebook',
  },
  [WorkflowProviderApp.Gmail]: {
    category: 'Communication',
    description: 'Send and receive emails',
    icon: GoogleFormIcon,
    id: WorkflowProviderApp.Gmail,
    name: 'Gmail',
  },
  [WorkflowProviderApp.GoogleForm]: {
    category: 'Apps',
    description: 'Collect data via forms',
    icon: GoogleFormIcon,
    id: WorkflowProviderApp.GoogleForm,
    name: 'Google Forms',
  },
  [WorkflowProviderApp.GoogleSheet]: {
    category: 'Apps',
    description: 'Spreadsheet data processing',
    icon: GoogleSheetIcon,
    id: WorkflowProviderApp.GoogleSheet,
    name: 'Google Sheets',
  },
  [WorkflowProviderApp.Slack]: {
    category: 'Communication',
    description: 'Team messaging and collaboration',
    icon: GoogleFormIcon,
    id: WorkflowProviderApp.Slack,
    name: 'Slack',
  },
};
