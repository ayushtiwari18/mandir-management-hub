
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface StatisticCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  isLoading?: boolean;
}

export function StatisticCard({
  title,
  value,
  description,
  icon,
  trend,
  className,
  isLoading = false,
}: StatisticCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        {isLoading ? (
          <>
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </>
        ) : (
          <>
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {icon}
            </div>
          </>
        )}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-8 w-28 mb-1" />
            <Skeleton className="h-4 w-36" />
          </>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            <div className="flex items-center">
              {trend && (
                <div
                  className={cn(
                    "mr-2 text-xs font-medium",
                    trend.isPositive ? "text-temple-green" : "text-temple-red"
                  )}
                >
                  {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
                </div>
              )}
              <CardDescription className="text-xs pt-1">
                {description}
              </CardDescription>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
