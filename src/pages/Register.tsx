
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Lock, UserPlus, Heart } from 'lucide-react';

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

const registerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    try {
      await register(data.name, data.email, data.password, 'user');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-12rem)] bg-gradient-to-b from-purple-50 to-white flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border-purple-200 shadow-xl animate-fade-in fitness-card">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-proglo-purple to-purple-400"></div>
        <CardHeader className="space-y-4 text-center pb-6">
          <div className="mx-auto w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center mb-2 border-2 border-purple-200">
            <Heart className="h-8 w-8 text-proglo-purple" strokeWidth={2.5} />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-800">Start Your Journey</CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Create an account to track your fitness progress
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-2 px-8">
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
                        placeholder="Your Name" 
                        className="border-purple-100 focus:border-proglo-purple focus:ring-proglo-purple/20 h-11"
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
                        placeholder="your.email@example.com" 
                        className="border-purple-100 focus:border-proglo-purple focus:ring-proglo-purple/20 h-11"
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
                        className="border-purple-100 focus:border-proglo-purple focus:ring-proglo-purple/20 h-11"
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
                        className="border-purple-100 focus:border-proglo-purple focus:ring-proglo-purple/20 h-11"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="mt-2 p-3 bg-purple-50 rounded-md border border-purple-100">
                <p className="text-sm text-gray-600">
                  By registering, you'll unlock personalized fitness tracking, nutrition insights, and goal setting.
                </p>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-proglo-purple to-purple-600 hover:from-proglo-dark-purple hover:to-purple-700 h-11 font-medium mt-2" 
                disabled={isLoading}
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center bg-gray-50 border-t border-purple-100 rounded-b-xl p-8">
          <div className="text-center text-sm">
            Already have an account? <Link to="/login" className="text-proglo-purple font-medium hover:underline">Log in</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
