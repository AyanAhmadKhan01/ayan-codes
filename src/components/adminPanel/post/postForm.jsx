import QuillEditor from "@/components/quillEditor";
import { Button } from "@/components/ui/button";
import { postContext } from "@/app/context/postContext";
import { postIdContext } from "@/app/admin/posts/page";
import { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useContext } from "react";
import { Save, Send, X, Image as ImageIcon } from "lucide-react";

export default function PostForm() {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const { handleMenu } = useContext(postContext);
  const { postId } = useContext(postIdContext);

  const [blogs, setBlogs] = useState([]);
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);

  const quillRef = useRef(null);

  useEffect(() => {
    if(!postId) return;

    const fetchPostIdData = async () => {
      try {
        const response = await fetch(`/api/post/${postId}`);
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Failed to get post id data", error);
      }
    };
    fetchPostIdData();
  }, [postId]);

  const handleEditBlog = async (blog) => {
    try {
      const response = await fetch("/api/post", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });
      if (!response.ok) {
        console.error("Post Update Failed");
      }
    } catch (error) {
      console.error("Failed to Update Post", error);
    }
  };


  const handlePublish = async () => {
    const blogData = {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      tags,
      seoTitle,
      metaDescription,
      status: "published",
      author: "Ayan Codes",
    //   createdAt: editingBlog.createdAt || new Date().toISOString(),
    //   updatedAt: new Date().toISOString(),
      readTime: Math.ceil(
        content.replace(/<[^>]*>/g, "").split(" ").length / 200
      ),
    };

    try {
      const response = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });
      if (!response.ok) {
        console.error("post failed");
      }
    } catch (err) {
      console.error("Failed to publish blog Post", err);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const insertImage = () => {
    if (imageUrl.trim()) {
      if (quillRef.current) {
        const editor = quillRef.current.getEditor();
        if (editor) {
          const range = editor.getSelection();
          editor.insertEmbed(range ? range.index : 0, "image", imageUrl);
          if (range) {
            editor.setSelection(range.index + 1);
          }
        }
      } else {
        const imageHtml = `<img src="${imageUrl}" alt="Inserted image" style="max-width: 100%; height: auto;" />`;
        setContent((prev) => prev + imageHtml);
      }
      setImageUrl("");
      setShowImageModal(false);
    }
  };

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const addTags = {
      ...data,
      tags: tags,
      featuredImage: featuredImage,   
    };
    console.log("Submit the form", addTags);
  };

  return (
    <>
      <div className="p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-light mb-3">
              {/* {editingBlog ? "Edit Post" : "Create New Post"} */}
            </h1>
            <p className="text-muted-foreground text-lg">
              {/* {editingBlog
                ? "Update your blog post"
                : "Write and publish your blog post"} */}
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => handleMenu()}
            className="rounded-none"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                {...register("Title", { required: true })}
                placeholder="Enter your blog title..."
                className="w-full px-4 py-3 border border-border/20 bg-background/50 focus:outline-none focus:border-primary/60 transition-colors rounded-none text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <input
                {...register("slug", { required: true })}
                placeholder="blog-post-slug"
                className="w-full px-4 py-2 border border-border/20 bg-background/50 focus:outline-none focus:border-primary/60 transition-colors rounded-none text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Excerpt</label>
              <textarea
                {...register("excerpt", { required: true })}
                placeholder="Brief description of your blog post..."
                rows={3}
                className="w-full px-4 py-3 border border-border/20 bg-background/50 focus:outline-none focus:border-primary/60 transition-colors rounded-none resize-none"
              />
            </div>

            <div>
                <label className="block text-sm font-medium mb-3">Content</label>
              <div className="border border-border/20 bg-background/50 rounded-none overflow-hidden">
                <Controller
                  name="content"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({ field }) =>
                      <QuillEditor
                        ref={quillRef}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Start writing your blog post..."
                        height="400px"
                        onImageInsert={() => setShowImageModal(true)}
                         />
}      
                />
              </div>
            </div>

            {showImageModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-card border border-border/20 p-6 max-w-md w-full">
                  <h3 className="text-lg font-medium mb-4">Insert Image</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Image URL
                      </label>
                      <input
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-3 py-2 border border-border/20 bg-background/50 focus:outline-none focus:border-primary/60 transition-colors rounded-none"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button
                        onClick={insertImage}
                        className="rounded-none flex-1"
                      >
                        Insert Image
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowImageModal(false)}
                        className="rounded-none"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="border border-border/20 bg-card/50 backdrop-blur-sm p-6">
              <h3 className="text-lg font-medium mb-4">Actions</h3>
              <div className="space-y-3">
                <Button
                //   onClick={handleSaveDraft}
                  variant="outline"
                  className="w-full rounded-none"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save as Draft
                </Button>
                <Button
                  // onClick={() => {handlePublish(); handleEditBlog();}}
                  onClick={handleSubmit(onSubmit)}
                  className="w-full rounded-none cursor-pointer"
                  disabled={isSubmitting}
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Sumbiting..." : "Publish"}
                </Button>
                <Button
                  onClick={() => setShowImageModal(true)}
                  variant="outline"
                  className="w-full rounded-none"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Insert Image
                </Button>
              </div>
            </div>

            <div className="border border-border/20 bg-card/50 backdrop-blur-sm p-6">
              <h3 className="text-lg font-medium mb-4">Featured Image</h3>
              <div>
                <input
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  placeholder="Image URL"
                  className="w-full px-3 py-2 border border-border/20 bg-background/50 focus:outline-none focus:border-primary/60 transition-colors rounded-none"
                />

                {featuredImage && (
                  <div className="mt-3">
                    <img
                      src={featuredImage}
                      alt="Featured"
                      className="w-full h-32 object-cover border border-border/20"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="border border-border/20 bg-card/50 backdrop-blur-sm p-6">
              <h3 className="text-lg font-medium mb-4">Tags</h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                    placeholder="Add tag"
                    className="flex-1 px-3 py-2 border border-border/20 bg-background/50 focus:outline-none focus:border-primary/60 transition-colors rounded-none text-sm"
                  />
                  <Button
                    onClick={handleAddTag}
                    size="sm"
                    className="rounded-none"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary text-sm border border-primary/20"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-border/20 bg-card/50 backdrop-blur-sm p-6">
              <h3 className="text-lg font-medium mb-4">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    SEO Title
                  </label>
                  <input
                    {...register("seo-title", { required: true })}
                    placeholder="SEO optimized title"
                    className="w-full px-3 py-2 border border-border/20 bg-background/50 focus:outline-none focus:border-primary/60 transition-colors rounded-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Meta Description
                  </label>
                  <textarea
                    {...register("seo-description", { required: true })}
                    placeholder="Meta description for search engines"
                    rows={3}
                    className="w-full px-3 py-2 border border-border/20 bg-background/50 focus:outline-none focus:border-primary/60 transition-colors rounded-none text-sm resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
