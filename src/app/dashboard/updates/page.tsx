import { CheckCircle2, Clock, Sparkles, ArrowUp, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Update = {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "feature" | "improvement" | "bugfix";
};

const recentUpdates: Update[] = [
  {
    id: "1",
    title: "New Dashboard Analytics",
    description:
      "Introducing advanced analytics on the dashboard for better insights into your CRM data.",
    date: "2024-10-10",
    type: "feature",
  },
  {
    id: "2",
    title: "Improved Search Functionality",
    description:
      "Enhanced search capabilities across all modules for faster and more accurate results.",
    date: "2024-10-05",
    type: "improvement",
  },
  {
    id: "3",
    title: "Bug Fix: Calendar Sync Issue",
    description:
      "Resolved an issue where calendar events were not syncing correctly with external calendars.",
    date: "2024-09-28",
    type: "bugfix",
  },
  {
    id: "4",
    title: "Mobile App Launch",
    description:
      "Our new mobile app is now available for iOS and Android, allowing you to access your CRM on the go.",
    date: "2024-09-20",
    type: "feature",
  },
  {
    id: "5",
    title: "Performance Optimization",
    description:
      "Significant performance improvements across the platform, resulting in faster load times and smoother interactions.",
    date: "2024-09-15",
    type: "improvement",
  },
];

const upcomingUpdates: Update[] = [
  {
    id: "6",
    title: "AI-Powered Lead Scoring",
    description:
      "Upcoming feature to automatically score leads based on their likelihood to convert, using machine learning algorithms.",
    date: "2024-11-01",
    type: "feature",
  },
  {
    id: "7",
    title: "Enhanced Reporting Tools",
    description:
      "New customizable report templates and improved export options coming soon.",
    date: "2024-11-15",
    type: "improvement",
  },
  {
    id: "8",
    title: "Integration with Popular Video Conferencing Tools",
    description:
      "Seamless integration with major video conferencing platforms for easy scheduling and joining of virtual meetings.",
    date: "2024-12-01",
    type: "feature",
  },
];

function UpdateIcon({ type }: { type: Update["type"] }) {
  switch (type) {
    case "feature":
      return <Sparkles className="w-6 h-6 text-yellow-500" />;
    case "improvement":
      return <ArrowUp className="w-6 h-6 text-green-500" />;
    case "bugfix":
      return <Wrench className="w-6 h-6 text-red-500" />;
  }
}

function UpdateCard({ update }: { update: Update }) {
  return (
    <Card className="mb-4 relative">
      <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-background p-1 rounded-full border-4 border-background">
        <UpdateIcon type={update.type} />
      </div>
      <CardContent className="pt-6 pb-4 pl-8">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{update.title}</h3>
          <Badge
            variant={
              update.type === "feature"
                ? "default"
                : update.type === "improvement"
                  ? "secondary"
                  : "destructive"
            }
          >
            {update.type}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {update.description}
        </p>
        <p className="text-xs text-muted-foreground">
          {new Date(update.date).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}

export default function Updates() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">System Updates</h1>
      <Tabs defaultValue="recent">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="recent" className="flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Recent Updates
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Upcoming Changes
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recent">
          <div className="relative">
            <div className="absolute left-10 top-0 bottom-0 w-px bg-border" />
            <ScrollArea className="h-[calc(100vh-200px)] pr-4 pl-6">
              {recentUpdates.map((update) => (
                <UpdateCard key={update.id} update={update} />
              ))}
            </ScrollArea>
          </div>
        </TabsContent>
        <TabsContent value="upcoming">
          <div className="relative">
            <div className="absolute left-10 top-0 bottom-0 w-px bg-border" />
            <ScrollArea className="h-[calc(100vh-200px)] pr-4 pl-6">
              {upcomingUpdates.map((update) => (
                <UpdateCard key={update.id} update={update} />
              ))}
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
