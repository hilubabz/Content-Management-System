import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, Pencil, X } from "lucide-react";

export function DropDownComponent({ id }: { id: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Pencil />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto" align="start">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <div className="flex items-center gap-2 text-green-900 text-[15px]">
              <Check color="green" /> Approve
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center gap-2 text-red-600 text-[15px]">
              <X color="red" /> Reject
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
