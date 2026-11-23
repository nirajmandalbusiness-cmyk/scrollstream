'use client';

import { useEffect, useRef, useState } from 'react';
import { MediaPost } from '@/lib/mediaData';

type Props = {
    post: MediaPost;
    muted: boolean;
    onToggleMute: () => void;
};

export default function FeedItem({ post, muted, onToggleMute }: Props) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);
    const [animateLike, setAnimateLike] = useState(false);

    // Load like/bookmark state from localStorage
    useEffect(() => {
        try {
            const likes = JSON.parse(localStorage.getItem('ss_likes') || '[]');
            const bm = JSON.parse(localStorage.getItem('ss_bookmarks') || '[]');
            setLiked(likes.includes(post.id));
            setBookmarked(bm.includes(post.id));
        } catch { }
    }, [post.id]);

    // Autoplay/pause via IntersectionObserver
    useEffect(() => {
        const v = videoRef.current;
        const el = containerRef.current;
        if (!v || !el) return;

        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
                    v.play().catch(() => { });
                } else {
                    v.pause();
                }
            },
            { threshold: [0, 0.6, 1] }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const toggleLike = () => {
        const next = !liked;
        setLiked(next);
        setAnimateLike(true);
        setTimeout(() => setAnimateLike(false), 300);
        try {
            const likes: string[] = JSON.parse(localStorage.getItem('ss_likes') || '[]');
            const updated = next ? [...new Set([...likes, post.id])] : likes.filter(i => i !== post.id);
            localStorage.setItem('ss_likes', JSON.stringify(updated));
        } catch { }
    };

    const toggleBookmark = () => {
        const next = !bookmarked;
        setBookmarked(next);
        try {
            const bm: string[] = JSON.parse(localStorage.getItem('ss_bookmarks') || '[]');
            const updated = next ? [...new Set([...bm, post.id])] : bm.filter(i => i !== post.id);
            localStorage.setItem('ss_bookmarks', JSON.stringify(updated));
        } catch { }
    };

    const share = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'ScrollStream',
                    text: post.caption,
                    url,
                });
            } catch { }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                alert('Link copied!');
            } catch { }
        }
    };

    return (
        <div ref={containerRef} className="feed-item">
            {/* Media */}
            {post.type === 'video' ? (
                <video
                    ref={videoRef}
                    src={post.src}
                    poster={post.poster}
                    className="absolute inset-0 h-full w-full object-cover"
                    playsInline
                    loop
                    muted={muted}
                    preload="metadata"
                />
            ) : (
                <img
                    src={post.src}
                    alt={post.caption}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/30 pointer-events-none" />

            {/* Right-side action buttons */}
            <div className="absolute right-3 bottom-28 flex flex-col items-center gap-5 z-10">
                <button
                    onClick={toggleLike}
                    aria-label="Like"
                    className="flex flex-col items-center gap-1 text-white active:scale-95 transition"
                >
                    <span className={`text-2xl ${animateLike ? 'animate-heart-pop' : ''}`}>
                        {liked ? '❤️' : '🤍'}
                    </span>
                    <span className="text-xs">Like</span>
                </button>

                <button
                    onClick={share}
                    aria-label="Share"
                    className="flex flex-col items-center gap-1 text-white active:scale-95 transition"
                >
                    <span className="text-2xl">↗️</span>
                    <span className="text-xs">Share</span>
                </button>

                <button
                    onClick={toggleBookmark}
                    aria-label="Bookmark"
                    className="flex flex-col items-center gap-1 text-white active:scale-95 transition"
                >
                    <span className="text-2xl">{bookmarked ? '🔖' : '📑'}</span>
                    <span className="text-xs">Save</span>
                </button>

                {post.type === 'video' && (
                    <button
                        onClick={onToggleMute}
                        aria-label={muted ? 'Unmute' : 'Mute'}
                        className="flex flex-col items-center gap-1 text-white active:scale-95 transition"
                    >
                        <span className="text-2xl">{muted ? '🔇' : '🔊'}</span>
                        <span className="text-xs">{muted ? 'Unmute' : 'Mute'}</span>
                    </button>
                )}
            </div>

            {/* Caption + creator */}
            <div className="absolute bottom-24 left-0 right-16 px-4 z-10">
                <p className="font-semibold text-white drop-shadow">{post.creator}</p>
                <p className="text-sm text-neutral-200 mt-1 line-clamp-2">{post.caption}</p>
            </div>
        </div>
    );
}