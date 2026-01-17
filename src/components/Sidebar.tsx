'use client';

import { useState } from 'react';
import Link from 'next/link';
import { LayoutDashboard, List, PlusCircle, Menu, X } from 'lucide-react';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/campaigns', icon: List, label: 'Campaigns' },
        { href: '/campaigns/new', icon: PlusCircle, label: 'New Campaign' },
    ];

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-[var(--card)] border-b">
                <h1 className="text-xl font-bold text-[var(--primary)]">MediaBoost</h1>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 rounded-lg hover:bg-[var(--accent)]"
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/50"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed lg:static inset-y-0 left-0 z-50
                w-64 flex flex-col border-r bg-[var(--card)] text-[var(--card-foreground)]
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                lg:h-screen
            `}>
                <div className="p-6 hidden lg:block">
                    <h1 className="text-2xl font-bold tracking-tight text-[var(--primary)]">MediaBoost</h1>
                </div>
                <div className="p-6 lg:hidden pt-20">
                    {/* Space for mobile header */}
                </div>
                <nav className="flex-1 space-y-2 p-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium hover:bg-[var(--accent)] hover:text-[var(--accent-foreground)] transition-all"
                        >
                            <link.icon className="h-5 w-5" />
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold">
                            JD
                        </div>
                        <div>
                            <p className="text-sm font-medium">Jane Doe</p>
                            <p className="text-xs text-[var(--muted-foreground)]">Manager</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
