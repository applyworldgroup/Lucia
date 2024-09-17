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
