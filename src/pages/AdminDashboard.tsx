import React, { useState, useEffect } from "react";
import { 
  Shield, 
  Lock, 
  Mail, 
  Plus, 
  Trash2, 
  Edit, 
  Inbox, 
  FolderGit2, 
  LogOut, 
  Database, 
  Star, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw, 
  X,
  FileText,
  Download,
  Upload
} from "lucide-react";
import { api } from "../api";
import { Project, Contact } from "../types";
import ProjectCard from "../components/ProjectCard";

export default function AdminDashboard() {
  const [token, setToken] = useState(() => localStorage.getItem("adminToken") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Console Panel State
  const [activeTab, setActiveTab] = useState<"projects" | "inbox">("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [dbStatus, setDbStatus] = useState<any>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [dataError, setDataError] = useState("");

  // Project Schema Form Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");

  // CRUD Form Inputs
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    category: "Web Application",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
    imageUrl: "",
    featured: false
  });

  // Verify and load console data if token is active
  useEffect(() => {
    if (token) {
      loadConsoleData();
    }
  }, [token]);

  const loadConsoleData = async () => {
    setIsLoadingData(true);
    setDataError("");
    try {
      const [allProjects, allContacts, status] = await Promise.all([
        api.getProjects(),
        api.getContacts(token),
        api.getDbStatus().catch(() => null)
      ]);
      setProjects(allProjects);
      setContacts(allContacts);
      setDbStatus(status);
    } catch (err: any) {
      console.error("Failed to load console payloads:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        handleLogout();
        setDataError("Session expired. Please log in again.");
      } else {
        setDataError("Database fetch error. Please verify server status.");
      }
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const res = await api.login(email, password);
      localStorage.setItem("adminToken", res.token);
      localStorage.setItem("adminUser", JSON.stringify(res.user));
      setToken(res.token);
    } catch (err: any) {
      console.error("Credentials rejection:", err);
      setLoginError(err.response?.data?.error || "Incorrect login credentials. Try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setToken("");
    setProjects([]);
    setContacts([]);
  };

  // Open Add modal
  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      description: "",
      longDescription: "",
      category: "Web Application",
      technologies: "",
      githubUrl: "",
      liveUrl: "",
      imageUrl: "",
      featured: false
    });
    setFormError("");
    setFormSuccess("");
    setIsModalOpen(true);
  };

  // Open Edit modal pre-filled
  const openEditModal = (proj: Project) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title,
      description: proj.description,
      longDescription: proj.longDescription || "",
      category: proj.category,
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(", ") : "",
      githubUrl: proj.githubUrl || "",
      liveUrl: proj.liveUrl || "",
      imageUrl: proj.imageUrl || "",
      featured: proj.featured || false
    });
    setFormError("");
    setFormSuccess("");
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    setFormLoading(true);

    if (!formData.title.trim() || !formData.description.trim() || !formData.category.trim()) {
      setFormError("Title, Category, and Description are required standard fields.");
      setFormLoading(false);
      return;
    }

    const payload = {
      ...formData,
      technologies: formData.technologies.split(",").map((tech) => tech.trim()).filter((tech) => tech !== "")
    };

    try {
      if (editingProject) {
        // Update Action
        const id = editingProject._id || editingProject.id;
        if (!id) throw new Error("Missing Project Unique Key identifier");
        await api.updateProject(id, payload, token);
        setFormSuccess("Project updated successfully inside database schema.");
      } else {
        // Create Action
        await api.createProject(payload, token);
        setFormSuccess("New Project resource injected cleanly into database schema.");
      }

      // Reload dataset and close modal after brief delay
      await loadConsoleData();
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1500);

    } catch (err: any) {
      console.error("Resource writing aborted:", err);
      setFormError(err.response?.data?.error || "Transaction failure. Check database logs.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Are you absolutely sure you want to terminate this project document permanently from the collections?")) return;

    try {
      await api.deleteProject(id, token);
      setProjects((prev) => prev.filter((p) => (p._id !== id && p.id !== id)));
    } catch (err) {
      console.error("Resource deletion failure:", err);
      alert("CRUD execution aborted. Please test network connectivity.");
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this visitor message permanentely?")) return;

    try {
      await api.deleteContact(id, token);
      setContacts((prev) => prev.filter((c) => (c._id !== id && c.id !== id)));
    } catch (err) {
      console.error("Inquiry deletion failure:", err);
      alert("Failed to delete contact inquiry. Please check your network and session.");
    }
  };

  const handleExportBackup = async () => {
    try {
      const data = await api.exportDb(token);
      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(data, null, 2)
      )}`;
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", jsonString);
      downloadAnchor.setAttribute("download", "db_fallback.json");
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      console.error("Backup export failure:", err);
      alert("Failed to export database backup. Check server log.");
    }
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const file = e.target.files?.[0];
    if (!file) return;

    fileReader.onload = async (event) => {
      try {
        const text = event.target?.result;
        if (typeof text !== "string") throw new Error("Parsed content is invalid");
        const parsed = JSON.parse(text);

        if (!confirm("Caution: Restoring backup will overwrite all active portfolio projects, contact logs, and login user credentials. Do you wish to proceed?")) {
          return;
        }

        const res = await api.importDb(parsed, token);
        alert(res.message || "Database backup restored successfully");
        await loadConsoleData();
      } catch (err: any) {
        console.error("Backup restoration failure:", err);
        alert("Failed to restore backup: " + (err.message || "Invalid JSON structure. Ensure file matches db_fallback.json format."));
      }
    };
    fileReader.readAsText(file);
    e.target.value = "";
  };

  /* =========================================================
     LOGIN SCREEN OVERLAY (IF NOT AUTHENTICATED)
     ========================================================= */
  if (!token) {
    return (
      <div id="login-screen-wrapper" className="max-w-md mx-auto my-12 md:my-24 px-4 font-sans">
        <div className="bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 shadow-xl space-y-6 dark:glass">
          <div className="text-center space-y-2 font-display">
            <div className="w-12 h-12 bg-sky-50 dark:bg-sky-950/20 border border-sky-150/40 dark:border-sky-800/40 rounded-2xl flex items-center justify-center text-sky-605 dark:text-sky-400 mx-auto">
              <Shield className="h-6 w-6" />
            </div>
            <h1 className="font-extrabold text-2xl text-slate-950 dark:text-white tracking-tight">
              Admin Gateway Console
            </h1>
            <p className="text-xs font-mono text-slate-500">JWT Token Session Authentication</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/20 border border-rose-150 dark:border-rose-900/60 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
                <span>{loginError}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-xs font-bold font-mono text-slate-405 uppercase">Administrator Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold font-mono text-slate-405 uppercase">Password Secret</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl text-white font-semibold text-sm tracking-wide disabled:opacity-50 hover:scale-[1.01] transition-all cursor-pointer accent-gradient shadow-md shadow-sky-550/15"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Validating credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In To Console</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* =========================================================
     ADMIN PANEL ACTIONS & SHEETS OVERLAY
     ========================================================= */
  return (
    <div id="admin-panel-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Console Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono bg-sky-50 text-sky-850 dark:bg-sky-950/20 dark:text-sky-305 px-2.5 py-1 rounded-full border border-sky-150/40 dark:border-sky-800/30 mb-2">
            <Shield className="h-3.5 w-3.5" />
            <span>Authenticated session active: Shaik Sohel</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
            <span className="text-gradient font-black">Administrator</span> Command Console
          </h1>
        </div>

        {/* Console Action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportBackup}
            title="Download DB Backup (db_fallback.json)"
            className="flex items-center space-x-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl transition-all cursor-pointer dark:glass"
          >
            <Download className="h-4 w-4" />
            <span>Export Backup</span>
          </button>
          
          <label
            title="Upload and restore fallback database file"
            className="flex items-center space-x-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl transition-all cursor-pointer dark:glass"
          >
            <Upload className="h-4 w-4" />
            <span>Import Backup</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportBackup}
              className="hidden"
            />
          </label>

          <button
            onClick={loadConsoleData}
            title="Reload backend schemas"
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-sky-500 hover:border-slate-300 transition-all cursor-pointer dark:glass"
          >
            <RefreshCw className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Wipe Token Session</span>
          </button>
        </div>
      </div>

      {/* Numerical Metrics summary panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="p-5 bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/80 rounded-2xl shadow-sm dark:glass">
          <div className="flex justify-between items-start text-slate-400 dark:text-slate-505 mb-2">
            <span className="text-xs font-bold font-mono uppercase tracking-wider">Database Mode</span>
            <Database className="h-5 w-5 text-sky-500" />
          </div>
          <div className="font-display font-black text-lg md:text-xl text-slate-900 dark:text-white leading-tight">
            {dbStatus?.databaseType || "Dual Scheme Active"}
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">Automatic graceful fallbacks operational</div>
        </div>

        {/* Metric 2 */}
        <div className="p-5 bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/80 rounded-2xl shadow-sm dark:glass">
          <div className="flex justify-between items-start text-slate-400 dark:text-slate-505 mb-2">
            <span className="text-xs font-bold font-mono uppercase tracking-wider">Active projects</span>
            <FolderGit2 className="h-5 w-5 text-indigo-400" />
          </div>
          <div className="font-display font-black text-3xl text-slate-900 dark:text-white">
            {projects.length}
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">Full CRUD control permissions set</div>
        </div>

        {/* Metric 3 */}
        <div className="p-5 bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/80 rounded-2xl shadow-sm dark:glass">
          <div className="flex justify-between items-start text-slate-400 dark:text-slate-505 mb-2">
            <span className="text-xs font-bold font-mono uppercase tracking-wider">Inquiries Received</span>
            <Inbox className="h-5 w-5 text-emerald-450" />
          </div>
          <div className="font-display font-black text-3xl text-slate-900 dark:text-white">
            {contacts.length}
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">Real-time visitor messages logged</div>
        </div>

        {/* Metric 4 */}
        <div className="p-5 bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/80 rounded-2xl shadow-sm dark:glass">
          <div className="flex justify-between items-start text-slate-400 dark:text-slate-505 mb-2">
            <span className="text-xs font-bold font-mono uppercase tracking-wider">Node REST API</span>
            <Shield className="h-5 w-5 text-sky-400" />
          </div>
          <div className="font-display font-black text-lg md:text-xl text-sky-600 dark:text-sky-405">
            Secure Endpoint
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">Express Ingress: Port 3000 SSL active</div>
        </div>
      </div>

      {/* Tabs list with content triggers */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 border-b border-slate-150 dark:border-slate-800 pb-px font-sans">
          <button
            onClick={() => setActiveTab("projects")}
            className={`pb-2.5 text-sm font-semibold border-b-2 px-2.5 transition-all cursor-pointer ${
              activeTab === "projects"
                ? "border-sky-500 text-sky-600 dark:border-sky-400 dark:text-sky-300"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
            }`}
          >
            Manage Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("inbox")}
            className={`pb-2.5 text-sm font-semibold border-b-2 px-2.5 transition-all cursor-pointer ${
              activeTab === "inbox"
                ? "border-sky-500 text-sky-600 dark:border-sky-400 dark:text-sky-305"
                : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
            }`}
          >
            Inbox Messages ({contacts.length})
          </button>
        </div>

        {/* TAB 1: MANAGE PROJECTS */}
        {/* TAB 1: MANAGE PROJECTS */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between font-sans">
              <h2 className="font-display font-bold text-slate-900 dark:text-white text-lg tracking-tight">
                Project Resources
              </h2>
              <button
                onClick={openAddModal}
                className="flex items-center space-x-1.5 px-4 py-2 text-white font-semibold text-xs rounded-xl tracking-wide shadow hover:scale-[1.01] transition-transform cursor-pointer accent-gradient"
              >
                <Plus className="h-4 w-4" />
                <span>Add Portfolio Project</span>
              </button>
            </div>

            {isLoadingData ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-3">
                <RefreshCw className="h-8 w-8 text-sky-500 animate-spin" />
                <p className="text-xs font-mono text-slate-500">Communicating with Schema Repository...</p>
              </div>
            ) : projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj) => (
                  <div key={proj._id || proj.id} className="relative">
                    <ProjectCard
                      project={proj}
                      isAdminMode={true}
                      onEdit={openEditModal}
                      onDelete={handleDeleteProject}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 p-8 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/30 dark:glass">
                <FolderGit2 className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-mono text-slate-505">No project documents stored in collections right now.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: INBOX INQUIRIES MESSAGES */}
        {activeTab === "inbox" && (
          <div className="space-y-6">
            <h2 className="font-display font-bold text-slate-900 dark:text-white text-lg tracking-tight">
              Visitor Inquiries Inbox Logs
            </h2>

            {isLoadingData ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-3">
                <RefreshCw className="h-8 w-8 text-sky-500 animate-spin" />
                <p className="text-xs font-mono text-slate-505">Querying contacts endpoint...</p>
              </div>
            ) : contacts.length > 0 ? (
              <div className="bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm divide-y divide-slate-100 dark:divide-slate-850/60 dark:glass">
                {contacts.map((con, index) => (
                  <div key={con._id || con.id || index} className="p-6 space-y-3 hover:bg-slate-50/50 dark:hover:bg-slate-950/20 transition-colors font-sans">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="font-display font-bold text-slate-900 dark:text-white text-base">
                          {con.name}
                        </span>
                        <span className="text-xs font-mono text-slate-400 dark:text-slate-500 block sm:inline sm:ml-2">
                          ({con.email})
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 shrink-0">
                        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-500 dark:bg-slate-800/80 dark:text-slate-300 px-2 py-0.5 rounded">
                          {con.createdAt ? new Date(con.createdAt).toLocaleString() : "Date log unavailable"}
                        </span>
                        <button
                          onClick={() => {
                            const id = con._id || con.id;
                            if (id) {
                              handleDeleteContact(id);
                            } else {
                              alert("Inquiry unique identifier not found.");
                            }
                          }}
                          className="p-1.5 rounded-lg text-rose-500 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 dark:bg-rose-955/20 dark:hover:bg-rose-900/40 transition-all cursor-pointer"
                          title="Delete Visitor Inquiry"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-bold font-mono text-sky-600 dark:text-sky-400">
                        Subject: {con.subject}
                      </div>
                      <p className="text-sm text-slate-650 dark:text-slate-305 bg-slate-50/50 dark:bg-slate-950 p-4 border border-slate-150 dark:border-slate-850/40 rounded-xl leading-relaxed font-sans">
                        {con.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 p-8 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50/50 dark:bg-slate-900/30 dark:glass">
                <Mail className="h-10 w-10 text-slate-400 dark:text-slate-505 mx-auto mb-2" />
                <p className="text-sm text-slate-500 font-mono">Your submission archives are currently empty.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* PROJECT CRUD FORM SHEETS (MODAL INTERFACE) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/90 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 p-6 md:p-8 relative dark:glass">
            
            {/* Modal Title Block */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-150 dark:border-slate-800/80 font-sans">
              <div>
                <h3 className="font-display font-extrabold text-xl text-slate-955 dark:text-white">
                  {editingProject ? "Update Portfolio Build Record" : "Create New Portfolio Resource"}
                </h3>
                <p className="text-xs font-mono text-slate-400 dark:text-slate-550">
                  {editingProject ? "Editing Document ID: " + (editingProject._id || editingProject.id) : "Will instantly sync with database scheme"}
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-805 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Validation displays on modal */}
            {formError && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/25 border border-rose-150 dark:border-rose-900/60 text-rose-800 dark:text-rose-350 text-xs flex items-start gap-2.5">
                <AlertCircle className="h-5 w-5 shrink-0 text-rose-500 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            {formSuccess && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-150 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-355 text-xs flex items-start gap-2.5">
                <CheckCircle className="h-5 w-5 shrink-0 text-emerald-505 mt-0.5" />
                <span>{formSuccess}</span>
              </div>
            )}

            {/* CRUD Form fields */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-mono text-slate-405 dark:text-slate-500 uppercase">Project Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Sentiment Classifier"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-mono text-slate-405 dark:text-slate-500 uppercase">Interactive category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                    placeholder="e.g., Web Application, Automation, ML"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-mono text-slate-405 dark:text-slate-500 uppercase">Brief Description (One-liner summary)</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="e.g., An analytical script designed to calculate typing speeds..."
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-mono text-slate-405 dark:text-slate-500 uppercase">Extended Bio / Case Study details (Optional)</label>
                <textarea
                  value={formData.longDescription}
                  onChange={(e) => setFormData((prev) => ({ ...prev, longDescription: e.target.value }))}
                  rows={3}
                  placeholder="Details of design motivations, analytical stats, system limits..."
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-mono text-slate-405 dark:text-slate-500 uppercase">Technologies Stack (Comma separated values)</label>
                <input
                  type="text"
                  value={formData.technologies}
                  onChange={(e) => setFormData((prev) => ({ ...prev, technologies: e.target.value }))}
                  placeholder="e.g., React.js, Tailwind CSS, openpyxl, Python"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-955 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-mono text-slate-405 dark:text-slate-500 uppercase">GitHub Code Link URI</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                    placeholder="https://github.com/sohel-917/repo"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold font-mono text-slate-405 dark:text-slate-500 uppercase">Live Hosted Prototype URL</label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData((prev) => ({ ...prev, liveUrl: e.target.value }))}
                    placeholder="https://testbed-sohel.vercel.app"
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-mono text-slate-405 dark:text-slate-500 uppercase">Project Image Asset URL (Unsplash or CDN)</label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-205 dark:border-slate-805 bg-slate-50/50 dark:bg-slate-950/60 focus:outline-none focus:ring-2 focus:ring-sky-505 font-mono"
                />
              </div>

              {/* Checkbox Featured */}
              <div className="flex items-center space-x-2.5 py-1.5">
                <input
                  type="checkbox"
                  id="featured-field"
                  checked={formData.featured}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300 dark:border-slate-805 bg-slate-50 dark:bg-slate-950/80 cursor-pointer"
                />
                <label id="featured-field-label" htmlFor="featured-field" className="text-sm font-medium text-slate-705 dark:text-slate-300 cursor-pointer select-none font-sans">
                  Tag as Featured Highlight project? (Will display on Landing Showcase)
                </label>
              </div>

              {/* Form buttons */}
              <div className="flex items-center gap-3 pt-4 border-t border-slate-150 dark:border-slate-800/80">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/2 py-2.5 border border-slate-200 dark:border-slate-800 text-slate-650 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800/60 dark:text-slate-400 rounded-xl font-semibold text-sm cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-1/2 py-2.5 text-white font-semibold text-sm rounded-xl cursor-pointer shadow hover:scale-[1.01] transition-transform disabled:opacity-50 flex items-center justify-center space-x-2 accent-gradient"
                >
                  {formLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Writing schema...</span>
                    </>
                  ) : (
                    <span>Save Project</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
