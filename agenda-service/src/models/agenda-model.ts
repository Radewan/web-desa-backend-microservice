import { toUserPayload } from "../../../user-service/src/models/user-model";
import { Comment, Agenda, User } from "@prisma/client";
import { UserPayload } from "./user-model";

export interface AgendaResponse {
  id: number;
  title: string;
  content: string;
  image_path: string;
  location: string;
  date: Date;
  time: Date;
  created_at: Date;
  updated_at: Date;
}

export interface AgendaDetailResponse {
  agenda: AgendaResponse;
  user?: User;
  user_created?: UserPayload;
  comments?: Comment[];
}

export interface Mantap extends AgendaResponse {
  user: User;
  comments: Comment[];
}

export interface AgendaCreateRequest {
  title: string;
  location: string;
  date: Date;
  time: Date;
  content: string;
}

export interface AgendaUpdateRequest {
  title?: string;
  location: string;
  date: Date;
  time: Date;
  content?: string;
}

export const toAgendaDetailResponse = (
  agenda: Mantap
): AgendaDetailResponse => {
  return {
    agenda: {
      id: agenda.id,
      title: agenda.title,
      content: agenda.content,
      image_path: agenda.image_path,
      location: agenda.location,
      date: agenda.date,
      time: agenda.time,
      created_at: agenda.created_at,
      updated_at: agenda.updated_at,
    },
    user_created: toUserPayload(agenda.user!),
    comments: agenda.comments!.map((comment) => ({
      ...comment,
    })),
  };
};

export const toAgendaResponse = (agenda: Agenda): AgendaResponse => {
  return {
    id: agenda.id,
    title: agenda.title,
    content: agenda.content,
    image_path: agenda.image_path,
    location: agenda.location,
    date: agenda.date,
    time: agenda.time,
    created_at: agenda.created_at,
    updated_at: agenda.updated_at,
  };
};

export const toAgendaResponseArray = (agenda: Agenda[]): AgendaResponse[] => {
  return agenda.map((item) => ({
    id: item.id,
    title: item.title,
    content: item.content,
    image_path: item.image_path,
    location: item.location,
    date: item.date,
    time: item.time,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));
};
