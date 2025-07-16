'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Dynamic import of QuillEditor with no SSR
const QuillEditor = dynamic(() => import('./QuillEditor'), {
    ssr: false,
    loading: () => (
        <div className="border border-border/20 bg-card/50 backdrop-blur-sm p-4 min-h-[400px] flex items-center justify-center">
            <div className="text-center">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Loading editor...</p>
            </div>
        </div>
    )
})

export default function QuillEditorDynamic(props) {
    return (
        <Suspense fallback={
            <div className="border border-border/20 bg-card/50 backdrop-blur-sm p-4 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-sm text-muted-foreground">Loading editor...</p>
                </div>
            </div>
        }>
            <QuillEditor {...props} />
        </Suspense>
    )
}
