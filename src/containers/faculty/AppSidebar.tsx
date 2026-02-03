"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  FileText,
  HelpCircle,
  LayoutDashboard,
  Shield,
  Tag,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const data = [
  {
    title: "Dashboard",
    url: "/faculty/dashboard",
    icon: LayoutDashboard,
    description: "Overview and quick actions",
  },
  {
    title: "Exam Types",
    url: "/faculty/exam-types",
    icon: Tag,
    description: "Manage exam types",
  },
  {
    title: "Question Bank",
    url: "/faculty/questions",
    icon: HelpCircle,
    description: "Manage your question library",
  },
  {
    title: "Exams",
    url: "/faculty/exams",
    icon: FileText,
    description: "Create and manage exams",
  },
  {
    title: "Students",
    url: "/faculty/students",
    icon: Users,
    description: "Manage department Students",
  },
  {
    title: "Proctoring",
    url: "/faculty/proctoring",
    icon: Shield,
    description: "Monitor ongoing exam sessions",
  },
  {
    title: "Results",
    url: "/faculty/results",
    icon: TrendingUp,
    description: "View student results",
  },
];

function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar">
      <SidebarHeader className="h-16 inline-flex items-center justify-center">
        <Link href={"/student"} className="">
          <Image
            src="/assets/images/Jain-logo.png"
            alt="Jain Logo"
            className="dark:hidden"
            height={100}
            width={"120"}
          />
          <Image
            src="/assets/images/Jain-logo-white.png"
            alt="Jain Logo"
            className="hidden dark:block"
            height={100}
            width={"120"}
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Faculty</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname
                        .toLocaleLowerCase()
                        .startsWith(item.url.toLocaleLowerCase())}
                    >
                      <Link href={item.url} className="h-max">
                        <div className="flex gap-4 items-center">
                          <div>
                            <item.icon size={20} />
                          </div>
                          <div>
                            <div>{item.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
