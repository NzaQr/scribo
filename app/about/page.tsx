"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="page-shell">
      <Header />

      <main id="main-content" className="flex-1">
        <section className="border-b border-border">
          <div className="container-editorial animate-page-enter max-w-3xl py-16 md:py-20">
            <p className="brand-mark mb-6 text-[clamp(2.5rem,6vw,4rem)] leading-none">
              Scribo
            </p>
            <h1 className="sr-only">About Scribo</h1>
            <p className="max-w-xl font-serif text-[clamp(1.35rem,2.2vw,1.75rem)] leading-snug text-foreground">
              A community publication for builders who care about how software
              feels, reads, and lasts.
            </p>
          </div>
        </section>

        <section className="container-editorial max-w-3xl py-14 md:py-16">
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground measure">
            <p>
              Scribo is a place to publish careful writing about web
              development, design systems, and the craft of shipping product.
              Posts are meant to be read like essays, not scanned like a feed.
            </p>
            <p>
              We keep the surface quiet on purpose: strong typography, honest
              metadata, Markdown that looks the same while you draft and after
              you publish. The goal is fewer distractions between an idea and a
              reader.
            </p>
          </div>

          <div className="mt-14 border-t border-border pt-10">
            <h2 className="font-serif text-2xl font-normal tracking-tight">
              What you will find here
            </h2>
            <ul className="mt-6 space-y-3 text-muted-foreground">
              <li className="border-b border-border pb-3">
                Practical notes on React, Next.js, and TypeScript
              </li>
              <li className="border-b border-border pb-3">
                Design systems, interface craft, and reading experiences
              </li>
              <li className="border-b border-border pb-3">
                Performance, accessibility, and durable product decisions
              </li>
              <li>Community voices on tools and trends that matter</li>
            </ul>
          </div>

          <div className="mt-14">
            <Link href="/blog">
              <Button size="lg">Browse the posts</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
