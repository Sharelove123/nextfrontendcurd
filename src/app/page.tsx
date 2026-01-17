'use client';

import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import StatsCard from '@/components/StatsCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, DollarSign, Users, BarChart2 } from 'lucide-react';

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [influencers, setInfluencers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, influencersData] = await Promise.all([
          api.getStats(),
          api.getInfluencers()
        ]);
        setStats(statsData);
        setInfluencers(influencersData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8">Loading dashboard...</div>;
  if (!stats) return <div className="p-8">Failed to load stats.</div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-[var(--muted-foreground)]">Overview of your campaign performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Campaigns" value={stats.total_campaigns} icon={BarChart2} />
        <StatsCard title="Active Campaigns" value={stats.active_campaigns} icon={Activity} />
        <StatsCard title="Total Budget" value={`$${stats.total_budget.toLocaleString()}`} icon={DollarSign} />
        <StatsCard title="Avg Engagement" value={stats.avg_engagement} icon={Users} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Platform Distribution</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={stats.platform_stats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recommended Influencers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {influencers.map((user: any, i) => (
                <div key={i} className="flex items-center gap-4">
                  <img
                    src={user.picture.thumbnail}
                    alt={user.name.first}
                    className="h-10 w-10 rounded-full bg-[var(--secondary)]"
                  />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium leading-none truncate">{user.name.first} {user.name.last}</p>
                    <p className="text-sm text-[var(--muted-foreground)] truncate">{user.email}</p>
                  </div>
                  <div className="text-xs text-[var(--muted-foreground)]">{user.location.country}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
