'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Share, Bookmark, Code, BookOpen, Palette, Heart, MessageCircle, Send } from "lucide-react"
import Navbar from '../../sections/navbar'
import Footer from '../../sections/footer'

function BlogContentSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="w-3/4 h-12 bg-muted rounded mb-6"></div>
            <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-4 bg-muted rounded"></div>
                <div className="w-20 h-4 bg-muted rounded"></div>
                <div className="w-16 h-4 bg-muted rounded"></div>
            </div>
            <div className="space-y-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={`h-4 bg-muted rounded ${i % 3 === 0 ? 'w-full' : i % 3 === 1 ? 'w-5/6' : 'w-4/5'}`}></div>
                ))}
            </div>
        </div>
    )
}

export default function BlogPage() {
    const params = useParams()
    const router = useRouter()
    const [blog, setBlog] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(0)
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState('')
    const [commentLoading, setCommentLoading] = useState(false)


 



    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true)
            try {
                // Replace this with your actual API call
                // const response = await fetch(`/api/blogs/${params.slug}`)
                // const data = await response.json()
                
                // Simulate API delay
                setTimeout(() => {
                    setBlog(mockBlog)   
                    setLoading(false)
                }, 1500)
            } catch (error) {
                setError('Failed to load blog post')
                setLoading(false)
            }
        }

        if (params.slug) {
            fetchBlog()
        }
    }, [params.slug])

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog.title,
                    text: blog.description,
                    url: window.location.href,
                })
            } catch (error) {
                console.log('Error sharing:', error)
            }
        } else {
           
            navigator.clipboard.writeText(window.location.href)
        }
    }

    const toggleBookmark = () => {
        setIsBookmarked(!isBookmarked)
       
    }

    const toggleLike = () => {
        setIsLiked(!isLiked)
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
      
    }

    const handleCommentSubmit = async (e) => {
        e.preventDefault()
        if (!newComment.trim()) return

        setCommentLoading(true)
        
       
        setTimeout(() => {
            const comment = {
                id: comments.length + 1,
                author: "You", 
                avatar: "/api/placeholder/32/32",
                content: newComment,
                createdAt: new Date().toISOString(),
                likes: 0
            }
            setComments([comment, ...comments])
            setNewComment('')
            setCommentLoading(false)
        }, 1000)
    }
    return (
        <>
            <Navbar />
            
            <article className="min-h-screen">
                <section className="px-4 py-20">
                    <div className="max-w-4xl mx-auto">
                        {/* Back Button */}
                        <Link 
                            href="/blogs"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm">Back to Blogs</span>
                        </Link>

                        {loading ? (
                            <BlogContentSkeleton />
                        ) : (
                            <>
                                
                                <header className="mb-16">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            <blog.icon className="w-4 h-4 text-primary" />
                                        </div>
                                        <span className="text-xs tracking-[0.2em] uppercase text-primary">
                                            {blog.category}
                                        </span>
                                    </div>

                                    <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.1] mb-8">
                                        {blog.title}
                                    </h1>

                                    <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-3xl">
                                        {blog.description}
                                    </p>

                                   
                                    <div className="flex flex-wrap items-center gap-8 pb-8 border-b border-border/20">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                                <span className="text-sm font-medium">A</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{blog.author.name}</p>
                                                <p className="text-xs text-muted-foreground">{blog.author.bio}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                <span>{blog.readTime}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 ml-auto">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={toggleLike}
                                                className={`hover:bg-muted flex items-center gap-1 ${isLiked ? 'text-red-500' : ''}`}
                                            >
                                                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                                                <span className="text-xs">{likeCount}</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => document.getElementById('comments')?.scrollIntoView({ behavior: 'smooth' })}
                                                className="hover:bg-muted flex items-center gap-1"
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                                <span className="text-xs">{comments.length}</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={handleShare}
                                                className="hover:bg-muted"
                                            >
                                                <Share className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={toggleBookmark}
                                                className={`hover:bg-muted ${isBookmarked ? 'text-primary' : ''}`}
                                            >
                                                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                                            </Button>
                                        </div>
                                    </div>
                                </header>

                             
                                <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                                    <div className="whitespace-pre-wrap leading-relaxed">
                                        {blog.content}
                                    </div>
                                </div>

                              
                                <div className="mt-16 pt-8 border-t border-border/20">
                                    <div className="flex flex-wrap gap-2">
                                        {blog.tags.map((tag, index) => (
                                            <span 
                                                key={index}
                                                className="text-xs px-3 py-1 bg-muted/50 text-muted-foreground rounded-none border border-border/20 hover:border-primary/30 transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                         
                                <div className="mt-16 p-8 border border-border/20 bg-card/50 backdrop-blur-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                            <span className="text-xl font-medium">A</span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium mb-2">About {blog.author.name}</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {blog.author.bio}. Follow me on social media for more insights about web development and building in public.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                             
                                <div id="comments" className="mt-16">
                                    <div className="flex items-center gap-2 mb-8">
                                        <h3 className="text-2xl font-light">Comments</h3>
                                        <span className="text-sm text-muted-foreground">({comments.length})</span>
                                    </div>

                                    {/* Comment Form */}
                                    <form onSubmit={handleCommentSubmit} className="mb-12 p-6 border border-border/20 bg-card/30 backdrop-blur-sm">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                                <span className="text-sm font-medium">Y</span>
                                            </div>
                                            <div className="flex-1">
                                                <textarea
                                                    value={newComment}
                                                    onChange={(e) => setNewComment(e.target.value)}
                                                    placeholder="Share your thoughts..."
                                                    className="w-full px-4 py-3 border border-border/20 rounded-none bg-background/50 backdrop-blur-sm focus:outline-none focus:border-primary/60 transition-colors resize-none"
                                                    rows={3}
                                                />
                                                <div className="flex justify-end mt-3">
                                                    <Button
                                                        type="submit"
                                                        disabled={!newComment.trim() || commentLoading}
                                                        size="sm"
                                                        className="rounded-none bg-primary hover:bg-primary/90 text-primary-foreground"
                                                    >
                                                        {commentLoading ? (
                                                            <>Loading...</>
                                                        ) : (
                                                            <>
                                                                <Send className="w-3 h-3 mr-2" />
                                                                Post Comment
                                                            </>
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                       
                                    <div className="space-y-6">
                                        {comments.map((comment) => (
                                            <div key={comment.id} className="flex items-start gap-4 p-6 border border-border/20 bg-card/30 backdrop-blur-sm">
                                                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                                    <span className="text-sm font-medium">{comment.author.charAt(0)}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h4 className="font-medium text-sm">{comment.author}</h4>
                                                        <span className="text-xs text-muted-foreground">
                                                            {new Date(comment.createdAt).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                    <p className="text-muted-foreground leading-relaxed mb-3">
                                                        {comment.content}
                                                    </p>
                                                    <div className="flex items-center gap-4">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="hover:bg-muted p-0 h-auto text-xs text-muted-foreground hover:text-foreground"
                                                        >
                                                            <Heart className="w-3 h-3 mr-1" />
                                                            {comment.likes}
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="hover:bg-muted p-0 h-auto text-xs text-muted-foreground hover:text-foreground"
                                                        >
                                                            Reply
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Load More Comments */}
                                    {comments.length > 0 && (
                                        <div className="text-center mt-8">
                                            <Button variant="ghost" className="text-primary hover:text-primary/80">
                                                Load More Comments
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </article>

            <section className="px-4 py-20 border-t border-border/10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="w-12 h-1 bg-primary mx-auto mb-6"></div>
                        <h2 className="text-3xl md:text-4xl font-light mb-4">More Articles</h2>
                        <p className="text-muted-foreground">
                            Continue exploring our latest insights and tutorials
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedBlogs.map((relatedBlog) => {
                            const IconComponent = relatedBlog.icon
                            return (
                                <Link href={`/blogs/${relatedBlog.slug}`} key={relatedBlog.id}>
                                    <article className="group border border-border/20 hover:border-primary/30 transition-all duration-500 bg-card/50 hover:bg-card backdrop-blur-sm cursor-pointer h-full">
                                        <div className="p-6 h-full flex flex-col">
                                        
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                                    <IconComponent className="w-4 h-4 text-primary" />
                                                </div>
                                                <span className="text-xs tracking-[0.2em] uppercase text-primary">
                                                    {relatedBlog.category}
                                                </span>
                                            </div>
                                            
                                            <h3 className="text-xl font-light leading-tight mb-3 group-hover:text-primary transition-colors duration-300">
                                                {relatedBlog.title}
                                            </h3>
                                                                                
                                            <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                                                {relatedBlog.description}
                                            </p>
                                    
                                            <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/10">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        <span>{relatedBlog.date}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-3 h-3" />
                                                        <span>{relatedBlog.readTime}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Heart className="w-3 h-3" />
                                                    <span>{relatedBlog.likes}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            )
                        })}
                    </div>

                
                    <div className="text-center mt-12">
                        <Link href="/blogs">
                            <Button variant="outline" size="lg" className="rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                                View All Articles
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}