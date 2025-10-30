import { Button } from "@/components/ui/button";
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

function HeroBanner({ title, description }: { title: string, description: string }) {
    return (
        <div className="w-full bg-primary">
            <Card className="text-primary-foreground bg-transparent border-0 shadow-none container mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">{title}</CardTitle>
                    <CardDescription className="text-primary-foreground text-lg">
                        {description}
                    </CardDescription>
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
