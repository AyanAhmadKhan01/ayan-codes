'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Github, Mail, ArrowLeft, Loader2 } from "lucide-react"


export default function Login() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleOAuthLogin = async (provider) => {
        setLoading(true)
        setError('')
        try {
            await signIn(provider, { callbackUrl: '/admin' })
        } catch (error) {
            setError('Authentication failed. Please try again.')
            setLoading(false)
        }
    }

    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className="max-w-md w-full">
              
                <Link 
                    href="/"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm">Back to Home</span>
                </Link>

               
                <div className="border border-border/20 bg-card/50 backdrop-blur-sm p-8">
                    <div className="text-center mb-8">
                        <div className="w-16 h-1 bg-primary mx-auto mb-6"></div>
                        <h1 className="text-3xl font-light tracking-tight mb-2">
                             Welcome
                        </h1>
                        <p className="text-muted-foreground">
                         Sign in or sign up using your Google account
                        </p>
                    </div>

                   
                    {error && (
                        <div className="p-4 border border-destructive/20 bg-destructive/5 text-destructive text-sm mb-6">
                            {error}
                        </div>
                    )}

            
                    <div className="space-y-4">
                        <Button
                            onClick={() => handleOAuthLogin('google')}
                            disabled={loading}
                            className="w-full rounded-none border border-border/20 bg-background hover:bg-muted text-foreground justify-start gap-3 h-12"
                            variant="outline"
                        >
                            {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <Mail className="w-4 h-4" />
                            )}
                            Continue with Google
                        </Button>
                    </div>

                    
                    <div className="mt-8 text-center">
                        <p className="text-xs text-muted-foreground">
                            By signing in, you agree to our{' '}
                            <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors">
                                Terms of Service
                            </Link>
                            {' '}and{' '}
                            <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                                Privacy Policy
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

