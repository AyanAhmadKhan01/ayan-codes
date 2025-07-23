'use client'

import { Button } from "@/components/ui/button"
import { Code, BookOpen, Palette, ArrowRight, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { fetchApi } from "@/lib/api"

export default function Cards() {

    const fetch =  async () => {
        const apiv1 = await fetchApi('/api/post', 'GET');
        return apiv1;
    } 

    const {data, isLoading, error} = useQuery({
        queryKey: ['posts'],
        queryFn: fetch,
    })

    if (isLoading) {
        return(
            <section className=" flex items-center px-4 py-[150px]">
                <div className="max-w-6xl mx-auto w-full ">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {[...Array(3)].map((_, index) => (
                            <article 
                                key={index}
                                className="border border-border/20 bg-card/50 backdrop-blur-sm"
                            >
                                <div className="p-8 pb-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-muted animate-pulse"></div>
                                            <div className="h-3 w-16 bg-muted animate-pulse rounded"></div>
                                        </div>
                                        <div className="w-8 h-px bg-muted animate-pulse"></div>
                                    </div>
                                    
                                    <div className="h-8 bg-muted animate-pulse rounded mb-4"></div>
                                    <div className="h-6 bg-muted animate-pulse rounded mb-2"></div>
                                    <div className="h-6 bg-muted animate-pulse rounded mb-6 w-3/4"></div>
                                </div>
                                <div className="px-8 pb-8">
                                    <div className="flex items-center justify-between text-sm mb-6">
                                        <div className="h-4 w-20 bg-muted animate-pulse rounded"></div>
                                        <div className="h-4 w-16 bg-muted animate-pulse rounded"></div>
                                    </div>
                                    <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
                                </div>
                            </article>
                        ))}
                    </div>
                    
                    <div className="text-center">
                        <div className="inline-flex items-center gap-6">
                            <div className="w-12 h-px bg-muted animate-pulse"></div>
                            <div className="h-10 w-32 bg-muted animate-pulse rounded"></div>
                            <div className="w-12 h-px bg-muted animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

     if (error) {
        return(
            <>
            <h1>Failed</h1>
            </>
        )
    }
   

    return (
        <section className=" flex items-center px-4 py-[150px]">
            <div className="max-w-6xl mx-auto w-full ">
              
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {data.slice(0, 3).map((post, index) => {
                        return (
                            <article 
                                key={post._id}
                                className="group border border-border/20 hover:border-primary/30 transition-all duration-500 bg-card/50 hover:bg-card backdrop-blur-sm"
                            >
                              
                                <div className="p-8 pb-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                                <BookOpen className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-xs tracking-[0.2em] uppercase text-primary">
                                                Blog
                                            </span>
                                        </div>
                                        <div className="w-8 h-px bg-primary/20 group-hover:bg-primary/60 transition-colors duration-300"></div>
                                    </div>
                                    
                                    <h3 className="text-2xl font-light mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                                        {post.title}
                                    </h3>
                                    
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        {post.excerpt}
                                    </p>
                                </div>
                                <div className="px-8 pb-8">
                                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            <span>{new Date(post.createdAt).toLocaleDateString('en-US', { 
                                                year: 'numeric', 
                                                month: 'short', 
                                                day: 'numeric' 
                                            })}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            <span>{post.readTime} min read</span>
                                        </div>
                                    </div>
                            
                                    <Link href={`/blogs/${post.slug}`}>
                                    <Button 
                                        variant="transparent" 
                                        className="group/btn p-0 h-auto bg-transparent"
                                    >
                                        <span className="cursor-pointer border-b border-primary/60 pb-1 group-hover/btn:border-primary transition-colors flex items-center gap-2">
                                            Read More 
                                            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-200" />
                                        </span>
                                    </Button>
                                    </Link>
                                </div>
                            </article>
                        )
                    })}
                </div>

               
                <div className="text-center">
                    <div className="inline-flex items-center gap-6">
                        <div className="w-12 h-px bg-primary/20"></div>
                        <Link href={'/blogs'}> 
                        <Button variant="outline" size="lg" className="cursor-pointer rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                            View All Posts
                        </Button>
                        </Link>
                        <div className="w-12 h-px bg-primary/20"></div>
                    </div>
                </div>
            </div>
        </section>
    )
}