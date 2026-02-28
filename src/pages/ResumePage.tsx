import { Container } from "@/shared/ui/Container";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { Card } from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";
import { profile } from "@/data/profile";
import { headings } from "@/data/headings";

export function ResumePage() {
  return (
    <section className="pt-12 md:pt-16">
      <Container>
        <SectionHeading
          eyebrow={headings.resume.eyebrow}
          title={headings.resume.title}
          description={headings.resume.description}
        />

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a href={profile.resume.pdfSrc} download>
            <Button variant="primary">Download PDF</Button>
          </a>
          <a href={profile.resume.pdfSrc} target="_blank" rel="noreferrer">
            <Button variant="secondary">Open in new tab</Button>
          </a>
        </div>

        <Card className="mt-8 overflow-hidden">
          <div className="border-b border-line bg-surface-2 px-5 py-3 text-sm text-muted-1">
            Preview
          </div>
          <div className="h-[75vh] bg-paper">
            <iframe
              title={profile.resume.pdfTitle}
              src={profile.resume.pdfSrc}
              className="h-full w-full"
            />
          </div>
        </Card>
      </Container>
    </section>
  );
}