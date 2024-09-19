"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Calendar,
  ChevronDown,
  Search,
  MoreHorizontal,
  Edit,
} from "lucide-react";
import AppointmentForm from "./components/appointment-form";
import { Badge } from "@/components/ui/badge";

// Mock data for appointments
const appointments = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    address: "123 Main St",
    phone: "555-1234",
    status: "Confirmed",
    date: new Date("2023-06-15"),
    time: "10:00",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    address: "456 Elm St",
    phone: "555-5678",
    status: "Pending",
    date: new Date("2023-06-16"),
    time: "14:00",
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@example.com",
    address: "789 Oak St",
    phone: "555-9012",
    status: "Cancelled",
    date: new Date("2023-06-17"),
    time: "11:30",
  },
  // Add more mock appointments as needed
];

export default function Appointments() {
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);

  const sortedAppointments = [...appointments]
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? a.date.getTime() - b.date.getTime()
          : b.date.getTime() - a.date.getTime();
      } else if (sortBy === "time") {
        return sortOrder === "asc"
          ? a.time.localeCompare(b.time)
          : b.time.localeCompare(a.time);
      } else if (sortBy === "lastName") {
        return sortOrder === "asc"
          ? a.lastName.localeCompare(b.lastName)
          : b.lastName.localeCompare(a.lastName);
      }
      return 0;
    })
    .filter(
      (appointment) =>
        `${appointment.firstName} ${appointment.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.phone.includes(searchTerm)
    );

  const today = new Date();
  const thisWeekStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay()
  );
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  const appointmentsToday = sortedAppointments.filter(
    (a) => a.date.toDateString() === today.toDateString()
  ).length;
  const appointmentsThisWeek = sortedAppointments.filter(
    (a) => a.date >= thisWeekStart
  ).length;
  const appointmentsThisMonth = sortedAppointments.filter(
    (a) => a.date >= thisMonthStart
  ).length;

  const handleEditAppointment = (appointment) => {
    setEditingAppointment(appointment);
    setIsEditDialogOpen(true);
  };
  const handleBookSubmit = (appointmentData) => {
    // Here you would typically add the new appointment to your database
    console.log("New appointment booked:", appointmentData);
    setIsBookDialogOpen(false);
  };
  const handleEditSubmit = (updatedAppointment) => {
    // Here you would typically update the appointment in your database
    console.log("Updated appointment:", updatedAppointment);
    setIsEditDialogOpen(false);
  };

  const handleCancel = () => {
    setIsBookDialogOpen(false);
    setIsEditDialogOpen(false);
    setEditingAppointment(null);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Appointments</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointmentsToday}</div>
            <p className="text-xs text-muted-foreground">
              {appointmentsToday === 1 ? "appointment" : "appointments"}{" "}
              scheduled for today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              This Week's Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointmentsThisWeek}</div>
            <p className="text-xs text-muted-foreground">
              {appointmentsThisWeek === 1 ? "appointment" : "appointments"}{" "}
              scheduled this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              This Month's Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointmentsThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              {appointmentsThisMonth === 1 ? "appointment" : "appointments"}{" "}
              scheduled this month
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
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("date");
                  setSortOrder("asc");
                }}
              >
                Date (Ascending)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("date");
                  setSortOrder("desc");
                }}
              >
                Date (Descending)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("time");
                  setSortOrder("asc");
                }}
              >
                Time (Ascending)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("time");
                  setSortOrder("desc");
                }}
              >
                Time (Descending)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("lastName");
                  setSortOrder("asc");
                }}
              >
                Last Name (A-Z)
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSortBy("lastName");
                  setSortOrder("desc");
                }}
              >
                Last Name (Z-A)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => setIsBookDialogOpen(true)}>
            Book Appointment
          </Button>
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
                <TableCell>{`${appointment.firstName} ${appointment.lastName}`}</TableCell>
                <TableCell>{appointment.email}</TableCell>
                <TableCell>{appointment.address}</TableCell>
                <TableCell>{appointment.phone}</TableCell>
                <TableCell>
                  {/* <Badge
                    variant={
                      {
                        Confirmed: "default",
                        Pending: "secondary",
                        Cancelled: "destructive",
                        Appointed: "outline",
                      }[appointment.status] as //for ts error
                        | "default"
                        | "secondary"
                        | "destructive"
                        | "outline"
                    }
                  >
                    {appointment.status}
                  </Badge> */}
                  <Badge variant={"secondary"}>
                    {appointment.status}
                  </Badge>
                </TableCell>
                <TableCell>{appointment.date.toLocaleDateString()}</TableCell>
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
                      <DropdownMenuItem
                        onSelect={() => handleEditAppointment(appointment)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[350px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[960px] 2xl:max-w-[1200px] p-4 sm:p-6">
          <DialogHeader className="flex items-center">
            <DialogTitle className="text-2xl font-bold text-center">
              Edit Appointment
            </DialogTitle>
            <DialogDescription>
              Make changes to the appointment here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {editingAppointment && (
            <AppointmentForm
              appointment={editingAppointment}
              onSubmit={handleEditSubmit}
              onCancel={handleCancel}
            />
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={isBookDialogOpen} onOpenChange={setIsBookDialogOpen}>
        <DialogContent className="sm:max-w-[350px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[960px] 2xl:max-w-[1200px] p-4 sm:p-6">
          <DialogHeader className="flex items-center">
            <DialogTitle className="text-2xl font-bold text-center">
              Book Appointment
            </DialogTitle>
            <DialogDescription>
              Book the appointments in a easy fashion and keep the tracks of our
              visiting customers.
            </DialogDescription>
          </DialogHeader>
          {isBookDialogOpen && (
            <AppointmentForm
              onSubmit={handleBookSubmit}
              onCancel={handleCancel}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
