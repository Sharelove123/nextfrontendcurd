'use client';

import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        loadCampaigns();
    }, []);

    const loadCampaigns = async () => {
        try {
            const data = await api.getCampaigns();
            setCampaigns(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this campaign?')) {
            await api.deleteCampaign(id);
            loadCampaigns();
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Campaigns</h2>
                    <p className="text-[var(--muted-foreground)]">Manage your social media campaigns.</p>
                </div>
                <Link href="/campaigns/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> New Campaign
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[var(--muted)]/50 text-[var(--muted-foreground)] font-medium border-b">
                        <tr>
                            <th className="p-4">Title</th>
                            <th className="p-4">Platform</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Budget</th>
                            <th className="p-4">Engagement</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaigns.map((campaign) => (
                            <tr key={campaign.id} className="border-b transition-colors hover:bg-[var(--muted)]/50">
                                <td className="p-4 font-medium">{campaign.title}</td>
                                <td className="p-4 capitalize">{campaign.platform}</td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize
                    ${campaign.status === 'active' ? 'bg-green-100 text-green-800' :
                                            campaign.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {campaign.status}
                                    </span>
                                </td>
                                <td className="p-4">${Number(campaign.budget).toLocaleString()}</td>
                                <td className="p-4">{campaign.engagement_score}</td>
                                <td className="p-4 text-right space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => router.push(`/campaigns/${campaign.id}/edit`)}>
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-[var(--destructive)]" onClick={() => handleDelete(campaign.id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {campaigns.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-[var(--muted-foreground)]">
                                    No campaigns found. Create one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
