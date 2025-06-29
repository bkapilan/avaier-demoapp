// src/components/OnboardingWorkflow.tsx
"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";

export default function OnboardingWorkflow() {
  const [steps, setSteps] = useState<string[]>([]);
  const currentStep = 3; 

  useEffect(() => {
    fetch("/api/onboarding/workflow")
      .then((res) => res.json())
      .then((data) => setSteps(data.steps));
  }, []);

  if (!steps.length) return <div>Loading workflow...</div>;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Onboarding Workflow</h2>
      <div className="space-y-4">
        {steps.map((step, index) => {
          const isChecked = index < currentStep;

          return (
            <div key={index} className="flex items-start space-x-2">
              <Checkbox id={`step-${index}`} checked={isChecked} disabled />
              <label
                htmlFor={`step-${index}`}
                className={`text-sm font-medium leading-none ${
                  isChecked ? "text-gray-500 line-through" : ""
                }`}
              >
                {`${index + 1}. ${step}`}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
