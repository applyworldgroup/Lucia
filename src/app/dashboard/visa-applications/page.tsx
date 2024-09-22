"use client";
import React, { useState } from "react";
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
  ChevronDown,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  Edit,
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

interface Visa {
  id: number;
  name: string;
  email: string;
  address: string;
  passportNumber: string;
  visaAppliedDate: string; // ISO 8601 date format
  visaStatus: string;
  previousVisa: string;
  visaType: string;
  totalAmount: number;
  totalPaid: number;
  overseer: string;
}

const mockData = [
  {
    id: 1,
    firstName: "John",
    middleName: "A.",
    lastName: "Doe",
    email: "john.doe@example.com",
    address: "123 Street, City, Country",
    passportNumber: "AB123456",
    visaAppliedDate: new Date("2024-01-15"),
    visaStatus: "PENDING",
    previousVisa: "SUB_500",
    visaType: "SUB_482",
    totalAmount: 2000,
    totalPaid: 1500,
    overseer: "Agent Smith",
  },
  {
    id: 2,
    firstName: "Jane",
    middleName: "B.",
    lastName: "Smith",
    email: "jane.smith@example.com",
    address: "456 Avenue, City, Country",
    passportNumber: "XY654321",
    visaAppliedDate: new Date("2023-12-01"),
    visaStatus: "APPROVED",
    previousVisa: "SUB_482",
    visaType: "SUB_186",
    totalAmount: 5000,
    totalPaid: 5000,
    overseer: "Agent Brown",
  },
  {
    id: 3,
    firstName: "Michael",
    middleName: "C.",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    address: "789 Boulevard, City, Country",
    passportNumber: "CD789123",
    visaAppliedDate: new Date("2024-03-10"),
    visaStatus: "REJECTED",
    previousVisa: "SUB_407",
    visaType: "SUB_600",
    totalAmount: 3000,
    totalPaid: 2000,
    overseer: "Agent Cooper",
  },
  {
    id: 4,
    firstName: "Alice",
    middleName: "D.",
    lastName: "Williams",
    email: "alice.williams@example.com",
    address: "101 Circle, City, Country",
    passportNumber: "EF321456",
    visaAppliedDate: new Date("2023-11-05"),
    visaStatus: "PENDING",
    previousVisa: "SUB_189",
    visaType: "SUB_820",
    totalAmount: 4000,
    totalPaid: 3000,
    overseer: "Agent Moore",
  },
  {
    id: 5,
    firstName: "Chris",
    middleName: "E.",
    lastName: "Brown",
    email: "chris.brown@example.com",
    address: "202 Lane, City, Country",
    passportNumber: "GH654789",
    visaAppliedDate: new Date("2023-10-20"),
    visaStatus: "APPROVED",
    previousVisa: "SUB_186",
    visaType: "SUB_801",
    totalAmount: 3500,
    totalPaid: 3500,
    overseer: "Agent Clark",
  },
  {
    id: 6,
    firstName: "David",
    middleName: "F.",
    lastName: "Jones",
    email: "david.jones@example.com",
    address: "303 Crescent, City, Country",
    passportNumber: "IJ987654",
    visaAppliedDate: new Date("2024-05-12"),
    visaStatus: "PENDING",
    previousVisa: "SUB_500",
    visaType: "SUB_482",
    totalAmount: 2500,
    totalPaid: 1500,
    overseer: "Agent Evans",
  },
  {
    id: 7,
    firstName: "Eve",
    middleName: "G.",
    lastName: "Martinez",
    email: "eve.martinez@example.com",
    address: "404 Square, City, Country",
    passportNumber: "KL012345",
    visaAppliedDate: new Date("2023-09-25"),
    visaStatus: "REJECTED",
    previousVisa: "SUB_407",
    visaType: "SUB_186",
    totalAmount: 4500,
    totalPaid: 2500,
    overseer: "Agent Lewis",
  },
  {
    id: 8,
    firstName: "Frank",
    middleName: "H.",
    lastName: "Garcia",
    email: "frank.garcia@example.com",
    address: "505 Parkway, City, Country",
    passportNumber: "MN654321",
    visaAppliedDate: new Date("2024-02-18"),
    visaStatus: "PENDING",
    previousVisa: "SUB_189",
    visaType: "SUB_407",
    totalAmount: 2200,
    totalPaid: 1700,
    overseer: "Agent Stewart",
  },
  {
    id: 9,
    firstName: "Grace",
    middleName: "I.",
    lastName: "Rodriguez",
    email: "grace.rodriguez@example.com",
    address: "606 Highway, City, Country",
    passportNumber: "OP123456",
    visaAppliedDate: new Date("2023-08-15"),
    visaStatus: "APPROVED",
    previousVisa: "SUB_482",
    visaType: "SUB_500",
    totalAmount: 6000,
    totalPaid: 4000,
    overseer: "Agent Carter",
  },
  {
    id: 10,
    firstName: "Hank",
    middleName: "J.",
    lastName: "Lee",
    email: "hank.lee@example.com",
    address: "707 Street, City, Country",
    passportNumber: "QR098765",
    visaAppliedDate: new Date("2024-04-14"),
    visaStatus: "PENDING",
    previousVisa: "SUB_500",
    visaType: "SUB_820",
    totalAmount: 1800,
    totalPaid: 1800,
    overseer: "Agent Harris",
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
      (statusFilter === "all" ||
        item.visaStatus === statusFilter) &&
      (visaFilter === "all" || item.visaType === visaFilter) &&
      (item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.passportNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortOptions = [
    { label: "Date", value: "visaAppliedDate", icon: Calendar },
    { label: "Name", value: "firstName", icon: User },
  ];

  const handleSort = (value: string) => {
    if (sortBy === value) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(value);
      setSortOrder("asc");
    }
  };
  const sortedApplications = [...filteredData].sort((a, b) => {
    if (a[sortBy as keyof Visa] < b[sortBy as keyof Visa])
      return sortOrder === "asc" ? -1 : 1;
    if (a[sortBy as keyof Visa] > b[sortBy as keyof Visa])
      return sortOrder === "asc" ? 1 : -1;
    return 0;
  });
  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = sortedApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const appliedToday = sortedApplications.filter(
    (a) => a.visaAppliedDate === today
  ).length;
  const appliedThisWeek = sortedApplications.filter(
    (a) => a.visaAppliedDate >= thisWeekStart
  ).length;
  const appliedThisMonth = sortedApplications.filter(
    (a) => a.visaAppliedDate >= thisMonthStart
  ).length;

  return (
    <div className="min-h-screen">
      <CardHeader className="space-y-1 px-0 pt-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Visa Applications
          </CardTitle>
          <Button onClick={() => setCurrentPage(1)}>
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
        <CardDescription>Manage and track visa applications</CardDescription>
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
            <div className="text-2xl font-bold">{0}</div>
            <p className="text-xs text-muted-foreground">
              {appliedToday === 1 ? "appointment" : "appointments "}
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
            <div className="text-2xl font-bold">{0}</div>
            <p className="text-xs text-muted-foreground">
              {appliedThisWeek === 1 ? "appointment" : "appointments"} scheduled
              this week
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
            <div className="text-2xl font-bold">{0}</div>
            <p className="text-xs text-muted-foreground">
              {appliedThisMonth === 1 ? "appointment" : "appointments"}{" "}
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
          <div className="w-full md:w-[12rem]">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="PENDING">PENDING</SelectItem>
                <SelectItem value="APPROVED">APPROVED</SelectItem>
                <SelectItem value="REJECTED">REJECTED</SelectItem>
              </SelectContent>
            </Select>
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
          <Link href={"visa-applications/create"}>
            <Button className="w-full md:w-auto">Add New Record</Button>
          </Link>
        </div>
      </CardContent>
      <div className="rounded-lg border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead className="px-4 py-4">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Passport Number</TableHead>
              <TableHead>Visa Applied Date</TableHead>
              <TableHead>Visa Status</TableHead>
              <TableHead>Previous Visa</TableHead>
              <TableHead>Visa Type</TableHead>
              <TableHead>Total Amount</TableHead>
              <TableHead>Total Paid</TableHead>
              <TableHead>Overseer</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-4 py-4">
                  {item.firstName} {item.middleName} {item.lastName}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.passportNumber}</TableCell>
                <TableCell>{item.visaAppliedDate.toDateString()}</TableCell>
                <TableCell>{item.visaStatus}</TableCell>
                <TableCell>{item.previousVisa}</TableCell>
                <TableCell>{item.visaType}</TableCell>
                <TableCell>${item.totalAmount}</TableCell>
                <TableCell>${item.totalPaid}</TableCell>
                <TableCell>{item.overseer}</TableCell>
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
