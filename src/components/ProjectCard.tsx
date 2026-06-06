import React from "react";
import { ExternalLink, Github, Star, Edit, Trash2 } from "lucide-react";
import { Project } from "../types";

interface ProjectCardProps {
  key?: string;
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
  isAdminMode?: boolean;
}

export default function ProjectCard({ project, onEdit, onDelete, isAdminMode = false }: ProjectCardProps) {
  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : typeof project.technologies === "string"
    ? (project.technologies as string).split(",")
    : [];

  return (
    <div className="group relative bg-white dark:bg-slate-900/40 dark:backdrop-blur-md border border-slate-150 dark:border-slate-800/70 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-sky-400 dark:hover:border-sky-500 transition-all duration-300 flex flex-col justify-between h-full dark:glass">
      {/* Visual Accent Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-indigo-455 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Project Thumbnail Image */}
      <div>
        <div className="relative aspect-video w-full bg-slate-100 dark:bg-slate-900/60 overflow-hidden">
          <img
            src={project.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600"}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          {project.featured && (
            <span className="absolute top-3 right-3 bg-indigo-600 dark:bg-sky-500 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-full flex items-center gap-1.5 shadow">
              <Star className="h-3 w-3 fill-amber-300 stroke-amber-300" />
              <span>Featured</span>
            </span>
          )}
          <span className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md">
            {project.category}
          </span>
        </div>

        {/* content body */}
        <div className="p-5 space-y-3">
          <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg tracking-tight group-hover:text-sky-655 dark:group-hover:text-sky-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
            {project.description}
          </p>
          {project.longDescription && project.longDescription !== project.description && (
            <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-2">
              {project.longDescription}
            </p>
          )}
        </div>
      </div>

      {/* Footer block containing Chips and Actions */}
      <div className="p-5 pt-0 mt-auto space-y-4">
        {/* stack tags */}
        <div className="flex flex-wrap gap-1.5">
          {technologies.map((tech, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono font-medium tracking-tight bg-slate-100 text-slate-600 dark:bg-sky-500/10 dark:text-sky-400 px-2.5 py-0.5 rounded-md border border-transparent dark:border-sky-500/10"
            >
              {tech.trim()}
            </span>
          ))}
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800/60 pt-4 flex items-center justify-between">
          {/* Admin editing/deleting control block */}
          {isAdminMode ? (
            <div className="flex items-center space-x-2 w-full justify-between">
              <button
                onClick={() => onEdit && onEdit(project)}
                className="flex items-center space-x-1.5 px-3 py-1.5 text-xs text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 rounded-lg transition-colors font-medium cursor-pointer"
              >
                <Edit className="h-3.5 w-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  const targetId = project._id || project.id;
                  if (targetId && onDelete) onDelete(targetId);
                }}
                className="flex items-center space-x-1.5 px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 rounded-lg transition-colors font-medium cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete</span>
              </button>
            </div>
          ) : (
            <>
              {/* Public Standard Links */}
              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 text-xs text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-400 transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span className="font-medium font-mono">Source Code</span>
                </a>
              ) : (
                <span className="text-xs text-slate-405 dark:text-slate-600 font-mono italic">
                  Private Code
                </span>
              )}

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 text-xs text-sky-600 dark:text-sky-405 hover:underline hover:font-bold transition-all"
                >
                  <span className="font-medium font-mono">Live Demo</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <span className="text-xs text-slate-405 dark:text-slate-600 font-mono italic">
                  Internal Tool
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
