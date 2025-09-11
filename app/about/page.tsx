"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-20 px-4 flex justify-center">
          <div className="container mx-auto text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 fade-in">
              About <span className="text-primary">Scribo</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto fade-in-delay-1">
              We are passionate about sharing knowledge and creating meaningful
              content about web development and design.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 flex justify-center">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="slide-in-left">
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-muted-foreground mb-6">
                  At Scribo, we believe in the power of sharing knowledge. Our
                  mission is to create a space where developers and designers
                  can find valuable insights, learn new techniques, and stay
                  updated with the latest trends in technology.
                </p>
                <p className="text-muted-foreground">
                  We focus on creating high-quality content that is both
                  educational and practical, helping our readers grow in their
                  professional journey.
                </p>
              </div>

              <div className="bg-muted/30 p-8 rounded-lg slide-in-right">
                <h3 className="text-2xl font-bold mb-4">What We Cover</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li>• Web Development with React and Next.js</li>
                  <li>• Modern CSS and Design Systems</li>
                  <li>• TypeScript Best Practices</li>
                  <li>• Performance Optimization</li>
                  <li>• UI/UX Design Principles</li>
                  <li>• Latest Technology Trends</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 bg-muted/30 flex justify-center">
          <div className="container mx-auto max-w-2xl text-center">
            <div className="fade-in-delay-4">
              <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
              <p className="text-muted-foreground mb-8">
                Ready to start your learning journey with us? Explore our
                articles and join thousands of developers who trust Scribo for
                quality content.
              </p>
              <Link href="/blog">
                <Button size="lg">Start Reading</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
