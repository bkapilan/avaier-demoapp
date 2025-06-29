// app/api/onboarding/workflow/route.ts
import { NextResponse } from "next/server";

const workflowSteps = [
  "Deal Intake",
  "IDV & Credit Check",
  "Document Upload",
  "AI Validation",
  "Credit Committee",
  "Approval & Docs",
  "Funder Syndication",
];

export function GET() {
  return NextResponse.json({ steps: workflowSteps });
}
