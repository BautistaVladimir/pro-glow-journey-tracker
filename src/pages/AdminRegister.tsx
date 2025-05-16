
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, User, Mail, Lock, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

const adminRegisterSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(8, { message: 'Admin password must be at least 8 characters' }),
  confirmPassword: z.string(),
  adminCode: z.string().min(5, { message: 'Admin code is required' }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type AdminRegisterFormValues = z.infer<typeof adminRegisterSchema>;

const AdminRegister = () => {
  const { register } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [codeVerified, setCodeVerified] = useState<boolean | null>(null);

  const form = useForm<AdminRegisterFormValues>({
    resolver: zodResolver(adminRegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      adminCode: '',
    },
  });

  // Verify admin code without submitting the form
  const verifyAdminCode = async (code: string) => {
    if (code.length < 5) return;
    
    try {
      const { data, error } = await supabase.rpc('verify_admin_code', { input_code: code });
      
      if (error) throw error;
      
      setCodeVerified(data);
      
      if (data) {
        toast({
          title: "Admin code verified",
          description: "The admin code is valid. You can continue with registration.",
        });
      } else {
        toast({
          title: "Invalid admin code",
          description: "The admin code is invalid or has already been used.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error verifying admin code:', error);
      setCodeVerified(false);
    }
  };

  const onSubmit = async (data: AdminRegisterFormValues) => {
    setIsLoading(true);
    
    try {
      // Verify the admin code again during submission
      const { data: isValid, error: verifyError } = await supabase.rpc(
        'verify_admin_code', 
        { input_code: data.adminCode }
      );
      
      if (verifyError) throw verifyError;
      
      if (!isValid) {
        toast({
          title: "Invalid admin code",
          description: "The code is invalid or has already been used.",
          variant: "destructive"
        });
        return;
      }
      
      await register(data.name, data.email, data.password, 'admin');
      
      toast({
        title: "Admin account created",
        description: "Your administrator account has been created successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "There was a problem creating your admin account.",
        variant: "destructive"
      });
      console.error('Admin registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-purple-100 shadow-lg animate-fade-in proglo-card">
        <CardHeader className="space-y-2 text-center proglo-card-header">
          <div className="mx-auto w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center mb-2">
            <Shield className="h-10 w-10 text-proglo-purple" />
          </div>
          <CardTitle className="text-2xl proglo-gradient-text">Admin Registration</CardTitle>
          <CardDescription className="text-gray-600">Create an administrator account</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-gray-700">
                      <User className="h-4 w-4 mr-2 text-proglo-purple" />
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Admin Name" 
                        className="border-purple-100 focus:border-proglo-purple focus:ring-proglo-purple/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-gray-700">
                      <Mail className="h-4 w-4 mr-2 text-proglo-purple" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="admin@example.com" 
                        className="border-purple-100 focus:border-proglo-purple focus:ring-proglo-purple/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-gray-700">
                      <Lock className="h-4 w-4 mr-2 text-proglo-purple" />
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="border-purple-100 focus:border-proglo-purple focus:ring-proglo-purple/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-gray-700">
                      <Lock className="h-4 w-4 mr-2 text-proglo-purple" />
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="••••••••" 
                        className="border-purple-100 focus:border-proglo-purple focus:ring-proglo-purple/20"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="adminCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center text-gray-700">
                      <Key className="h-4 w-4 mr-2 text-proglo-purple" />
                      Admin Code
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="text" 
                        placeholder="Enter admin code" 
                        className={`border-purple-100 focus:border-proglo-purple focus:ring-proglo-purple/20 
                          ${codeVerified === true ? 'border-green-500' : 
                          codeVerified === false ? 'border-red-500' : ''}`}
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          if (e.target.value.length >= 5) {
                            verifyAdminCode(e.target.value);
                          } else {
                            setCodeVerified(null);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full bg-proglo-purple hover:bg-proglo-dark-purple" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating admin account...' : 'Create Admin Account'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center bg-gray-50 border-t border-purple-100 rounded-b-xl">
          <div className="text-center text-sm">
            <Link to="/admin-login" className="text-proglo-purple font-medium hover:underline flex items-center justify-center">
              <Shield className="h-3 w-3 mr-1" />
              Back to Admin Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminRegister;
