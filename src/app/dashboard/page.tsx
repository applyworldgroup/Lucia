// import { Button } from "@/components/ui/button";import { signOut } from "@/features/actions/auth/signout";// import { validateServerProtectedRoute } from "@/lib/validate-server-protected-route";// import React from "react";

// export default async function Dashboard() {
//   const { user } = await validateServerProtectedRoute();
//   return (
//     <div>
//       <b>Dashboard</b>
//       <p>{JSON.stringify(user, null, 2)}</p>
//       <form action={signOut}>
//         <Button type="submit">Sign out</Button>
//       </form>
//     </div>
//   );
// }

// "use client";

// import { Button } from "@/components/ui/button";
// import { signOut } from "@/features/actions/auth/signout";
// import React from "react";
// import { ValidateClientProtectedRoute } from "@/lib/validate-client-protected-route";

// export default function Dashboard() {
//   const {user} = ValidateClientProtectedRoute()
//   return (
//     <div>
//       <b>Dashboard</b>
//       <p>Hi, this is client page</p>
//       <p>{JSON.stringify(user, null, 2)}</p>
//       <Button type="submit" onClick={() => signOut()}>
//         Sign out
//       </Button>
//     </div>
//   );
// }

"use client";

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import {
  ArrowUpRight,
  Users,
  FileText,
  GraduationCap,
  Clock,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const visaStatusData = [
  { name: "Training Visa (407)", value: 30 },
  { name: "Work Visa (482)", value: 50 },
  { name: "Student Visa (500)", value: 15 },
  { name: "Tourist Visa (600)", value: 20 },
  { name: "Others", value: 20 },
];

const topCountriesData = [
  { name: "Nepal", total: 150 },
  { name: "Dubai", total: 120 },
  { name: "Japan", total: 90 },
  { name: "Philippines", total: 75 },
  { name: "others", total: 60 },
];

const popularProgramsData = [
  { name: "Computer Science", students: 200 },
  { name: "Business Admin", students: 180 },
  { name: "Engineering", students: 150 },
  { name: "Health Sciences", students: 120 },
  { name: "Data Science", students: 100 },
];

const processingTimeData = [
  { name: "Jan", time: 45 },
  { name: "Feb", time: 42 },
  { name: "Mar", time: 48 },
  { name: "Apr", time: 50 },
  { name: "May", time: 47 },
  { name: "Jun", time: 45 },
];

const customerData = [
  { name: "Jan", total: 150 },
  { name: "Feb", total: 230 },
  { name: "Mar", total: 180 },
  { name: "Apr", total: 260 },
  { name: "May", total: 320 },
  { name: "Jun", total: 380 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function DashboardContent() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Applicants
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,520</div>
          <p className="text-xs text-muted-foreground">+15% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Applications
          </CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">245</div>
          <p className="text-xs text-muted-foreground">+5% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Enrolled Students
          </CardTitle>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">892</div>
          <p className="text-xs text-muted-foreground">+19% from last year</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Avg. Processing Time
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45 days</div>
          <p className="text-xs text-muted-foreground">
            -3 days from last month
          </p>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Visa Application History</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={visaStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {visaStatusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Customers for countries</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topCountriesData}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Bar dataKey="total" fill="#8884d8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Popular Education Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={popularProgramsData} layout="vertical">
              <XAxis
                type="number"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                dataKey="name"
                type="category"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Bar dataKey="students" fill="#82ca9d" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Application Processing Time Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={processingTimeData}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="time"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Recent Customers</CardTitle>
          <CardDescription>New applicants in the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={customerData}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="total"
                stroke="#82ca9d"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Top Performing Agents</CardTitle>
          <CardDescription>
            Agents with the highest application success rate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {["Sarah Johnson", "Michael Lee", "Emily Chen", "David Patel"].map(
              (name, index) => (
                <div className="flex items-center" key={name}>
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <ArrowUpRight className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{name}</p>
                    <p className="text-sm text-muted-foreground">
                      {90 - index * 5}% success rate
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    {20 - index} applications
                  </div>
                </div>
              ),
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
