"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import LoanSummaryCard from "@/components/LoanSummaryCard";

type BorrowerDetailProps = {
  borrowerId: string | null;
};

type Borrower = {
  name: string;
  email: string;
  phone: string;
  loan_amount: number;
  status: string;
  employment: string;
  existing_loan: number;
  credit_score: number;
  source_of_funds: string;
  risk_signal: string;
  ai_flags: string[];
};

const BorrowerDetail: React.FC<BorrowerDetailProps> = ({ borrowerId }) => {
  const [borrower, setBorrower] = useState<Borrower | null>(null);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    if (!borrowerId) return;

    // toast.success("Loan approved successfully.");

    await fetch(`/api/borrowers/${borrowerId}/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ borrowerId }),
    });
    // Optionally, show a success message or update UI
    // toast("Loan approved successfully.");
    // alert("Loan approved successfully.");
    

  };

  const handleSendValuer = async () => {
    if (!borrowerId) return;

    toast("Valuer notified successfully."); 
    await fetch(`/api/borrowers/${borrowerId}/send-valuer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ borrowerId }),
    });
      

  };

  const handleRequestDocuments = async () => {
    if (!borrowerId) return;

    await fetch(`/api/borrowers/${borrowerId}/request-documents`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ borrowerId }),
    });
    toast.success("Documents requested successfully."); 

  };

  const handleEscalate = async () => {
    if (!borrowerId) return;

    await fetch(`/api/borrowers/${borrowerId}/escalate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ borrowerId }),
    });
    toast.success("Escalated to Credit Committee successfully."); 

  };


  useEffect(() => {
    if (!borrowerId) {
      setBorrower(null);
      return;
    }
    setLoading(true);
    fetch(`/api/borrowers/${borrowerId}`)
      .then((res) => res.json())
      .then((data) => {
        setBorrower(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [borrowerId]);

  if (!borrowerId) return <div>Select a borrower to view details.</div>;
  if (loading || !borrower) return <div>Loading borrower details...</div>;

  

  return (
    <div>
      <div className="mb-4">
        <div className="text-lg font-semibold">{borrower.name}</div>
        <div className="text-sm text-gray-600">{borrower.email} | {borrower.phone}</div>
        <div className="text-sm mt-1">Loan Amount: <strong>${borrower.loan_amount.toLocaleString()}</strong></div>
        <Badge className="mt-2 bg-yellow-100 text-yellow-800">{borrower.status}</Badge>
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="ai">
          <AccordionTrigger>AI Explainability Flags</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-5 text-red-600">
              {borrower.ai_flags.map((flag, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> {flag}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* <div className="flex flex-auto gap-2 my-4">
        <Button className="flex flex-auto" variant="outline" onClick={handleRequestDocuments}>Request Documents</Button>
        <Button className="flex flex-auto" variant="secondary" onClick={handleSendValuer}>Send to Valuer</Button>
        <Button className="flex flex-auto" variant="default" onClick={handleApprove}>Approve</Button>
      </div> */}
      <div className="grid gap-2 my-4 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
        <Button variant="outline" onClick={handleRequestDocuments}>
          Request Documents
        </Button>
        <Button variant="secondary" onClick={handleSendValuer}>
          Send to Valuer
        </Button>
        <Button variant="default" onClick={handleApprove}>
          Approve
        </Button>
      </div>


      <div className="grid grid-cols-2 gap-2 text-sm">
        <div><strong>Employment:</strong> {borrower.employment}</div>
        <div><strong>Existing Loan:</strong> ${borrower.existing_loan.toLocaleString()}</div>
        <div><strong>Credit Score:</strong> {borrower.credit_score}</div>
        <div><strong>Source of Funds:</strong> {borrower.source_of_funds}</div>
      </div>

      <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-yellow-800" />
          <span className="text-yellow-800 text-sm">{borrower.risk_signal}</span>
        </div>
      </div>

      <Button className="mt-4 w-full" onClick={handleEscalate}>Escalate to Credit Committee</Button>
      
      <LoanSummaryCard loanAmount={borrower.loan_amount} existingLoan={borrower.existing_loan} creditScore={borrower.credit_score} status={borrower.status} />
    </div>
  );
}

export default BorrowerDetail;