import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

import { SidebarMenuButton } from "@/components/ui/sidebar";

import { ChevronsUpDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const Dropdownmenu = () => {
  const { user, updateUser } = useAuth();
  const currentRole = user.currentRole;
  const [role, setRole] = useState(currentRole);
  useEffect(() => {
    user.currentRole = role;
    updateUser(user);
  }, [role, user, updateUser]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <SidebarMenuButton>
            {role}
            <ChevronsUpDown className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          className="w-[--radix-popper-anchor-width]"
        >
          <DropdownMenuLabel>Roles </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={role} onValueChange={setRole}>
            {user?.roles.map((role) => (
              <DropdownMenuRadioItem key={role.id} value={role.name}>
                {role.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Dropdownmenu;
