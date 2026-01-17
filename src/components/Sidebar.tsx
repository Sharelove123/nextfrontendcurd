import Link from 'next/link';
import { LayoutDashboard, List, PlusCircle } from 'lucide-react';

export default function Sidebar() {
    return (
        <div className="flex h-screen w-64 flex-col border-r bg-card text-card-foreground">
            <div className="p-6">
                <h1 className="text-2xl font-bold tracking-tight text-primary">MediaBoost</h1>
            </div>
            <nav className="flex-1 space-y-2 p-4">
                <Link
                    href="/"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all"
                >
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                </Link>
                <Link
                    href="/campaigns"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all"
                >
                    <List className="h-5 w-5" />
                    Campaigns
                </Link>
                <Link
                    href="/campaigns/new"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-all"
                >
                    <PlusCircle className="h-5 w-5" />
                    New Campaign
                </Link>
            </nav>
            <div className="p-4 border-t">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                        JD
                    </div>
                    <div>
                        <p className="text-sm font-medium">Jane Doe</p>
                        <p className="text-xs text-muted-foreground">Manager</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
