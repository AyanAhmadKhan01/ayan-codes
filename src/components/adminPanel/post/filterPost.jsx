import { 
    Search,
    Image as ImageIcon,
} from "lucide-react"
import { useState } from "react"

export default function FilterPost() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All Categories')
    const [selectedStatus, setSelectedStatus] = useState('all')
    const [sortBy, setSortBy] = useState('updatedAt')
    return(
         <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search posts by title, content, or tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-border/20 bg-background/50 focus:outline-none focus:border-primary/60 transition-colors rounded-none"
                    />
                </div>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-2 border border-border/20 bg-background/50 focus:outline-none focus:border-primary/60 transition-colors rounded-none min-w-[140px]"
                >
                    {/* {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))} */}
                </select>
                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 border border-border/20 bg-background/50 focus:outline-none focus:border-primary/60 transition-colors rounded-none min-w-[120px]"
                >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                </select>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-border/20 bg-background/50 focus:outline-none focus:border-primary/60 transition-colors rounded-none min-w-[140px]"
                >
                    <option value="updatedAt">Last Updated</option>
                    <option value="createdAt">Date Created</option>
                    <option value="title">Title</option>
                    <option value="views">Views</option>
                </select>
            </div>
    )
}