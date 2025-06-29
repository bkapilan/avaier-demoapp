// app/api/borrowers/[id]/escalate/route.ts
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  // Optional logging or DB simulation
  console.log(`Escalating borrower ${id} to Credit Committee`);

  return NextResponse.json({
    success: true,
    message: "Escalated to Credit Committee.",
  });
}
