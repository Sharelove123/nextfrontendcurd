'use client';

import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'completed': return 'bg-blue-100 text-blue-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Campaigns</h2>
                    <p className="text-sm md:text-base text-[var(--muted-foreground)]">Manage your social media campaigns.</p>
                </div>
                <Link href="/campaigns/new">
                    <Button className="w-full sm:w-auto">
                        <Plus className="mr-2 h-4 w-4" /> New Campaign
                    </Button>
                </Link>
            </div>

            {/* Mobile Card View */}
            <div className="grid gap-4 md:hidden">
                {campaigns.map((campaign) => (
                    <Card key={campaign.id}>
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <h3 className="font-semibold">{campaign.title}</h3>
                                    <p className="text-sm text-[var(--muted-foreground)] capitalize">{campaign.platform}</p>
                                </div>
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusColor(campaign.status)}`}>
                                    {campaign.status}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <div>
                                    <span className="text-[var(--muted-foreground)]">Budget: </span>
                                    <span className="font-medium">${Number(campaign.budget).toLocaleString()}</span>
                                </div>
                                <div>
                                    <span className="text-[var(--muted-foreground)]">Score: </span>
                                    <span className="font-medium">{campaign.engagement_score}</span>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4 pt-3 border-t">
                                <Button variant="outline" size="sm" className="flex-1" onClick={() => router.push(`/campaigns/${campaign.id}/edit`)}>
                                    <Edit2 className="h-4 w-4 mr-1" /> Edit
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1 text-[var(--destructive)]" onClick={() => handleDelete(campaign.id)}>
                                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {campaigns.length === 0 && (
                    <Card>
                        <CardContent className="p-8 text-center text-[var(--muted-foreground)]">
                            No campaigns found. Create one to get started.
                        </CardContent>
                    </Card>
                )}
            </div>

            {/* Desktop Table View */}
            <div className="rounded-md border hidden md:block">
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
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${getStatusColor(campaign.status)}`}>
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
