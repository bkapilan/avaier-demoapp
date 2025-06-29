import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { useEffect, useState } from "react";

type TabKey = "new" | "in_review" | "approved";

type Borrower = {
  id: string;
  name: string;
  loan_type: string;
  amount: number;
  status: string;
};

type BorrowerPipelineData = {
  new: Borrower[];
  in_review: Borrower[];
  approved: Borrower[];
};

function BorrowerCard({
  id,
  name,
  loan_type,
  amount,
  status,
  onClick,
}: {
  id: string;
  name: string;
  loan_type: string;
  amount: number;
  status: string;
  onClick?: () => void;
}) {
  return (
    <div
      key={id}
      className="p-2 border-b hover:bg-gray-100 cursor-pointer flex justify-between"
      onClick={onClick}
    >
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-sm text-gray-600">{loan_type}</div>
      </div>
      <div className="text-right">
        <div className="font-semibold">${amount.toLocaleString()}</div>
        <div className="text-xs text-gray-500">{status}</div>
      </div>
    </div>
  );
}

type BorrowerPipelineProps = {
  onSelect: (id: string) => void;
};

const BorrowerPipeline: React.FC<BorrowerPipelineProps> = ({ onSelect }) => {
  const [pipeline, setPipeline] = useState<BorrowerPipelineData | null>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("new");

  useEffect(() => {
    fetch("/api/borrowers/pipeline")
      .then((res) => res.json())
      .then(setPipeline);
  }, []);

  if (!pipeline) return <div>Loading borrower pipeline...</div>;

  return (
    <div>
      <Tabs value={activeTab} onValueChange={(val: string) => setActiveTab(val as TabKey)} className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="in_review">In Review</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          {pipeline.new.map((b) => (
            <BorrowerCard key={b.id} onClick={() => onSelect(b.id)} {...b} />
          ))}
        </TabsContent>
        <TabsContent value="in_review">
          {pipeline.in_review.map((b) => (
            <BorrowerCard key={b.id} onClick={() => onSelect(b.id)} {...b} />
          ))}
        </TabsContent>
        <TabsContent value="approved">
          {pipeline.approved.map((b) => (
            <BorrowerCard key={b.id} onClick={() => onSelect(b.id)} {...b} />
          ))}
        </TabsContent>
      </Tabs>

      <div className="mt-4 text-xs text-gray-500 tracking-widest">F-SANATISED ACTIVE</div>
    </div>
  );
};

export default BorrowerPipeline;