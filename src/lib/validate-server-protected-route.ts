import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';


export const validateServerProtectedRoute = async () => {
  const { user, session } = await validateRequest();
  if (!user) {
    redirect('/auth/signin');
  }
  return { user, session };
};

