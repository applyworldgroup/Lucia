import { useRouter } from 'next/navigation';
import { useSession } from '@/app/components/session-provider';

export const validateClientProtectedRoute = () => {
    const router = useRouter()
    const { user, session } = useSession();
    if (!user) {
        router.push('/auth/signin');
    }
    return { user, session };
};

export const validateAdminInClient = () => {
    const router = useRouter()
    const { user } = useSession();
    if (user?.role !== "ADMIN") {
        router.push('/');
    }
    return { user };
};
