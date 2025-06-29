// app/api/broker/[id]/route.ts
import { NextResponse } from "next/server";

const brokerMock: { [key: string]: { name: string; deals: number; approval_rate: string; pending: number } } = {
  "1": {
    name: "Robert Turner",
    deals: 16,
    approval_rate: "75%",
    pending: 7660,
  },
};

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params; // Await params before using
  const broker = brokerMock[id];
  if (!broker) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(broker);
}
