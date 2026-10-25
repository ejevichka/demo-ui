import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { REQUIRE_LOGIN } from '@/lib/access';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // The gate is off (see src/lib/access.ts): every route is open, and nothing
  // is written to or read from localStorage.
  if (!REQUIRE_LOGIN) {
    return <>{children}</>;
  }

  const isAuthenticated = localStorage.getItem('brainform_auth') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
