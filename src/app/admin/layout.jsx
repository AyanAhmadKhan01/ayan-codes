'use client'

import { useState, useEffect } from 'react'
import {usePathname } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { signOut } from 'next-auth/react'
import { PostIdProvider } from './posts/page'
import { 
    Users, 
    FileText, 
    LogOut, 
    Menu, 
    X, 
    Shield
} from "lucide-react"

const AdminSidebar = ({ isOpen, onClose }) => {
    const pathname = usePathname()

    const menuItems = [
        {
            label: 'Posts',
            href: '/admin',
            icon: FileText,
        },
        {
            label: 'Users',
            href: '/admin/users',
            icon: Users,
        },
    ]

    const isActiveItem = (item) => {
        if (item.href === '/admin') {
            return pathname === '/admin'
        }
        return pathname === item.href
    }

    const handleSignOut = () => {
      signOut({ callbackUrl: '/' });

    }

    return (
        <>

            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}
            
            <div className={` 
                fixed top-0 left-0 h-full w-[270px] backdrop-blur-sm border-r border-border/20 z-50 transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="flex items-center justify-between p-6 border-b border-border/10">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                            <span className="text-primary font-semibold text-sm">A</span>
                        </div>
                        <span className="font-medium">ayan.codes</span>
                    </Link>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onClose}
                        className="lg:hidden p-1"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    <nav className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon
                            const isActive = isActiveItem(item)
                            
                            return (
                                <div key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => {
                                            if (window.innerWidth < 1024) {
                                                onClose()
                                            }
                                        }}
                                        className={`
                                            flex items-center gap-3 px-3 py-2 rounded-none text-lg tracking-tight  transition-colors duration-200
                                            ${isActive 
                                                ? 'bg-primary/10 text-primary border-r-2 border-primary' 
                                                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                                            }
                                        `}
                                    >
                                        <Icon className="w-6 h-8" />
                                        {item.label}
                                    </Link>
                                </div>
                            )
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-border/10 space-y-2">
                    <Button 
                        variant="transparent" 
                        size="sm" 
                        onClick={handleSignOut}
                        className="w-full justify-start text-md rounded-sm text-destructive hover:text-destructive hover:bg-muted/20 cursor-pointer py-6"
                    >
                        <LogOut className="mr-2 scale-125" />
                        Sign Out
                    </Button>
                </div>
            </div>
        </>
    )
}

const AdminHeader = ({ onMenuClick }) => {
    return (
        <div className='m-1'>
           <Button
                        variant="ghost"
                        size="sm"
                        onClick={onMenuClick}
                        className="lg:hidden"
                    >
                        <Menu className="w-4 h-4" />
                    </Button>
                    </div>
    )
}

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsAuthenticated(true)
            setLoading(false)
        }, 1000)
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading admin panel...</p>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
                    <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
                    <h1 className="text-3xl md:text-4xl font-light mb-6">Admin Access Required</h1>
                    <p className="text-muted-foreground mb-8">
                        You need administrator privileges to access this area.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/login">
                            <Button className="rounded-none">
                                Sign In as Admin
                            </Button>
                        </Link>
                        <Link href="/">
                            <Button variant="outline" className="rounded-none">
                                Go Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <PostIdProvider>
            <div className="min-h-screen bg-background">
                <AdminSidebar 
                    isOpen={sidebarOpen} 
                    onClose={() => setSidebarOpen(false)} 
                />
                
                <div className="lg:ml-64">
                    <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
                    
                    <main className="min-h-[calc(100vh-73px)]">
                        {children}
                    </main>
                </div>
            </div>
        </PostIdProvider>
    )
}