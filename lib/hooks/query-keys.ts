export const queryKeys = {
  posts: ["posts"] as const,
  post: (id: string) => ["posts", id] as const,
  userPosts: (userId: string) => ["posts", "user", userId] as const,
} as const;
