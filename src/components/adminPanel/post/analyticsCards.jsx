import { 
    Eye,
    FileText,
    Image as ImageIcon,
    Globe,
    Clock,

} from "lucide-react"


export default function Card() {
    return(
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="border border-border/20 bg-card/50 backdrop-blur-sm p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="text-sm text-muted-foreground">Total Posts</span>
                    </div>
                    <div className="text-2xl font-light">199</div>
                </div>
               
        
                <div className="border border-border/20 bg-card/50 backdrop-blur-sm p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Eye className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-muted-foreground">Total Views</span>
                    </div>
                    <div className="text-2xl font-light">
                       686K {/* {blogs.reduce((acc, blog) => acc + blog.views, 0).toLocaleString()} */}
                    </div>
                </div>
            </div>
    )
}