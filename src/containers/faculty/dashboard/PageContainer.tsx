import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  CircleCheckBig,
  FileClock,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";
import { title } from "process";

const stat_cards = [
  {
    title: "Total Exams",
    value: "0",
    description: "Exams Published",
    icon: <FileText />,
  },
  {
    title: "Active Exams",
    value: "0",
    description: "Running now",
    icon: <CircleCheckBig />,
  },
  {
    title: "Total Students",
    value: "0",
    description: "Department Students",
    icon: <Users />,
  },
  {
    title: "Completed Results",
    value: "0",
    description: "Results Processed",
    icon: <TrendingUp />,
  },
];

export default function PageContainer() {
  return (
    <div className="grid grid-cols-1 container my-8 space-y-4">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stat_cards.map((card, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="font-normal">{card.title}</CardTitle>
              <CardAction>{card.icon}</CardAction>
              <div className="mt-4">
                <p className="text-2xl font-bold">{card.value}</p>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </div>
            </CardHeader>
          </Card>
        ))}
      </section>
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Exams</CardTitle>
            <CardDescription>Exams scheduled to start</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <p>
                <Calendar size={40} />
              </p>
              <p className="ml-4 text-sm mt-2">No upcoming exams</p>
            </div>
          </CardContent>
        </Card>
      </section>
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center text-muted-foreground">
              <p>
                <FileClock size={40} />
              </p>
              <p className="ml-4 text-sm mt-2">No recent activity</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
