'use client';

import type { NodeQueryData } from '@/features/workflow/types/graph';
import {
  WorkflowNodeType,
  WorkflowProviderApp,
} from '@/shared/api/base.schemas';

import { PathsTestedView } from './TestedView/PathsTestedView';
import { TestedView } from './TestedView/TestedView';
import { UntestedView } from './UntestedView';

interface TestTabContentProps {
  node: NodeQueryData | undefined;
  workflowId: string;
}

/**
 * Dispatches to the correct test-tab view based on node + provider.
 *
 * The default branch covers the standard trigger/action flow: show the
 * UntestedView until the node has been run once, then swap to TestedView.
 * Provider-specific cases short-circuit when their UntestedView framing
 * ("find recent responses" etc.) doesn't make sense — e.g. Paths runs
 * inside Zentrox and has no external samples to fetch, so it jumps
 * straight to its own evaluator view.
 */
const TestTabContent = ({ node, workflowId }: TestTabContentProps) => {
  if (!node) return <UntestedView node={node} workflowId={workflowId} />;

  switch (node.nodeType) {
    // =========================================================================
    //  ██╗   ██╗████████╗██╗██╗     ██╗████████╗██╗███████╗███████╗
    //  ██║   ██║╚══██╔══╝██║██║     ██║╚══██╔══╝██║██╔════╝██╔════╝
    //  ██║   ██║   ██║   ██║██║     ██║   ██║   ██║█████╗  ███████╗
    //  ██║   ██║   ██║   ██║██║     ██║   ██║   ██║██╔══╝  ╚════██║
    //  ╚██████╔╝   ██║   ██║███████╗██║   ██║   ██║███████╗███████║
    //  Utility nodes — no external "verify" step, render the evaluator
    //  directly. PathsTestedView handles its own pre-test empty state.
    // =========================================================================
    case WorkflowNodeType.Utility:
      switch (node.providerApp) {
        case WorkflowProviderApp.Paths:
          return <PathsTestedView node={node} workflowId={workflowId} />;
        default:
          return <UntestedView node={node} workflowId={workflowId} />;
      }

    // =========================================================================
    //  Trigger + Action — standard untested → tested flow gated on
    //  the node's connectionStatus.
    // =========================================================================
    case WorkflowNodeType.Trigger:
    case WorkflowNodeType.Action:
    default:
      if (node.connectionStatus === 'untested') {
        return <UntestedView node={node} workflowId={workflowId} />;
      }
      return <TestedView node={node} workflowId={workflowId} />;
  }
};

export { TestTabContent };
