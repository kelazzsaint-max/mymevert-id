"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const faqs = [
  {
    question: "Is MYMevert free?",
    answer:
      "Yes, all features are 100% free with no hidden charges. YouTube → MP4, Local → MP3, and YouTube → MP3 are all available at no cost.",
  },
  {
    question: "Do I need an account?",
    answer:
      "No. MYMevert works instantly without registration or login. Just paste a link or upload a file.",
  },
  {
    question: "What platforms are supported?",
    answer:
      "Currently we support YouTube for all conversion modes. More platforms will be added in the future.",
  },
  {
    question: "What are the 3 conversion modes?",
    answer:
      "1. YouTube → MP4 — Download YouTube videos as MP4 files. 2. Local → MP3 — Upload your local video and convert to MP3. 3. YouTube → MP3 — Download audio directly from YouTube links.",
  },
  {
    question: "Can I convert local video files to MP3?",
    answer:
      "Yes! Our Local → MP3 mode lets you upload MP4 or other video files and convert them to high-quality MP3 audio.",
  },
  {
    question: "What video qualities are available?",
    answer:
      "You can choose from 360p, 480p, 720p HD, and 1080p Full HD for YouTube → MP4 downloads.",
  },
];

export function FAQ() {
  useScrollReveal();
  return (
    <section id="faq" className="py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-4">
        <div className="reveal text-center mb-10 md:mb-14">
          <span
            className="badge mb-4"
            style={{
              background: "rgba(0,229,160,0.10)",
              border: "1px solid rgba(0,229,160,0.25)",
              color: "var(--accent-green)",
            }}
          >
            FAQ
          </span>

          <h2
            className="text-3xl font-bold md:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span style={{ color: "var(--text-primary)" }}>Frequently Asked </span>
            <span className="gradient-text">Questions</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
            Got questions? We have answers. Here are the most common ones.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="rounded-2xl border-0"
            >
              <AccordionTrigger
                className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-medium outline-none min-h-12 md:min-h-13 md:px-6 md:py-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                <span
                  className="font-semibold text-base pr-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pt-0 pb-4 md:px-6 md:pt-0 md:pb-5">
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}