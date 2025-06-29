// app/api/borrowers/[id]/request-documents/route.ts
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  // Optional: simulate document request logging
  console.log(`Requesting documents for borrower ID: ${id}`);

  return NextResponse.json({
    success: true,
    message: "Documents requested.",
  });
}
