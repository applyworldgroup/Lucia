import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Loading() {
  return (
    <div className="space-y-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 mb-2 w-32" />
          <Skeleton className="h-4 w-60" />
        </div>
        <Button variant="outline" disabled>
          <Skeleton className="h-4 w-16" />
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-8 w-8 mb-1" />
              <Skeleton className="h-4 w-48" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="flex gap-4">
          <Select disabled>
            <SelectTrigger className="w-32">
              <Skeleton className="h-4 w-16" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
          <Select disabled>
            <SelectTrigger className="w-32">
              <Skeleton className="h-4 w-16" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
          <Select disabled>
            <SelectTrigger className="w-40">
              <Skeleton className="h-4 w-24" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Sort by Date</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-sm">
        <Table>
          <TableHeader>
            <TableRow>
              {[
                "S.N",
                "Name",
                "Email",
                "Passport Number",
                "Visa Applied Date",
                "Visa Status",
                "Previous Visa",
                "Applied Visa",
                "Total Amount",
                "Total Paid",
                "Actions",
              ].map((header) => (
                <TableHead key={header}>
                  <Skeleton className="h-4 my-4  w-20" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                {[...Array(11)].map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 my-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
