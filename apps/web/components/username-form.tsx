"use client";

import { useState } from "react";
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { joinWaitlist } from "@/app/actions/joinwaitlist";

import Image from "next/image";

export function UsernameForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [rateLimitRemaining, setRateLimitRemaining] = useState(5);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const result = await joinWaitlist(formData);

    if (result.success) {
      toast({
        title: "Success!",
        description: result.message,
      });
      setUsername("");
      setEmail("");
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }

    setRateLimitRemaining(result.rateLimitRemaining ?? 0);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto ">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <div className="flex ">
              <div className="flex items-center bg-white border border-r-0 border-gray-200 rounded-l-lg px-3 shadow-lg">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center mr-2">
                  <Image
                    src="/devlly.svg"
                    width={16}
                    height={16}
                    alt="Devlly"
                    className="text-white"
                  />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  devlly.me/
                </span>
              </div>
              <Input
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="rounded-l-none h-11 shadow-lg"
                placeholder="username"
                required
              />
            </div>
          </div>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 shadow-lg"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="space-y-6">
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-base font-medium"
            disabled={isLoading || rateLimitRemaining === 0}
          >
            {isLoading ? "Joining..." : "Join the Waitlist"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
         
        </div>
      </form>
    </div>
  );
}

