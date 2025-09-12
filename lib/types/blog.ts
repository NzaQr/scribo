export interface BlogPost {
  _id: string;
  title: string;
  description: string;
  content: string;
  author: {
    _id: string;
    username: string;
    email: string;
  };
  likes: number;
  comments: Comment[];
  userLiked: boolean;
  createdAt: Date;
  tags: string[];
}

export interface Comment {
  user: string;
  username: string;
  comment: string;
  _id: string;
}

export type CreatePostData = Omit<BlogPost, "_id">;
export type UpdatePostData = Partial<BlogPost>;

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
}
