
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AnpalDetail from "./pages/AnpalDetail";
import MontaSmontaDetail from "./pages/MontaSmontaDetail";
import LinuxDetail from "./pages/LinuxDetail";
import NonniSmartDetail from "./pages/NonniSmartDetail"; // Import the new project page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HashRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects/ust" element={<AnpalDetail />} />
          <Route path="/projects/monta-smonta" element={<MontaSmontaDetail />} />
          <Route path="/projects/linux" element={<LinuxDetail />} />
          <Route path="/projects/nonni-smart" element={<NonniSmartDetail />} /> {/* Add route for Nonni Smart */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </HashRouter>
  </QueryClientProvider>
);

export default App;

