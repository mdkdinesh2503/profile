import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Container } from "@/shared/ui/Container";
import { Card } from "@/shared/ui/Card";
import { getBlogBySlug } from "@/lib/blogs";
import { Prose } from "@/shared/ui/Prose";
import { Reveal } from "@/shared/motion/Reveal";

function formatDate(iso: string) {
  const dt = new Date(iso);
  return new Intl.DateTimeFormat(undefined, { year: "numeric", month: "long", day: "2-digit" }).format(dt);
}

export function BlogDetailPage() {
  const { slug } = useParams();
  const blog = slug ? getBlogBySlug(slug) : null;

  if (!blog) {
    return (
      <section className="pt-12 md:pt-16">
        <Container>
          <Card className="p-6">
            <div className="text-sm font-semibold text-ink">Blog not found</div>
            <p className="mt-2 text-sm text-muted-1">
              This post doesn’t exist yet. Check the blog list.
            </p>
            <div className="mt-5">
              <Link to="/blogs" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                Back to blogs →
              </Link>
            </div>
          </Card>
        </Container>
      </section>
    );
  }

  return (
    <section className="pt-12 md:pt-16">
      <Container>
        <Reveal>
          <div className="max-w-3xl">
            <Link to="/blogs" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              ← Back to blogs
            </Link>
            <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              {blog.title}
            </h1>
            <div className="mt-3 text-sm text-muted-2">{formatDate(blog.date)}</div>
          </div>
        </Reveal>

        <Reveal delay={0.04}>
          <Card className="mt-8 overflow-hidden">
            {blog.image ? (
              <div className="border-b border-line bg-surface-2">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="h-56 w-full object-cover md:h-72"
                  loading="eager"
                />
              </div>
            ) : null}
            <div className="p-6 md:p-8">
              <Prose>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: (props) => (
                      <a {...props} className="font-medium text-brand-700 no-underline hover:underline" />
                    ),
                    pre: (props) => (
                      <pre {...props} className="overflow-x-auto" />
                    ),
                  }}
                >
                  {blog.content}
                </ReactMarkdown>
              </Prose>
            </div>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}