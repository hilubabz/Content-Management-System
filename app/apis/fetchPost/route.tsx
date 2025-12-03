import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Post from "@/models/Post.model";

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

    const postData = await Post.find().populate(
      "author",
      "_id name profilePicture",
    );
    if (postData) {
      return NextResponse.json(
        {
          success: true,
          message: "Posts fetched successfully",
          data: postData,
        },
        { status: 200 },
      );
    } else {
      return NextResponse.json(
        { success: false, message: "Failed to fetch posts" },
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
