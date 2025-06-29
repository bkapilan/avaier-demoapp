// app/api/borrowers/[id]/send-valuer/route.ts
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  // Simulate logging or database action
  console.log(`Sending borrower ${id} to valuer`);

  return NextResponse.json({
    success: true,
    message: "Valuer notified.",
  });
}
