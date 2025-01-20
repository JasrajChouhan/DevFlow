import { NextResponse } from "next/server";

import { handleError } from "@/lib/hanlder/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import connectToDB from "@/lib/mongoose";
import { User } from "@/model";
import { userSchema } from "@/schema/form-shema";
import { APIErrorResponse } from "@/types/global";

// Get a user which a userID {id}
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new NotFoundError("User not found");
  }
  try {
    await connectToDB();
    const user = await User.findById(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// Delete a user which a userID {id}
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
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

// update a user
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) {
    throw new NotFoundError("User not found");
  }
  try {
    await connectToDB();
    const body = await request.json();
    const validatedData = userSchema.partial().safeParse(body);
    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }
    const user = await User.findByIdAndUpdate(id, validatedData.data, {
      new: true,
    });
    if (!user) {
      throw new NotFoundError("User not found");
    }
    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
