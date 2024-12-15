import StackedCircularFooter from "@/components/footer";
import { NavBar } from "@/components/navbar";
import  {UsernameForm}  from "@/components/username-form";
import React from "react";

const page = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="text-center space-y-5 max-w-2xl mx-auto">
            <h1 className="text-6xl font-bold tracking-tight">
              Build Your Network,
              <br />
              Grow Your Career
            </h1>
            <p className="text-xl text-black font-normal">
              Your All-In-One Community, Freelance Marketplace,
              <br />
              And Personal Link Hub
            </p>
            <div className="pt-4">
              <UsernameForm />
            </div>
          </div>
        </main>
        <StackedCircularFooter />
      </div>
    </>
  );
};

export default page;
