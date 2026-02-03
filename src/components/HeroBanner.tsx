"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function HeroBanner({
  title,
  description,
  showBackButton = true,
}: {
  title: string;
  description: string;
  showBackButton?: boolean;
}) {
  const router = useRouter();

  return (
    <div className="w-full bg-primary">
      <Card className="text-primary-foreground bg-transparent border-0 shadow-none container mx-auto">
        <CardHeader>
          <div className="flex items-start">
            {showBackButton && (
              <Button size="icon-lg" onClick={() => router.back()}>
                <ArrowLeft />
              </Button>
            )}
            <div className="flex flex-col gap-2">
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription className="text-primary-foreground text-lg">
                {description}
              </CardDescription>
            </div>
          </div>
          {/* <CardAction>
                        <Button variant={"secondary"} className="text-md">
                        Get started
                        </Button>
                    </CardAction> */}
        </CardHeader>
      </Card>
    </div>
  );
}

export default HeroBanner;
