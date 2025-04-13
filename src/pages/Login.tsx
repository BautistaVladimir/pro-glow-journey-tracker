
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, User, Mail, Lock } from 'lucide-react';

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

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-purple-100 shadow-lg animate-fade-in proglo-card">
        <CardHeader className="space-y-2 text-center proglo-card-header">
          <div className="mx-auto w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center mb-2">
            <LogIn className="h-10 w-10 text-proglo-purple" />
          </div>
          <CardTitle className="text-2xl proglo-gradient-text">Welcome Back</CardTitle>
          <CardDescription className="text-gray-600">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                        placeholder="your.email@example.com" 
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
              <Button 
                type="submit" 
                className="w-full bg-proglo-purple hover:bg-proglo-dark-purple" 
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Log in'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 bg-gray-50 border-t border-purple-100 rounded-b-xl">
          <div className="text-center text-sm">
            Don't have an account? <Link to="/register" className="text-proglo-purple font-medium hover:underline">Register</Link>
          </div>
          <div className="text-center text-sm">
            <Link to="/admin-login" className="text-gray-500 hover:text-proglo-purple hover:underline flex items-center justify-center">
              <User className="h-3 w-3 mr-1" />
              Admin Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
