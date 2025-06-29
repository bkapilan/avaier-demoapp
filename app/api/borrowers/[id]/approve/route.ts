// app/api/borrowers/[id]/approve/route.ts
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  // Optional: log or simulate DB update here
  console.log(`Approving loan for borrower ID: ${id}`);

  return NextResponse.json({
    success: true,
    message: "Loan approved.",
  });
}
