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

  if (loading) return <div className="p-4 md:p-8">Loading dashboard...</div>;
  if (!stats) return <div className="p-4 md:p-8">Failed to load stats.</div>;

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-sm md:text-base text-[var(--muted-foreground)]">Overview of your campaign performance.</p>
      </div>

      {/* Stats Grid - 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        <StatsCard title="Total Campaigns" value={stats.total_campaigns} icon={BarChart2} />
        <StatsCard title="Active Campaigns" value={stats.active_campaigns} icon={Activity} />
        <StatsCard title="Total Budget" value={`$${stats.total_budget.toLocaleString()}`} icon={DollarSign} />
        <StatsCard title="Avg Engagement" value={stats.avg_engagement} icon={Users} />
      </div>

      {/* Charts and Influencers - Stack on mobile, side by side on desktop */}
      <div className="grid gap-4 md:gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">Platform Distribution</CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:pl-2">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.platform_stats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="platform" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl">Recommended Influencers</CardTitle>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0 md:pt-0">
            <div className="space-y-3 md:space-y-4">
              {influencers.map((user: any, i) => (
                <div key={i} className="flex items-center gap-3 md:gap-4">
                  <img
                    src={user.picture.thumbnail}
                    alt={user.name.first}
                    className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-[var(--secondary)]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none truncate">{user.name.first} {user.name.last}</p>
                    <p className="text-xs md:text-sm text-[var(--muted-foreground)] truncate">{user.email}</p>
                  </div>
                  <div className="text-xs text-[var(--muted-foreground)] hidden sm:block">{user.location.country}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
