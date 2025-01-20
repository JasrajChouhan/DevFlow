// get users , creat user

import { NextResponse } from "next/server";

import { handleError } from "@/lib/hanlder/error";
import connectToDB from "@/lib/mongoose";
import { User } from "@/model";
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
