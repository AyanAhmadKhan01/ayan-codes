"use client";

import { useState, useEffect, useRef, useContext } from "react";
import AnalyticsCard from "@/components/adminPanel/post/analyticsCards";
import FilterPost from "@/components/adminPanel/post/filterPost";
import PostForm from "@/components/adminPanel/post/postForm";
import React from "react";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { postContext } from "@/app/context/postContext";
import { deletePostContext } from "@/app/context/deletePostContext";

import Link from "next/link";


const statusColors = {
  published: "bg-green-100 text-green-800 border-green-200",
  draft: "bg-yellow-100 text-yellow-800 border-yellow-200",
  scheduled: "bg-blue-100 text-blue-800 border-blue-200",
  archived: "bg-gray-100 text-gray-800 border-gray-200",
};



export default function Post() {
  const { showMenu, handleMenu } = useContext(postContext);

  const [loading, setLoading] = useState(true);
  const [showBlogs, setShowBlogs] = useState([]);

  const handleDeleteBlog = async (id) => {
    try {
      const response = await fetch('/api/post', {
        method: 'DELETE',
        body: JSON.stringify({ id:id }),
      });

      if(!response.ok) {
        console.error('failed post delete response');
      }
    } catch (err) {
      console.error('failed to delete post', err)
    }
  }


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
  const fetchPost = async () => {
    try {
      const response = await fetch("/api/post");
      const data = await response.json();
      if (!response.ok) return;
      setShowBlogs(data)
    } catch (err) {
      console.error("Failed to fetch Post");
    }
  };
  fetchPost();
}, []);



  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="space-y-3">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
          <div className="flex gap-4">
            <div className="h-10 bg-muted rounded flex-1"></div>
            <div className="h-10 bg-muted rounded w-32"></div>
            <div className="h-10 bg-muted rounded w-32"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (showMenu) {
    return <PostForm />;
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl md:text-5xl font-light mb-3">Posts</h1>
          <p className="text-muted-foreground text-lg">
            Manage your blog posts and create new content
          </p>
        </div>
        <Button onClick={() => handleMenu()} className="rounded-none">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      <AnalyticsCard />
      {/* <FilterPost/> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {showBlogs.map((blog) => (
          <div
            key={blog._id}
            className="border border-border/20 bg-card/50 backdrop-blur-sm overflow-hidden group hover:shadow-lg transition-all duration-300"
          >
            {blog.featuredImage && (
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-2 py-1 text-xs border ${
                    statusColors[blog.status]
                  }`}
                >
                  {blog.status}
                </span>
                <span className="text-xs text-muted-foreground">
                  {blog.category}
                </span>
              </div>

              <h3 className="text-lg font-medium mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {blog.title}
              </h3>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {blog.excerpt}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {blog.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {blog.tags.length > 2 && (
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs">
                    +{blog.tags.length - 2}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-4">
                 
                </div>
                <div>{blog.readTime} min read</div>
              </div>

            <div className="text-xs text-muted-foreground mb-4">
  {blog.status === "published" ? "Published" : "Updated"}:{" "}
  {new Date(
    blog.status === "published"
      ? blog.publishedAt || blog.createdAt
      : blog.updatedAt
  ).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}
</div>


              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleMenu()}
                  className="rounded-none flex-1"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Link href={`/blogs/${blog.slug}`}>
                <Button variant="outline" size="sm" className="rounded-none">
                  <Eye className="w-4 h-4" />
                </Button>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteBlog(blog._id)}
                  className="rounded-none text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
