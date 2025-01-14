import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@/typescript/types";
import UsersTableAction from "./UsersTableAction";

interface UsersTableProps {
  users: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <Table className="border border-collapse">
      <TableHeader>
        <TableRow>
          <TableHead className="border">Name</TableHead>
          <TableHead className="border">Email</TableHead>
          <TableHead className="border">Phone</TableHead>
          <TableHead className="border">Gender</TableHead>
          <TableHead className="border">Role</TableHead>
          <TableHead className="border">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users && users.length > 0 ? (
          users.map((user: User) => (
            <TableRow key={user._id}>
              <TableCell className="border">{user.name}</TableCell>
              <TableCell className="border">{user.email}</TableCell>
              <TableCell className="border">{user.phone}</TableCell>
              <TableCell className="border">{user.gender}</TableCell>
              <TableCell className="border">{user.role}</TableCell>
              <TableCell className="flex gap-4">
                <UsersTableAction id={user._id} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan={7}
              className="text-center"
            >
              No users found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
