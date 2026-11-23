export default function DiscoverPage() {
    return (
        <main className="min-h-[100dvh] pb-20 px-6 pt-10">
            <h1 className="text-2xl font-bold">Discover</h1>
            <p className="text-neutral-400 mt-2">Trending content coming soon.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="aspect-square rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-600 text-sm"
                    >
                        Placeholder {i + 1}
                    </div>
                ))}
            </div>
        </main>
    );
}