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
    firstName: "Emily",
    middleName: "A.",
    lastName: "Brown",
    email: "emily.brown@example.com",
    address: "123 Elm St, City, Country",
    passportNumber: "AB123456",
    currentVisa: "SUB_500",
    visaExpiry: new Date("2024-12-31"),
    phone: "123-456-7890",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-06-15"),
  },
  {
    id: 2,
    firstName: "James",
    middleName: "B.",
    lastName: "Smith",
    email: "james.smith@example.com",
    address: "456 Oak St, City, Country",
    passportNumber: "CD789123",
    currentVisa: "SUB_482",
    visaExpiry: new Date("2025-07-10"),
    phone: "321-654-0987",
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-07-20"),
  },
  {
    id: 3,
    firstName: "Sophia",
    middleName: "C.",
    lastName: "Johnson",
    email: "sophia.johnson@example.com",
    address: "789 Pine St, City, Country",
    passportNumber: "EF654789",
    currentVisa: "SUB_186",
    visaExpiry: new Date("2025-05-30"),
    phone: "987-654-3210",
    createdAt: new Date("2023-03-15"),
    updatedAt: new Date("2023-08-12"),
  },
  {
    id: 4,
    firstName: "Daniel",
    middleName: "D.",
    lastName: "Williams",
    email: "daniel.williams@example.com",
    address: "101 Birch St, City, Country",
    passportNumber: "GH012345",
    currentVisa: "SUB_407",
    visaExpiry: new Date("2024-09-01"),
    phone: "456-789-0123",
    createdAt: new Date("2023-04-01"),
    updatedAt: new Date("2023-09-22"),
  },
  {
    id: 5,
    firstName: "Olivia",
    middleName: "E.",
    lastName: "Garcia",
    email: "olivia.garcia@example.com",
    address: "202 Maple St, City, Country",
    passportNumber: "IJ098765",
    currentVisa: "SUB_600",
    visaExpiry: new Date("2024-11-20"),
    phone: "654-321-7890",
    createdAt: new Date("2023-05-05"),
    updatedAt: new Date("2023-10-15"),
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
      (item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    (a) => a.createdAt === today
  ).length;
  const createdThisWeek = sortedCustomers.filter(
    (a) => a.createdAt >= thisWeekStart
  ).length;
  const createdThisMonth = sortedCustomers.filter(
    (a) => a.createdAt >= thisMonthStart
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
                <TableCell className="px-4 py-4">
                  {item.firstName} {item.middleName} {item.lastName}
                </TableCell>
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
