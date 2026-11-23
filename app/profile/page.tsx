export default function ProfilePage() {
    return (
        <main className="min-h-[100dvh] pb-20 px-6 pt-10">
            <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-neutral-800 flex items-center justify-center text-2xl">
                    👤
                </div>
                <div>
                    <h1 className="text-xl font-bold">Guest User</h1>
                    <p className="text-neutral-400 text-sm">@guest</p>
                </div>
            </div>
            <p className="text-neutral-400 mt-6 text-sm">
                No login in this version. Likes and bookmarks are saved locally on your device.
            </p>
        </main>
    );
}