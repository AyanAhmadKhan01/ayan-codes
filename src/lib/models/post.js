import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String },
    slug: { type: String, unique: true },
    excerpt: { type: String },
    content: { type: String },
    featuredImage: { type: String },
    status: { type: String, enum: ['draft', 'published', 'scheduled'], default: 'draft' },
    tags: { type: [String], default: [] },
    seoTitle: { type: String },
    metaDescription: { type: String },
    author: { type: String, default: 'Ayan' },
    readTime: { type: Number },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  },
);


export default mongoose.models.Post || mongoose.model('Post', postSchema);
