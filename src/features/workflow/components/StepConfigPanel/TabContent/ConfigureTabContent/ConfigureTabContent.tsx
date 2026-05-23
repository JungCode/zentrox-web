'use client';

import type { NodeQueryData } from '@/features/workflow/types';
import {
  WorkflowNodeType,
  WorkflowProviderApp,
} from '@/shared/api/base.schemas';

import { AiGenerateConfigForm } from './AiGenerateConfigForm';
import { GoogleFormConfigForm } from './GoogleFormConfigForm';
import { GoogleSheetConfigForm } from './GoogleSheetConfigForm';

interface ConfigureTabContentProps {
  node: NodeQueryData;
}

const ConfigureTabContent = ({ node }: ConfigureTabContentProps) => {
  switch (node.nodeType) {
    // =========================================================================
    //  ████████╗██████╗ ██╗ ██████╗  ██████╗ ███████╗██████╗  ██████╗
    //  ╚══██╔══╝██╔══██╗██║██╔════╝ ██╔════╝ ██╔════╝██╔══██╗██╔════╝
    //     ██║   ██████╔╝██║██║  ███╗██║  ███╗█████╗  ██████╔╝╚█████╗
    //     ██║   ██╔══██╗██║██║   ██║██║   ██║██╔══╝  ██╔══██╗ ╚═══██╗
    //     ██║   ██║  ██║██║╚██████╔╝╚██████╔╝███████╗██║  ██║██████╔╝
    //  For triggers, show config form based on provider app
    // =========================================================================
    case WorkflowNodeType.Trigger:
      switch (node?.providerApp) {
        case WorkflowProviderApp.GoogleForm:
          return <GoogleFormConfigForm node={node} />;

        case WorkflowProviderApp.Ai:
        case WorkflowProviderApp.GoogleSheet:
        case WorkflowProviderApp.Facebook:
        case WorkflowProviderApp.Gmail:
        case WorkflowProviderApp.Slack:
        default:
          return null;
      }

    // =========================================================================
    //   █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
    //  ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
    //  ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
    //  ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
    //  ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
    //  For actions, show config form based on provider app
    // =========================================================================
    case WorkflowNodeType.Action:
      switch (node?.providerApp) {
        case WorkflowProviderApp.GoogleSheet:
          return <GoogleSheetConfigForm node={node} />;

        case WorkflowProviderApp.Ai:
          return <AiGenerateConfigForm node={node} />;

        case WorkflowProviderApp.GoogleForm:
        case WorkflowProviderApp.Facebook:
        case WorkflowProviderApp.Gmail:
        case WorkflowProviderApp.Slack:
        default:
          return null;
      }

    // =========================================================================
    //  ██╗   ██╗████████╗██╗██╗     ██╗████████╗██╗███████╗███████╗
    //  ██║   ██║╚══██╔══╝██║██║     ██║╚══██╔══╝██║██╔════╝██╔════╝
    //  ██║   ██║   ██║   ██║██║     ██║   ██║   ██║█████╗  ███████╗
    //  ██║   ██║   ██║   ██║██║     ██║   ██║   ██║██╔══╝  ╚════██║
    //  ╚██████╔╝   ██║   ██║███████╗██║   ██║   ██║███████╗███████║
    //  For utilities, show config form based on tool types
    // =========================================================================
    case WorkflowNodeType.Utility:
      return null;
  }
};

export { ConfigureTabContent };
