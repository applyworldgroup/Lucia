"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
  MoreHorizontal,
  Edit,
  Clock,
  User,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Filter,
  RefreshCwIcon,
  SearchIcon,
} from "lucide-react";
import AppointmentForm from "./components/appointment-form";
import { Badge } from "@/components/ui/badge";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

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
];

interface Appointment {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  status: string;
  date: Date;
  time: string;
}

export default function Appointments() {
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [filters, setFilters] = React.useState({
    status: [] as string[],
  });

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

  const sortOptions = [
    { label: "Date", value: "date", icon: Calendar },
    { label: "Time", value: "time", icon: Clock },
    { label: "Last Name", value: "lastName", icon: User },
  ];

  const handleSort = (value: string) => {
    if (sortBy === value) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(value);
      setSortOrder("asc");
    }
  };
  const handleFilter = (type: "status" | "address", value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      (filters.status.length === 0 ||
        filters.status.includes(appointment.status)) &&
      (searchTerm === "" ||
        appointment.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        appointment.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.email.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    if (a[sortBy as keyof Appointment] < b[sortBy as keyof Appointment])
      return sortOrder === "asc" ? -1 : 1;
    if (a[sortBy as keyof Appointment] > b[sortBy as keyof Appointment])
      return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const today = new Date();
  const thisWeekStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay(),
  );
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

  // run the filter in appointments inested of sortedAppointments.
  const appointmentsToday = sortedAppointments.filter(
    (a) => a.date.toDateString() === today.toDateString(),
  ).length;
  const appointmentsThisWeek = sortedAppointments.filter(
    (a) => a.date >= thisWeekStart,
  ).length;
  const appointmentsThisMonth = sortedAppointments.filter(
    (a) => a.date >= thisMonthStart,
  ).length;

  return (
    <div className="w-full mx-auto ">
      <CardHeader className="space-y-1 px-0 pt-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Appointments</CardTitle>
          <Button>
            {/* <Button onClick={() => setCurrentPage(1)}> */}
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
        <CardDescription>Manage and track daily appointments</CardDescription>
      </CardHeader>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex w-full flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today&apos;s Appointments
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{appointmentsToday}</div>
            <p className="text-xs text-muted-foreground">
              {appointmentsToday === 1 ? "appointment" : "appointments"}
              scheduled for today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              This Week&apos;s Appointments
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
              This Month&apos;s Appointments
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
      <CardContent className="px-0">
        <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">
          <div className="flex-1 space-y-2">
            <label htmlFor="search" className="text-sm font-medium">
              Search Applications
            </label>
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="search"
                className="pl-8 md:w-1/2"
                placeholder="Search by name, email, or passport number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[200px] justify-between"
              >
                <span className="flex items-center">
                  {sortOptions.find((option) => option.value === sortBy)
                    ?.icon &&
                    React.createElement(
                      sortOptions.find((option) => option.value === sortBy)!
                        .icon,
                      { className: "mr-2 h-4 w-4" },
                    )}
                  Sort by{" "}
                  {sortOptions.find((option) => option.value === sortBy)?.label}
                </span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleSort(option.value)}
                  className="flex items-center justify-between"
                >
                  <span className="flex items-center">
                    {React.createElement(option.icon, {
                      className: "mr-2 h-4 w-4",
                    })}
                    {option.label}
                  </span>
                  {sortBy === option.value &&
                    (sortOrder === "asc" ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    ))}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[200px] justify-between"
              >
                <span className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter Options
                </span>
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["Confirmed", "Pending", "Cancelled"].map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={filters.status.includes(status)}
                  onCheckedChange={() => handleFilter("status", status)}
                >
                  {status}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="px-3"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          <Button onClick={() => setIsBookDialogOpen(true)}>
            Book Appointment
          </Button>
        </div>
      </CardContent>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="py-4">Name</TableHead>
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
                  <Badge variant={"secondary"}>{appointment.status}</Badge>
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
              Make changes to the appointment here. Click save when you&apos;re
              done.
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
