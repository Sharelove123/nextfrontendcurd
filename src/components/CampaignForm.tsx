'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface CampaignFormProps {
    initialData?: any;
}

export default function CampaignForm({ initialData }: CampaignFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        platform: 'instagram',
        status: 'active',
        budget: '',
        engagement_score: 0,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                platform: initialData.platform,
                status: initialData.status,
                budget: initialData.budget,
                engagement_score: initialData.engagement_score,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dataToSend = {
                ...formData,
                budget: parseFloat(formData.budget) || 0,
                engagement_score: parseInt(String(formData.engagement_score)) || 0,
            };
            if (initialData) {
                await api.updateCampaign(initialData.id, dataToSend);
            } else {
                await api.createCampaign(dataToSend);
            }
            router.push('/campaigns');
            router.refresh();
        } catch (error) {
            console.error("Failed to save campaign", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>{initialData ? 'Edit Campaign' : 'Create New Campaign'}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Campaign Title</label>
                        <Input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Summer Sale 2024"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Platform</label>
                            <select
                                name="platform"
                                value={formData.platform}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                            >
                                <option value="instagram">Instagram</option>
                                <option value="youtube">YouTube</option>
                                <option value="tiktok">TikTok</option>
                                <option value="twitter">Twitter</option>
                                <option value="linkedin">LinkedIn</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="flex h-10 w-full rounded-md border border-[var(--input)] bg-[var(--background)] px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
                            >
                                <option value="active">Active</option>
                                <option value="paused">Paused</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Budget ($)</label>
                            <Input
                                type="number"
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Engagement Score (0-100)</label>
                            <Input
                                type="number"
                                name="engagement_score"
                                value={formData.engagement_score}
                                onChange={handleChange}
                                required
                                min="0"
                                max="100"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {initialData ? 'Update Campaign' : 'Create Campaign'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
