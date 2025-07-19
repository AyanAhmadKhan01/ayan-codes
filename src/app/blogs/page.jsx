'use client'

import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from "lucide-react"
import Navbar from '../sections/navbar'
import Footer from '../sections/footer'
import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import BlogSkeleton from './blogSkeleton'
import { fetchApi } from '@/lib/api'


export default function Blog() {
 
const fetch = async () => {
 await  new Promise((res) => setTimeout(res, 3000));
 const apiv1 = await fetchApi('/api/post', 'GET');
 return apiv1
}

const {data, isLoading, error} = useQuery({
    queryKey: ['posts'],
    queryFn: fetch,
})



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


{data.map((b, i) => (
                                    <div key={i}>
                                        <article className="group border border-border/20 hover:border-primary/30 transition-all duration-500 bg-card/50 hover:bg-card backdrop-blur-sm w-full my-4">
                                            <Link href={`/blogs/${b?.slug}`}>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 cursor-pointer">      
                                                    <div className="md:col-span-2 space-y-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                                              A
                                                            </div>
                                                            <span className="text-xs tracking-[0.2em] uppercase text-primary">
                                                                Ayan
                                                            </span>
                                                        </div>
                                                        
                                                        <h3 className="text-3xl md:text-4xl font-light leading-tight group-hover:text-primary transition-colors duration-300">
                                                           {b?.title}
                                                        </h3>
                                                        
                                                        <p className="text-muted-foreground leading-relaxed text-lg">
                                                          {b?.excerpt}
                                                        </p>

                                                        <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all duration-200">
                                                            <span className="text-sm border-b border-primary/60 pb-1">Read More</span>
                                                            <ArrowRight className="w-3 h-3" />
                                                        </div>
                                                    </div>

                                                 
                                                    <div className="flex flex-col justify-between">
                                                        <div className="w-8 h-px bg-primary/20 group-hover:bg-primary/60 transition-colors duration-300 mb-6 hidden md:block"></div>
                                                        
                                                        <div className="space-y-4">
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <Calendar className="w-3 h-3" />
                                                                 <span>{b?.createdAt ? format(new Date(b.createdAt), 'MMMM d, yyyy') : 'Unknown'}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                                <Clock className="w-3 h-3" />
                                                                <span>{b?.readTime} min read</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                            
                                            
                                   </article>      
               
                    </div>
                    ))}
</div>


           
            </section>

            <Footer />
        </>
    )
}