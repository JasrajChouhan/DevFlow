import { NextResponse } from "next/server";

import { handleError } from "@/lib/hanlder/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import connectToDB from "@/lib/mongoose";
import { User } from "@/model";
import { userSchema } from "@/schema/form-shema";
import { APIErrorResponse } from "@/types/global";

export async function GET(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();

    const validatedData = userSchema.safeParse(body);
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { email } = validatedData.data;

    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError("User not found");
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
