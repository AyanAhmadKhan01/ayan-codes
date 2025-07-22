'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ShieldX, ArrowLeft, Home } from "lucide-react"

export default function NoAuth() {
    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className="max-w-lg w-full">
                
                <Link 
                    href="/"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm">Back to Home</span>
                </Link>

                <div className="border border-border/20 bg-card/50 backdrop-blur-sm p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 border border-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShieldX className="w-8 h-8 text-red-500" />
                        </div>
                        
                        <div className="w-16 h-1 bg-red-500 mx-auto mb-6"></div>
                        
                        <h1 className="text-3xl font-light tracking-tight mb-2">
                            Access Denied
                        </h1>
                        
                        <p className="text-muted-foreground mb-2">
                            You don't have permission to access this area.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            This section is restricted to administrators only.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <Link href="/" className="block">
                            <Button 
                                variant="transparent" 
                                className="w-full group p-0 h-auto justify-center"
                            >
                                <span className="border-b border-primary pb-1 group-hover:border-primary/60 transition-colors flex items-center gap-2">
                                    <Home className="w-4 h-4" />
                                    Return to Homepage
                                </span>
                            </Button>
                        </Link>
                    </div>

                    <div className="mt-8 pt-6 border-t border-border/20">
                        <div className="text-center text-xs text-muted-foreground">
                            <p>If you believe this is an error, please contact the administrator.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}