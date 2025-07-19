'use client'

import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { Button } from "@/components/ui/button"

export default function Footer() {
    const socialLinks = [
        { name: 'GitHub', icon: Github, href: 'https://github.com/AyanAhmadKhan01' },
        { name: 'Twitter', icon: Twitter, href: 'https://x.com/DevLegend_' },
        { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/ayanahmadkhan' },
        { name: 'Email', icon: Mail, href: 'mailto:hello@ayan.codes' }
    ]

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <footer className="border-t border-border/20 bg-background/80 backdrop-blur-sm">
            <div className="max-w-6xl mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">   
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-2xl font-light tracking-tight mb-4">
                                ayan.codes
                            </h3>
                            <div className="w-12 h-px bg-primary mb-6"></div>
                            <p className="text-muted-foreground leading-relaxed">
                                Building digital experiences with clean code and thoughtful design. 
                                Sharing the journey of a developer building in public.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm tracking-[0.2em] uppercase text-primary mb-6">
                                Navigation
                            </h4>
                            <nav className="space-y-4">
                                <Link 
                                    href="/" 
                                    className="block text-muted-foreground hover:text-primary transition-colors duration-300"
                                >
                                    Home
                                </Link>
                                <Link 
                                    href="/blogs" 
                                    className="block text-muted-foreground hover:text-primary transition-colors duration-300"
                                >
                                    Blogs
                                </Link>
                                <Link 
                                    href="/portfolio" 
                                    className="block text-muted-foreground hover:text-primary transition-colors duration-300"
                                >
                                    Portfolio
                                </Link>
                                <Link 
                                    href="/about" 
                                    className="block text-muted-foreground hover:text-primary transition-colors duration-300"
                                >
                                    About
                                </Link>
                            </nav>
                        </div>
                    </div>

        
                    <div className="space-y-6">
                        <div>
                            <h4 className="text-sm tracking-[0.2em] uppercase text-primary mb-6">
                                Connect
                            </h4>
                            <div className="space-y-4">
                                {socialLinks.map((link, index) => {
                                    const IconComponent = link.icon
                                    return (
                                        <a 
                                            key={index}
                                            href={link.href}
                                            target='_blank'
                                            className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300 group"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-primary/5 group-hover:bg-primary/10 flex items-center justify-center transition-colors duration-300">
                                                <IconComponent className="w-4 h-4" />
                                            </div>
                                            <span className="text-sm">{link.name}</span>
                                        </a>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/10">
                    <div className="flex items-center gap-8 mb-4 md:mb-0">
                        <p className="text-sm text-muted-foreground">
                            © 2025 Ayan.codes. All rights reserved.
                        </p>
                        <div className="hidden md:flex items-center gap-6">
                            <Link 
                                href="/privacy" 
                                className="text-xs text-muted-foreground hover:text-primary transition-colors"
                            >
                                Privacy
                            </Link>
                            <Link 
                                href="/terms" 
                                className="text-xs text-muted-foreground hover:text-primary transition-colors"
                            >
                                Terms
                            </Link>
                        </div>
                    </div>

                    {/* Back to Top */}
                    <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={scrollToTop}
                        className="group hover:bg-transparent p-2"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-xs tracking-[0.1em] uppercase">Back to Top</span>
                            <div className="w-6 h-6 rounded-full border border-primary/20 group-hover:border-primary/60 flex items-center justify-center transition-colors duration-300">
                                <ArrowUp className="w-3 h-3 text-primary group-hover:-translate-y-0.5 transition-transform duration-200" />
                            </div>
                        </div>
                    </Button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-20 left-20 w-px h-16 bg-primary/10 hidden lg:block"></div>
                <div className="absolute bottom-20 right-20 w-16 h-px bg-primary/10 hidden lg:block"></div>
            </div>
        </footer>
    )
}