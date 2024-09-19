import { useRouter } from 'next/navigation';
import { useSession } from '@/app/components/session-provider';

export const ValidateClientProtectedRoute = () => {
    const router = useRouter()
    const { user, session } = useSession();
    if (!user) {
        router.push('/auth/signin');
    }
    return { user, session };
};

export const ValidateAdminInClient = () => {
    const router = useRouter()
    const { user } = useSession();
    if (user?.role !== "ADMIN") {
        router.push('/');
    }
    return { user };
};
