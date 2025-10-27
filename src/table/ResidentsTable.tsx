"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Edit2, Trash2, Plus } from "lucide-react";
import { Resident } from "@/pages/Dashboard";
import AppButton from "@/components/AppButton";

interface ResidentsTableProps {
  residents: Resident[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterType: "All" | "Resident" | "Visitor" | "Staff";
  onFilterChange: (type: "All" | "Resident" | "Visitor" | "Staff") => void;
  onAdd: () => void;
  onEdit: (resident: Resident) => void;
  onDelete: (id: string) => void;
}

export function ResidentsTable({
  residents,
  searchQuery,
  onSearchChange,
  filterType,
  onFilterChange,
  onAdd,
  onEdit,
  onDelete,
}: ResidentsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(residents.length / itemsPerPage);

  const paginatedResidents = residents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getAccessTypeBadgeColor = (type: string) => {
    switch (type) {
      case "Resident":
        return "bg-blue-100 text-blue-800";
      case "Visitor":
        return "bg-amber-100 text-amber-800";
      case "Staff":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="p-6 bg-card_bg_color">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold font-poppins text-foreground">Access Records</h2>
          <AppButton
            Icon={Plus}
            onClick={onAdd}
            className="text-white px-4 py-2  button-shine hover-scale"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by name or house number..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-input_bg text-input_text border-gray_border_color"
            />
          </div>
          <Select value={filterType} onValueChange={onFilterChange}>
            <SelectTrigger className="w-40 border-gray_border_color">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="Resident">Resident</SelectItem>
              <SelectItem value="Visitor">Visitor</SelectItem>
              <SelectItem value="Staff">Staff</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray_border_color">
              <th className="text-left py-3 px-4 font-semibold font-poppins text-foreground">Name</th>
              <th className="text-left py-3 px-4 font-semibold font-poppins text-foreground">House Number</th>
              <th className="text-left py-3 px-4 font-semibold font-poppins text-foreground">Access Type</th>
              <th className="text-left py-3 px-4 font-semibold font-poppins text-foreground">Last Visit</th>
              <th className="text-left py-3 px-4 font-semibold font-poppins text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedResidents.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray_text_color">
                  No residents found
                </td>
              </tr>
            ) : (
              paginatedResidents.map((resident) => (
                <tr
                  key={resident.id}
                  className="border-b border-gray_border_color hover:bg-muted/50 transition-colors"
                >
                  <td className="py-4 px-4 text-foreground">{resident.name}</td>
                  <td className="py-4 px-4 text-foreground">{resident.houseNumber}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getAccessTypeBadgeColor(
                        resident.accessType
                      )}`}
                    >
                      {resident.accessType}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-foreground text-sm">{formatDate(resident.lastVisit)}</td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(resident)}
                        className="gap-1  text-primary  rounded button-shine hover-scale text-green-600 hover:bg-green-100 hover:border-green-600"
                      >
                        <Edit2 size={16} />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(resident.id)}
                        className="gap-1 border-txt_danger text-red-500 rounded button-shine hover-scale hover:bg-red-100 hover:border-red-500"
                      >
                        <Trash2 size={16} />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray_text_color">
          Showing {paginatedResidents.length} of {residents.length} record{residents.length !== 1 ? "s" : ""}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border-primary text-primary hover:bg-blue-200 hover:text-white disabled:bg-bg_gray_color disabled:text-gray_text_color rounded button-shine"
          >
            Previous
          </Button>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
                className={
                  currentPage === page
                    ? "bg-blue-700 text-white rounded button-shine"
                    : "border-primary text-primary hover:bg-primary hover:text-white rounded button-shine"
                }
              >
                {page}
              </Button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-blue-700 text-white disabled:bg-bg_gray_color disabled:text-gray_text_color rounded button-shine"
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}