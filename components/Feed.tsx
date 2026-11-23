'use client';

import { useState } from 'react';
import FeedItem from './FeedItem';
import AdSlot from './AdSlot';
import { mediaPosts } from '@/lib/mediaData';

export default function Feed() {
    const [muted, setMuted] = useState(true);

    return (
        <div className="feed-container">
            {mediaPosts.map((post, idx) => (
                <FeedItem
                    key={post.id}
                    post={post}
                    muted={muted}
                    onToggleMute={() => setMuted(m => !m)}
                />
            ))}

            {/* Reserved ad slot at end of feed */}
            <AdSlot />
        </div>
    );
}