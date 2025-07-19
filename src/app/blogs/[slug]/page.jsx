'use client'


import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Share, Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import Navbar from '../../sections/navbar';
import Footer from '../../sections/footer';
import BlogContentSkeleton from './postSkeleton'
import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '@/lib/api';
import parse, {domToReact} from "html-react-parser";
import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';


export default function BlogPage() {
    const params = useParams()
    const router = useRouter()

    // Simple language detection based on code content
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
        return 'javascript'; // default
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
        const apiv1 = await fetchApi(`/api/post/6878fb239dd422d513f10b34`);
        return apiv1;
    }



    const {data, isLoading, error} = useQuery({
        queryKey: ['post'],
        queryFn: fetchBlog,
    })

      const html = data?.fetchPost?.content || "";

      const parsedContent = parse(html, {
        replace: (domNode) => {
          // Handle code block containers
          if (
            domNode.type === "tag" &&
            domNode.name === "div" &&
            domNode.attribs?.class?.includes("ql-code-block-container")
          ) {
            // Extract all code lines from child divs
            const codeLines = [];
            if (domNode.children) {
              domNode.children.forEach((child) => {
                if (
                  child.type === "tag" &&
                  child.name === "div" &&
                  child.attribs?.class?.includes("ql-code-block")
                ) {
                  // Get text content from the code block div
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

          // Handle individual code blocks (fallback)
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

//     if (isLoading) return <div>
//   <BlogContentSkeleton/> 
//     </div>
//     if (error) return <p>Failed load post content</p>
   
   
  
    return (
        <>
              <Navbar />
              <div className='flex justify-center m-20'>
                <div className='max-w-[1000px] w-[100%]'>
                                <Link 
                            href="/blogs"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm">Back to Blogs</span>
                        </Link>
                                                                                                             
                                <header className="mb-16">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                            {/* <blog.icon className="w-4 h-4 text-primary" /> */}
                                        </div>
                                        <span className="text-xs tracking-[0.2em] uppercase text-primary">
                                            gg
                                        </span>
                                    </div>

                                    <h1 className="text-4xl md:text-6xl font-light tracking-tight leading-[1.1] mb-8">
                                        {data?.fetchPost?.title}
                                    </h1>

                                    <p className="text-xl text-muted-foreground leading-relaxed mb-12 max-w-3xl">
                                        {data?.fetchPost?.description}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-8 pb-8 border-b border-border/20">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                                <span className="text-sm font-medium">A</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium">{data?.fetchPost?.author}</p>
                                                <p className="text-xs text-muted-foreground">{data?.fetchPost?.author}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>{new Date(data?.fetchPost?.publishedAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                <span>{data?.fetchPost?.readTime} min</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 ml-auto">
                                            {/* <Button
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
                                                <span className="text-xs">jjj</span>
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
                                                className={`hover:bg-muted`}
                                            >
                                                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                                            </Button> */}
                                        </div>
                                    </div>
                                </header>                    
                             
                                <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
                                    <div className="whitespace-pre-wrap leading-relaxed">
                                       {parsedContent}
                                    </div>
                                </div>

                              
                                <div className="mt-16 pt-8 border-t border-border/20">                            
                                    <div className="flex flex-wrap gap-2">
                                         {data?.fetchPost?.tags?.map((t, i) => (
                                            <span 
                                                 key={i}
                                                className="text-xs px-3 py-1 bg-muted/50 text-muted-foreground rounded-none border border-border/20 hover:border-primary/30 transition-colors"
                                            >
                                               {t}
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
                                            <h3 className="text-lg font-medium mb-2">About </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                . Follow me on social media for more insights about web development and building in public.
                                            </p>
                                        </div>
                                    </div>
                                </div> 
                                </div>
                                </div>
            <Footer />
       </>
    )
}