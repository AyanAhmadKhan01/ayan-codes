export default function BlogContentSkeleton() {
    return (   
        <div className="animate-pulse">
            <div className="w-3/4 h-12 bg-muted rounded mb-6"></div>
            <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-4 bg-muted rounded"></div>
                <div className="w-20 h-4 bg-muted rounded"></div>
                <div className="w-16 h-4 bg-muted rounded"></div>
            </div>
            <div className="space-y-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className={`h-4 bg-muted rounded ${i % 3 === 0 ? 'w-full' : i % 3 === 1 ? 'w-5/6' : 'w-4/5'}`}></div>
                ))}
            </div>
        </div>
    )
}