'use client'

import Link from 'next/link'
import { ArrowRight, Calendar, Clock, Key } from "lucide-react"
import Navbar from '../sections/navbar'
import Footer from '../sections/footer'
import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import BlogSkeleton from './blogSkeleton'
import { fetchApi } from '@/lib/api'

export default function Blog() {
 
const fetch = async () => {
 const apiv1 = await fetchApi('/api/post', 'GET');
 return apiv1
}

const {data, isLoading, error} = useQuery({
    queryKey: ['posts'],
    queryFn: fetch,
})

console.log(data)


if (isLoading) return <>
             <Navbar/>
               <section className="px-4 py-20">
                <div className="max-w-6xl mx-auto"><BlogSkeleton/></div></section> 
                <Footer/>
                </>



if (error) return <>Error Loading Post</>


    return (
        <>
            <Navbar />
            <section className="px-4 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16 text-center">
                        <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
                        <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-4">
                            Latest Posts
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Thoughts, tutorials, and insights about development, design, and technology
                        </p>
                    </div>

                    <div className="space-y-8">
                        {data.map((b, i) => (
                            <article key={i} className="group border border-border/20 hover:border-primary/30 transition-all duration-500 bg-card/50 hover:bg-card backdrop-blur-sm overflow-hidden">
                                <Link href={`/blogs/${b?.slug}`}>
                                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 min-h-[280px]">
                                        <div className="lg:col-span-2 relative">
                                            <div className="h-full overflow-hidden">
                                                <img 
                                                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' 
                                                    src={b?.featuredImage} 
                                                    alt={b?.title}
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="lg:col-span-3 p-6 lg:p-8 flex flex-col justify-between">
                                            <div className="space-y-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {b.tags.slice(0, 3).map((t, i) => (
                                                        <span 
                                                            key={i} 
                                                            className="px-2 py-1 text-xs tracking-wider uppercase bg-primary/10 text-primary border border-primary/20"
                                                        >
                                                            {t}
                                                        </span>
                                                    ))}
                                                    {b.tags.length > 3 && (
                                                        <span className="px-2 py-1 text-xs tracking-wider uppercase bg-muted/50 text-muted-foreground">
                                                            +{b.tags.length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                <h2 className="text-xl lg:text-2xl font-light leading-tight group-hover:text-primary transition-colors duration-300">
                                                    {b?.title}
                                                </h2>
                                                
                                                <p className="text-muted-foreground leading-relaxed text-sm lg:text-base line-clamp-2">
                                                    {b?.excerpt}
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between pt-4 mt-auto">
                                                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        <span>{b?.createdAt ? format(new Date(b.createdAt), 'MMM d, yyyy') : 'Unknown'}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{b?.readTime} min read</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all duration-300">
                                                    <span className="text-sm border-b border-primary/60 pb-1 group-hover:border-primary transition-colors">
                                                        Read More
                                                    </span>
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}