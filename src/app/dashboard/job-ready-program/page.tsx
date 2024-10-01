"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { filterCustomersByRange } from "@/lib/date-calc";
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
  ArrowDownIcon,
  ArrowUp,
  ArrowUpIcon,
  Calendar,
  CheckCircle,
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
enum JRPStatus {
  ENROLLED = "ENROLLED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  WITHDRAWN = "WITHDRAWN",
}
interface JobReadyProgram {
  id: number;
  customerId: number;
  programType: string;
  startDate: Date;
  endDate: Date;
  status: JRPStatus;
  workplacement: string | null;
  employerName: string | null;
  employerABN: string | null;
  supervisorName: string | null;
  supervisorContact: string | null;
  completionDate: Date | null;
  certificateIssued: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

enum JobReadyProgramType {
  SUB_500,
  SUB_482,
  SUB_407,
  SUB_186,
  SUB_189,
  SUB_190,
  SUB_600,
  SUB_820,
  SUB_801,
}
const mockData = [
  {
    id: 1,
    customer: {
      id: 101,
      firstName: "John",
      middleName: "Michael",
      lastName: "Doe",
      email: "john.doe@example.com",
      address: "123 Sydney St, Sydney NSW 2000",
      passportNumber: "PA1234567",
      currentJobReadyProgram: JobReadyProgramType.SUB_500,
      JobReadyProgramExpiry: new Date("2025-12-31"),
      phone: "+61412345678",
      createdAt: new Date("2023-01-01"),
      updatedAt: new Date("2023-01-01"),
    },
    programType: "Hospitality Management",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-07-15"),
    status: JRPStatus.IN_PROGRESS,
    workplacement: "Hilton Sydney",
    employerName: "Hilton Hotels & Resorts",
    employerABN: "36123456789",
    supervisorName: "Jane Smith",
    supervisorContact: "jane.smith@hilton.com",
    completionDate: null,
    certificateIssued: false,
  },
  {
    id: 2,
    customer: {
      id: 102,
      firstName: "Emma",
      middleName: "Rose",
      lastName: "Wilson",
      email: "emma.wilson@example.com",
      address: "456 Melbourne Rd, Melbourne VIC 3000",
      passportNumber: "PA7654321",
      currentJobReadyProgram: JobReadyProgramType.SUB_482,
      JobReadyProgramExpiry: new Date("2026-06-30"),
      phone: "+61423456789",
      createdAt: new Date("2023-02-15"),
      updatedAt: new Date("2023-02-15"),
    },
    programType: "Culinary Arts",
    startDate: new Date("2023-09-01"),
    endDate: new Date("2024-03-01"),
    status: JRPStatus.COMPLETED,
    workplacement: "The Rocks Cafe",
    employerName: "The Rocks Cafe Pty Ltd",
    employerABN: "98765432109",
    supervisorName: "Chef Gordon Ramsay",
    supervisorContact: "gordon@therockscafe.com",
    completionDate: new Date("2024-03-01"),
    certificateIssued: true,
  },
  {
    id: 3,
    customer: {
      id: 103,
      firstName: "Oliver",
      middleName: "James",
      lastName: "Brown",
      email: "oliver.brown@example.com",
      address: "789 Brisbane Ave, Brisbane QLD 4000",
      passportNumber: "PA9876543",
      currentJobReadyProgram: JobReadyProgramType.SUB_500,
      JobReadyProgramExpiry: new Date("2025-08-31"),
      phone: "+61434567890",
      createdAt: new Date("2023-03-10"),
      updatedAt: new Date("2023-03-10"),
    },
    programType: "Hotel Management",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-09-01"),
    status: JRPStatus.ENROLLED,
    workplacement: null,
    employerName: null,
    employerABN: null,
    supervisorName: null,
    supervisorContact: null,
    completionDate: null,
    certificateIssued: false,
  },
  {
    id: 4,
    customer: {
      id: 104,
      firstName: "Sophia",
      middleName: "Grace",
      lastName: "Chen",
      email: "sophia.chen@example.com",
      address: "101 Perth St, Perth WA 6000",
      passportNumber: "PA1357924",
      currentJobReadyProgram: JobReadyProgramType.SUB_407,
      JobReadyProgramExpiry: new Date("2025-11-30"),
      phone: "+61445678901",
      createdAt: new Date("2023-04-20"),
      updatedAt: new Date("2023-04-20"),
    },
    programType: "Event Management",
    startDate: new Date("2023-11-15"),
    endDate: new Date("2024-05-15"),
    status: JRPStatus.IN_PROGRESS,
    workplacement: "Crown Perth",
    employerName: "Crown Resorts Limited",
    employerABN: "39111111111",
    supervisorName: "Mark Johnson",
    supervisorContact: "m.johnson@crownperth.com.au",
    completionDate: null,
    certificateIssued: false,
  },
  {
    id: 5,
    customer: {
      id: 105,
      firstName: "Liam",
      middleName: "Patrick",
      lastName: "O'Connor",
      email: "liam.oconnor@example.com",
      address: "202 Hobart Pl, Hobart TAS 7000",
      passportNumber: "PA2468135",
      currentJobReadyProgram: JobReadyProgramType.SUB_500,
      JobReadyProgramExpiry: new Date("2026-02-28"),
      phone: "+61456789012",
      createdAt: new Date("2023-05-05"),
      updatedAt: new Date("2023-05-05"),
    },
    programType: "Tourism Management",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-08-01"),
    status: JRPStatus.ENROLLED,
    workplacement: null,
    employerName: null,
    employerABN: null,
    supervisorName: null,
    supervisorContact: null,
    completionDate: null,
    certificateIssued: false,
  },
];

export default function JobReadyProgram() {
  const [sort, setSort] = useState({ by: "startDate", order: "asc" });
  const [filters, setFilters] = useState({
    status: "all",
    program: "all",
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

  // Handle filtering
  const handleFilterChange = (filterKey: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterKey]: value,
    }));
  };

  // Filter data
  const filteredData = mockData.filter((item) => {
    const searchText = filters.search.toLowerCase();
    const customer = item.customer;
    return (
      (filters.status === "all" || item.status === filters.status) &&
      (filters.program === "all" || item.programType === filters.program) &&
      (customer.firstName.toLowerCase().includes(searchText) ||
        customer.email.toLowerCase().includes(searchText) ||
        customer.passportNumber.toLowerCase().includes(searchText))
    );
  });

  // Sort data
  const sortedApplications = [...filteredData].sort((a, b) => {
    const aValue = a[sort.by as keyof JobReadyProgram];
    const bValue = b[sort.by as keyof JobReadyProgram];

    if (aValue < bValue) return sort.order === "asc" ? -1 : 1;
    if (aValue > bValue) return sort.order === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = sortedApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const appliedToday = filterCustomersByRange(sortedApplications, "today");
  const appliedThisWeek = filterCustomersByRange(sortedApplications, "week");
  const appliedThisMonth = filterCustomersByRange(sortedApplications, "month");

  return (
    <div className="min-h-screen">
      <CardHeader className="space-y-1 px-0 pt-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            JobReadyProgram Applications
          </CardTitle>
          <Button onClick={() => setCurrentPage(1)}>
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
        <CardDescription>
          Manage and track JobReadyProgram applications
        </CardDescription>
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
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
            </div>
          </div>
          <div className="w-full md:w-[12rem]">
            <label htmlFor="status" className="text-sm font-medium">
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
                <SelectItem value="ENROLLED">ENROLLED</SelectItem>
                <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                <SelectItem value="WITHDRAWN">WITHDRAWN</SelectItem>
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
            onClick={() => handleSort(sort.by)} // This will toggle the sort order
            className="px-3"
          >
            {sort.order === "asc" ? (
              <ArrowUpIcon className="h-4 w-4" />
            ) : (
              <ArrowDownIcon className="h-4 w-4" />
            )}
          </Button>
          <Link href={"JobReadyProgram-applications/create"}>
            <Button className="w-full md:w-auto">Add New Record</Button>
          </Link>
        </div>
      </CardContent>
      <div className="rounded-lg border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead className="px-4 py-4">S.N</TableHead>
              <TableHead className="px-4 py-4">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Program Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Work Placement</TableHead>
              <TableHead>Employer Name Type</TableHead>
              <TableHead>ABN</TableHead>
              <TableHead>Supervisor</TableHead>
              <TableHead>Supervisor Contact</TableHead>
              <TableHead>Completion Date</TableHead>
              <TableHead>Certificate Issued</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="px-4 py-4">
                  {(currentPage - 1) * itemsPerPage + 1 + index}
                </TableCell>
                <TableCell className="px-4 py-4">
                  {item.customer.firstName} {item.customer.middleName}{" "}
                  {item.customer.lastName}
                </TableCell>
                <TableCell>{item.customer.email}</TableCell>
                <TableCell>{item.programType}</TableCell>
                <TableCell>{item.startDate.toDateString()}</TableCell>
                <TableCell>{item.endDate.toDateString()}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.workplacement}</TableCell>
                <TableCell>{item.employerName}</TableCell>
                <TableCell>{item.employerABN}</TableCell>
                <TableCell>{item.supervisorName}</TableCell>
                <TableCell>{item.supervisorContact}</TableCell>
                <TableCell>{item.completionDate?.toDateString()}</TableCell>
                <TableCell>
                  {item.certificateIssued && <CheckCircle size={15} />}
                </TableCell>
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
                          href={`JobReadyProgram-applications/update/${item.id}`}
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
