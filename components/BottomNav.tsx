'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
    { href: '/', label: 'Home', icon: '🏠' },
    { href: '/discover', label: 'Discover', icon: '🔍' },
    { href: '/profile', label: 'Profile', icon: '👤' },
];

export default function BottomNav() {
    const pathname = usePathname();
    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-t border-neutral-800">
            <ul className="flex justify-around items-center py-2">
                {items.map((it) => {
                    const active = pathname === it.href;
                    return (
                        <li key={it.href}>
                            <Link
                                href={it.href}
                                className={`flex flex-col items-center px-4 py-1 text-xs ${active ? 'text-white' : 'text-neutral-500'
                                    }`}
                            >
                                <span className="text-xl leading-none">{it.icon}</span>
                                <span className="mt-1">{it.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}