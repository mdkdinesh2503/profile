import { Suspense, lazy, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import { SiteLayout } from "@/shared/layout/SiteLayout";
import { SiteHeader } from "@/shared/layout/SiteHeader";
import { SiteFooter } from "@/shared/layout/SiteFooter";
import { PageTransition } from "@/shared/motion/PageTransition";

const HomePage = lazy(() => import("@/pages/HomePage").then((m) => ({ default: m.HomePage })));
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage").then((m) => ({ default: m.ProjectsPage })));
const ProjectDetailPage = lazy(() => import("@/pages/ProjectDetailPage").then((m) => ({ default: m.ProjectDetailPage })));
const ExperiencePage = lazy(() => import("@/pages/ExperiencePage").then((m) => ({ default: m.ExperiencePage })));
const BlogsPage = lazy(() => import("@/pages/BlogsPage").then((m) => ({ default: m.BlogsPage })));
const BlogDetailPage = lazy(() => import("@/pages/BlogDetailPage").then((m) => ({ default: m.BlogDetailPage })));
const ResumePage = lazy(() => import("@/pages/ResumePage").then((m) => ({ default: m.ResumePage })));
const ContactPage = lazy(() => import("@/pages/ContactPage").then((m) => ({ default: m.ContactPage })));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));

function PageFallback() {
  return (
    <PageTransition>
      <div className="min-h-[60vh] flex items-center justify-center" aria-busy="true" aria-label="Loading">
        <div className="h-8 w-8 animate-pulse rounded-full bg-primary/20" />
      </div>
    </PageTransition>
  );
}

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
              <Suspense fallback={<PageFallback />}>
                <PageTransition>
                  <HomePage />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/projects"
            element={
              <Suspense fallback={<PageFallback />}>
                <PageTransition>
                  <ProjectsPage />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/projects/:slug"
            element={
              <Suspense fallback={<PageFallback />}>
                <PageTransition>
                  <ProjectDetailPage />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/experience"
            element={
              <Suspense fallback={<PageFallback />}>
                <PageTransition>
                  <ExperiencePage />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/blogs"
            element={
              <Suspense fallback={<PageFallback />}>
                <PageTransition>
                  <BlogsPage />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/blogs/:slug"
            element={
              <Suspense fallback={<PageFallback />}>
                <PageTransition>
                  <BlogDetailPage />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/resume"
            element={
              <Suspense fallback={<PageFallback />}>
                <PageTransition>
                  <ResumePage />
                </PageTransition>
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<PageFallback />}>
                <PageTransition>
                  <ContactPage />
                </PageTransition>
              </Suspense>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <div className="flex h-dvh flex-col overflow-hidden">
              <SiteHeader />
              <main className="min-h-0 flex-1 flex flex-col overflow-hidden">
                <Suspense fallback={<PageFallback />}>
                  <PageTransition>
                    <NotFoundPage />
                  </PageTransition>
                </Suspense>
              </main>
              <SiteFooter />
            </div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
