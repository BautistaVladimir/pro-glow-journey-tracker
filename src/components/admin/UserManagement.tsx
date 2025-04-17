
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil, Trash, UserPlus, Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthUser, UserRole } from "@/contexts/AuthContext";

interface UserManagementProps {
  users: AuthUser[];
  onAddUser: (name: string, email: string, password: string, role: UserRole) => void;
  onDeleteUser: (userId: string) => void;
  onUpdateUser: (userId: string, userData: Partial<AuthUser>) => void;
}

type FormMode = 'add' | 'edit';

interface FormData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

const defaultFormData: FormData = {
  name: "",
  email: "",
  password: "",
  role: "user",
};

export const UserManagement = ({
  users,
  onAddUser,
  onDeleteUser,
  onUpdateUser,
}: UserManagementProps) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>('add');
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<AuthUser | null>(null);

  const resetForm = () => {
    setFormData(defaultFormData);
    setCurrentUserId(null);
  };

  const handleOpenAddDialog = () => {
    setFormMode('add');
    resetForm();
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (user: AuthUser) => {
    setFormMode('edit');
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setCurrentUserId(user.id);
    setIsDialogOpen(true);
  };

  const handleOpenDeleteDialog = (user: AuthUser) => {
    setUserToDelete(user);
    setDeleteConfirmOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value as UserRole }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formMode === 'add') {
      onAddUser(formData.name, formData.email, formData.password, formData.role);
      toast({
        title: "User Added",
        description: `${formData.name} has been added successfully`,
      });
    } else {
      if (!currentUserId) return;
      
      const updateData: Partial<AuthUser> = {
        name: formData.name,
        role: formData.role,
      };
      
      onUpdateUser(currentUserId, updateData);
      toast({
        title: "User Updated",
        description: `${formData.name} has been updated successfully`,
      });
    }
    
    handleCloseDialog();
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      onDeleteUser(userToDelete.id);
      toast({
        title: "User Deleted",
        description: `${userToDelete.name} has been removed successfully`,
      });
      setDeleteConfirmOpen(false);
      setUserToDelete(null);
    }
  };

  return (
    <Card className="proglo-card">
      <CardHeader className="proglo-card-header flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-proglo-purple" />
          User Management
        </CardTitle>
        <Button 
          onClick={handleOpenAddDialog} 
          className="bg-proglo-purple hover:bg-proglo-dark-purple"
        >
          <UserPlus className="h-4 w-4 mr-2" /> Add User
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className={user.role === 'admin' ? "bg-proglo-purple" : "bg-gray-500"}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="icon"
                      className="mr-2"
                      onClick={() => handleOpenEditDialog(user)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleOpenDeleteDialog(user)}
                    >
                      <Trash className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Add/Edit User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {formMode === 'add' ? 'Add New User' : 'Edit User'}
            </DialogTitle>
            <DialogDescription>
              {formMode === 'add'
                ? 'Create a new user account'
                : 'Update user information'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                  disabled={formMode === 'edit'}
                />
              </div>
              {formMode === 'add' && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="col-span-3"
                    required={formMode === 'add'}
                  />
                </div>
              )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select
                  value={formData.role}
                  onValueChange={handleRoleChange}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-proglo-purple hover:bg-proglo-dark-purple"
              >
                {formMode === 'add' ? 'Add User' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {userToDelete?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
