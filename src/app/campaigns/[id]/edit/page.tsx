'use client';

import { useEffect, useState } from 'react';
import CampaignForm from '@/components/CampaignForm';
import { api } from '@/services/api';
import { useParams } from 'next/navigation';

export default function EditCampaignPage() {
    const params = useParams();
    const [campaign, setCampaign] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCampaign = async () => {
            try {
                if (params.id) {
                    const data = await api.getCampaign(params.id as string);
                    setCampaign(data);
                }
            } catch (error) {
                console.error("Failed to load campaign", error);
            } finally {
                setLoading(false);
            }
        };
        loadCampaign();
    }, [params.id]);

    if (loading) return <div>Loading...</div>;
    if (!campaign) return <div>Campaign not found</div>;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Edit Campaign</h2>
                <p className="text-muted-foreground">Update campaign details.</p>
            </div>
            <CampaignForm initialData={campaign} />
        </div>
    );
}
