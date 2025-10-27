import { Resident } from "@/pages/Dashboard"
import { Users, UserCheck, UserCog, Clock } from "lucide-react"

interface DashboardCardsProps {
  residents: Resident[]
}

export function DashboardCards({ residents }: DashboardCardsProps) {
  const totalResidents = residents.filter((r) => r.accessType === "Resident").length
  const totalVisitors = residents.filter((r) => r.accessType === "Visitor").length
  const totalStaff = residents.filter((r) => r.accessType === "Staff").length
  const totalAccess = residents.length

  const cards = [
    {
      title: "Total Access",
      value: totalAccess,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      title: "Residents",
      value: totalResidents,
      icon: UserCheck,
      color: "bg-green-50 text-green-600",
      borderColor: "border-green-200",
    },
    {
      title: "Visitors",
      value: totalVisitors,
      icon: Clock,
      color: "bg-amber-50 text-amber-600",
      borderColor: "border-amber-200",
    },
    {
      title: "Staff",
      value: totalStaff,
      icon: UserCog,
      color: "bg-purple-50 text-purple-600",
      borderColor: "border-purple-200",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.title}
            className={`bg-white rounded-lg border ${card.borderColor} p-6 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-foreground">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
