import React, { useState } from "react";
import { FileBarChart, Download, Calendar, BarChart2, LineChart, Activity, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { AuthUser } from "@/types/auth";

// Define available report types with their descriptions
const reportTypes = [
  { 
    id: "user-activity",
    title: "User Activity Summary",
    description: "Summary of logged activities for all users",
    icon: Activity
  },
  { 
    id: "user-progress",
    title: "User Progress Report",
    description: "Weight and fitness progress tracking for all users",
    icon: LineChart
  },
  { 
    id: "nutrition-summary",
    title: "Nutrition Summary",
    description: "Summary of nutritional data across all users",
    icon: BarChart2
  },
  { 
    id: "user-engagement", 
    title: "User Engagement",
    description: "App usage and engagement metrics",
    icon: Users
  }
];

interface ReportsGenerationProps {
  users: AuthUser[];
}

export const ReportsGeneration = ({ users }: ReportsGenerationProps) => {
  const { toast } = useToast();
  const [reportType, setReportType] = useState<string>(reportTypes[0].id);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: new Date(),
  });

  const handleGenerateReport = () => {
    // In a real app, this would generate and download the actual report
    // Here we're just showing a success message
    const selectedReport = reportTypes.find(r => r.id === reportType);
    
    toast({
      title: "Report Generated",
      description: `${selectedReport?.title} has been generated successfully.`,
    });
    
    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Report Downloaded",
        description: "Your report has been downloaded successfully.",
      });
    }, 1500);
  };

  return (
    <Card className="proglo-card">
      <CardHeader className="proglo-card-header">
        <CardTitle className="flex items-center">
          <FileBarChart className="h-5 w-5 mr-2 text-proglo-purple" />
          Generate Reports
        </CardTitle>
        <CardDescription>
          Create and download reports for user progress and activity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Report Type</label>
            <Select 
              value={reportType}
              onValueChange={setReportType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a report type" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id} className="flex items-center">
                    <div className="flex items-center">
                      <type.icon className="h-4 w-4 mr-2 text-proglo-purple" />
                      {type.title}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="grid w-full gap-1.5">
                <label className="text-xs">From</label>
                <DatePicker
                  date={dateRange.from} 
                  setDate={(date) => 
                    setDateRange(prev => ({ ...prev, from: date }))}
                />
              </div>
              <div className="grid w-full gap-1.5">
                <label className="text-xs">To</label>
                <DatePicker 
                  date={dateRange.to} 
                  setDate={(date) => 
                    setDateRange(prev => ({ ...prev, to: date }))}
                />
              </div>
            </div>
          </div>
          
          {/* Report Preview - In a real implementation, this would show a preview of the report */}
          <Card className="mt-6 border border-dashed border-gray-200 bg-gray-50">
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
              <div className="rounded-full bg-purple-50 p-3 mb-4">
                {(() => {
                  const ReportIcon = reportTypes.find(r => r.id === reportType)?.icon || BarChart2;
                  return <ReportIcon className="h-6 w-6 text-proglo-purple" />;
                })()}
              </div>
              <h3 className="text-lg font-medium text-center text-gray-800">
                {reportTypes.find(r => r.id === reportType)?.title}
              </h3>
              <p className="text-sm text-gray-500 text-center mt-2">
                {reportTypes.find(r => r.id === reportType)?.description}
              </p>
              <p className="text-xs text-gray-400 mt-4">
                {dateRange.from && dateRange.to ? (
                  <>
                    {format(dateRange.from, 'PPP')} - {format(dateRange.to, 'PPP')}
                  </>
                ) : (
                  'Select a date range'
                )}
              </p>
            </CardContent>
          </Card>
          
          <Button 
            onClick={handleGenerateReport} 
            className="w-full bg-proglo-purple hover:bg-proglo-dark-purple"
          >
            <Download className="h-4 w-4 mr-2" />
            Generate & Download Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
