import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"
import { Resident } from "@/pages/Dashboard"
import AppButton from "./AppButton"

interface AddResidentModalProps {
  onAdd: (resident: Omit<Resident, "id">) => void
  onClose: () => void
}

export function AddResidentModal({ onAdd, onClose }: AddResidentModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    houseNumber: "",
    accessType: "Resident" as const,
    lastVisit: new Date().toISOString(),
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }
    if (!formData.houseNumber.trim()) {
      newErrors.houseNumber = "House number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    onAdd(formData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Add Resident</h2>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-md transition-colors">
            <X size={20} className="text-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Name</label>
            <Input
              type="text"
              placeholder="John Smith"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">House Number</label>
            <Input
              type="text"
              placeholder="101"
              value={formData.houseNumber}
              onChange={(e) => setFormData({ ...formData, houseNumber: e.target.value })}
              className={errors.houseNumber ? "border-destructive" : ""}
            />
            {errors.houseNumber && <p className="text-destructive text-sm mt-1">{errors.houseNumber}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Access Type</label>
            <Select
              value={formData.accessType}
              onValueChange={(value) =>
                setFormData({
                  ...formData,//@ts-ignore
                  accessType: value as "Resident" | "Visitor" | "Staff",
                })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Resident">Resident</SelectItem>
                <SelectItem value="Visitor">Visitor</SelectItem>
                <SelectItem value="Staff">Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <AppButton type="submit" className="flex-1">
              Add Resident
            </AppButton>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
