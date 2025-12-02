import dbConnect from "@/lib/mongodb";
import User from "@/models/User.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const userData = await request.json();
    const user = await User.findOne({ username: userData.username });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Username does not exist" },
        { status: 400 },
      );
    }
    const passwordMatch = await bcrypt.compare(
      userData.password,
      user.password,
    );
    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: "Incorrect Password" },
        { status: 400 },
      );
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );

    const response = NextResponse.json(
      { success: true, message: "Login successful" },
      { status: 200 },
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (e) {
    return NextResponse.json(
      // @ts-expect-error i dont know the type
      { success: false, message: e.message },
      { status: 500 },
    );
  }
}
