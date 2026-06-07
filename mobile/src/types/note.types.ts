export interface Note {
  _id: string;

  title: string;

  content: string;

  summary?: string;

  fileUrl?: string;

  createdAt: string;
}