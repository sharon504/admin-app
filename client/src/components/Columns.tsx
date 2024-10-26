import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserRoles = {
  id: string;
  username: string;
  email: string;
  role: string; //TODO: fetch and add roles here
};

export type RolePermissions = {
  id: string;
  role: string; //TODO: Fetch and add roles here
  permission: string; //TODO: Fetch and add permissions here
};

export const columnsUserRoles: ColumnDef<UserRoles>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "username", header: "Username" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
];

export const columnsRolePermissions: ColumnDef<RolePermissions>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "permission", header: "Permission" },
];
