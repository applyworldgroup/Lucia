"use client";
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUpDown,
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  Edit,
  MoreHorizontal,
  RefreshCwIcon,
  SearchIcon,
  Check,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  getAllEnquiries,
  updateEnquiry,
} from "@/features/actions/enquiries/actions";
import { useToast } from "@/hooks/use-toast";
import { GeneralEnquiry } from "@prisma/client";
import Loading from "@/app/components/loading";
import { exportToCSV } from "@/lib/export-to-csv";

export default function Enquiries() {
  const { toast } = useToast();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedFollowedUpBy, setEditedFollowedUpBy] = useState("");
  const [editedFollowUpDates, setEditedFollowUpDates] = useState("2024-01-01");
  const itemsPerPage = 10;

  const queryClient = useQueryClient();

  const {
    data: enquiries,
    isPending,
    isError,
    error,
  } = useQuery<GeneralEnquiry[], Error>({
    queryKey: ["enquiries"],
    queryFn: () => getAllEnquiries(),
  });

  const updateEnquiryMutation = useMutation({
    mutationFn: (params: {
      id: string;
      followed_up_by: string;
      follow_up_dates: string;
    }) =>
      updateEnquiry(params.id, {
        followed_up_by: params.followed_up_by,
        follow_up_dates: params.follow_up_dates
          .split(",")
          .map((date) => date.trim()),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      toast({
        variant: "default",
        title: "Updated",
        description: "Record updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError) {
    console.log(error);
    return <p>Error: {error.message}</p>;
  }

  const handleExportToCSV = () => {
    console.log(enquiries);
    if (enquiries) {
      if (enquiries.length === 0) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "No data available to export.",
        });
      } else {
        exportToCSV(enquiries, "enquiries.csv");
      }
    }
  };
  const filteredData =
    enquiries?.filter(
      (item) =>
        item.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.country.toLowerCase().includes(searchTerm.toLowerCase()),
    ) || [];

  const sortedEnquiries = [...filteredData].sort((a, b) => {
    const aValue = a[sortBy as keyof GeneralEnquiry] ?? "";
    const bValue = b[sortBy as keyof GeneralEnquiry] ?? "";

    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = sortedEnquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleEdit = (
    id: string,
    followed_up_by: string | null,
    follow_up_dates: string[],
  ) => {
    setEditingId(id);
    setEditedFollowedUpBy(followed_up_by || "");
    const formattedDates = follow_up_dates
      .map((date) => date.split("T")[0])
      .join(", ");

    setEditingId(id);
    setEditedFollowUpDates(formattedDates);
  };

  const handleSave = (enquiry: GeneralEnquiry) => {
    // Trim the followed up by field
    const trimmedFollowedUpBy = editedFollowedUpBy.trim();

    // Validate followed_up_by
    if (trimmedFollowedUpBy === "") {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid 'Followed Up By' name.",
      });
      return; // Exit the function if validation fails
    }

    // Split the input string by commas, trim whitespace, and filter out empty values
    const datesArray = editedFollowUpDates
      .split(",")
      .map((date) => date.trim())
      .filter((date) => date.length > 0);

    // Validate and format dates
    const formattedDates = datesArray
      .map((date) => {
        const parsedDate = new Date(date);
        // Check if the date is valid
        if (!isNaN(parsedDate.getTime())) {
          // Return in YYYY-MM-DD format
          return parsedDate.toISOString().split("T")[0];
        } else {
          // Handle invalid date case
          toast({
            variant: "destructive",
            title: "Error",
            description: `Invalid date: ${date}`,
          });
          return null; // Return null for invalid dates
        }
      })
      .filter((date) => date !== null); // Remove any null values from the array

    // Only proceed if there are valid dates
    if (formattedDates.length > 0) {
      updateEnquiryMutation.mutate({
        id: enquiry.id,
        followed_up_by: trimmedFollowedUpBy,
        follow_up_dates: formattedDates.join(", "), // Join dates back into a string if needed
      });
      setEditingId(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div className="min-h-screen">
      <CardHeader className="space-y-1 px-0 pt-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Enquiries</CardTitle>
          <Button
            onClick={() =>
              queryClient.invalidateQueries({ queryKey: ["enquiries"] })
            }
          >
            <RefreshCwIcon className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
        <CardDescription>Manage and track enquiries</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">
          <div className="flex-1 space-y-2">
            <label htmlFor="search" className="text-sm font-medium">
              Search enquiries
            </label>
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="search"
                className="pl-8 md:w-1/2"
                placeholder="Search by name, email, or country"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="px-3 flex gap-2"
          >
            Sort By Date | <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead className="px-4 py-4">Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Purpose</TableHead>
              <TableHead>Followed Up By</TableHead>
              <TableHead>Followed Up Dates</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="px-4 py-4">{item.full_name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.country}</TableCell>
                <TableCell>{item.phone_number}</TableCell>
                <TableCell>{item.purpose_of_enquiry}</TableCell>
                <TableCell>
                  {editingId === item.id ? (
                    <Input
                      value={editedFollowedUpBy}
                      onChange={(e) => setEditedFollowedUpBy(e.target.value)}
                      className="w-full"
                    />
                  ) : (
                    item.followed_up_by
                  )}
                </TableCell>
                <TableCell>
                  {editingId === item.id ? (
                    <Input
                      value={editedFollowUpDates}
                      onChange={(e) => setEditedFollowUpDates(e.target.value)}
                      className="w-full"
                      placeholder="YYYY-MM-DD, YYYY-MM-DD"
                    />
                  ) : (
                    item.follow_up_dates
                      .map((date) => date.toISOString().split("T")[0]) // Convert to YYYY-MM-DD
                      .join(", ")
                  )}
                </TableCell>

                <TableCell className="text-right">
                  {editingId === item.id ? (
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSave(item)}
                        disabled={updateEnquiryMutation.isPending}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCancel}
                        disabled={updateEnquiryMutation.isPending}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onSelect={() =>
                            handleEdit(
                              item.id,
                              item.followed_up_by,
                              item.follow_up_dates.map((date) =>
                                date.toISOString(),
                              ),
                            )
                          }
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
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
          {filteredData.length} enquiries
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
