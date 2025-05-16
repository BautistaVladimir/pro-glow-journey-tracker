
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, Users, Activity, LineChart, Award, ChevronUp, ChevronDown, UserCog, Settings, KeyRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { UserManagement } from "@/components/admin/UserManagement";
import { ReportsGeneration } from "@/components/admin/ReportsGeneration";
import { AdminCodeManagement } from "@/components/admin/AdminCodeManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  const { user, users, addUser, deleteUser, updateUser } = useAuth();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-100 shadow-sm animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight proglo-gradient-text">Admin Dashboard</h2>
            <p className="text-gray-600 mt-1">
              Welcome back, {user?.name}
            </p>
          </div>
          <Badge className="bg-proglo-purple hover:bg-proglo-dark-purple">
            <Shield className="h-3.5 w-3.5 mr-1" />
            Administrator
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="proglo-card stagger-animate-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-proglo-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-proglo-purple">{users.length}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ChevronUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+0%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="proglo-card stagger-animate-1" style={{ animationDelay: "0.1s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-proglo-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-proglo-purple">{users.length}</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ChevronUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+0%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="proglo-card stagger-animate-1" style={{ animationDelay: "0.2s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activities Logged</CardTitle>
            <Activity className="h-4 w-4 text-proglo-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-proglo-purple">12</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ChevronUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+20%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="proglo-card stagger-animate-1" style={{ animationDelay: "0.3s" }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals Set</CardTitle>
            <Award className="h-4 w-4 text-proglo-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-proglo-purple">6</div>
            <p className="text-xs text-muted-foreground flex items-center mt-1">
              <ChevronUp className="h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+50%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="users" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            User Management
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center">
            <LineChart className="h-4 w-4 mr-2" />
            Reports
          </TabsTrigger>
          <TabsTrigger value="admin-codes" className="flex items-center">
            <KeyRound className="h-4 w-4 mr-2" />
            Admin Codes
          </TabsTrigger>
          <TabsTrigger value="admin-info" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Admin Info
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4">
          <UserManagement 
            users={users} 
            onAddUser={addUser}
            onDeleteUser={deleteUser}
            onUpdateUser={updateUser}
          />
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4">
          <ReportsGeneration users={users} />
        </TabsContent>
        
        <TabsContent value="admin-codes" className="space-y-4">
          <AdminCodeManagement />
        </TabsContent>
        
        <TabsContent value="admin-info" className="space-y-4 grid md:grid-cols-2 gap-4">
          <Card className="proglo-card stagger-animate-2">
            <CardHeader className="proglo-card-header">
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-proglo-purple" />
                Admin Access
              </CardTitle>
              <CardDescription>
                This section is only accessible to administrators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="h-20 w-20 rounded-full bg-purple-50 flex items-center justify-center border-4 border-purple-100">
                    <Shield className="h-12 w-12 text-proglo-purple" />
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-proglo-purple">Administrator Access Granted</h3>
                  <p className="mt-2 text-gray-600">
                    You have full administrator privileges to manage the Pro-Glo application
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="proglo-card stagger-animate-2" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="proglo-card-header">
              <CardTitle className="flex items-center">
                <UserCog className="h-5 w-5 mr-2 text-proglo-purple" />
                Admin ID
              </CardTitle>
              <CardDescription>
                Your administrator identification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg border border-purple-100">
                  <div className="font-medium">ID:</div>
                  <div>{user?.id || "N/A"}</div>
                </div>
                <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg border border-purple-100">
                  <div className="font-medium">Name:</div>
                  <div>{user?.name || "N/A"}</div>
                </div>
                <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg border border-purple-100">
                  <div className="font-medium">Email:</div>
                  <div>{user?.email || "N/A"}</div>
                </div>
                <div className="flex items-center justify-between bg-purple-50 p-3 rounded-lg border border-purple-100">
                  <div className="font-medium">Role:</div>
                  <Badge className="bg-proglo-purple text-white">
                    Administrator
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
