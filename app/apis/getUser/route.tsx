import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User.model";

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
    //eslint-disable-next-line
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const user = await User.findById(decoded.id).select("-password");
    if (user) {
      return NextResponse.json(
        {
          success: true,
          message: "User data fetched successfully",
          data: user,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to fetch user data" },
        { status: 400 },
      );
    }
  } catch (e) {
    return NextResponse.json(
      // @ts-expect-error i dont know the type
      { success: false, message: e.message },
      { status: 500 },
    );
  }
}
