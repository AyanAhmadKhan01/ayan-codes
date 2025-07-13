'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Code, BookOpen, Palette, ArrowRight, Calendar, Clock, Search, Filter, Heart, MessageCircle, MoreHorizontal } from "lucide-react"
import Navbar from '../sections/navbar'
import Footer from '../sections/footer'


function BlogSkeleton() {
    return (
        <article className="group border border-border/20 bg-card/50 backdrop-blur-sm animate-pulse w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                {/* Left Content */}
                <div className="md:col-span-2 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted"></div>
                        <div className="w-20 h-3 bg-muted rounded"></div>
                    </div>
                    
                    <div className="w-3/4 h-10 bg-muted rounded"></div>
                    <div className="space-y-2">
                        <div className="w-full h-4 bg-muted rounded"></div>
                        <div className="w-2/3 h-4 bg-muted rounded"></div>
                    </div>
                    <div className="w-20 h-4 bg-muted rounded"></div>
                </div>

                {/* Right Metadata */}
                <div className="flex flex-col justify-between">
                    <div className="w-8 h-px bg-muted mb-6 hidden md:block"></div>
                    <div className="space-y-4">
                        <div className="w-16 h-3 bg-muted rounded"></div>
                        <div className="w-12 h-3 bg-muted rounded"></div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default function Blog() {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [likedPosts, setLikedPosts] = useState(new Set())
    const [showComments, setShowComments] = useState({})
    const [comments, setComments] = useState({})
    const [newComment, setNewComment] = useState('')

   
    const mockBlogs = [
        {
            id: 1,
            category: "Development",
            title: "Building Modern Web Applications with Next.js",
            description: "Exploring the latest frameworks and best practices for creating scalable, performant web applications using Next.js 15.",
            date: "Dec 15, 2024",
            readTime: "8 min read",
            icon: Code,
            slug: "building-modern-web-applications",
            likes: 24,
            commentCount: 8
        },
        {
            id: 2,
            category: "Tutorial",
            title: "Mastering React Hooks: A Complete Guide",
            description: "A deep dive into React hooks and how to use them effectively in your projects. From useState to custom hooks.",
            date: "Dec 10, 2024",
            readTime: "12 min read",
            icon: BookOpen,
            slug: "mastering-react-hooks",
            likes: 42,
            commentCount: 15
        },
        {
            id: 3,
            category: "Design",
            title: "Minimalist UI Design Principles",
            description: "How to create clean, functional interfaces that prioritize user experience and aesthetic simplicity.",
            date: "Dec 5, 2024",
            readTime: "6 min read",
            icon: Palette,
            slug: "minimalist-ui-design",
            likes: 38,
            commentCount: 12
        },
        {
            id: 4,
            category: "Development",
            title: "TypeScript Best Practices for Large Applications",
            description: "Essential TypeScript patterns and practices for maintaining code quality in enterprise applications.",
            date: "Nov 28, 2024",
            readTime: "10 min read",
            icon: Code,
            slug: "typescript-best-practices",
            likes: 31,
            commentCount: 9
        },
        {
            id: 5,
            category: "Tutorial",
            title: "API Design with GraphQL and REST",
            description: "Comparing GraphQL and REST APIs, when to use each, and best practices for modern API development.",
            date: "Nov 22, 2024",
            readTime: "15 min read",
            icon: BookOpen,
            slug: "api-design-graphql-rest",
            likes: 55,
            commentCount: 23
        },
        {
            id: 6,
            category: "Design",
            title: "Color Theory in Digital Design",
            description: "Understanding color psychology and how to create harmonious color palettes for digital interfaces.",
            date: "Nov 18, 2024",
            readTime: "7 min read",
            icon: Palette,
            slug: "color-theory-digital-design",
            likes: 27,
            commentCount: 6
        }
    ]

    const categories = ['All', 'Development', 'Tutorial', 'Design']

   
    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true)
            // Simulate API call
            setTimeout(() => {
                setBlogs(mockBlogs)
                setLoading(false)
                // Initialize comments for each blog
                const initialComments = {}
                mockBlogs.forEach(blog => {
                    initialComments[blog.id] = [
                        {
                            id: 1,
                            author: "John Doe",
                            text: "Great post! Really helpful insights.",
                            time: "2 hours ago"
                        },
                        {
                            id: 2,
                            author: "Jane Smith", 
                            text: "Thanks for sharing this. Looking forward to more content like this.",
                            time: "1 day ago"
                        }
                    ]
                })
                setComments(initialComments)
            }, 2000)
        }

        fetchBlogs()
    }, [])

    const handleLike = (e, blogId) => {
        e.preventDefault()
        e.stopPropagation()
        setLikedPosts(prev => {
            const newLikes = new Set(prev)
            if (newLikes.has(blogId)) {
                newLikes.delete(blogId)
            } else {
                newLikes.add(blogId)
            }
            return newLikes
        })
    }

    const toggleComments = (e, blogId) => {
        e.preventDefault()
        e.stopPropagation()
        setShowComments(prev => ({
            ...prev,
            [blogId]: !prev[blogId]
        }))
    }

    const handleAddComment = (e, blogId) => {
        e.preventDefault()
        if (newComment.trim()) {
            setComments(prev => ({
                ...prev,
                [blogId]: [
                    ...(prev[blogId] || []),
                    {
                        id: Date.now(),
                        author: "You",
                        text: newComment,
                        time: "just now"
                    }
                ]
            }))
            setNewComment('')
        }
    }

    const filteredBlogs = blogs.filter(blog => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            blog.description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    return (
        <>
            <Navbar />
            
           
            <section className="min-h-[60vh] flex items-center px-4 py-20">
                <div className="max-w-6xl mx-auto w-full text-center">
                    <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
                    <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight">
                        Blog <span className="text-primary">Posts</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                        Insights, tutorials, and thoughts on development, design, and building in public.
                    </p>

                    {/* Search and Filter */}
                    <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
                        <div className="relative w-full md:w-auto">
                            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search posts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full md:w-80 pl-10 pr-4 py-2 border border-border/20 rounded-none bg-background/50 backdrop-blur-sm focus:outline-none focus:border-primary/60 transition-colors"
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap justify-center">
                            {categories.map((category) => (
                                <Button
                                    key={category}
                                    variant={selectedCategory === category ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setSelectedCategory(category)}
                                    className="rounded-none"
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="px-4 py-20">
                <div className="max-w-6xl mx-auto">
                    {/* Dynamic Blog Count */}
                    {!loading && filteredBlogs.length > 0 && (
                        <div className="mb-12 text-center">
                            <div className="w-8 h-px bg-primary/20 mx-auto mb-4"></div>
                            <p className="text-sm text-muted-foreground">
                                Showing <span className="text-primary font-medium">{filteredBlogs.length}</span> 
                                {filteredBlogs.length === 1 ? ' blog post' : ' blog posts'}
                                {selectedCategory !== 'All' && (
                                    <span> in <span className="text-primary">{selectedCategory}</span></span>
                                )}
                                {searchTerm && (
                                    <span> matching "<span className="text-primary">{searchTerm}</span>"</span>
                                )}
                            </p>
                        </div>
                    )}
                    
                    <div className="space-y-8 ">
                        {loading ? (
                            // Show skeletons while loading
                            Array.from({ length: 6 }).map((_, index) => (
                                <BlogSkeleton key={index} />
                            ))
                        ) : (
                            // Show actual blog posts
                            filteredBlogs.map((blog) => {
                                const IconComponent = blog.icon
                                const isLiked = likedPosts.has(blog.id)
                                const showCommentsForBlog = showComments[blog.id]
                                const blogComments = comments[blog.id] || []
                                
                                return (
                                    <div key={blog.id}>
                                        <article className="group border border-border/20 hover:border-primary/30 transition-all duration-500 bg-card/50 hover:bg-card backdrop-blur-sm w-full my-4">
                                            <Link href={`/blogs/${blog.slug}`}>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 cursor-pointer">
                                                    {/* Left Content */}
                                                    <div className="md:col-span-2 space-y-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                                                <IconComponent className="w-4 h-4 text-primary" />
                                                            </div>
                                                            <span className="text-xs tracking-[0.2em] uppercase text-primary">
                                                                {blog.category}
                                                            </span>
                                                        </div>
                                                        
                                                        <h3 className="text-3xl md:text-4xl font-light leading-tight group-hover:text-primary transition-colors duration-300">
                                                            {blog.title}
                                                        </h3>
                                                        
                                                        <p className="text-muted-foreground leading-relaxed text-lg">
                                                            {blog.description}
                                                        </p>

                                                        <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all duration-200">
                                                            <span className="text-sm border-b border-primary/60 pb-1">Read More</span>
                                                            <ArrowRight className="w-3 h-3" />
                                                        </div>
                                                    </div>

                                                    {/* Right Metadata */}
                                                    <div className="flex flex-col justify-between">
                                                        <div className="w-8 h-px bg-primary/20 group-hover:bg-primary/60 transition-colors duration-300 mb-6 hidden md:block"></div>
                                                        
                                                        <div className="space-y-4">
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <Calendar className="w-3 h-3" />
                                                                <span>{blog.date}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <Clock className="w-3 h-3" />
                                                                <span>{blog.readTime}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                            
                                            {/* Interactive Actions */}
                                            <div className="px-8 pb-6 border-t border-border/10">
                                                <div className="flex items-center justify-between pt-4">
                                                    <div className="flex items-center gap-6">
                                                        <button
                                                            onClick={(e) => handleLike(e, blog.id)}
                                                            className={`flex items-center gap-2 text-sm transition-colors duration-200 hover:text-primary ${
                                                                isLiked ? 'text-red-500' : 'text-muted-foreground'
                                                            }`}
                                                        >
                                                            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                                                            <span>{blog.likes + (isLiked ? 1 : 0)}</span>
                                                        </button>
                                                        
                                                        <button
                                                            onClick={(e) => toggleComments(e, blog.id)}
                                                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                                                        >
                                                            <MessageCircle className="w-4 h-4" />
                                                            <span>{blogComments.length}</span>
                                                        </button>
                                                    </div>
                                                    
                                                    <button
                                                        onClick={(e) => toggleComments(e, blog.id)}
                                                        className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
                                                    >
                                                        {showCommentsForBlog ? 'Hide Comments' : 'View Comments'}
                                                    </button>
                                                </div>
                                            </div>
                                            
                                            {/* Comments Section */}
                                            {showCommentsForBlog && (
                                                <div className="px-8 pb-6 border-t border-border/10 bg-muted/20">
                                                    <div className="space-y-4 pt-6">
                                                        {/* Existing Comments */}
                                                        {blogComments.map((comment) => (
                                                            <div key={comment.id} className="space-y-2">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                                                        <span className="text-xs text-primary font-medium">
                                                                            {comment.author.charAt(0)}
                                                                        </span>
                                                                    </div>
                                                                    <span className="text-sm font-medium">{comment.author}</span>
                                                                    <span className="text-xs text-muted-foreground">{comment.time}</span>
                                                                </div>
                                                                <p className="text-sm text-muted-foreground ml-8">{comment.text}</p>
                                                            </div>
                                                        ))}
                                                        
                                                        {/* Add Comment Form */}
                                                        <form 
                                                            onSubmit={(e) => handleAddComment(e, blog.id)}
                                                            className="flex gap-3 mt-6 pt-4 border-t border-border/10"
                                                        >
                                                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                                                                <span className="text-xs text-primary font-medium">Y</span>
                                                            </div>
                                                            <div className="flex-1 flex gap-2">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Add a comment..."
                                                                    value={newComment}
                                                                    onChange={(e) => setNewComment(e.target.value)}
                                                                    className="flex-1 text-sm bg-transparent border-b border-border/20 focus:border-primary/60 focus:outline-none transition-colors py-1"
                                                                />
                                                                <Button 
                                                                    type="submit" 
                                                                    size="sm" 
                                                                    className="rounded-none text-xs px-3"
                                                                    disabled={!newComment.trim()}
                                                                >
                                                                    Post
                                                                </Button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            )}
                                        </article>
                                    </div>
                                )
                            })
                        )}
                    </div>

                    {/* No Results */}
                    {!loading && filteredBlogs.length === 0 && (
                        <div className="text-center py-20">
                            <div className="w-16 h-1 bg-primary/20 mx-auto mb-8"></div>
                            <h3 className="text-2xl font-light mb-4">No posts found</h3>
                            <p className="text-muted-foreground">
                                Try adjusting your search or filter criteria.
                            </p>
                        </div>
                    )}

                    {/* Load More Button */}
                    {!loading && filteredBlogs.length > 0 && (
                        <div className="text-center mt-16">
                            <Button variant="outline" size="lg" className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                                Load More Posts
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </>
    )
}