'use client';

import { useQuery } from '@apollo/client/react';

import { MeDocument } from '@/shared/api/auth/auth.schemas';
const WorkflowPage = () => {
  const query = useQuery(MeDocument);

  return <div className="h-screen">{query.data?.me.email}</div>;
};

export default WorkflowPage;
