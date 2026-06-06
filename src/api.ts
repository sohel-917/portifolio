import axios from "axios";
import { Project, Contact, AuthResponse } from "./types";

// Base API setup pointing to host relative root (will work in both local development and production container)
const API_BASE = "/api";

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  // DB status check
  getDbStatus: async () => {
    const res = await apiClient.get("/db-status");
    return res.data;
  },

  // Projects CRUD
  getProjects: async (): Promise<Project[]> => {
    const res = await apiClient.get("/projects");
    return res.data;
  },

  createProject: async (projectData: Omit<Project, "_id" | "id">, token: string): Promise<Project> => {
    const res = await apiClient.post("/projects", projectData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  updateProject: async (id: string, projectData: Partial<Project>, token: string): Promise<Project> => {
    const res = await apiClient.put(`/projects/${id}`, projectData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  deleteProject: async (id: string, token: string): Promise<{ message: string }> => {
    const res = await apiClient.delete(`/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  // Contact REST endpoint
  submitContact: async (contactData: Omit<Contact, "_id" | "createdAt">): Promise<{ message: string; contact: Contact }> => {
    const res = await apiClient.post("/contact", contactData);
    return res.data;
  },

  getContacts: async (token: string): Promise<Contact[]> => {
    const res = await apiClient.get("/contact", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  deleteContact: async (id: string, token: string): Promise<{ message: string }> => {
    const res = await apiClient.delete(`/contact/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  // Admin Auth endpoint
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const res = await apiClient.post("/auth/login", { email, password });
    return res.data;
  }
};
