import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const validateProtectedRoute = async () => {
  const { user } = await validateRequest();
  if (!user) {
    redirect('/auth/signin');
  }
  return user;
};
