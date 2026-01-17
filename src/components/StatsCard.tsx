import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    trend?: string;
}

export default function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-3 md:p-4 pb-1 md:pb-2">
                <CardTitle className="text-xs md:text-sm font-medium text-[var(--muted-foreground)]">
                    {title}
                </CardTitle>
                <Icon className="h-3 w-3 md:h-4 md:w-4 text-[var(--muted-foreground)]" />
            </CardHeader>
            <CardContent className="p-3 md:p-4 pt-0">
                <div className="text-lg md:text-2xl font-bold">{value}</div>
                {trend && (
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">
                        {trend}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
