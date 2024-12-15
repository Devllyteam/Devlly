'use client'

import StackedCircularFooter from "@/components/footer";
import { NavBar } from "@/components/navbar";
import { UsernameForm } from "@/components/username-form";

import React from "react";
import { motion } from "framer-motion";

const Page = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="text-center space-y-5 max-w-2xl mx-auto">
            <motion.h1 
              className="text-6xl font-bold tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Build Your Network,
              <br />
              Grow Your Career
            </motion.h1>
            <motion.p 
              className="text-xl font-normal"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your All-In-One Community, Freelance Marketplace,
              <br />
              And Personal Link Hub
            </motion.p>
         
            <motion.div 
              className="pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <UsernameForm />
            </motion.div>
          </div>
        </main>
        <StackedCircularFooter />
      </div>
    </>
  );
};

export default Page;

