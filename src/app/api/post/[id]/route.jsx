import Post from "@/lib/models/post";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";


export async function GET(req, {params}) {
  try {
    await connectDB();
    const { id } = params;

    if(!id) {
      return NextResponse.json({error: "Post Id is required"}, {status:400})
    }

    const fetchPost = await Post.findOne({_id: id});

    if(!fetchPost) {
      return NextResponse.json({error: "Post not found"}, {status: 404})
    }

    return NextResponse.json({fetchPost}, {status: 200});
  } catch (error) {
    return NextResponse.json({error: "Server Failed to fetch post"}, {status: 500})
  }
}

