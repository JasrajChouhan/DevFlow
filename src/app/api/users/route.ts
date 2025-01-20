// get users , creat user

import { NextResponse } from "next/server";

import { handleError } from "@/lib/hanlder/error";
import { ValidationError } from "@/lib/http-errors";
import connectToDB from "@/lib/mongoose";
import { User } from "@/model";
import { userSchema } from "@/schema/form-shema";
import { APIErrorResponse } from "@/types/global";

export async function GET() {
  try {
    await connectToDB();
    const users = await User.find();
    return NextResponse.json(
      {
        success: true,
        data: users,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function POST(request: Request) {
  try {
    await connectToDB();
    const body = await request.json();

    const validatedData = userSchema.safeParse(body);

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { email, username } = validatedData.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      throw new Error("Username already exists");
    }

    // create new user
    const newUser = await User.create(validatedData.data);

    return NextResponse.json(
      {
        success: true,
        data: newUser,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
