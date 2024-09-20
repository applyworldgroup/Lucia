"use client";import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { today, thisMonthStart, thisWeekStart } from "@/lib/date-calc";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Calendar,
  CalendarIcon,
  ChevronDown,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  Edit,
  FilterIcon,
  MoreHorizontal,
  RefreshCwIcon,
  SearchIcon,
  User,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Customer } from "@/types/schema";

const mockData = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    address: "123 Maple St, Sydney, NSW 2000",
    passportNumber: "A1234567",
    currentVisa: "SUB_500",
    visaExpiry: "2025-12-31T00:00:00Z",
    phone: "+61 2 1234 5678",
    createdAt: "2023-01-15T12:00:00Z",
    updatedAt: "2023-01-15T12:00:00Z",
  },
  {
    id: 2,
    name: "David Smith",
    email: "david.smith@example.com",
    address: "456 Oak St, Melbourne, VIC 3000",
    passportNumber: "B9876543",
    currentVisa: "SUB_482",
    visaExpiry: "2024-05-15T00:00:00Z",
    phone: "+61 3 2345 6789",
    createdAt: "2023-02-20T10:30:00Z",
    updatedAt: "2023-02-20T10:30:00Z",
  },
  {
    id: 3,
    name: "Emma Brown",
    email: "emma.brown@example.com",
    address: "789 Pine St, Brisbane, QLD 4000",
    passportNumber: "C3219876",
    currentVisa: "SUB_186",
    visaExpiry: "2026-03-10T00:00:00Z",
    phone: "+61 7 3456 7890",
    createdAt: "2023-03-05T09:15:00Z",
    updatedAt: "2023-03-05T09:15:00Z",
  },
  {
    id: 4,
    name: "Liam Wilson",
    email: "liam.wilson@example.com",
    address: "101 Birch St, Perth, WA 6000",
    passportNumber: "D4567890",
    currentVisa: "SUB_500",
    visaExpiry: "2024-11-30T00:00:00Z",
    phone: "+61 8 4567 8901",
    createdAt: "2023-04-12T11:00:00Z",
    updatedAt: "2023-04-12T11:00:00Z",
  },
  {
    id: 5,
    name: "Sophia Davis",
    email: "sophia.davis@example.com",
    address: "202 Elm St, Adelaide, SA 5000",
    passportNumber: "E6543210",
    currentVisa: "SUB_482",
    visaExpiry: "2025-08-25T00:00:00Z",
    phone: "+61 8 5678 9012",
    createdAt: "2023-05-22T08:45:00Z",
    updatedAt: "2023-05-22T08:45:00Z",
  },
  {
    id: 6,
    name: "James Garcia",
    email: "james.garcia@example.com",
    address: "303 Cedar St, Hobart, TAS 7000",
    passportNumber: "F9876543",
    currentVisa: "SUB_407",
    visaExpiry: "2023-12-31T00:00:00Z",
    phone: "+61 3 6789 0123",
    createdAt: "2023-06-18T07:30:00Z",
    updatedAt: "2023-06-18T07:30:00Z",
  },
  {
    id: 7,
    name: "Mia Martinez",
    email: "mia.martinez@example.com",
    address: "404 Spruce St, Darwin, NT 0800",
    passportNumber: "G3216549",
    currentVisa: "SUB_186",
    visaExpiry: "2026-01-20T00:00:00Z",
    phone: "+61 8 7890 1234",
    createdAt: "2023-07-09T14:15:00Z",
    updatedAt: "2023-07-09T14:15:00Z",
  },
  {
    id: 8,
    name: "Noah Thompson",
    email: "noah.thompson@example.com",
    address: "505 Willow St, Canberra, ACT 2600",
    passportNumber: "H6543210",
    currentVisa: "SUB_190",
    visaExpiry: "2024-09-15T00:00:00Z",
    phone: "+61 2 8901 2345",
    createdAt: "2023-08-16T12:00:00Z",
    updatedAt: "2023-08-16T12:00:00Z",
  },
  {
    id: 9,
    name: "Olivia Clark",
    email: "olivia.clark@example.com",
    address: "606 Ash St, Gold Coast, QLD 4217",
    passportNumber: "I9876543",
    currentVisa: "SUB_600",
    visaExpiry: "2025-07-10T00:00:00Z",
    phone: "+61 7 9012 3456",
    createdAt: "2023-09-03T15:30:00Z",
    updatedAt: "2023-09-03T15:30:00Z",
  },
  {
    id: 10,
    name: "Ethan Lewis",
    email: "ethan.lewis@example.com",
    address: "707 Cherry St, Newcastle, NSW 2300",
    passportNumber: "J1234567",
    currentVisa: "SUB_820",
    visaExpiry: "2026-06-25T00:00:00Z",
    phone: "+61 2 2345 6789",
    createdAt: "2023-10-01T09:00:00Z",
    updatedAt: "2023-10-01T09:00:00Z",
  },
];

export default function Component() {
  const [sortBy, setSortBy] = useState("visaAppliedDate");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [visaFilter, setVisaFilter] = useState("all");
  const itemsPerPage = 10;

  // Filter and search functionality
  const filteredData = mockData.filter(
    (item) =>
      (visaFilter === "all" || item.currentVisa === visaFilter) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.passportNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortOptions = [
    { label: "Date", value: "visaAppliedDate", icon: Calendar },
    { label: "Name", value: "name", icon: User },
  ];

  const handleSort = (value: string) => {
    if (sortBy === value) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(value);
      setSortOrder("asc");
    }
  };
  const sortedCustomers = [...filteredData].sort((a, b) => {
    if (a[sortBy as keyof Customer] < b[sortBy as keyof Customer])
      return sortOrder === "asc" ? -1 : 1;
    if (a[sortBy as keyof Customer] > b[sortBy as keyof Customer])
      return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = sortedCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const createdToday = sortedCustomers.filter(
    (a) => a.createdAt === today.toString()
  ).length;
  const createdThisWeek = sortedCustomers.filter(
    (a) => a.createdAt >= thisWeekStart.toString()
  ).length;
  const createdThisMonth = sortedCustomers.filter(
    (a) => a.createdAt >= thisMonthStart.toString()
  ).length;

  return (
    <div className="min-h-screen">
      <CardHeader className="space-y-1 px-0 pt-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Our Customers</CardTitle>
          <Button onClick={() => setCurrentPage(1)}>
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
        <CardDescription>
          Manage and track the record of our customers
        </CardDescription>
      </CardHeader>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex w-full flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today&apos;s Connection
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{0}</div>
            <p className="text-xs text-muted-foreground">
              new {createdToday === 1 ? "connection" : "connections "}
              made today
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              This Week&apos;s Connections
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{0}</div>
            <p className="text-xs text-muted-foreground">
              new {createdThisWeek === 1 ? "connection" : "connections "}
              made this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              This Month&apos;s Connection
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{0}</div>
            <p className="text-xs text-muted-foreground">
              new {createdThisMonth === 1 ? "connection" : "connections "}
              made this month
            </p>
          </CardContent>
        </Card>
      </div>
      <CardContent className="px-0">
        <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">
          <div className="flex-1 space-y-2">
            <label htmlFor="search" className="text-sm font-medium">
              Search customers
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

          <div className=" w-full md:w-[12rem]">
            <label htmlFor="status" className="text-sm font-medium">
              Visa
            </label>
            <Select value={visaFilter} onValueChange={setVisaFilter}>
              <SelectTrigger id="visa">
                <SelectValue placeholder="Select visa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="SUB_407">407</SelectItem>
                <SelectItem value="SUB_482">482</SelectItem>
                <SelectItem value="SUB_186">186</SelectItem>
                <SelectItem value="SUB_500">500</SelectItem>
                <SelectItem value="SUB_189">189</SelectItem>
                <SelectItem value="SUB_190">190</SelectItem>
                <SelectItem value="SUB_600">600</SelectItem>
                <SelectItem value="SUB_820">820</SelectItem>
                <SelectItem value="SUB_801">801</SelectItem>
              </SelectContent>
            </Select>
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
                      { className: "mr-2 h-4 w-4" }
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
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="px-3"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          <Link href={"customers/create"}>
            <Button className="w-full md:w-auto">Register New Customer</Button>
          </Link>
        </div>
      </CardContent>
      <div className="rounded-lg border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead className="px-4 py-4">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Passport Number</TableHead>
              <TableHead>Current Visa</TableHead>
              <TableHead>Visa Expiry</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-4 py-4">{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.passportNumber}</TableCell>
                <TableCell>{item.currentVisa}</TableCell>
                <TableCell>{item.visaExpiry.toString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Link
                          href={`visa-applications/update/${item.id}`}
                          className="flex items-center"
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
          {filteredData.length} applications
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
}
