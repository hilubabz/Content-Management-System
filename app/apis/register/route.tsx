import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User.model";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const file = formData.get("profilePicture") as File;
    const role = formData.get("role") as string;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No image uploaded" },
        { status: 400 },
      );
    }

    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    if (existingEmail && existingUsername)
      return NextResponse.json(
        { success: false, message: "Email and username exist" },
        { status: 400 },
      );
    if (existingEmail)
      return NextResponse.json(
        { success: false, message: "Email exists" },
        { status: 400 },
      );
    if (existingUsername)
      return NextResponse.json(
        { success: false, message: "Username exists" },
        { status: 400 },
      );

    const hashedPassword = await bcrypt.hash(password, 10);

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploaded = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "CMS" },
          (err, result) => {
            if (err) return reject(err);
            // @ts-expect-error i dont know the type
            resolve(result);
          },
        );
        stream.end(buffer);
      },
    );

    const user = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
      profilePicture: uploaded.secure_url,
      role,
    });

    return NextResponse.json(
      { success: true, message: "User created", data: user },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server error", error },
      { status: 500 },
    );
  }
}
