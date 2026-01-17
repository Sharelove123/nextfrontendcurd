const API_URL = 'http://localhost:8000/api';

export const api = {
    getCampaigns: async () => {
        const res = await fetch(`${API_URL}/campaigns/`);
        if (!res.ok) throw new Error('Failed to fetch campaigns');
        return res.json();
    },

    getCampaign: async (id: string) => {
        const res = await fetch(`${API_URL}/campaigns/${id}/`);
        if (!res.ok) throw new Error('Failed to fetch campaign');
        return res.json();
    },

    createCampaign: async (data: any) => {
        const res = await fetch(`${API_URL}/campaigns/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to create campaign');
        return res.json();
    },

    updateCampaign: async (id: number, data: any) => {
        const res = await fetch(`${API_URL}/campaigns/${id}/`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error('Failed to update campaign');
        return res.json();
    },

    deleteCampaign: async (id: number) => {
        const res = await fetch(`${API_URL}/campaigns/${id}/`, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Failed to delete campaign');
        return true;
    },

    getStats: async () => {
        const res = await fetch(`${API_URL}/dashboard/stats/`);
        if (!res.ok) throw new Error('Failed to fetch stats');
        return res.json();
    },

    getInfluencers: async () => {
        const res = await fetch(`${API_URL}/external/influencers/`);
        if (!res.ok) throw new Error('Failed to fetch influencers');
        return res.json();
    }
};
