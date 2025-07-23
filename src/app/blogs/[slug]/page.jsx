'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Share, Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import Navbar from '../../sections/navbar';
import Footer from '../../sections/footer';
import BlogContentSkeleton from './postSkeleton'
import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api';
import parse, {domToReact} from "html-react-parser";
import { Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
    const params = useParams()
    const slug = params.slug;
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [shareTooltip, setShareTooltip] = useState(false);  
  
    const detectLanguage = (code) => {
        if (code.includes('import ') && code.includes('from ')) return 'javascript';
        if (code.includes('export default') || code.includes('const ') || code.includes('function ')) return 'javascript';
        if (code.includes('useState') || code.includes('useEffect') || code.includes('jsx')) return 'jsx';
        if (code.includes('<div') || code.includes('className')) return 'jsx';
        if (code.includes('def ') || code.includes('import ') && code.includes('print(')) return 'python';
        if (code.includes('#include') || code.includes('int main')) return 'cpp';
        if (code.includes('public class') || code.includes('System.out')) return 'java';
        if (code.includes('.container') || code.includes('display:')) return 'css';
        if (code.includes('SELECT') || code.includes('FROM')) return 'sql';
        return 'javascript'; 
    }

    const CodeBlock = ({ code, codeId }) => {
        const language = detectLanguage(code);
        
        const handleCopy = async () => {
            try {
                await navigator.clipboard.writeText(code)
            } catch (err) {
                console.error('Failed to copy code:', err)
            }
        }
        
        return (
            <div className="relative group my-6">
                <div className="relative border rounded-2xl overflow-hidden shadow-lg" style={{ borderColor: 'rgba(255,255,255,.05)', backgroundColor: 'rgba(255,255,255,.05)' }}>
                    <div className="absolute top-4 right-4 z-10">
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 border rounded-lg transition-all duration-200 text-white/80 hover:text-white text-sm"
                            style={{ borderColor: 'rgba(255,255,255,.1)', backgroundColor: 'rgba(255,255,255,.05)' }}
                            title="Copy code"
                        >
                            <Copy className="w-4 h-4" />
                            <span>Copy</span>
                        </button>
                    </div>
                    <SyntaxHighlighter
                        language={language}
                        style={vscDarkPlus}
                        customStyle={{
                            background: 'transparent',
                            padding: '1.5rem',
                            paddingRight: '6rem',
                            fontSize: '0.875rem',
                            lineHeight: '1.625',
                            fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                            margin: 0,
                            borderRadius: 0,
                        }}
                        codeTagProps={{
                            style: {
                                fontSize: 'inherit',
                                fontFamily: 'inherit',
                            }
                        }}
                    >
                        {code}
                    </SyntaxHighlighter>
                </div>
            </div>
        );
    }
    

    const fetchBlog = async () => {
        const apiv1 = await fetchApi(`/api/post/${slug}`);
        return apiv1;
    }

    const handleShare = async () => {
        const url = window.location.href;
        const title = data?.fetchPost?.title || 'Check out this blog post';
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    url: url,
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(url);
                setShareTooltip(true);
                setTimeout(() => setShareTooltip(false), 2000);
            } catch (err) {
                console.log('Failed to copy URL:', err);
            }
        }
    };

    

    const {data, isLoading, error} = useQuery({
        queryKey: ['post', slug],
        queryFn: fetchBlog,
    })

    if (isLoading) {
        return(
            <>
                <Navbar />
                <article className='px-4 py-20'>
                    <div className='max-w-[1200px] mx-auto'>
                        <Link 
                            href="/blogs"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm">Back to Blogs</span>
                        </Link>
                        
                        <header className="mb-16">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-full bg-muted animate-pulse"></div>
                                <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
                            </div>

                            <div className="h-16 bg-muted animate-pulse rounded mb-8"></div>
                            <div className="h-6 bg-muted animate-pulse rounded mb-4 max-w-3xl"></div>
                            <div className="h-6 bg-muted animate-pulse rounded mb-12 max-w-2xl"></div>

                            <div className="flex flex-wrap items-center gap-8 pb-8 border-b border-border/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-muted animate-pulse"></div>
                                    <div>
                                        <div className="h-4 w-24 bg-muted animate-pulse rounded mb-2"></div>
                                        <div className="h-3 w-32 bg-muted animate-pulse rounded"></div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="h-4 w-20 bg-muted animate-pulse rounded"></div>
                                    <div className="h-4 w-16 bg-muted animate-pulse rounded"></div>
                                </div>
                                <div className="flex items-center gap-2 ml-auto">
                                    <div className="w-8 h-8 bg-muted animate-pulse rounded"></div>
                                    <div className="w-8 h-8 bg-muted animate-pulse rounded"></div>
                                </div>
                            </div>
                        </header>

                        <div className="space-y-4">
                            <div className="h-4 bg-muted animate-pulse rounded"></div>
                            <div className="h-4 bg-muted animate-pulse rounded"></div>
                            <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
                        </div>
                    </div>
                </article>
                <Footer />
            </>
        )
    }

    const html = data?.fetchPost?.content || "";

      const parsedContent = parse(html, {
        replace: (domNode) => {
          if (
            domNode.type === "tag" &&
            domNode.name === "div" &&
            domNode.attribs?.class?.includes("ql-code-block-container")
          ) {      
            const codeLines = [];
            if (domNode.children) {
              domNode.children.forEach((child) => {
                if (
                  child.type === "tag" &&
                  child.name === "div" &&
                  child.attribs?.class?.includes("ql-code-block")
                ) {              
                  const lineText = child.children
                    ?.map((c) => {
                      if (c.type === "text") return c.data;
                      if (c.type === "tag" && c.name === "br") return "\n";
                      return "";
                    })
                    .join("") || "";
                  codeLines.push(lineText);
                }
              });
            }
            
            const codeContent = codeLines.join("\n");
            const codeId = `code-${Math.random().toString(36).substr(2, 9)}`;
            
            return <CodeBlock code={codeContent} codeId={codeId} />;
          }

          if (
            domNode.type === "tag" &&
            domNode.name === "div" &&
            domNode.attribs?.class?.includes("ql-code-block") &&
            !domNode.parent?.attribs?.class?.includes("ql-code-block-container")
          ) {
            const codeText = domNode.children
              ?.map((c) => {
                if (c.type === "text") return c.data;
                if (c.type === "tag" && c.name === "br") return "\n";
                return "";
              })
              .join("") || "";
              
            const codeId = `code-${Math.random().toString(36).substr(2, 9)}`;
            
            return <CodeBlock code={codeText} codeId={codeId} />;
          }
        },
      });


    if (error) return <p>Failed load post content</p>
   
   
    return (
        <>
            <Navbar />
            <article className='px-4 py-20'>
                <div className='max-w-6xl mx-auto'>
                    <Link 
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm">Back to Blogs</span>
                    </Link>
                                                                                                         
                    <header className="mb-16">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-primary font-medium">A</span>
                            </div>
                            <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground">
                                {data?.fetchPost?.author || 'Ayan Codes'}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-8">
                            {data?.fetchPost?.title}
                        </h1>

                        <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-3xl">
                            {data?.fetchPost?.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-8 pb-8 border-b border-border/20">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                                    <span className="text-lg font-medium">A</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{data?.fetchPost?.author || 'Ayan Codes'}</p>
                                    <p className="text-xs text-muted-foreground">Developer & Creator</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(data?.fetchPost?.createdAt).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{data?.fetchPost?.readTime} min read</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 ml-auto">
                                <div className="relative">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={handleShare}
                                        className="hover:bg-muted hover:text-primary transition-colors"
                                        title="Share this post"
                                    >
                                        <Share className="w-4 h-4" />
                                    </Button>
                                    {shareTooltip && (
                                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded whitespace-nowrap">
                                            Link copied!
                                        </div>
                                    )}
                                </div>                       
                            </div>
                        </div>
                    </header>

                    {data?.fetchPost?.featuredImage && (
                        <div className="mb-16">
                            <img 
                                src={data.fetchPost.featuredImage} 
                                alt={data.fetchPost.title}
                                className="w-full h-96 object-cover border border-border/20"
                            />
                        </div>
                    )}
                 
                    <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                        <div className="whitespace-pre-wrap leading-relaxed text-base lg:text-lg">
                           {parsedContent}
                        </div>
                    </div>

                  
                    <div className="mt-16 pt-8 border-t border-border/20">
                        <h3 className="text-lg font-medium mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                             {data?.fetchPost?.tags?.map((t, i) => (
                                <span 
                                     key={i}
                                    className="text-sm px-4 py-2 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer"
                                >
                                   {t}
                                </span>
                             ))}
                        </div> 
                    </div>

                 
                    <div className="mt-16 p-8 border border-border/20 bg-card/50 backdrop-blur-sm">
                        <div className="flex items-start gap-6">
                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                <span className="text-xl font-medium">A</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium mb-3">About the Author</h3>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    I'm Ayan, a full-stack developer passionate about creating modern web applications with Next.js, React, and Node.js. 
                                    I love sharing knowledge about web development and building in public.
                                </p>
                                <div className="flex gap-4">
                                    <Link href="/blogs">
                                        <Button variant="outline" size="sm">
                                            More Posts
                                        </Button>
                                    </Link>
                                    <Link href="https://github.com/AyanAhmadKhan01" target="_blank">
                                        <Button variant="ghost" size="sm">
                                            Follow
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            <Footer />
        </>
    )
}