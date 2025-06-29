// src/components/BrokerOverview.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import { useEffect, useState } from "react";

type Broker = {
  name: string;
  deals: number;
  approval_rate: string;
  pending: number;
};

export default function BrokerOverview() {

    const [broker, setBroker] = useState<Broker | null>(null);

    useEffect(() => {
      fetch("/api/broker/1")
        .then((res) => res.json())
        .then(setBroker);
    }, []);

  if (!broker) return <div>Loading broker info...</div>;

  return (
    <div>
      <div className="mb-4">
        <h2 className="font-semibold text-lg">{broker.name}</h2>
        <div className="grid grid-cols-3 gap-2 text-center my-2">
          <div>
            <div className="text-xl font-bold">{broker.deals}</div>
            <div className="text-xs">Deals</div>
          </div>
          <div>
            <div className="text-xl font-bold">{broker.approval_rate}</div>
            <div className="text-xs">Approval</div>
          </div>
          <div>
            <div className="text-xl font-bold">${broker.pending.toLocaleString()}</div>
            <div className="text-xs">Pending</div>
          </div>
        </div>

        <div className="flex flex-auto gap-2 my-2">
          <Button className="flex flex-auto" variant="outline">Call</Button>
          <Button className="flex flex-auto" variant="outline">Email</Button>
          <Button className="flex flex-auto" variant="outline">Chat</Button>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className="text-sm">E Ardsassist</span>
        <Switch />
      </div>
    </div>
  );
}