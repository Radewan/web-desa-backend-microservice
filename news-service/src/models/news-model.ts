import { toUserPayload } from "./../../../user-service/src/models/user-model";
import { Comment, News, User } from "@prisma/client";
import { UserPayload } from "./user-model";

export interface NewsResponse {
  id: number;
  title: string;
  content: string;
  image_path: string;
  created_at: Date;
  updated_at: Date;
}

export interface NewsDetailResponse {
  news: NewsResponse;
  user?: User;
  user_maked?: UserPayload;
  comments?: Comment[];
}

export interface Mantap extends NewsResponse {
  user: User;
  comments: Comment[];
}

export interface NewsCreateRequest {
  title: string;
  content: string;
}

export interface NewsUpdateRequest {
  title?: string;
  content?: string;
}

export const toNewsDetailResponse = (news: Mantap): NewsDetailResponse => {
  return {
    news: {
      id: news.id,
      title: news.title,
      content: news.content,
      image_path: news.image_path,
      created_at: news.created_at,
      updated_at: news.updated_at,
    },
    user_maked: toUserPayload(news.user!),
    comments: news.comments!.map((comment) => ({
      ...comment,
    })),
  };
};

export const toNewsResponse = (news: News): NewsResponse => {
  return {
    id: news.id,
    title: news.title,
    content: news.content,
    image_path: news.image_path,
    created_at: news.created_at,
    updated_at: news.updated_at,
  };
};

export const toNewsResponseArray = (news: News[]): NewsResponse[] => {
  return news.map((item) => ({
    id: item.id,
    title: item.title,
    content: item.content,
    image_path: item.image_path,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));
};
