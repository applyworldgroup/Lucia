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
  ChevronDown,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  Edit,
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteSkillsAssessment,
  getAllSkillsAssessment,
} from "@/features/actions/skills-assessment/actions";
import Loading from "@/app/components/loading";
import { DeleteConfirmDialog } from "@/app/components/delete-confirm-dialog";
import { toast } from "@/hooks/use-toast";
import { exportToCSV } from "@/lib/export-to-csv";

export default function SkillsAssesment() {
  const queryClient = useQueryClient();
  const [sort, setSort] = useState({ by: "applicationDate", order: "asc" });
  const [filters, setFilters] = useState({
    stage: "all",
    search: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["skills-assessment"],
    queryFn: () => getAllSkillsAssessment(),
  });

  //handle delete
  const mutation = useMutation({
    mutationFn: deleteSkillsAssessment,
    onSuccess: ({ success, error }) => {
      queryClient.invalidateQueries({ queryKey: ["skills-assessment"] });
      if (success) {
        toast({
          title: "Success",
          description: "Customer data successfully deleted.",
        });
      } else if (!success) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error || "Failed to delete customer data.",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Unknown error occoured",
      });
    },
  });

  // Handle delete
  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  const handleExportToCSV = () => {
    console.log(data);
    if (data) {
      if (data.length === 0) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No data available to export.",
        });
      } else {
        exportToCSV(data, "skills-assessments.csv");
      }
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <p>Error: {error.message}</p>;

  const SkillsAssessment = data || [];

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

  const filteredData = SkillsAssessment.filter((item) => {
    const searchText = filters.search.toLowerCase();
    const customer = item.customer;
    return (
      (filters.stage === "all" || item.stage === filters.stage) &&
      (customer.firstName.toLowerCase().includes(searchText) ||
        customer.middleName?.toLowerCase().includes(searchText) || // Handle middleName being null
        customer.lastName.toLowerCase().includes(searchText) ||
        customer.email.toLowerCase().includes(searchText) ||
        item.occupation.toLowerCase().includes(searchText))
    );
  });

  // Sort data
  const sortedApplications = [...filteredData].sort((a, b) => {
    const aValue = a[sort.by] ?? "";
    const bValue = b[sort.by] ?? "";

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
            Skills Assessment Applications
          </CardTitle>
          <Button onClick={() => setCurrentPage(1)}>
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
        <CardDescription>
          Manage and track Skills Assessment applications
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
              Stage
            </label>
            <Select
              value={filters.stage}
              onValueChange={(value) => handleFilterChange("stage", value)}
            >
              <SelectTrigger id="stage">
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="STAGE_1">STAGE_1</SelectItem>
                <SelectItem value="STAGE_2">STAGE_2</SelectItem>
                <SelectItem value="INTERVIEW">INTERVIEW</SelectItem>
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
          <Link href={"skills-assessment/create"}>
            <Button className="w-full md:w-auto">Add New Record</Button>
          </Link>
        </div>
      </CardContent>
      <div className="rounded-lg  border dark:border-muted  overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead className="px-4 py-4">#</TableHead>
              <TableHead className="px-4 py-4">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Visa</TableHead>
              <TableHead>Visa Expiry</TableHead>
              <TableHead>Occupation</TableHead>
              <TableHead>Authority</TableHead>
              <TableHead>Application Date</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>RPL</TableHead>
              <TableHead>Outcome Result</TableHead>
              <TableHead>Outcome Date</TableHead>
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
                <TableCell>{item.customer.currentVisa}</TableCell>
                <TableCell>
                  {item.customer.visaExpiry?.toDateString()}
                </TableCell>
                <TableCell>{item.occupation}</TableCell>
                <TableCell>{item.assessingAuthority}</TableCell>
                <TableCell>{item.applicationDate.toDateString()}</TableCell>
                <TableCell>{item.stage}</TableCell>
                <TableCell>{item.rpl}</TableCell>
                <TableCell>{item.outcomeResult}</TableCell>
                <TableCell>{item.outcomeDate?.toDateString()}</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant={"ghost"} className="p-2">
                    <Link
                      href={`skills-assessment/update/${item.id}`}
                      className="flex items-center"
                    >
                      <Edit className=" h-4 w-4" />
                    </Link>
                  </Button>
                  <DeleteConfirmDialog
                    onDelete={handleDelete}
                    itemId={item.id}
                  />
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
        <Button variant="outline" onClick={handleExportToCSV}>
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
}
