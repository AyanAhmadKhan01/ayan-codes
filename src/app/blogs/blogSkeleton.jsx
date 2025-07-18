export default function BlogSkeleton() {
    return (
        <article className="group border border-border/20 bg-card/50 backdrop-blur-sm animate-pulse w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
              
                <div className="md:col-span-2 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted"></div>
                        <div className="w-20 h-3 bg-muted rounded"></div>
                    </div>
                    
                    <div className="w-3/4 h-10 bg-muted rounded"></div>
                    <div className="space-y-2">
                        <div className="w-full h-4 bg-muted rounded"></div>
                        <div className="w-2/3 h-4 bg-muted rounded"></div>
                    </div>
                    <div className="w-20 h-4 bg-muted rounded"></div>
                </div>

            
                <div className="flex flex-col justify-between">
                    <div className="w-8 h-px bg-muted mb-6 hidden md:block"></div>
                    <div className="space-y-4">
                        <div className="w-16 h-3 bg-muted rounded"></div>
                        <div className="w-12 h-3 bg-muted rounded"></div>
                    </div>
                </div>
            </div>
        </article>
    )
}