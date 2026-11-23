'use client';

import { useEffect } from 'react';
import {
    ADSENSE_CLIENT,
    ADSENSE_SLOT_VIDEO,
    ADSENSE_ENABLED,
    ACTIVE_AD_PROVIDER,
} from '@/lib/ads';

export default function AdSlot() {
    useEffect(() => {
        if (ACTIVE_AD_PROVIDER !== 'adsense') return;
        try {
            // @ts-expect-error injected by AdSense
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
            console.warn('AdSense push failed', e);
        }
    }, []);

    // ── Placeholder state: no real ad slot configured yet ──
    if (ACTIVE_AD_PROVIDER === 'none') {
        return (
            <div className="feed-item flex items-center justify-center bg-neutral-950 border-b border-neutral-900">
                <div className="text-center px-6">
                    <div className="mx-auto mb-3 h-16 w-16 rounded-2xl border border-dashed border-neutral-700 flex items-center justify-center text-neutral-500">
                        AD
                    </div>
                    <p className="text-neutral-400 text-sm">
                        Reserved ad space — replace the sample slot
                        {' '}
                        <code className="text-neutral-300">1234567890</code>
                        {' '}
                        with a real AdSense slot.
                    </p>
                </div>
            </div>
        );
    }

    // ── AdSense render ──
    if (ACTIVE_AD_PROVIDER === 'adsense') {
        return (
            <div className="feed-item flex items-center justify-center bg-black">
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block', width: '100%', height: '100%' }}
                    data-ad-client={ADSENSE_CLIENT}
                    data-ad-slot={ADSENSE_SLOT_VIDEO}
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                />
            </div>
        );
    }

    // ── GAM placeholder (future) ──
    return (
        <div className="feed-item flex items-center justify-center bg-neutral-950 border-b border-neutral-900">
            <p className="text-neutral-400 text-sm">
                GAM ad slot reserved (not implemented yet)
            </p>
        </div>
    );
}