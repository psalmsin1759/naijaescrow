'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth, authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !auth?.token) {
      router.push('/login');
    }
  }, [auth, authLoading, router]);

  if (authLoading) return null; 

  return <>{children}</>;
}
