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

type NavItem = {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
};

const navItems: NavItem[] = [
  { href: '/workflow', icon: DashboardIcon, title: 'Home' },
  { href: '/workflow/workflows', icon: SiteMapIcon, title: 'Workflows' },
  { href: '/workflow/assets', icon: ArchiveIcon, title: 'Assets' },
  { href: '/workflow/templates', icon: LayerIcon, title: 'Templates' },
  { href: '/workflow/marketplace', icon: StoreIcon, title: 'Marketplace' },
  { href: '/workflow/logs', icon: TerminalIcon, title: 'Logs' },
  { href: '/workflow/settings', icon: SettingsIcon, title: 'Settings' },
];

const supportItems: NavItem[] = [
  { href: '/workflow/docs', icon: DocumentIcon, title: 'Documentation' },
  { href: '/workflow/support', icon: HelpIcon, title: 'Support' },
];

export { type NavItem, navItems, supportItems };
