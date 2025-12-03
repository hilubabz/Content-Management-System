import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Post from "@/models/Post.model";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { id, verified } = await request.json();
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

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        verifiedBy: decoded.id,
        status: verified ? "published" : "reject",
      },
      { new: true },
    );

    if (updatedPost) {
      return NextResponse.json(
        { success: true, message: "Post verified successfully" },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to verify post" },
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
