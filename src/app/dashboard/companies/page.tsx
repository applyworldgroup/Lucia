"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
// import { useQuery } from "@tanstack/react-query";
// import LoadingSpinner from "@/app/components/loading-spinner";
import { filterCustomersByRange } from "@/lib/date-calc";

const companies = [
  {
    id: "3f1b2d8a-4f39-4a1e-a5e8-d72c9a2cb9f8",
    tradingName: "Tech Innovators Ltd",
    name: "Tech Innovators",
    director: "Alice Johnson",
    email: "alice.johnson@techinnovators.com",
    phone: "0456781234",
    abn: 123456789,
    address: "123 Tech Street, Sydney, NSW 2000",
    website: "https://techinnovators.com",
    sbsStatus: "APPROVED",
    associatedClients: 10,
  },
  {
    id: "a245c00f-69b4-49d9-9e7d-716394d90530",
    tradingName: "NextGen Solutions",
    name: "NextGen Solutions Pty Ltd",
    director: "Bob Richards",
    email: "bob.richards@nextgensolutions.com",
    phone: "0467886543",
    abn: 987654321,
    address: "45 Enterprise Road, Melbourne, VIC 3000",
    website: "https://nextgensolutions.com",
    sbsStatus: "PENDING",
    associatedClients: 7,
  },
  {
    id: "9d3e9f63-1bf3-46a4-a750-87a8d2e62f95",
    tradingName: "Global Ventures",
    name: "Global Ventures Ltd",
    director: "Catherine Lee",
    email: "catherine.lee@globalventures.com",
    phone: "0432567810",
    abn: 112233445,
    address: "789 Global Way, Brisbane, QLD 4000",
    website: "https://globalventures.com",
    sbsStatus: "NOT_APPROVED",
    associatedClients: 15,
  },
  {
    id: "53a7c5e8-4f72-4ba6-b03a-02c1ff4df7b3",
    tradingName: "Innovate IT",
    name: "Innovate IT Solutions",
    director: "David Miller",
    email: "david.miller@innovateit.com",
    phone: "0478123456",
    abn: 246810121,
    address: "500 IT Park, Perth, WA 6000",
    website: "https://innovateit.com",
    sbsStatus: "APPROVED",
    associatedClients: 20,
  },
  {
    id: "6a1f2e74-91f0-48e6-bf8e-1d5c12eabe5e",
    tradingName: "Alpha Technologies",
    name: "Alpha Technologies Ltd",
    director: "Emma Watson",
    email: "emma.watson@alphatech.com",
    phone: "0412345678",
    abn: 314159265,
    address: "250 Alpha Road, Adelaide, SA 5000",
    website: "https://alphatech.com",
    sbsStatus: "PENDING",
    associatedClients: 5,
  },
];

export default function Customers() {
  const [sort, setSort] = useState({ by: "createdAt", order: "asc" });
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const sortOptions = [
    { label: "Date", value: "startDate", icon: Calendar },
    { label: "Name", value: "programType", icon: User },
  ];
  // Handle sorting
  const handleSort = (value: string) => {
    setSort((prevSort) => ({
      by: value,
      order: prevSort.by === value && prevSort.order === "asc" ? "desc" : "asc",
    }));
  };

  // Filter data
  const filteredData = companies.filter((item) => {
    const searchText = filters.search.toLowerCase();
    return (
      (filters.status === "all" || item.sbsStatus === filters.status) &&
      (item.tradingName.toLowerCase().includes(searchText) ||
        item.email.toLowerCase().includes(searchText))
    );
  });

  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value,
    }));
  };

  //   const { data, isLoading, isError, error } = useQuery({
  //     queryKey: ["customers"],
  //     queryFn: () => getAllCustomers(),
  //   });

  //   if (isLoading)
  //     return (
  //       <div className="h-full flex items-center justify-center">
  //         <LoadingSpinner />
  //       </div>
  //     );
  //   if (isError) return <p>Error: {error.message}</p>;

  //   const customers = data || [];

  const sortedCustomers = [...filteredData].sort((a, b) => {
    const aValue = a[sort.by] ?? "";
    const bValue = b[sort.by] ?? "";

    if (aValue < bValue) return sort.order === "asc" ? -1 : 1;
    if (aValue > bValue) return sort.order === "asc" ? 1 : -1;
    return 0;
  });
  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = sortedCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const createdToday = filterCustomersByRange(sortedCustomers, "today");
  const createdThisWeek = filterCustomersByRange(sortedCustomers, "week");
  const createdThisMonth = filterCustomersByRange(sortedCustomers, "month");

  return (
    <div className="min-h-screen">
      <CardHeader className="space-y-1 px-0 pt-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Our Associated Companies
          </CardTitle>
          <Button onClick={() => setCurrentPage(1)}>
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
        <CardDescription>
          Manage and track the record of our customers
        </CardDescription>
      </CardHeader>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
        <Card>
          <CardHeader className="flex w-full flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sydney</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{createdToday}</div>
            <p className="text-xs text-muted-foreground">
              associated companies
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NewCastle</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{createdThisWeek}</div>
            <p className="text-xs text-muted-foreground">
              associated companies
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Birsbane</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{createdThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              associated companies
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Perth</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{createdThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              associated companies
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Adelaide</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{createdThisMonth}</div>
            <p className="text-xs text-muted-foreground">
              associated companies
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
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-[12rem]">
            <label htmlFor="stage" className="text-sm font-medium">
              Status
            </label>
            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="APPROVED"> APPROVED</SelectItem>
                <SelectItem value="NOT_APPROVED">NOT_APPROVED</SelectItem>
                <SelectItem value="PENDING">PENDING</SelectItem>
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
                  {sortOptions.find((option) => option.value === sort.by)
                    ?.icon &&
                    React.createElement(
                      sortOptions.find((option) => option.value === sort.by)!
                        .icon,
                      { className: "mr-2 h-4 w-4" },
                    )}
                  Sort by{" "}
                  {
                    sortOptions.find((option) => option.value === sort.by)
                      ?.label
                  }
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
                  {sort.by === option.value &&
                    (sort.order === "asc" ? (
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
            onClick={() => handleSort(sort.by)}
            className="px-3"
          >
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          <Link href={"companies/create"}>
            <Button className="w-full md:w-auto">Register New Company</Button>
          </Link>
        </div>
      </CardContent>
      <div className="rounded-lg border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead className="px-4 py-4">Name</TableHead>
              <TableHead>Trading As</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>email</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Director</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Sbs Status</TableHead>
              <TableHead>Clients</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-4 py-4">{item.name}</TableCell>
                <TableCell>{item.tradingName}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>{item.director}</TableCell>
                <TableCell>{item.website}</TableCell>
                <TableCell>{item.sbsStatus}</TableCell>
                <TableCell>{item.associatedClients}</TableCell>
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
                          href={`companies/update/${item.id}`}
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
