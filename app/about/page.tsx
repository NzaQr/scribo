"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { buttonVariants } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";

const topics = [
  "React, Next.js and TypeScript in production",
  "Design systems and interface details",
  "Performance and accessibility",
  "Tools and workflow, from the people who use them",
];

export default function AboutPage() {
  return (
    <div className="page-shell">
      <Header />

      <main id="main-content" className="flex-1 pb-24">
        <section className="container-editorial animate-page-enter pb-14 pt-20 md:pt-24">
          <h1 className="max-w-[18ch] text-[clamp(2.5rem,1.6rem+3.2vw,4.25rem)] leading-[1.04] tracking-[-0.035em]">
            About Scribo.{" "}
            <span className="text-quiet-foreground">
              A community publication for people who build for the web.
            </span>
          </h1>
        </section>

        <section className="container-editorial flex flex-wrap gap-x-16 gap-y-12 border-t border-border pt-14">
          <div className="min-w-0 flex-[2_1_28rem] space-y-6 font-serif text-[1.1875rem] leading-[1.72] text-reading">
            <p>
              Scribo is a place to publish long posts about web development,
              design systems and how teams ship products. You write in
              Markdown, and readers see the same layout that you see in the
              preview.
            </p>
            <p>
              The interface stays quiet: clear type, dates and read time, and
              comments under each post. You read one post at a time, with no
              feed to scroll.
            </p>
          </div>

          <div className="min-w-0 flex-[1_1_18rem]">
            <h2 className="text-[1.375rem] leading-tight">
              Topics on Scribo
            </h2>
            <ul className="mt-5 rounded-lg border border-border bg-paper px-6 py-1">
              {topics.map((topic) => (
                <li
                  key={topic}
                  className="border-b border-border py-4 text-[0.9375rem] last:border-b-0"
                >
                  {topic}
                </li>
              ))}
            </ul>
            <Link
              href="/blog"
              className={buttonVariants({ size: "lg", className: "mt-8" })}
            >
              Browse the posts
              <Icon icon={ArrowRight02Icon} size={16} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
