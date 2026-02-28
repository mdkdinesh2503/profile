import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { SiteLayout } from "@/shared/layout/SiteLayout";
import { SiteHeader } from "@/shared/layout/SiteHeader";
import { HomePage } from "@/pages/HomePage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { ProjectDetailPage } from "@/pages/ProjectDetailPage";
import { ExperiencePage } from "@/pages/ExperiencePage";
import { BlogsPage } from "@/pages/BlogsPage";
import { BlogDetailPage } from "@/pages/BlogDetailPage";
import { ResumePage } from "@/pages/ResumePage";
import { ContactPage } from "@/pages/ContactPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { PageTransition } from "@/shared/motion/PageTransition";
import { SiteFooter } from "@/shared/layout/SiteFooter";

export function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route element={<SiteLayout />}>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />
          <Route
            path="/projects"
            element={
              <PageTransition>
                <ProjectsPage />
              </PageTransition>
            }
          />
          <Route
            path="/projects/:slug"
            element={
              <PageTransition>
                <ProjectDetailPage />
              </PageTransition>
            }
          />
          <Route
            path="/experience"
            element={
              <PageTransition>
                <ExperiencePage />
              </PageTransition>
            }
          />
          <Route
            path="/blogs"
            element={
              <PageTransition>
                <BlogsPage />
              </PageTransition>
            }
          />
          <Route
            path="/blogs/:slug"
            element={
              <PageTransition>
                <BlogDetailPage />
              </PageTransition>
            }
          />
          <Route
            path="/resume"
            element={
              <PageTransition>
                <ResumePage />
              </PageTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransition>
                <ContactPage />
              </PageTransition>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <div className="flex h-dvh flex-col overflow-hidden">
              <SiteHeader />
              <main className="min-h-0 flex-1 flex flex-col overflow-hidden">
                <PageTransition>
                  <NotFoundPage />
                </PageTransition>
              </main>
              <SiteFooter />
            </div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}