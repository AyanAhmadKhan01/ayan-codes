'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ModeToggle } from '../ToggleButton'

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }
    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                            ayan.codes
                        </Link>
                    </div>
                    
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            <Link 
                                href="/" 
                                className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                            >
                                Home
                            </Link>
                            <Link 
                                href="/blogs" 
                                className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                            >
                                Blogs
                            </Link>
                            <Link 
                                href="https://devlegend.vercel.app/" 
                                className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                            >
                                Portfolio
                            </Link>
                            <Link 
                                href="/login" 
                                className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 text-sm font-medium rounded-md transition-colors"
                            >
                                Login
                            </Link>
                            <ModeToggle />
                        </div>
                    </div>
                    
                    <div className="md:hidden flex items-center space-x-2">
                        <ModeToggle />
                        <button 
                            type="button" 
                            className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                            aria-controls="mobile-menu" 
                            aria-expanded={isMobileMenuOpen}
                            onClick={toggleMobileMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
                
                {isMobileMenuOpen && (
                    <div className="md:hidden" id="mobile-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
                            <Link 
                                href="/" 
                                className="text-foreground hover:text-primary block px-3 py-2 text-base font-medium transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link 
                                href="/blogs" 
                                className="text-foreground hover:text-primary block px-3 py-2 text-base font-medium transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Blogs
                            </Link>
                            <Link 
                                href="/portfolio" 
                                className="text-foreground hover:text-primary block px-3 py-2 text-base font-medium transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Portfolio
                            </Link>
                            <Link 
                                href="/login" 
                                className="bg-primary text-primary-foreground hover:bg-primary/90 block px-3 py-2 text-base font-medium rounded-md transition-colors mt-4"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Login
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}