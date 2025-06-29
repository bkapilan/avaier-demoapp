// app/api/borrowers/[id]/route.ts
import { NextResponse } from "next/server";

type Borrower = {
  id: string;
  name: string;
  email: string;
  phone: string;
  loan_amount: number;
  status: string;
  employment: string;
  income: number;
  existing_loan: number;
  credit_score: number;
  source_of_funds: string;
  risk_signal: string;
  ai_flags: string[];
};

const borrowerDetails: { [key: string]: Borrower } = {
  "1": {
    id: "1",
    name: "Sarah Dunn",
    email: "sarah.dunn@example.com",
    phone: "(355)123-4557",
    loan_amount: 300000,
    status: "Renew",
    employment: "At Tech Company",
    income: 120000,
    existing_loan: 240000,
    credit_score: 720,
    source_of_funds: "Declared",
    risk_signal: "Missing Source of Funds declaration",
    ai_flags: [
      "Income Inconsistent with Bank statements",
      "High Debt-to-Income Ratio detected",
    ],
  },
  "2": {
    id: "2",
    name: "Alan Matthews",
    email: "alan.matthews@example.com",
    phone: "(212)123-4557",
    loan_amount: 20000,
    status: "In Review",
    employment: "Self Employed",
    income: 35000,
    existing_loan: 0,
    credit_score: 690,
    source_of_funds: "Undeclared",
    risk_signal: "No source of funds declared",
    ai_flags: [],
  },
  "3": {
    id: "3",
    name: "Lisa Carter",
    email: "lisa.carter@example.com",
    phone: "(415)555-7890",
    loan_amount: 450000,
    status: "New",
    employment: "Marketing Manager",
    income: 95000,
    existing_loan: 50000,
    credit_score: 705,
    source_of_funds: "Declared",
    risk_signal: "High existing loan amount",
    ai_flags: [
      "Recent job change detected",
      "Large loan amount requested"
    ],
  },
};

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params; // Await params before using
  const borrower = borrowerDetails[id];
  if (!borrower) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(borrower);
}
