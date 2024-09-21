"use client"
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PlusIcon, RefreshCw, UserIcon, BriefcaseIcon, FolderIcon, PhoneIcon, MailIcon, RefreshCwIcon } from 'lucide-react'

// Mock data for team members
const initialTeamMembers = [
  { id: 1, name: 'John Doe', role: 'Sales Manager', email: 'john@example.com', phone: '+1 234 567 890', avatar: '/placeholder.svg?height=40&width=40', department: 'Sales', projects: ['Project A', 'Project B'] },
  { id: 2, name: 'Jane Smith', role: 'Marketing Specialist', email: 'jane@example.com', phone: '+1 234 567 891', avatar: '/placeholder.svg?height=40&width=40', department: 'Marketing', projects: ['Project C'] },
  { id: 3, name: 'Mike Johnson', role: 'Customer Support', email: 'mike@example.com', phone: '+1 234 567 892', avatar: '/placeholder.svg?height=40&width=40', department: 'Support', projects: ['Project D', 'Project E'] },
]

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers)
  const [newMember, setNewMember] = useState({ name: '', role: '', email: '', phone: '' })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleInputChange = (e) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value) => {
    setNewMember({ ...newMember, role: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newId = teamMembers.length + 1
    setTeamMembers([...teamMembers, {
        ...newMember, id: newId, avatar: '/placeholder.svg?height=40&width=40',
        department: '',
        projects: []
    }])
    setNewMember({ name: '', role: '', email: '', phone: '' })
    setIsDialogOpen(false)
  }

  const overviewCards = [
    { title: "Total Team Members", count: teamMembers.length, icon: <UserIcon className="h-4 w-4 text-muted-foreground" /> },
    { title: "Departments", count: 3, icon: <BriefcaseIcon className="h-4 w-4 text-muted-foreground" /> },
    { title: "Active Projects", count: 5, icon: <FolderIcon className="h-4 w-4 text-muted-foreground" /> },
  ]

  return (
    <div className="min-h-screen">
      <CardHeader className="space-y-1 px-0 pt-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Visa Applications
          </CardTitle>
          <Button>
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
        <CardDescription>Manage and track visa applications</CardDescription>
      </CardHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Team Members</CardTitle>
              <UserIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{0}</div>
            <p className="text-xs text-muted-foreground">
             scheduled for today
           </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Team Members</CardTitle>
              <UserIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{0}</div>
            <p className="text-xs text-muted-foreground">
             scheduled for today
           </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Team Members</CardTitle>
              <UserIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{0}</div>
            <p className="text-xs text-muted-foreground">
             scheduled for today
           </p>
            </CardContent>
          </Card>
   
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Team Members</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><PlusIcon className="mr-2 h-4 w-4" /> Add New Member</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
              <DialogDescription>Enter the details of the new team member here.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" name="name" value={newMember.name} onChange={handleInputChange} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">Role</Label>
                  <Select onValueChange={handleSelectChange} required>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sales Manager">Sales Manager</SelectItem>
                      <SelectItem value="Marketing Specialist">Marketing Specialist</SelectItem>
                      <SelectItem value="Customer Support">Customer Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email</Label>
                  <Input id="email" name="email" type="email" value={newMember.email} onChange={handleInputChange} className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">Phone</Label>
                  <Input id="phone" name="phone" type="tel" value={newMember.phone} onChange={handleInputChange} className="col-span-3" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Member</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <Card key={member.id} className="transition-all duration-300 ">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{member.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center">
                  <MailIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{member.email}</span>
                  
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{member.phone}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}