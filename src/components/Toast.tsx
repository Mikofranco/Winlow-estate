import { CheckCircle, AlertCircle } from "lucide-react"

interface ToastProps {
  message: string
  type: "success" | "error"
}

export function Toast({ message, type }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg ${
          type === "success"
            ? "bg-green-50 text-green-800 border border-green-200"
            : "bg-red-50 text-red-800 border border-red-200"
        }`}
      >
        {type === "success" ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
        <span className="font-medium">{message}</span>
      </div>
    </div>
  )}