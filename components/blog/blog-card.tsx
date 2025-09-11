"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/lib/api";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const animationClass =
    index === 0
      ? "animate-stagger-1"
      : index === 1
      ? "animate-stagger-2"
      : "animate-stagger-3";

  const readTime = post.content && Math.ceil(post.content.length / 200);
  return (
    <div className={animationClass}>
      <Card hover className="h-full">
        <CardHeader>
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
          <CardDescription className="line-clamp-3">
            {post.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-between">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <span>By {post.author.username}</span>
            <span>
              {new Date(post.createdAt).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center justify-between">
            {readTime && (
              <span className="text-sm text-muted-foreground">
                {readTime} min read
              </span>
            )}
            <Link href={`/blog/${post.id}`}>
              <Button
                variant="ghost"
                size="sm"
                className="text-foreground cursor-pointer transition-colors"
              >
                Read more →
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
