import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResidentsTable } from "@/table/ResidentsTable";
import { AddResidentModal } from "@/components/AddResidentModal";
import { DashboardCards } from "@/components/DashBoardCard";
import { EditResidentModal } from "@/components/EditResidentModal";
import { Toast } from "@/components/Toast";
import { Button, ButtonProps } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { users } from "@/data/residents";

export interface Resident {
  id: string;
  name: string;
  houseNumber?: string;
  accessType?: "Resident" | "Visitor" | "Staff";
  lastVisit: string;
}

interface AddButtonProps extends ButtonProps {
  text?: string;
  Icon?: LucideIcon;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const AppButton: React.FC<AddButtonProps> = ({
  text = "Add Resident",
  Icon,
  className,
  onClick,
  type = "button",
  ...props
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Button
        className={cn("gap-2 font-sans bg-blue-700 hover:bg-blue-600", className)}
        onClick={onClick}
        type={type}
        {...props}
      >
        {Icon && <Icon size={18} />}
        {text}
      </Button>
    </motion.div>
  );
};

const Dashboard = () => {
  const [residents, setResidents] = useState<Resident[]>(users);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingResident, setEditingResident] = useState<Resident | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"All" | "Resident" | "Visitor" | "Staff">("All");

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddResident = (data: Omit<Resident, "id">) => {
    const newResident: Resident = {
      ...data,
      id: Date.now().toString(),
    };
    setResidents([...residents, newResident]);
    setShowAddModal(false);
    showToast(`${data.name} added successfully`, "success");
  };

  const handleEditResident = (data: Resident) => {
    setResidents(residents.map((r) => (r.id === data.id ? data : r)));
    setEditingResident(null);
    showToast(`${data.name} updated successfully`, "success");
  };

  const handleDeleteResident = (id: string) => {
    const resident = residents.find((r) => r.id === id);
    setResidents(residents.filter((r) => r.id !== id));
    showToast(`${resident?.name} deleted successfully`, "success");
  };

  const filteredResidents = residents.filter((resident) => {
    const matchesSearch =
      resident.name.toLowerCase().includes(searchQuery.toLowerCase()) || resident.houseNumber.includes(searchQuery);
    const matchesFilter = filterType === "All" || resident.accessType === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <DashboardCards residents={residents} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ResidentsTable
                residents={filteredResidents}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filterType={filterType}
                onFilterChange={setFilterType}
                onAdd={() => setShowAddModal(true)}
                onEdit={setEditingResident}
                onDelete={handleDeleteResident}
              />
            </motion.div>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <AddResidentModal onAdd={handleAddResident} onClose={() => setShowAddModal(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editingResident && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <EditResidentModal
              resident={editingResident}
              onSave={handleEditResident}
              onClose={() => setEditingResident(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            <Toast message={toast.message} type={toast.type} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;