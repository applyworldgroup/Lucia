'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Calendar, ChevronDown, Search, MoreHorizontal, Edit } from "lucide-react"
import Link from 'next/link'

// Mock data for appointments
const appointments = [
  { id: 1, name: "John Doe", email: "john@example.com", address: "123 Main St", phone: "555-1234", status: "Confirmed", date: "2023-06-15", time: "10:00 AM" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", address: "456 Elm St", phone: "555-5678", status: "Pending", date: "2023-06-16", time: "2:00 PM" },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", address: "789 Oak St", phone: "555-9012", status: "Cancelled", date: "2023-06-17", time: "11:30 AM" },
  // Add more mock appointments as needed
]

export default function Appointments() {
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')

  const sortedAppointments = [...appointments].sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc' ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
    } else if (sortBy === 'time') {
      return sortOrder === 'asc' ? a.time.localeCompare(b.time) : b.time.localeCompare(a.time)
    } else if (sortBy === 'lastName') {
      const aLastName = a.name.split(' ').pop() || ''
      const bLastName = b.name.split(' ').pop() || ''
      return sortOrder === 'asc' ? aLastName.localeCompare(bLastName) : bLastName.localeCompare(aLastName)
    }
    return 0
  }).filter(appointment => 
    appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.phone.includes(searchTerm)
  )

  const today = new Date().toISOString().split('T')[0]
  const thisWeekStart = new Date(new Date().setDate(new Date().getDate() - new Date().getDay())).toISOString().split('T')[0]
  const thisMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]

  const appointmentsToday = sortedAppointments.filter(a => a.date === today).length
  const appointmentsThisWeek = sortedAppointments.filter(a => a.date >= thisWeekStart).length
  const appointmentsThisMonth = sortedAppointments.filter(a => a.date >= thisMonthStart).length

  const handleEditAppointment = (id: number) => {
    console.log(`Editing appointment with id: ${id}`)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Appointments</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointmentsToday}</div>
            <p className="text-xs text-muted-foreground">
              {appointmentsToday === 1 ? 'appointment' : 'appointments'} scheduled for today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointmentsThisWeek}</div>
            <p className="text-xs text-muted-foreground">
              {appointmentsThisWeek === 1 ? 'appointment' : 'appointments'} scheduled this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointmentsThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              {appointmentsThisMonth === 1 ? 'appointment' : 'appointments'} scheduled this month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search appointments..."
            className="pl-8 w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Sort By <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => { setSortBy('date'); setSortOrder('asc'); }}>Date (Ascending)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setSortBy('date'); setSortOrder('desc'); }}>Date (Descending)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setSortBy('time'); setSortOrder('asc'); }}>Time (Ascending)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setSortBy('time'); setSortOrder('desc'); }}>Time (Descending)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setSortBy('lastName'); setSortOrder('asc'); }}>Last Name (A-Z)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setSortBy('lastName'); setSortOrder('desc'); }}>Last Name (Z-A)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>Book Appointment</Button>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.name}</TableCell>
                <TableCell>{appointment.email}</TableCell>
                <TableCell>{appointment.address}</TableCell>
                <TableCell>{appointment.phone}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                     <Link href="appointments/update">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                             Edit
                        </DropdownMenuItem>
                    </Link>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}