import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail } from "lucide-react";
import PersonalForm from "./PersonalForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function PageContainer() {
  return (
    <div className="grid gap-4 mt-4">
      <Card>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-20 aspect-square bg-primary rounded-full flex items-center justify-center text-2xl font-bold text-black">
                S
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold">Sudharshan R</h2>
                <h3 className="text-md text-muted-foreground">
                  Professor of Biology
                </h3>
                <p className="text-sm text-muted-foreground">Faculty</p>
                <p className="flex items-center gap-1 text-muted-foreground text-sm">
                  <Mail size={15} /> sdfsdfsdf@sdfsdf.sdf
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PersonalForm />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
