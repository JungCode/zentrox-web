'use client';

import type { NodeQueryData } from '@/features/workflow/types';
import {
  WorkflowNodeType,
  WorkflowProviderApp,
} from '@/shared/api/base.schemas';

import { AiGenerateConfigForm } from './AiGenerateConfigForm';
import { GoogleFormConfigForm } from './GoogleFormConfigForm';
import { GoogleSheetConfigForm } from './GoogleSheetConfigForm';
import { PathsConfigForm } from './PathsConfigForm';

interface ConfigureTabContentProps {
  node: NodeQueryData;
  workflowId: string;
}

const ConfigureTabContent = ({
  node,
  workflowId,
}: ConfigureTabContentProps) => {
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
      switch (node?.providerApp) {
        case WorkflowProviderApp.Paths:
          return <PathsConfigForm node={node} workflowId={workflowId} />;
        default:
          return null;
      }
  }
};

export { ConfigureTabContent };
