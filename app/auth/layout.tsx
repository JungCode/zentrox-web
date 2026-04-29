import type { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div className="min-h-screen">{children}</div>;
};

export default AuthLayout;
