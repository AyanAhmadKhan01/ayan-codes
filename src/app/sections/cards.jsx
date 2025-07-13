import { Button } from "@/components/ui/button"
import { Code, BookOpen, Palette, ArrowRight, Calendar, Clock } from "lucide-react"
import Link from "next/link"

export default function Cards() {
    const cards = [
        {
            category: "Development",
            title: "Building Modern Web Applications",
            description: "Exploring the latest frameworks and best practices for creating scalable, performant web applications.",
            date: "Dec 15, 2024",
            readTime: "5 min read",
            icon: Code
        },
        {
            category: "Tutorial",
            title: "Mastering React Hooks",
            description: "A deep dive into React hooks and how to use them effectively in your projects.",
            date: "Dec 10, 2024",
            readTime: "8 min read",
            icon: BookOpen
        },
        {
            category: "Design",
            title: "Minimalist UI Design Principles",
            description: "How to create clean, functional interfaces that prioritize user experience.",
            date: "Dec 5, 2024",
            readTime: "6 min read",
            icon: Palette
        }
    ]

    return (
        <section className=" flex items-center px-4 py-[150px]">
            <div className="max-w-6xl mx-auto w-full ">
              
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {cards.map((card, index) => {
                        const IconComponent = card.icon
                        return (
                            <article 
                                key={index}
                                className="group border border-border/20 hover:border-primary/30 transition-all duration-500 bg-card/50 hover:bg-card backdrop-blur-sm"
                            >
                                {/* Card Header */}
                                <div className="p-8 pb-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                                                <IconComponent className="w-4 h-4 text-primary" />
                                            </div>
                                            <span className="text-xs tracking-[0.2em] uppercase text-primary">
                                                {card.category}
                                            </span>
                                        </div>
                                        <div className="w-8 h-px bg-primary/20 group-hover:bg-primary/60 transition-colors duration-300"></div>
                                    </div>
                                    
                                    <h3 className="text-2xl font-light mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                                        {card.title}
                                    </h3>
                                    
                                    <p className="text-muted-foreground leading-relaxed mb-6">
                                        {card.description}
                                    </p>
                                </div>
                                <div className="px-8 pb-8">
                                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            <span>{card.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            <span>{card.readTime}</span>
                                        </div>
                                    </div>
                            
                                    <Link href={'/blogs/'}>
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