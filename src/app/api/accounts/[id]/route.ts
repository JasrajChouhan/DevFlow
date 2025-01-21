import { NextResponse } from "next/server";

import { handleError } from "@/lib/hanlder/error";
import { NotFoundError } from "@/lib/http-errors";
import connectToDB from "@/lib/mongoose";
import { Account } from "@/model";
import { APIErrorResponse } from "@/types/global";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();
    const { id } = await params;
    if (!id) {
      throw new NotFoundError("Account not found.");
    }
    const account = await Account.findById(id);
    if (!account) {
      throw new NotFoundError("Account not found");
    }
    return NextResponse.json(
      {
        success: true,
        data: account,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new NotFoundError("User not found");
  }
  try {
    await connectToDB();
    const account = await Account.findByIdAndDelete(id);
    if (!account) {
      throw new NotFoundError("Account not found");
    }
    return NextResponse.json(
      {
        success: true,
        data: Account,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
