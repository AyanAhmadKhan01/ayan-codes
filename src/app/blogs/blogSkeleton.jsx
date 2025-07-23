export default function BlogSkeleton() {
    return (
        <>
            <div className="mb-16 text-center animate-pulse">
                <div className="w-16 h-1 bg-muted mx-auto mb-6"></div>
                <div className="w-48 h-12 bg-muted rounded mx-auto mb-4"></div>
                <div className="w-96 h-6 bg-muted rounded mx-auto"></div>
            </div>

            <div className="space-y-8">
                {[...Array(5)].map((_, i) => (
                    <article key={i} className="group border border-border/20 bg-card/50 backdrop-blur-sm overflow-hidden animate-pulse">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 min-h-[280px]">                 
                            <div className="lg:col-span-2 relative">
                                <div className="h-full bg-muted"></div>
                            </div>
                                                     
                            <div className="lg:col-span-3 p-6 lg:p-8 flex flex-col justify-between">
                                <div className="space-y-4">                                
                                    <div className="flex flex-wrap gap-2">
                                        <div className="w-16 h-6 bg-muted rounded"></div>
                                        <div className="w-20 h-6 bg-muted rounded"></div>
                                        <div className="w-12 h-6 bg-muted rounded"></div>
                                    </div>
                                                                      
                                    <div className="space-y-2">
                                        <div className="w-4/5 h-7 bg-muted rounded"></div>
                                        <div className="w-2/3 h-7 bg-muted rounded"></div>
                                    </div>
                                                                      
                                    <div className="space-y-2">
                                        <div className="w-full h-4 bg-muted rounded"></div>
                                        <div className="w-3/4 h-4 bg-muted rounded"></div>
                                    </div>
                                </div>
                        
                                <div className="flex items-center justify-between pt-4 mt-auto">
                                    <div className="flex items-center gap-6">
                                        <div className="w-20 h-4 bg-muted rounded"></div>
                                        <div className="w-16 h-4 bg-muted rounded"></div>
                                    </div>
                                    <div className="w-20 h-4 bg-muted rounded"></div>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </>
    )
}