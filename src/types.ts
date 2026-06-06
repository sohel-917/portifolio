/**
 * Types definitions for Shaik Sohel Portfolio Application
 */

export interface Project {
  _id?: string;
  id?: string; // used for uniform compatibility
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  createdAt?: string;
}

export interface Contact {
  _id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}
