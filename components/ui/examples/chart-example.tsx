/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { Line, LineChart } from "recharts";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export function Chart() {
  // Mock data for demonstration
  const mockDownloadsData = [
    { value: 20 },
    { value: 22 },
    { value: 29 },
    { value: 49 },
    { value: 59 },
    { value: 69 },
    { value: 79 },
    { value: 89 },
  ];

  const [downloads, setDownloads] = useState(100);
  const [downloadChange, setDownloadChange] = useState(8); // showing an increase of 8 from last month
  const [downloadsData, setDownloadsData] = useState(mockDownloadsData);

  // GitHub Stats state
  const [stars, setStars] = useState(0);
  const [monthlyChange, setMonthlyChange] = useState(0);
  const [starsData, setStarsData] = useState([]);

  useEffect(() => {
    // For demo, we'll just set the mock data directly instead of fetching
    setDownloads(100);
    setDownloadChange(8);
    setDownloadsData(mockDownloadsData);
  }, []);

  useEffect(() => {
    async function fetchGithubStats() {
      try {
        const response = await fetch(
          "https://api.github.com/repos/nizzyabi/lib-ui",
          {
            headers: process.env.GITHUB_OAUTH_TOKEN
              ? {
                  Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
                  "Content-Type": "application/json",
                }
              : {},
            next: {
              revalidate: 3600,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          const currentStars = data.stargazers_count || 0;
          setStars(currentStars);

          const lastMonth = new Date();
          lastMonth.setMonth(lastMonth.getMonth() - 1);

          const historicalResponse = await fetch(
            `https://api.github.com/repos/nizzyabi/lib-ui/stargazers`,
            {
              headers: {
                ...response.headers,
                Accept: "application/vnd.github.v3.star+json",
              },
            }
          );

          if (historicalResponse.ok) {
            const stargazersData = await historicalResponse.json();

            const lastMonthStars = stargazersData.filter(
              (star: any) => new Date(star.starred_at) >= lastMonth
            ).length;

            setMonthlyChange(lastMonthStars);

            const newStarsData = Array.from({ length: 8 }, (_, i) => ({
              value: Math.max(0, currentStars - (7 - i) * (lastMonthStars / 7)),
            }));
            setStarsData(newStarsData as any);
          }
        }
      } catch (error) {
        console.error("Error fetching GitHub stars:", error);
      }
    }

    fetchGithubStats();
  }, []);

  return (
    <div className="flex flex-col items-center w-full justify-between space-y-4 h-full">
      <Card className="w-full shadow-md shadow-primary/20">
        <CardHeader className="pb-3">
          <CardTitle>NPM Downloads</CardTitle>
          <CardDescription>
            See how many downloads we have.
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-0">
          <div className="text-2xl font-bold">{downloads.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            {downloadChange > 0 ? "+" : ""}{downloadChange.toLocaleString()} from last month
          </p>
          <ChartContainer config={chartConfig} className="h-[80px] w-full">
            <LineChart
              data={downloadsData}
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
                dataKey="value"
                stroke="var(--color-value)"
                dot={false}
                strokeLinecap="round"
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="w-full shadow-md shadow-primary/20">
        <CardHeader className="pb-3">
          <CardTitle>Github Stars</CardTitle>
          <CardDescription>
            See how many github stars we have.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-center">{stars}</div>
          <p className="text-xs text-muted-foreground text-center pt-3">
            {monthlyChange > 0 ? `+${monthlyChange}` : monthlyChange} from last
            month
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
