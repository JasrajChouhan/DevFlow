import { NextResponse } from "next/server";

import { handleError } from "@/lib/hanlder/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import connectToDB from "@/lib/mongoose";
import { Account } from "@/model";
import { accountSchema } from "@/schema/form-shema";
import { APIErrorResponse } from "@/types/global";

export async function GET(
  _: Request,
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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new NotFoundError("Account not found");
  }
  try {
    await connectToDB();
    const body = await request.json();
    const validatedData = accountSchema.partial().safeParse(body);
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }
    const account = await Account.findByIdAndUpdate(id, validatedData.data, {
      new: true,
    });
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
