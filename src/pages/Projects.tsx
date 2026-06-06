import React, { useState, useEffect } from "react";
import { FolderGit2, Search, SlidersHorizontal, Sparkles, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { Project } from "../types";
import { api } from "../api";
import ProjectCard from "../components/ProjectCard";

// Framer Motion staggered grid variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 14,
    },
  },
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Query list of database projects
    api.getProjects()
      .then((data) => {
        setProjects(data);
        setFilteredProjects(data);

        // Derive unique categories from projects
        const uniqueCategories = ["All", ...Array.from(new Set(data.map((p) => p.category)))];
        setCategories(uniqueCategories);
      })
      .catch((err) => {
        console.error("Projects query failed:", err);
        setErrorMessage("Unable to fetch projects. Please check connection status or restart the database.");
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter and search computation engine
  useEffect(() => {
    let result = [...projects];

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Live search query matching
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
      );
    }

    setFilteredProjects(result);
  }, [selectedCategory, searchQuery, projects]);

  return (
    <div id="projects-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-12">
      
      {/* Page Title */}
      <div className="max-w-3xl">
        <div className="text-xs font-mono font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase flex items-center gap-2 mb-2">
          <FolderGit2 className="h-4 w-4" />
          <span>Engineering Sandbox</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight">
          Coded Solutions & <span className="text-gradient font-black">Automation Packs</span>
        </h1>
        <p className="text-lg text-slate-650 dark:text-slate-400 mt-4 leading-relaxed font-sans">
          Exploring typing velocity engines, real full-stack finlabs, and Python spreadsheet automation. Fully operational CRUD modules update these records dynamically.
        </p>
      </div>

      {/* Interactive Controls Panel (Search & Categories Filter) */}
      <div className="bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/80 p-4 md:p-6 rounded-3xl shadow-sm space-y-4 dark:glass">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search box */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search by title, category, or stack tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 focus:outline-none focus:ring-2 focus:ring-sky-555 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 font-bold self-start md:self-auto shrink-0 bg-slate-100 dark:bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-200/40 dark:border-slate-800/60">
            <SlidersHorizontal className="h-3.5 w-3.5 text-sky-500" />
            <span>Found {filteredProjects.length} matching builds</span>
          </div>
        </div>

        {/* Categories Pill Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-sans transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "accent-gradient text-white shadow-sm shadow-sky-500/25"
                  : "bg-slate-105 text-slate-600 hover:bg-slate-200 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-slate-800/45 bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid listing projects */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-12 h-12 border-4 border-sky-600 border-t-transparent dark:border-sky-400 dark:border-t-transparent rounded-full animate-spin" />
          <p className="font-mono text-sm text-slate-500">Connecting database collections...</p>
        </div>
      ) : errorMessage ? (
        <div className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-150 dark:border-rose-900/40 text-rose-800 dark:text-rose-305 flex items-start gap-3.5">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold font-display text-base">Backend Connection Failure</h4>
            <p className="text-sm text-rose-650 dark:text-rose-400 mt-1">{errorMessage}</p>
          </div>
        </div>
      ) : filteredProjects.length > 0 ? (
        <motion.div
          key={selectedCategory + searchQuery} // Re-animate when query parameters filter list
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project._id || project.id}
              variants={itemVariants}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/10 border border-dashed border-slate-250 dark:border-slate-800 rounded-3xl p-8 max-w-md mx-auto space-y-3 dark:glass">
          <FolderGit2 className="h-10 w-10 text-slate-400 dark:text-slate-600 mx-auto" />
          <h3 className="font-display font-bold text-slate-900 dark:text-white text-base">No builds found</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            We couldn't locate any projects that match your filters or query. Try adjusting your parameters.
          </p>
        </div>
      )}

    </div>
  );
}
