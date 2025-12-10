'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientRedirector({ redirectUrl }: { redirectUrl: string }) {
    const router = useRouter();

    useEffect(() => {
        // This ensures the client-side router call happens after the 
        // component has mounted and the first render/hydration is complete.
        // This avoids the "Rendered more hooks" race condition with Clerk/Router internals.
        router.replace(redirectUrl);
    }, [redirectUrl, router]);

    // Show a loading state while waiting for the useEffect to run.
    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh', 
            fontSize: '1.2rem' 
        }}>
            <p>Processing invitation and redirecting...</p>
        </div>
    );
}