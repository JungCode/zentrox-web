import {
  ArchiveIcon,
  DashboardIcon,
  DocumentIcon,
  HelpIcon,
  LayerIcon,
  SettingsIcon,
  SiteMapIcon,
  StoreIcon,
  TerminalIcon,
} from '@/shared/assets/icons';

import { APP_ROUTES, SUPPORT_ROUTES } from './routes';

type NavItem = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
};

const navItems: NavItem[] = [
  { href: APP_ROUTES.HOME, icon: DashboardIcon, title: 'Home' },
  { href: APP_ROUTES.WORKFLOW, icon: SiteMapIcon, title: 'Workflow' },
  { href: APP_ROUTES.ASSETS, icon: ArchiveIcon, title: 'Assets' },
  { href: APP_ROUTES.TEMPLATES, icon: LayerIcon, title: 'Templates' },
  { href: APP_ROUTES.MARKETPLACE, icon: StoreIcon, title: 'Marketplace' },
  { href: APP_ROUTES.LOGS, icon: TerminalIcon, title: 'Logs' },
  { href: APP_ROUTES.SETTINGS, icon: SettingsIcon, title: 'Settings' },
];

const supportItems: NavItem[] = [
  { href: SUPPORT_ROUTES.DOCS, icon: DocumentIcon, title: 'Documentation' },
  { href: SUPPORT_ROUTES.SUPPORT, icon: HelpIcon, title: 'Support' },
];

export { type NavItem, navItems, supportItems };
