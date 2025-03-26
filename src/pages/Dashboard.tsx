
import { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Users, Building, CreditCard, Clock, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatisticCard } from "@/components/ui/statistic-card";
import { useAuth } from "@/contexts/AuthContext";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data for charts
const pieData = [
  { name: "Available", value: 28, color: "#22c55e" },
  { name: "Occupied", value: 15, color: "#ef4444" },
  { name: "Reserved", value: 7, color: "#f59e0b" },
];

const barData = [
  { name: "Jan", donations: 4000, bookings: 2400 },
  { name: "Feb", donations: 3000, bookings: 1398 },
  { name: "Mar", donations: 2000, bookings: 9800 },
  { name: "Apr", donations: 2780, bookings: 3908 },
  { name: "May", donations: 1890, bookings: 4800 },
  { name: "Jun", donations: 2390, bookings: 3800 },
  { name: "Jul", donations: 3490, bookings: 4300 },
];

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    type: "booking",
    name: "Rohan Sharma",
    details: "Booked Room 305 for 3 nights",
    time: "2 hours ago",
  },
  {
    id: 2,
    type: "donation",
    name: "Priya Patel",
    details: "Donated ₹5,000 for temple renovation",
    time: "5 hours ago",
  },
  {
    id: 3,
    type: "booking",
    name: "Amit Verma",
    details: "Booked Room 212 for 1 night",
    time: "Yesterday",
  },
  {
    id: 4,
    type: "donation",
    name: "Rajesh Kumar",
    details: "Donated ₹2,500 for daily puja",
    time: "Yesterday",
  },
  {
    id: 5,
    type: "booking",
    name: "Neha Singh",
    details: "Booked Room 110 for 2 nights",
    time: "2 days ago",
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name}! Here's what's happening at the temple.
          </p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button className="flex items-center gap-2">
            <span>Quick Actions</span>
            <ArrowUpRight size={16} />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatisticCard
          title="Total Visitors"
          value="1,245"
          description="This month"
          icon={<Users size={18} />}
          trend={{ value: 12, isPositive: true }}
          isLoading={isLoading}
        />
        <StatisticCard
          title="Room Occupancy"
          value="68%"
          description="50 rooms total"
          icon={<Building size={18} />}
          trend={{ value: 5, isPositive: true }}
          isLoading={isLoading}
        />
        <StatisticCard
          title="Donations"
          value="₹52,489"
          description="This month"
          icon={<CreditCard size={18} />}
          trend={{ value: 8, isPositive: true }}
          isLoading={isLoading}
        />
        <StatisticCard
          title="Upcoming Events"
          value="12"
          description="Next 30 days"
          icon={<CalendarIcon size={18} />}
          isLoading={isLoading}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Donations and bookings revenue for 2023</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            {isLoading ? (
              <div className="h-full w-full bg-muted/30 animate-pulse rounded-md" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: "0.5rem", 
                      border: "none",
                      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "var(--background)" 
                    }}
                  />
                  <Legend />
                  <Bar dataKey="donations" fill="#FF7D3B" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="bookings" fill="#FFB627" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Room Status</CardTitle>
            <CardDescription>Current room occupancy status</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center">
            {isLoading ? (
              <div className="h-full w-full bg-muted/30 animate-pulse rounded-md" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: "0.5rem", 
                      border: "none",
                      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "var(--background)" 
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest bookings and donations</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-muted/30 animate-pulse" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-muted/30 animate-pulse rounded w-1/3" />
                      <div className="h-3 bg-muted/30 animate-pulse rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="space-y-4">
                {recentActivities.map((activity) => (
                  <li key={activity.id} className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mt-1 ${
                      activity.type === "booking" ? "bg-temple-blue/10 text-temple-blue" : "bg-temple-green/10 text-temple-green"
                    }`}>
                      {activity.type === "booking" ? (
                        <Building size={20} />
                      ) : (
                        <CreditCard size={20} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.name}</p>
                      <p className="text-sm text-muted-foreground">{activity.details}</p>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <Clock size={12} className="mr-1" />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Scheduled events for next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-muted/30 animate-pulse" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-muted/30 animate-pulse rounded w-1/3" />
                      <div className="h-3 bg-muted/30 animate-pulse rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Ganesh Chaturthi</h4>
                      <p className="text-sm text-muted-foreground">Special puja and celebration</p>
                    </div>
                    <div className="bg-temple-orange/20 text-temple-orange text-xs rounded-full px-2 py-1">
                      Tomorrow
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <CalendarIcon size={12} className="mr-1" />
                    <span>September 19, 2023 • 7:00 AM</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Bhajan Sandhya</h4>
                      <p className="text-sm text-muted-foreground">Evening devotional singing</p>
                    </div>
                    <div className="bg-muted text-muted-foreground text-xs rounded-full px-2 py-1">
                      3 days
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <CalendarIcon size={12} className="mr-1" />
                    <span>September 21, 2023 • 6:30 PM</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Yoga Workshop</h4>
                      <p className="text-sm text-muted-foreground">Community wellness session</p>
                    </div>
                    <div className="bg-muted text-muted-foreground text-xs rounded-full px-2 py-1">
                      5 days
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <CalendarIcon size={12} className="mr-1" />
                    <span>September 23, 2023 • 8:00 AM</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">Navratri Celebration</h4>
                      <p className="text-sm text-muted-foreground">Nine nights of devotion</p>
                    </div>
                    <div className="bg-muted text-muted-foreground text-xs rounded-full px-2 py-1">
                      7 days
                    </div>
                  </div>
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <CalendarIcon size={12} className="mr-1" />
                    <span>September 25, 2023 • 6:00 PM</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
