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

enum SAStatus {
  SUBMITTED,
  UNDER_ASSESSMENT,
  ADDITIONAL_INFO_REQUIRED,
  COMPLETED,
  APPEALED,
}

enum SAType {
  SKILLS_ASSESSMENT,
  QUALIFICATION_ASSESSMENT,
  PROVISIONAL_SKILLS_ASSESSMENT,
}
interface SkillsAssessment {
  id: number;
  customerId: number;
  occupation: string;
  assessingAuthority: string;
  applicationDate: Date;
  status: SAStatus;
  documentationSubmitted: boolean;
  skillsAssessmentType: SAType;
  outcomeReceived: boolean;
  outcomeDate: Date | null;
  outcomeResult: string | null;
  appealSubmitted: boolean;
  appealDate: Date | null;
  appealOutcome: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

enum VisaType {
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
      id: 201,
      firstName: "Ava",
      middleName: "Elizabeth",
      lastName: "Taylor",
      email: "ava.taylor@example.com",
      address: "303 Adelaide St, Adelaide SA 5000",
      passportNumber: "PA3692581",
      currentVisa: VisaType.SUB_482,
      visaExpiry: new Date("2026-09-30"),
      phone: "+61467890123",
      createdAt: new Date("2023-06-15"),
      updatedAt: new Date("2023-06-15"),
    },
    occupation: "Chef",
    assessingAuthority: "TRA (Trades Recognition Australia)",
    applicationDate: new Date("2024-01-10"),
    status: SAStatus.UNDER_ASSESSMENT,
    documentationSubmitted: true,
    skillsAssessmentType: SAType.SKILLS_ASSESSMENT,
    outcomeReceived: false,
    outcomeDate: null,
    outcomeResult: null,
    appealSubmitted: false,
    appealDate: null,
    appealOutcome: null,
  },
  {
    id: 2,
    customer: {
      id: 202,
      firstName: "Ethan",
      middleName: "Alexander",
      lastName: "Nguyen",
      email: "ethan.nguyen@example.com",
      address: "404 Darwin Blvd, Darwin NT 0800",
      passportNumber: "PA7531598",
      currentVisa: VisaType.SUB_189,
      visaExpiry: null,
      phone: "+61478901234",
      createdAt: new Date("2023-07-20"),
      updatedAt: new Date("2023-07-20"),
    },
    occupation: "Hotel Manager",
    assessingAuthority: "VETASSESS",
    applicationDate: new Date("2023-11-15"),
    status: SAStatus.COMPLETED,
    documentationSubmitted: true,
    skillsAssessmentType: SAType.QUALIFICATION_ASSESSMENT,
    outcomeReceived: true,
    outcomeDate: new Date("2024-02-20"),
    outcomeResult: "Positive",
    appealSubmitted: false,
    appealDate: null,
    appealOutcome: null,
  },
  {
    id: 3,
    customer: {
      id: 203,
      firstName: "Mia",
      middleName: "Sophie",
      lastName: "Garcia",
      email: "mia.garcia@example.com",
      address: "505 Canberra Ave, Canberra ACT 2600",
      passportNumber: "PA9517534",
      currentVisa: VisaType.SUB_500,
      visaExpiry: new Date("2025-07-31"),
      phone: "+61489012345",
      createdAt: new Date("2023-08-10"),
      updatedAt: new Date("2023-08-10"),
    },
    occupation: "Restaurant Manager",
    assessingAuthority: "VETASSESS",
    applicationDate: new Date("2024-02-01"),
    status: SAStatus.ADDITIONAL_INFO_REQUIRED,
    documentationSubmitted: true,
    skillsAssessmentType: SAType.SKILLS_ASSESSMENT,
    outcomeReceived: false,
    outcomeDate: null,
    outcomeResult: null,
    appealSubmitted: false,
    appealDate: null,
    appealOutcome: null,
  },
  {
    id: 4,
    customer: {
      id: 204,
      firstName: "Noah",
      middleName: "William",
      lastName: "Smith",
      email: "noah.smith@example.com",
      address: "606 Gold Coast Hwy, Gold Coast QLD 4217",
      passportNumber: "PA7539514",
      currentVisa: VisaType.SUB_407,
      visaExpiry: new Date("2025-10-31"),
      phone: "+61490123456",
      createdAt: new Date("2023-09-05"),
      updatedAt: new Date("2023-09-05"),
    },
    occupation: "Sommelier",
    assessingAuthority: "TRA (Trades Recognition Australia)",
    applicationDate: new Date("2023-12-01"),
    status: SAStatus.COMPLETED,
    documentationSubmitted: true,
    skillsAssessmentType: SAType.SKILLS_ASSESSMENT,
    outcomeReceived: true,
    outcomeDate: new Date("2024-03-15"),
    outcomeResult: "Positive",
    appealSubmitted: false,
    appealDate: null,
    appealOutcome: null,
  },
  {
    id: 5,
    customer: {
      id: 205,
      firstName: "Isabella",
      middleName: "Marie",
      lastName: "Johnson",
      email: "isabella.johnson@example.com",
      address: "707 Wollongong Rd, Wollongong NSW 2500",
      passportNumber: "PA3579512",
      currentVisa: VisaType.SUB_190,
      visaExpiry: new Date("2026-04-30"),
      phone: "+61401234567",
      createdAt: new Date("2023-10-15"),
      updatedAt: new Date("2023-10-15"),
    },
    occupation: "Event Coordinator",
    assessingAuthority: "VETASSESS",
    applicationDate: new Date("2024-03-01"),
    status: SAStatus.SUBMITTED,
    documentationSubmitted: true,
    skillsAssessmentType: SAType.PROVISIONAL_SKILLS_ASSESSMENT,
    outcomeReceived: false,
    outcomeDate: null,
    outcomeResult: null,
    appealSubmitted: false,
    appealDate: null,
    appealOutcome: null,
  },
];

export default function SkillsAssesment() {
  const [sort, setSort] = useState({ by: "applicationDate", order: "asc" });
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const sortOptions = [
    { label: "Date", value: "applicationDate", icon: Calendar },
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
      filters.status === "all" ||
      (item.status.toLocaleString() === filters.status &&
        (customer.firstName.toLowerCase().includes(searchText) ||
          customer.email.toLowerCase().includes(searchText) ||
          customer.passportNumber.toLowerCase().includes(searchText)))
    );
  });

  // Sort data
  const sortedApplications = [...filteredData].sort((a, b) => {
    const aValue = a[sort.by as keyof SkillsAssessment];
    const bValue = b[sort.by as keyof SkillsAssessment];

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

  const appliedToday = sortedApplications.filter(
    (a) => a.applicationDate === today,
  ).length;
  const appliedThisWeek = sortedApplications.filter(
    (a) => a.applicationDate >= thisWeekStart,
  ).length;
  const appliedThisMonth = sortedApplications.filter(
    (a) => a.applicationDate >= thisMonthStart,
  ).length;

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
              <TableHead>Occupation</TableHead>
              <TableHead>Authority</TableHead>
              <TableHead>Application Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Documentation</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Outcome Received</TableHead>
              <TableHead>Outcome Date</TableHead>
              <TableHead>Outcome Result</TableHead>
              <TableHead>Appeal Submitted</TableHead>
              <TableHead>Appeal Date</TableHead>
              <TableHead>Appeal Outcome</TableHead>
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
                <TableCell>{item.occupation}</TableCell>
                <TableCell>{item.assessingAuthority}</TableCell>
                <TableCell>{item.applicationDate.toDateString()}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  {item.documentationSubmitted && <CheckCircle size={15} />}
                </TableCell>
                <TableCell>{item.skillsAssessmentType}</TableCell>
                <TableCell>
                  {item.outcomeReceived && <CheckCircle size={15} />}
                </TableCell>
                <TableCell>{item.outcomeDate?.toDateString()}</TableCell>
                <TableCell>{item.outcomeResult}</TableCell>
                <TableCell>{item.appealSubmitted && <CheckCircle />}</TableCell>
                <TableCell>{item.appealDate}</TableCell>
                <TableCell>{item.appealOutcome}</TableCell>
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
