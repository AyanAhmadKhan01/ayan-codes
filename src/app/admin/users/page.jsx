'use client'

import { useState, useEffect } from 'react'
import { 
    Search,
    MoreHorizontal,
    UserPlus,
    Mail,
    ShieldCheck,
    Ban,
    Edit,
    Trash2,
    Eye,
    Activity,
    Users as UsersIcon,
    Crown,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const mockUsers = [
    {
        id: 1,
        name: "Ayan Codes",
        email: "ayan@ayancodes.com",
        avatar: "/api/placeholder/40/40",
        role: "Admin",
        status: "Active",
        joinDate: "2024-01-15",
        lastActive: "2 hours ago",
        posts: 24,
        comments: 156,
        location: "San Francisco, CA",
        verified: true
    },
    {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah.johnson@example.com",
        avatar: "/api/placeholder/40/40",
        role: "Editor",
        status: "Active",
        joinDate: "2024-02-20",
        lastActive: "1 day ago",
        posts: 18,
        comments: 89,
        location: "New York, NY",
        verified: true
    },
    {
        id: 3,
        name: "Michael Chen",
        email: "michael.chen@example.com",
        avatar: "/api/placeholder/40/40",
        role: "Author",
        status: "Active",
        joinDate: "2024-03-10",
        lastActive: "3 hours ago",
        posts: 12,
        comments: 45,
        location: "Toronto, ON",
        verified: false
    },
    {
        id: 4,
        name: "Emily Rodriguez",
        email: "emily.rodriguez@example.com",
        avatar: "/api/placeholder/40/40",
        role: "Author",
        status: "Inactive",
        joinDate: "2024-01-28",
        lastActive: "2 weeks ago",
        posts: 8,
        comments: 23,
        location: "London, UK",
        verified: true
    },
    {
        id: 5,
        name: "David Kim",
        email: "david.kim@example.com",
        avatar: "/api/placeholder/40/40",
        role: "Subscriber",
        status: "Active",
        joinDate: "2024-04-05",
        lastActive: "5 minutes ago",
        posts: 0,
        comments: 67,
        location: "Seoul, KR",
        verified: false
    },
    {
        id: 6,
        name: "Lisa Thompson",
        email: "lisa.thompson@example.com",
        avatar: "/api/placeholder/40/40",
        role: "Editor",
        status: "Suspended",
        joinDate: "2024-02-14",
        lastActive: "1 week ago",
        posts: 15,
        comments: 78,
        location: "Sydney, AU",
        verified: true
    },
    {
        id: 7,
        name: "Alex Morgan",
        email: "alex.morgan@example.com",
        avatar: "/api/placeholder/40/40",
        role: "Author",
        status: "Active",
        joinDate: "2024-03-22",
        lastActive: "1 hour ago",
        posts: 9,
        comments: 34,
        location: "Berlin, DE",
        verified: false
    },
    {
        id: 8,
        name: "Priya Patel",
        email: "priya.patel@example.com",
        avatar: "/api/placeholder/40/40",
        role: "Subscriber",
        status: "Active",
        joinDate: "2024-04-12",
        lastActive: "30 minutes ago",
        posts: 0,
        comments: 12,
        location: "Mumbai, IN",
        verified: true
    }
]

const roleColors = {
    'Admin': 'bg-red-100 text-red-800 border-red-200',
    'Editor': 'bg-blue-100 text-blue-800 border-blue-200',
    'Author': 'bg-green-100 text-green-800 border-green-200',
    'Subscriber': 'bg-gray-100 text-gray-800 border-gray-200'
}

const statusColors = {
    'Active': 'bg-green-100 text-green-800 border-green-200',
    'Inactive': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Suspended': 'bg-red-100 text-red-800 border-red-200'
}

export default function Users() {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState(mockUsers)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedRole, setSelectedRole] = useState('all')
    const [selectedStatus, setSelectedStatus] = useState('all')
    const [sortBy, setSortBy] = useState('name')
    const [selectedUsers, setSelectedUsers] = useState([])
    const [showUserModal, setShowUserModal] = useState(false)
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }, [])


    const filteredUsers = users
        .filter(user => {
            const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                user.email.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesRole = selectedRole === 'all' || user.role === selectedRole
            const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
            return matchesSearch && matchesRole && matchesStatus
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name)
                case 'email':
                    return a.email.localeCompare(b.email)
                case 'joinDate':
                    return new Date(b.joinDate) - new Date(a.joinDate)
                case 'lastActive':
                    return a.lastActive.localeCompare(b.lastActive)
                default:
                    return 0
            }
        })

    const handleSelectUser = (userId) => {
        setSelectedUsers(prev => 
            prev.includes(userId) 
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        )
    }

    const handleSelectAll = () => {
        setSelectedUsers(
            selectedUsers.length === filteredUsers.length 
                ? [] 
                : filteredUsers.map(user => user.id)
        )
    }

    const UserModal = ({ user, onClose }) => {
        if (!user) return null
        
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-card border border-border/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b border-border/20">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-light">User Details</h2>
                            <Button variant="ghost" onClick={onClose} className="rounded-none">×</Button>
                        </div>
                    </div>
                    
                    <div className="p-6 space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <span className="text-2xl font-medium text-primary">
                                    {user.name.charAt(0)}
                                </span>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-medium mb-1">{user.name}</h3>
                                <p className="text-muted-foreground mb-2">{user.email}</p>
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-1 text-xs border ${roleColors[user.role]}`}>
                                        {user.role}
                                    </span>
                                    <span className={`px-2 py-1 text-xs border ${statusColors[user.status]}`}>
                                        {user.status}
                                    </span>
                                    {user.verified && (
                                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 border border-blue-200">
                                            Verified
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium mb-2">Activity</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Posts</span>
                                            <span>{user.posts}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Comments</span>
                                            <span>{user.comments}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Last Active</span>
                                            <span>{user.lastActive}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                <div>
                                    <h4 className="font-medium mb-2">Information</h4>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Join Date</span>
                                            <span>{new Date(user.joinDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Location</span>
                                            <span>{user.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-border/20">
                            <Button variant="outline" className="rounded-none">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit User
                            </Button>
                            <Button variant="outline" className="rounded-none">
                                <Mail className="w-4 h-4 mr-2" />
                                Send Message
                            </Button>
                            {user.status === 'Active' ? (
                                <Button variant="outline" className="rounded-none text-red-600 border-red-200 hover:bg-red-50">
                                    <Ban className="w-4 h-4 mr-2" />
                                    Suspend
                                </Button>
                            ) : (
                                <Button variant="outline" className="rounded-none text-green-600 border-green-200 hover:bg-green-50">
                                    <ShieldCheck className="w-4 h-4 mr-2" />
                                    Activate
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="p-8">
                <div className="animate-pulse space-y-6">
                    <div className="space-y-3">
                        <div className="h-8 bg-muted rounded w-1/4"></div>
                        <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>
                    <div className="flex gap-4">
                        <div className="h-10 bg-muted rounded flex-1"></div>
                        <div className="h-10 bg-muted rounded w-32"></div>
                        <div className="h-10 bg-muted rounded w-32"></div>
                    </div>
                    <div className="space-y-4">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-20 bg-muted rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl md:text-5xl font-light mb-3">Users</h1>
                    <p className="text-muted-foreground text-lg">
                        Manage your blog's users and permissions
                    </p>
                </div>
              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="border border-border/20 bg-card/50 backdrop-blur-sm p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <UsersIcon className="w-5 h-5 text-primary" />
                        <span className="text-sm text-muted-foreground">Total Users</span>
                    </div>
                    <div className="text-2xl font-light">{users.length}</div>
                </div>
                <div className="border border-border/20 bg-card/50 backdrop-blur-sm p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Activity className="w-5 h-5 text-green-600" />
                        <span className="text-sm text-muted-foreground">Active Users</span>
                    </div>
                    <div className="text-2xl font-light">
                        {users.filter(u => u.status === 'Active').length}
                    </div>
                </div>
                <div className="border border-border/20 bg-card/50 backdrop-blur-sm p-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Crown className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-muted-foreground">Admins</span>
                    </div>
                    <div className="text-2xl font-light">
                        {users.filter(u => u.role === 'Admin').length}
                    </div>
                </div>     
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-border/20 bg-background/50 focus:outline-none focus:border-primary/60 transition-colors rounded-none"
                    />
                </div>
                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="px-4 py-2 border border-border/20 bg-background/50 focus:outline-none focus:border-primary/60 transition-colors rounded-none min-w-[120px]"
                >
                    <option value="all">All Roles</option>
                    <option value="Admin">Admin</option>
                </select>
                <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-4 py-2 border border-border/20 bg-background/50 focus:outline-none focus:border-primary/60 transition-colors rounded-none min-w-[120px]"
                >
                    <option value="all">All Status</option>
                    <option value="Suspended">Suspended</option>
                </select>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-border/20 bg-background/50 focus:outline-none focus:border-primary/60 transition-colors rounded-none min-w-[120px]"
                >
                    <option value="name">Sort by Name</option>
                    <option value="email">Sort by Email</option>
                    <option value="joinDate">Sort by Join Date</option>
                </select>
            </div>

            {selectedUsers.length > 0 && (
                <div className="border border-border/20 bg-card/50 backdrop-blur-sm p-4">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                            {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="rounded-none">
                                <Mail className="w-4 h-4 mr-2" />
                                Send Message
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-none">
                                <Ban className="w-4 h-4 mr-2" />
                                Suspend
                            </Button>
                            <Button variant="outline" size="sm" className="rounded-none text-red-600 border-red-200 hover:bg-red-50">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}

        
            <div className="border border-border/20 bg-card/50 backdrop-blur-sm overflow-hidden">
                <div className="border-b border-border/20 p-4 bg-muted/20">
                    <div className="flex items-center gap-4">
                        <input
                            type="checkbox"
                            checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                            onChange={handleSelectAll}
                            className="rounded border-border/20 text-primary focus:ring-primary/20"
                        />
                        <div className="grid grid-cols-12 gap-4 flex-1 text-sm font-medium text-muted-foreground">
                            <div className="col-span-3">User</div>
                            <div className="col-span-2">Role</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-2">Activity</div>
                            <div className="col-span-2">Join Date</div>
                            <div className="col-span-1">Actions</div>
                        </div>
                    </div>
                </div>

                <div className="divide-y divide-border/20">
                    {filteredUsers.map((user) => (
                        <div key={user.id} className="p-4 hover:bg-muted/10 transition-colors group">
                            <div className="flex items-center gap-4">
                                <input
                                    type="checkbox"
                                    checked={selectedUsers.includes(user.id)}
                                    onChange={() => handleSelectUser(user.id)}
                                    className="rounded border-border/20 text-primary focus:ring-primary/20"
                                />
                                <div className="grid grid-cols-12 gap-4 flex-1">
                        
                                    <div className="col-span-3 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <span className="text-sm font-medium text-primary">
                                                {user.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="font-medium">{user.name}</div>
                                            <div className="text-sm text-muted-foreground">{user.email}</div>
                                        </div>
                                    </div>

                    
                                    <div className="col-span-2 flex items-center">
                                        <span className={`px-2 py-1 text-xs border ${roleColors[user.role]}`}>
                                            {user.role}
                                        </span>
                                    </div>
                  
                                    <div className="col-span-2 flex items-center gap-2">
                                        <span className={`px-2 py-1 text-xs border ${statusColors[user.status]}`}>
                                            {user.status}
                                        </span>
                                        {user.verified && (
                                            <ShieldCheck className="w-4 h-4 text-blue-600" />
                                        )}
                                    </div>

                                   
                                    <div className="col-span-2 flex items-center">
                                        <div className="text-sm">
                                            <div>{user.posts} posts</div>
                                            <div className="text-muted-foreground">{user.lastActive}</div>
                                        </div>
                                    </div>

                                   
                                    <div className="col-span-2 flex items-center">
                                        <div className="text-sm">
                                            {new Date(user.joinDate).toLocaleDateString()}
                                        </div>
                                    </div>

                                   
                                    <div className="col-span-1 flex items-center">
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setSelectedUser(user)
                                                    setShowUserModal(true)
                                                }}
                                                className="h-8 w-8 p-0 rounded-none"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 rounded-none"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 rounded-none"
                                            >
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

        
                {filteredUsers.length === 0 && (
                    <div className="p-12 text-center">
                        <UsersIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No users found</h3>
                        <p className="text-muted-foreground">
                            Try adjusting your search or filter criteria
                        </p>
                    </div>
                )}
            </div>

    
            <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                    Showing {filteredUsers.length} of {users.length} users
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="rounded-none" disabled>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-none bg-primary text-primary-foreground">
                        1
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-none" disabled>
                        Next
                    </Button>
                </div>
            </div>

           
            {showUserModal && (
                <UserModal 
                    user={selectedUser} 
                    onClose={() => {
                        setShowUserModal(false)
                        setSelectedUser(null)
                    }} 
                />
            )}
        </div>
    )
}