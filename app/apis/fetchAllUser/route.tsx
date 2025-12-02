import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.model";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }
    // eslint-disable-next-line
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const users = await User.find({
      _id: { $ne: decoded.id },
    });
    if (users) {
      return NextResponse.json(
        { success: true, message: "Users fetched successfully", data: users },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to fetch users" },
        { status: 400 },
      );
    }
  } catch (e) {
    // @ts-expect-error i dont know the type
    return NextResponse.json(
      { success: false, message: e.message },
      { status: 500 },
    );
  }
}
