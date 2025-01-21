import { NextResponse } from "next/server";

import { handleError } from "@/lib/hanlder/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import connectToDB from "@/lib/mongoose";
import { Account } from "@/model";
import { accountSchema } from "@/schema/form-shema";
import { APIErrorResponse } from "@/types/global";

export async function GET(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();

    const validatedData = accountSchema.safeParse(body);
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { providerAccountId } = validatedData.data;

    const account = await Account.findOne({ providerAccountId });
    if (!account) {
      throw new NotFoundError("Account not found");
    }
    return NextResponse.json(
      {
        success: true,
        data: false,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
