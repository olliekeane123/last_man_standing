'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CardHeader, CardTitle } from '@/components/ui/card';

export default function ClientRedirector({ redirectUrl }: { redirectUrl: string }) {
    const router = useRouter();

    useEffect(() => {
        router.replace(redirectUrl);
    }, [redirectUrl, router]);

    return (
        <CardHeader>
            <CardTitle>You are being redirected, please wait...</CardTitle>
        </CardHeader>
    );
}