export interface RegisterParams {
  displayName: string;
  email: string;
  password: string;
  file: File | null;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface User {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export interface IUser {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
}

interface IAttachments {
  type: string;
  data: string[];
}

export interface IMessage {
  id: string;
  message: string;
  timestamp: string;
  userId: string;
  attachments: IAttachments;
}

type ChatStatus = "active" | "deleted";
interface ILastMessage {
  text: string;
  user: string;
}

export interface IChat {
  id: string;
  participants: string[];
  status: ChatStatus;
  lastMessage: ILastMessage;
}

export interface IConversation {
  id: string;
  participants: string[];
  status: ChatStatus;
  lastMessage: ILastMessage;
  timestamp: string;
}
