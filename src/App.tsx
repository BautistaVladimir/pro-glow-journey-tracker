
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Pages
import Dashboard from "./pages/Dashboard";
import BMI from "./pages/BMI";
import Activities from "./pages/Activities";
import Nutrition from "./pages/Nutrition";
import Sleep from "./pages/Sleep";
import Goals from "./pages/Goals";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Layout components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// Dummy user data (would be replaced with actual authentication)
const dummyUser = {
  id: '1',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  avatar: null,
  height: 175, // cm
  weight: 70, // kg
  gender: 'not specified',
  age: 30,
};

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState(dummyUser);
  
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar user={user} />
            <main className="flex-grow px-4 py-8 md:px-8 max-w-7xl mx-auto w-full">
              <Routes>
                <Route path="/" element={<Dashboard user={user} />} />
                <Route path="/bmi" element={<BMI user={user} setUser={setUser} />} />
                <Route path="/activities" element={<Activities user={user} />} />
                <Route path="/nutrition" element={<Nutrition user={user} />} />
                <Route path="/sleep" element={<Sleep user={user} />} />
                <Route path="/goals" element={<Goals user={user} />} />
                <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
