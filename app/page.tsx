// app/page.tsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Bell, HelpCircle, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import BorrowerDetail from "@/components/BorrowerDetail";
import React, { useState } from "react";
import Layout from "@/components/Layout";
import BrokerOverview from "@/components/BrokerOverview";
import OnboardingWorkflow from "@/components/OnboardingWorkflow";
import BorrowerPipeline from "@/components/BorrowerPipeline";

export default function HomePage() {

  const [selectedBorrowerId, setSelectedBorrowerId] = useState<string | null>(null);

  // const postAction = async (id: string, action: string) => {
  //   const res = await fetch(`/api/borrowers/${id}/${action}`, {
  //     method: "POST",
  //   });
  //   const data = await res.json();
  //   console.log(data.message);
  // };


  return (
    <Layout>
      <div className="grid grid-cols-1 gap-4 p-4">
       {/* Header */}
       <div className="flex justify-between items-center mb-4">
         <h1 className="text-xl font-bold">DemoApp</h1>
         <div className="flex gap-4">
           <Search className="w-5 h-5" />
           <HelpCircle className="w-5 h-5" />
           <Bell className="w-5 h-5" />
         </div>
       </div>
       </div>

        {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-4 mb-4">
        {/* Left - Borrower Pipeline */}
        <Card className="h-fit">
          <CardContent className="p-4">
            <BorrowerPipeline onSelect={(id) => setSelectedBorrowerId(id)} />
          </CardContent>
        </Card>

        {/* Center - Borrower Detail */}
        <Card className="h-fit">
          <CardContent className="p-4">
            <BorrowerDetail
              borrowerId={selectedBorrowerId}
              // onRequestDocuments={() => selectedBorrowerId && postAction(selectedBorrowerId, "request-documents")}
              // onSendToValuer={() => selectedBorrowerId && postAction(selectedBorrowerId, "send-valuer")}
              // onApprove={() => selectedBorrowerId && postAction(selectedBorrowerId, "approve")}
              // onEscalate={() => selectedBorrowerId && postAction(selectedBorrowerId, "escalate")}
            />
          </CardContent>
        </Card>

        {/* Right - Broker Overview */}
        


        <div className="hidden lg:block">
          {/* Desktop layout */}
          <Card className="h-fit">
            <CardContent className="p-4">
              <BrokerOverview />
              <OnboardingWorkflow />
            </CardContent>
          </Card>
        </div>

        <div className="block lg:hidden">
          {/* Mobile Accordion layout */}
          <Card className="h-fit">
            <CardContent className="p-4">
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="broker-info">
                  <AccordionTrigger className="text-lg font-semibold mb-4">Broker Info</AccordionTrigger>
                  <AccordionContent>
                    <BrokerOverview />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="workflow">
                  <AccordionTrigger className="text-lg font-semibold mb-4">Onboarding Workflow</AccordionTrigger>
                  <AccordionContent>
                    <OnboardingWorkflow />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </Layout>
  );
}
