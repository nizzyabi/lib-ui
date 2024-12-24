"use client";

import { Bar, BarChart, Line, LineChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const data = [
  {
    revenue: 15000,
    subscription: 320,
  },
  {
    revenue: 18500,
    subscription: 450,
  },
  {
    revenue: 12400,
    subscription: 280,
  },
  {
    revenue: 22000,
    subscription: 520,
  },
  {
    revenue: 19800,
    subscription: 480,
  },
  {
    revenue: 24600,
    subscription: 590,
  },
  {
    revenue: 28500,
    subscription: 620,
  },
  {
    revenue: 32000,
    subscription: 680,
  },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
  subscription: {
    label: "Subscriptions",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <div className="flex flex-col items-center w-full justify-between space-y-4 h-full">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-normal">NPM Downloads</CardTitle>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="text-2xl font-bold">+40000</div>
          <p className="text-xs text-muted-foreground">+200 from last month</p>
          <ChartContainer config={chartConfig} className="h-[80px] w-full">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Line
                type="monotone"
                strokeWidth={1.5}
                dataKey="revenue"
                stroke="var(--color-revenue)"
                dot={false}
                strokeLinecap="round"
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-normal">Gitub Stars</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+22</div>
          <p className="text-xs text-muted-foreground">+100% from last month</p>
          <ChartContainer config={chartConfig} className="mt-2 h-[80px] w-full">
            <BarChart data={data}>
              <Bar
                dataKey="subscription"
                fill="var(--color-subscription)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
