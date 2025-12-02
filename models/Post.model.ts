import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    shortTitle: { type: String, required: true },
    articleTitle: { type: String, required: true },
    tags: { type: [String], required: true },
    description: { type: String, required: true },
    metaKeywords: { type: String, required: true },
    metaDescription: { type: String, required: true },
    image: { type: String, required: true },
    imageCaption: { type: String, required: true },
    imageCredit: { type: String, required: true },
    pdfFile: { type: String, required: true },
    verifiedBy: { type: String, required: false },
    verifiedAt: { type: Date, required: false },
    status: {
      type: String,
      enum: ["published", "pending", "planned", "rejected"],
    },
    author: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true },
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
