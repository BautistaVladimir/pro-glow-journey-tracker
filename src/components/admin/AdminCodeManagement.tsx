
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { KeyRound, Plus, Shield, Clipboard, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

type AdminCode = {
  id: string;
  code: string;
  is_used: boolean;
  created_at: string;
  used_at: string | null;
  description: string | null;
};

export const AdminCodeManagement = () => {
  const { toast } = useToast();
  const [adminCodes, setAdminCodes] = useState<AdminCode[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [copied, setCopied] = useState(false);
  const [newCode, setNewCode] = useState('');
  
  const fetchAdminCodes = async () => {
    setIsLoading(true);
    try {
      // Use the raw SQL query approach to avoid TypeScript errors
      const { data, error } = await supabase
        .from('admin_codes')
        .select('*')
        .order('created_at', { ascending: false }) as { 
          data: AdminCode[] | null; 
          error: any;
        };
      
      if (error) throw error;
      
      setAdminCodes(data || []);
    } catch (error) {
      console.error('Error fetching admin codes:', error);
      toast({
        title: "Error",
        description: "Failed to load admin codes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchAdminCodes();
  }, []);
  
  const generateNewCode = async () => {
    try {
      // Use the custom RPC function with type assertion
      const { data, error } = await supabase.rpc(
        'generate_admin_code' as any,
        { description: description || null }
      ) as { data: string; error: any };
      
      if (error) throw error;
      
      if (data) {
        setNewCode(data);
        toast({
          title: "Success",
          description: "New admin code generated",
        });
        fetchAdminCodes();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate admin code",
        variant: "destructive",
      });
    }
  };
  
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code).then(
      () => {
        setCopied(true);
        toast({
          title: "Copied!",
          description: "Admin code copied to clipboard",
        });
        setTimeout(() => setCopied(false), 2000);
      },
      () => {
        toast({
          title: "Error",
          description: "Failed to copy code to clipboard",
          variant: "destructive",
        });
      }
    );
  };
  
  const handleDialogOpen = () => {
    setIsDialogOpen(true);
    setNewCode('');
    setDescription('');
  };
  
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };
  
  const handleGenerateCode = () => {
    generateNewCode();
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'MMM d, yyyy h:mm a');
  };
  
  return (
    <Card className="proglo-card">
      <CardHeader className="proglo-card-header flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          <KeyRound className="h-5 w-5 mr-2 text-proglo-purple" />
          Admin Code Management
        </CardTitle>
        <Button 
          onClick={handleDialogOpen} 
          className="bg-proglo-purple hover:bg-proglo-dark-purple"
        >
          <Plus className="h-4 w-4 mr-2" /> Generate New Code
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-proglo-purple border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Used</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {adminCodes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No admin codes found. Generate your first code.
                  </TableCell>
                </TableRow>
              ) : (
                adminCodes.map((code) => (
                  <TableRow key={code.id}>
                    <TableCell>
                      <code className="bg-gray-100 py-1 px-2 rounded text-proglo-purple">
                        {code.code}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        code.is_used 
                          ? 'bg-gray-100 text-gray-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {code.is_used ? 'Used' : 'Available'}
                      </div>
                    </TableCell>
                    <TableCell>{code.description || 'N/A'}</TableCell>
                    <TableCell>{formatDate(code.created_at)}</TableCell>
                    <TableCell>{formatDate(code.used_at)}</TableCell>
                    <TableCell className="text-right">
                      {!code.is_used && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(code.code)}
                          className="h-8 px-2 text-proglo-purple hover:text-proglo-dark-purple"
                        >
                          <Clipboard className="h-4 w-4" />
                          <span className="sr-only">Copy code</span>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-proglo-purple" />
                Generate Admin Code
              </DialogTitle>
              <DialogDescription>
                Create a new admin registration code that can be used once
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Input
                  id="description"
                  placeholder="E.g., For John Smith"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              {newCode && (
                <div className="mt-4">
                  <Label>Your new admin code:</Label>
                  <div className="flex items-center mt-1 gap-2">
                    <div className="bg-gray-100 rounded p-2 flex-1 font-mono text-center border border-gray-300">
                      {newCode}
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(newCode)}
                      className="flex-shrink-0"
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Clipboard className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    This code can only be used once to register an admin account.
                  </p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button 
                variant="outline"
                onClick={handleDialogClose}
              >
                Close
              </Button>
              {!newCode && (
                <Button 
                  onClick={handleGenerateCode}
                  className="bg-proglo-purple hover:bg-proglo-dark-purple"
                >
                  Generate Code
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
