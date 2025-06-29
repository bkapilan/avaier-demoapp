import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type LoanSummaryCardProps = {
  loanAmount: number;
  existingLoan: number;
  creditScore: number;
  status: string;
};

const LoanSummaryCard: React.FC<LoanSummaryCardProps> = ({
  loanAmount,
  existingLoan,
  creditScore,
  status,
}) => (
  <Card className="mt-4">
    <CardHeader>
        <CardTitle>Loan Summary Card</CardTitle>
    </CardHeader>
    <CardContent className="">
      <div className="flex flex-col gap-2">
        <div>
          <span className="font-semibold">Loan Amount: </span>
          <span>${loanAmount.toLocaleString()}</span>
        </div>
        <div>
          <span className="font-semibold">Existing Loan: </span>
          <span>${existingLoan.toLocaleString()}</span>
        </div>
        <div>
          <span className="font-semibold">Credit Score: </span>
          <span>{creditScore}</span>
        </div>
        <div>
          <span className="font-semibold">Status: </span>
          <span>{status}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default LoanSummaryCard;