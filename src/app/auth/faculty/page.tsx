import Header from "@/components/auth/faculty/Header";
import Login from "@/containers/faculty/login/Login";
import React from "react";

export const metadata = {
  title: "Login",
  description: "Login to access faculty dashboard",
};

function page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto">
        <Login />
      </main>
    </div>
  );
}

export default page;
