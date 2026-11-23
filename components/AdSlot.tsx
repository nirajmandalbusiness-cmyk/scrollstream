'use client';

// Placeholder for future full-screen video ad slot.
// Do NOT wire to any ad network here.
export default function AdSlot() {
    return (
        <div className="feed-item flex items-center justify-center bg-neutral-950 border-b border-neutral-900">
            <div className="text-center px-6">
                <div className="mx-auto mb-3 h-16 w-16 rounded-2xl border border-dashed border-neutral-700 flex items-center justify-center text-neutral-500">
                    AD
                </div>
                <p className="text-neutral-400 text-sm">
                    Reserved ad space — future full-screen video ads
                </p>
            </div>
        </div>
    );
}