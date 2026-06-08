import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import ClassPage from "./pages/ClassPage.tsx";
import ClassSectionPage from "./pages/ClassSectionPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import GuidesPage from "./pages/GuidesPage.tsx";
import ClassesPagee from "./pages/ClassesPagee.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import MapPositionPage from "./pages/MapPositionPage.tsx";
import GuideDetailPage from "./pages/GuideDetailPage.tsx";
import NewGuidePage from "./pages/NewGuidePage.tsx";
import MetaPage from "./pages/MetaPage.tsx";
import { ScrollToTop } from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/About" element={<Navigate to="/about" replace />} />
            <Route path="/classes" element={<ClassesPagee />} />
            <Route path="/meta" element={<MetaPage />} />
            <Route path="/guides" element={<GuidesPage />} />
            <Route path="/guides/new" element={<NewGuidePage />} />
            <Route path="/guides/:guideId" element={<GuideDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/class/:id" element={<ClassPage />} />
            <Route path="/class/:id/section/positioning/map/:mapId" element={<MapPositionPage />} />
            <Route path="/class/:id/section/:section" element={<ClassSectionPage />} />
            <Route path="/class/:id/guides" element={<GuidesPage />} />
            <Route path="/class/:id/classes" element={<ClassesPagee />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
