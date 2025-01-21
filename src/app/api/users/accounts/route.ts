import { NextResponse } from "next/server";

import { handleError } from "@/lib/hanlder/error";
import connectToDB from "@/lib/mongoose";
import { Account } from "@/model";
import { APIErrorResponse } from "@/types/global";

export async function GET() {
  try {
    await connectToDB();
    const accounts = await Account.find();
    return NextResponse.json(
      {
        success: true,
        data: accounts,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
