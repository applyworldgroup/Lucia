import { validateRequest } from '@/lib/auth';
import { redirect } from 'next/navigation';


export const validateServerProtectedRoute = async () => {
  const { user, session } = await validateRequest();
  if (!user) {
    redirect('/auth/signin');
  }
  return { user, session };
};

export const validateAdminInServer = async () => {
  const { user } = await validateRequest();
  if (user?.role !== "ADMIN") {
    redirect('/');
  }
  return { user };
};

