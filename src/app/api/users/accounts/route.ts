import { NextResponse } from "next/server";

import { handleError } from "@/lib/hanlder/error";
import { ForbiddenError, ValidationError } from "@/lib/http-errors";
import connectToDB from "@/lib/mongoose";
import { Account } from "@/model";
import { accountSchema } from "@/schema/form-shema";
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

// create account

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = accountSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { providerAccountId, provider } = validatedData.data;

    const existingAccount = await Account.findOne({
      provider,
      providerAccountId,
    });

    if (existingAccount) {
      throw new ForbiddenError(
        "An account with the same provider already exists"
      );
    }

    // crate new account
    const newAccount = await Account.create(validatedData);
    return NextResponse.json(
      {
        success: true,
        data: newAccount,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
