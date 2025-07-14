import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Post from "@/lib/models/post";


export async function GET() {
  try {
    await connectDB()
    const posts = await Post.find().sort({ createdAt: -1})
    return NextResponse.json(posts, {status: 200});
  } catch (error) {
    return NextResponse.json({message: 'Error Fetching post', error}, {status: 500})
  }
}


export async function POST(req) {
 try {
    await connectDB();
    const body = await req.json();
    const newPost = await Post.create(body);

    return NextResponse.json(newPost, {status: 201});
 } catch (error) {
    return NextResponse.json({message: 'Error creating post', error}, {status: 500})
 }
}


export async function DELETE(req) {
    try{
        await connectDB();
        const body = await req.json();
        const {id} = body;

        if(!id) {
            return NextResponse.json({message: 'ID is required'}, {status: 400});
        }

        const deletePost = await Post.findByIdAndDelete(id);

        if(!deletePost) {
            return NextResponse.json({message: 'Post not found'}, {status: 404});
        }

        return NextResponse.json({message: 'Post Deleted'}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'Delete Failed'}, {status: 500});
    }
}


export async function PATCH(req) {
  try {
    await connectDB();
    const body = await req.json();
    const {_id, ...updateFields } = body;

    if(!_id) {
      return NextResponse.json({ error: "Post Id is required"}, {status: 400});
    }

    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      {$set: updateFields},
      {new: true}
    );

    if(!updateFields) {
      return NextResponse.json({error: "Post not found"}, {status: 404});
    }

    return NextResponse.json(updatedPost, {status: 200});
  } catch (error) {
    return NextResponse.json(
      {error: "Failed to update post", details: error.message},
      {status: 500}
    );
  }
}