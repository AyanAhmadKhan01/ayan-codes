'use client'

import { Button } from "@/components/ui/button"
import { ShieldX, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { signOut } from "next-auth/react"

export default function NotAuthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full space-y-8 p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20">
            <ShieldX className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            Access Denied
          </h2>
          
          <p className="mt-2 text-sm text-muted-foreground">
            You don't have permission to access this area. Only authorized administrators can access the admin panel.
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full"
            variant="destructive"
          >
            Sign Out
          </Button>
          
          <Link href="/" className="block">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            If you believe this is an error, please contact the administrator.
          </p>
        </div>
      </div>
    </div>
  )
}
