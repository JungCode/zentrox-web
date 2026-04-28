'use client';

import { useQuery } from '@apollo/client/react';

import { CheckHealthDocument } from '@/shared/api/auth/auth.schemas';

export const Text = () => {
  const { data } = useQuery(CheckHealthDocument);

  console.log(data);
  return <div>123</div>;
};
