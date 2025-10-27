import { Button, ButtonProps } from "@/components/ui/button";
import { Plus, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <Button
      className={cn("gap-2 font-sans bg-blue-700 hover:bg-blue-600", className)}
      onClick={onClick}
      type={type}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {text}
    </Button>
  );
};

export default AppButton;