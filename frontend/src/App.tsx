import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Analyser from "./pages/Analyser";
import Generator from "./pages/Generator";
import Playground from "./pages/Playground";
import Learn from "./pages/Learn";
import Resourses from "./pages/Resources";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Feed from "./pages/Feed";
import Chatbot from "./components/chatbot";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/analyser" element={<Analyser />} />
          <Route path="/generator" element={<Generator />} />
          <Route path="/playground" element={<Playground />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/resources" element={<Resourses />} />
          <Route path="/login" element={<Login />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
