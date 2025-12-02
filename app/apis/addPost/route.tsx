import dbConnect from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/Post.model";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
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
    const formData = await request.formData();

    const category = formData.get("category") as string;
    const shortTitle = formData.get("shortTitle") as string;
    const articleTitle = formData.get("articleTitle") as string;
    const tags = formData.getAll("tags[]") as string[];
    const description = formData.get("description") as string;
    const metaKeywords = formData.get("metaKeywords") as string;
    const metaDescription = formData.get("metaDescription") as string;

    const image = formData.get("image") as File | null;
    const imageCaption = formData.get("imageCaption") as string;
    const imageCredit = formData.get("imageCredit") as string;

    const pdfFile = formData.get("pdfFile") as File | null;

    const uploadToCloudinary = async (file: File, folder: string) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        uploadStream.end(buffer);
      });
    };

    let imageUrl = "";
    if (image) {
      //eslint-disable-next-line
      const uploadedImage: any = await uploadToCloudinary(image, "cms-images");
      imageUrl = uploadedImage.secure_url;
    }

    let pdfUrl = "";
    if (pdfFile) {
      //eslint-disable-next-line
      const uploadedPdf: any = await uploadToCloudinary(pdfFile, "cms-pdfs");
      pdfUrl = uploadedPdf.secure_url;
    }

    const newPost = await Post.create({
      category,
      shortTitle,
      articleTitle,
      tags,
      description,
      metaKeywords,
      metaDescription,
      image: imageUrl,
      imageCaption,
      imageCredit,
      pdfFile: pdfUrl,
      author: decoded.id,
      verifiedBy: "",
      verifiedAt: null,
      status: "pending",
    });

    return NextResponse.json(
      { success: true, message: "Post created successfully", data: newPost },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong", error: err },
      { status: 500 },
    );
  }
}
