import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Code2, 
  Download, 
  Terminal, 
  Brain, 
  Sparkles, 
  FolderGit2, 
  Star, 
  CheckCircle,
  X,
  Clipboard,
  Check,
  Printer,
  FileText,
  ExternalLink
} from "lucide-react";
import { Project } from "../types";
import { api } from "../api";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Fetch projects and retrieve the featured ones
    api.getProjects()
      .then((data) => {
        // Take either featured ones or the first 2-3 projects
        const featured = data.filter((p) => p.featured);
        setFeaturedProjects(featured.length > 0 ? featured.slice(0, 3) : data.slice(0, 3));
      })
      .catch((err) => {
        console.error("Home page project fetch failed:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const resumeTextContent = `========================================================================
                             SHAIK SOHEL
========================================================================
Email    : ska510805@gmail.com
Phone    : 9177338220 | DOB - 01 Feb 2006
Address  : Jagannaickpur Kakinada-533002

LINKS:
------------------------------------------------------------------------
Linkedin : https://www.linkedin.com/in/sk-sohel-927753305
Github   : https://github.com/sohel-917

SUMMARY:
------------------------------------------------------------------------
Motivated CSE student (2024-2028) with basic knowledge in Python,
Data structures, and Java. Passionate about Generative AI,
problem-solving and continuous learning.

SKILLS:
------------------------------------------------------------------------
- Python
- Java
- C
- Problem Solving

PROJECTS:
------------------------------------------------------------------------
* Type Master - Mini Project
  Developed a typing practice application that helps users improve
  typing speed and consistency. The system measures typing accuracy
  and performance, helping users track improvement over time.

* Personalized Financial Behaviour Analyzer
  Hackathon project | Financial Analyzer | Data Analysis
  - Analyzed spending behaviour across categories and time to understand
    financial habits
  - Generated Personalized savings and investment suggestions based on
    spending analysis.

EDUCATION:
------------------------------------------------------------------------
* 2024-2028
  B.Tech in Artificial Intelligence
  Pragati Engineering College, surampalem
  CGPA: 9.33

* 2022-2024
  Intermediate (MPC)
  Narayana junior college - Kakinada
  Percentage: 95%

* 2021-2022
  Secondary School Certificate - SSC
  Dr.SRK MCH School - Kakinada
  Percentage: 90%

CERTIFICATIONS:
------------------------------------------------------------------------
- Generative Art & Animation Specialist - TechAR Innovation
- Web Innovations with Design Thinking and SDGs - Pragati Engineering College
- RPA Developer
- Gen AI virtual internship
- Google Android Developer virtual internship
- Ethical Hacking virtual Internship

LANGUAGES KNOWN:
------------------------------------------------------------------------
- Telugu
- English
- Hindi

TOOLS & DEVOPS:
------------------------------------------------------------------------
- GitHub
- VS Code
- Excel Automation
========================================================================`;

  const resumeHtmlContent = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>SHAIK_SOHEL_RESUME</title>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
      @page {
        size: A4;
        margin: 0.8in 0.6in 0.8in 0.6in;
      }
      body {
        font-family: 'Inter', sans-serif;
        color: #1e293b;
        margin: 0;
        padding: 40px;
        line-height: 1.5;
        font-size: 13.5px;
        background-color: white;
        max-width: 800px;
        margin: 0 auto;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .header {
        text-align: center;
        margin-bottom: 25px;
      }
      .name {
        font-size: 38px;
        font-weight: 850;
        color: #0f172a;
        margin: 0 0 8px 0;
        letter-spacing: -0.03em;
      }
      .contact-info {
        font-size: 12.5px;
        color: #475569;
        margin-bottom: 4px;
        font-weight: 500;
      }
      .address-info {
        font-size: 12.5px;
        color: #475569;
        font-weight: 500;
      }
      .divider {
        border: 0;
        border-top: 1px solid #cbd5e1;
        margin: 20px 0;
      }
      .layout-grid {
        display: grid;
        grid-template-columns: 1.8fr 1fr;
        gap: 35px;
      }
      .left-column {
        display: flex;
        flex-direction: column;
        gap: 22px;
      }
      .right-column {
        display: flex;
        flex-direction: column;
        gap: 22px;
        border-left: 1px solid #e2e8f0;
        padding-left: 25px;
      }
      .section-title {
        font-size: 15px;
        font-weight: 800;
        text-transform: uppercase;
        color: #0f172a;
        margin-top: 0;
        margin-bottom: 12px;
        letter-spacing: 0.05em;
        border-bottom: 1.5px solid #0f172a;
        padding-bottom: 4px;
      }
      .summary-text {
        font-size: 12.5px;
        color: #334155;
        text-align: justify;
        margin: 0;
      }
      ul {
        margin: 0;
        padding-left: 18px;
      }
      li {
        font-size: 12.5px;
        color: #334155;
        margin-bottom: 6px;
      }
      .project-item {
        margin-bottom: 16px;
      }
      .project-title {
        font-size: 14.5px;
        font-weight: 750;
        color: #0f172a;
        margin-bottom: 4px;
      }
      .project-meta {
        font-size: 11.5px;
        font-weight: 600;
        color: #0284c7;
        margin-bottom: 5px;
      }
      .project-desc {
        font-size: 12.5px;
        color: #334155;
        margin: 0;
      }
      .edu-item {
        margin-bottom: 16px;
      }
      .edu-year {
        font-weight: 750;
        color: #0284c7;
        font-size: 11.5px;
        margin-bottom: 2px;
      }
      .edu-degree {
        font-size: 13.5px;
        font-weight: 750;
        color: #0f172a;
      }
      .edu-inst {
        font-size: 12.5px;
        color: #475569;
        margin-bottom: 2px;
      }
      .edu-grade {
        font-weight: 600;
        color: #0f172a;
        font-size: 12.5px;
      }
      .link-item {
        font-size: 12px;
        margin-bottom: 10px;
        word-break: break-all;
      }
      .link-label {
        font-weight: 700;
        color: #334155;
        margin-bottom: 2px;
      }
      .link-value {
        color: #0284c7;
        text-decoration: none;
      }
      .print-btn {
        display: block;
        width: fit-content;
        background-color: #0284c7;
        color: white;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: 600;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        margin: 0 auto 30px auto;
        font-family: inherit;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
      }
      @media print {
        .print-btn {
          display: none;
        }
        body {
          padding: 0;
        }
      }
    </style>
  </head>
  <body>
    <button class="print-btn" onclick="window.print()">Print / Save as PDF</button>

    <div class="header">
      <h1 class="name">SHAIK SOHEL</h1>
      <div class="contact-info">
        ska510805@gmail.com &nbsp;|&nbsp; 9177338220 &nbsp;|&nbsp; DOB - 01 Feb 2006
      </div>
      <div class="address-info">
        Jagannaickpur Kakinada-533002
      </div>
    </div>

    <hr class="divider" />

    <div class="layout-grid">
      <div class="left-column">
        
        <div>
          <h2 class="section-title">Summary</h2>
          <p class="summary-text">
            Motivated CSE student (2024-2028) with basic knowledge in Python, Data structures, and Java. Passionate about Generative AI, problem-solving and continuous learning.
          </p>
        </div>

        <div>
          <h2 class="section-title">Skills</h2>
          <ul style="list-style-type: square;">
            <li>Python</li>
            <li>Java</li>
            <li>C</li>
            <li>Problem Solving</li>
          </ul>
        </div>

        <div>
          <h2 class="section-title">Projects</h2>
          
          <div class="project-item">
            <div class="project-title">Type Master - Mini Project</div>
            <p class="project-desc">
              Developed a typing practice application that helps users improve typing speed and consistency. The system measures typing accuracy and performance, helping users track improvement over time.
            </p>
          </div>

          <div class="project-item" style="margin-bottom: 0;">
            <div class="project-title">Personalized Financial Behaviour Analyzer</div>
            <div class="project-meta">Hackathon project | Financial Analyzer | Data Analysis</div>
            <ul style="margin-top: 4px;">
              <li>Analyzed spending behaviour across categories and time to understand financial habits</li>
              <li>Generated Personalized savings and investment suggestions based on spending analysis.</li>
            </ul>
          </div>

        </div>

        <div>
          <h2 class="section-title">Certifications</h2>
          <ul>
            <li>Generative Art & Animation Specialist - TechAR Innovation</li>
            <li>Web Innovations with Design Thinking and SDGs - Pragati Engineering College</li>
            <li>RPA Developer</li>
            <li>Gen AI virtual internship</li>
            <li>Google Android Developer virtual internship</li>
            <li>Ethical Hacking virtual Internship</li>
          </ul>
        </div>

      </div>
      
      <div class="right-column">
        
        <div>
          <h2 class="section-title">Education</h2>
          
          <div class="edu-item">
            <div class="edu-year">2024-2028</div>
            <div class="edu-degree">B.Tech in Artificial Intelligence</div>
            <div class="edu-inst">Pragati Engineering College, surampalem</div>
            <div class="edu-grade">CGPA: 9.33</div>
          </div>

          <div class="edu-item">
            <div class="edu-year">2022-2024</div>
            <div class="edu-degree">Intermediate (MPC)</div>
            <div class="edu-inst">Narayana junior college - Kakinada</div>
            <div class="edu-grade">Percentage: 95%</div>
          </div>

          <div class="edu-item" style="margin-bottom: 0;">
            <div class="edu-year">2021-2022</div>
            <div class="edu-degree">Secondary School Certificate-SSC</div>
            <div class="edu-inst">Dr.SRK MCH School - Kakinada</div>
            <div class="edu-grade">Percentage: 90%</div>
          </div>

        </div>

        <div>
          <h2 class="section-title">Links</h2>
          
          <div class="link-item">
            <div class="link-label">Linkedin</div>
            <a href="https://www.linkedin.com/in/sk-sohel-927753305" target="_blank" class="link-value">linkedin.com/in/sk-sohel-927753305</a>
          </div>

          <div class="link-item" style="margin-bottom: 0;">
            <div class="link-label">Github</div>
            <a href="https://github.com/sohel-917" target="_blank" class="link-value">github.com/sohel-917</a>
          </div>

        </div>

        <div>
          <h2 class="section-title">Languages Known</h2>
          <ul>
            <li>Telugu</li>
            <li>English</li>
            <li>Hindi</li>
          </ul>
        </div>

        <div>
          <h2 class="section-title">Tools & DevOps</h2>
          <ul>
            <li>GitHub</li>
            <li>VS Code</li>
            <li>Excel Automation</li>
          </ul>
        </div>

      </div>
    </div>
  </body>
</html>`;

  // Standard direct download trigger for plain text
  const handleDownloadTxt = () => {
    const blob = new Blob([resumeTextContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Shaik_Sohel_Resume.txt");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Standard direct download trigger for beautifully styled HTML
  const handleDownloadHtml = () => {
    const blob = new Blob([resumeHtmlContent], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Shaik_Sohel_Print_Ready_Resume.html");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy to clipboard option
  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(resumeTextContent)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Could not copy resume text", err);
      });
  };

  const handleDownloadResume = () => {
    setIsResumeModalOpen(true);
  };

  return (
    <div id="home-page-container" className="relative text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      {/* Decorative Grid Mesh Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-32 flex flex-col items-center text-center">
        {/* Futuristic Status Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/20 border border-sky-150/55 dark:border-sky-800/30 mb-6 animate-pulse">
          <Brain className="h-4 w-4 text-sky-600 dark:text-sky-400" />
          <span className="text-xs font-mono font-bold tracking-tight text-sky-700 dark:text-sky-300">
            AI & Automation Architect in Training
          </span>
        </div>

        {/* Big Displays */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl text-slate-900 dark:text-white tracking-tight max-w-4xl leading-[1.1] mb-6">
          Hi, I am <span className="text-gradient font-black block sm:inline">Shaik Sohel</span>
        </h1>

        <p className="font-display font-medium text-lg sm:text-2xl text-slate-600 dark:text-slate-350 max-w-2xl leading-relaxed mb-8">
          A dedicated B.Tech Artificial Intelligence student with a stellar <span className="font-bold underline decoration-sky-500 text-slate-900 dark:text-white">9.33 CGPA</span> at Pragati Engineering College.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/projects"
            className="flex items-center space-x-2 px-6 py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide shadow-lg shadow-sky-505/20 hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer accent-gradient"
          >
            <span>Explore My Work</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            onClick={handleDownloadResume}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700 text-slate-805 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/20 font-semibold text-sm tracking-wide transition-all cursor-pointer dark:glass"
          >
            <span>Download Resume (CV)</span>
            <Download className="h-4 w-4 text-sky-600 dark:text-sky-400" />
          </button>
        </div>

        {/* Visual Numeric Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mt-16 md:mt-24">
          <div className="bg-white/60 dark:bg-slate-900/40 p-5 rounded-3xl border border-slate-150 dark:border-slate-800/80 backdrop-blur-sm dark:glass">
            <div className="font-display font-black text-3xl md:text-4xl text-sky-600 dark:text-sky-455">9.33</div>
            <div className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase mt-1">B.Tech AI CGPA</div>
          </div>
          <div className="bg-white/60 dark:bg-slate-900/40 p-5 rounded-3xl border border-slate-150 dark:border-slate-800/80 backdrop-blur-sm dark:glass">
            <div className="font-display font-black text-3xl md:text-4xl text-indigo-600 dark:text-indigo-405">95%</div>
            <div className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase mt-1">Intermediate Science</div>
          </div>
          <div className="bg-white/60 dark:bg-slate-900/40 p-5 rounded-3xl border border-slate-150 dark:border-slate-800/80 backdrop-blur-sm dark:glass">
            <div className="font-display font-black text-3xl md:text-4xl text-purple-600 dark:text-indigo-400">100%</div>
            <div className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase mt-1">Practical Build Logic</div>
          </div>
        </div>
      </section>

      {/* Featured Projects Highlight Block */}
      <section className="bg-slate-50/50 dark:bg-slate-950/20 py-20 border-t border-b border-slate-150 dark:border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-mono font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 fill-sky-600 text-sky-600 dark:fill-sky-455 dark:text-sky-455" />
                <span>Showcase Portfolio</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight">
                Featured Engineering Projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="group flex items-center space-x-1.5 text-sky-600 dark:text-sky-405 text-sm font-semibold hover:underline"
            >
              <span>View all projects</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <div className="w-10 h-10 border-4 border-sky-600 border-t-transparent dark:border-sky-400 dark:border-t-transparent rounded-full animate-spin" />
              <p className="font-mono text-sm text-slate-550">Querying database schema...</p>
            </div>
          ) : featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project._id || project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 p-8 border border-dashed border-slate-250 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900/60 dark:glass">
              <p className="text-slate-500 font-mono text-sm">No projects currently synced with db collections.</p>
            </div>
          )}
        </div>
      </section>

      {/* AI Mini Statement Banner */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-br from-sky-500/10 to-indigo-500/10 dark:from-sky-950/20 dark:to-indigo-950/30 border border-sky-150/50 dark:border-sky-800/40 p-8 md:p-12 rounded-3xl space-y-5 dark:glass backdrop-blur-md">
          <Terminal className="h-8 w-8 text-sky-505 mx-auto" />
          <h3 className="font-display font-extrabold text-2xl md:text-3xl text-slate-900 dark:text-white tracking-tight leading-relaxed">
            "The best way to predict the future is to automate it."
          </h3>
          <p className="text-base text-slate-650 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            My engineering strategy at Pragati Engineering College bridges theoretical statistical architectures with robust software development pipelines, ensuring high CGPA theory works.
          </p>
          <div className="inline-flex space-x-2 text-xs font-mono bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-305 px-3 py-1 rounded-md">
            <span>Core Focus: Neural Nets + Analytical Math + Automation Suite</span>
          </div>
        </div>
      </section>

      {/* Premium Interactive Resume Viewer/Downloader Modal */}
      {isResumeModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6 animate-fadeIn">
          <div className="bg-slate-50 dark:bg-slate-950 w-full max-w-6xl rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col h-[90vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border-b border-slate-150 dark:border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-sky-50 dark:bg-sky-950/40 rounded-xl text-sky-600 dark:text-sky-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Shaik Sohel's Resume</h3>
                  <p className="text-xs text-slate-500 font-mono">B.Tech Artificial Intelligence Student</p>
                </div>
              </div>
              
              <button 
                onClick={() => setIsResumeModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-550 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all"
                title="Close Window"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content Arena */}
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              
              {/* Quick Actions Panel */}
              <div className="w-full lg:w-80 bg-white dark:bg-slate-900 p-6 border-b lg:border-b-0 lg:border-r border-slate-150 dark:border-slate-800 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Download Formats</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                      Select how you would like to download or save Shaik Sohel's professional credentials:
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={handleDownloadHtml}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs tracking-wide transition-all shadow-md hover:scale-[1.01]"
                    >
                      <span className="flex items-center space-x-2">
                        <Printer className="h-4 w-4" />
                        <span>Print-Ready HTML / PDF</span>
                      </span>
                      <Download className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={handleDownloadTxt}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 font-semibold text-xs tracking-wide transition-all hover:scale-[1.01]"
                    >
                      <span className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span>ATS-Friendly Text (.txt)</span>
                      </span>
                      <Download className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={handleCopyClipboard}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-indigo-50 hover:bg-indigo-100/85 dark:bg-indigo-950/20 dark:hover:bg-indigo-950/45 text-indigo-700 dark:text-indigo-400 font-semibold text-xs tracking-wide transition-all hover:scale-[1.01]"
                    >
                      <span className="flex items-center space-x-2 border-none">
                        {isCopied ? <Check className="h-4 w-4 text-emerald-505" /> : <Clipboard className="h-4 w-4" />}
                        <span>{isCopied ? "Copied to Clipboard!" : "Copy Resume Text"}</span>
                      </span>
                    </button>
                  </div>

                  <div className="p-4 bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-150 dark:border-slate-800 text-center">
                    <div className="text-xl font-bold text-sky-600 dark:text-sky-400">9.33</div>
                    <div className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase mt-0.5">B.Tech CGPA</div>
                    <div className="text-xs text-slate-505 mt-2 line-clamp-2">Pragati Engineering College AI Division</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-150 dark:border-slate-850 text-center">
                  <div className="text-[11px] text-slate-400 font-mono">
                    Updated June 2026
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Contact: +91 9177338220
                  </div>
                </div>
              </div>

              {/* High Fidelity Scrollable Paper Preview */}
              <div className="flex-1 bg-slate-100 dark:bg-slate-900/60 p-4 md:p-8 overflow-y-auto flex justify-center">
                <main className="bg-white text-slate-800 shadow-xl rounded-2xl w-full max-w-3xl p-6 md:p-10 border border-slate-205 flex flex-col justify-between font-sans relative select-text">
                  
                  {/* Decorative Print Indicator */}
                  <div className="absolute top-4 right-4 bg-slate-100 text-slate-500 text-[10px] font-mono px-2 py-0.5 rounded pointer-events-none">
                    Preview
                  </div>

                  <div>
                    {/* Header Block */}
                    <div className="text-center mb-6">
                      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">SHAIK SOHEL</h1>
                      <div className="text-xs font-medium text-slate-500 mt-2 flex flex-wrap justify-center gap-3">
                        <span>ska510805@gmail.com</span>
                        <span>•</span>
                        <span>9177338220</span>
                        <span>•</span>
                        <span>DOB: 01 Feb 2006</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Jagannaickpur Kakinada-533002, Andhra Pradesh, India
                      </div>
                    </div>

                    <hr className="border-slate-200 my-5" />

                    {/* Dual Column Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs leading-relaxed text-slate-700">
                      
                      {/* Left Sub-Column */}
                      <div className="md:col-span-8 space-y-6">
                        
                        {/* Summary */}
                        <div>
                          <h2 className="text-sm font-extrabold tracking-wider text-slate-900 uppercase border-b-2 border-slate-800 pb-1 mb-3">
                            Summary
                          </h2>
                          <p className="text-justify text-slate-600">
                            Motivated CSE student (2024-2028) with basic knowledge in Python, Data structures, and Java. Passionate about Generative AI, problem-solving and continuous learning.
                          </p>
                        </div>

                        {/* Skills */}
                        <div>
                          <h2 className="text-sm font-extrabold tracking-wider text-slate-900 uppercase border-b-2 border-slate-800 pb-1 mb-3">
                            Skills
                          </h2>
                          <div className="grid grid-cols-2 gap-2 text-slate-600 font-medium">
                            <span className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 bg-sky-505 rounded-full" />
                              Python
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 bg-sky-505 rounded-full" />
                              Java
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 bg-sky-505 rounded-full" />
                              C
                            </span>
                            <span className="flex items-center gap-1.5">
                              <span className="h-1.5 w-1.5 bg-sky-505 rounded-full" />
                              Problem Solving
                            </span>
                          </div>
                        </div>

                        {/* Projects */}
                        <div>
                          <h2 className="text-sm font-extrabold tracking-wider text-slate-900 uppercase border-b-2 border-slate-800 pb-1 mb-3">
                            Projects
                          </h2>
                          
                          <div className="space-y-4">
                            <div className="border-l-2 border-sky-400 pl-3">
                              <h3 className="font-bold text-slate-900 text-sm">Type Master - Mini Project</h3>
                              <p className="mt-1 text-slate-600">
                                Developed a typing practice application that helps users improve typing speed and consistency. The system measures typing accuracy and performance, helping users track improvement over time.
                              </p>
                            </div>

                            <div className="border-l-2 border-indigo-400 pl-3">
                              <h3 className="font-bold text-slate-900 text-sm">Personalized Financial Behaviour Analyzer</h3>
                              <div className="text-[10px] font-bold text-indigo-600">Hackathon project | Financial Analyzer | Data Analysis</div>
                              <ul className="list-disc list-inside mt-1.5 text-slate-600 space-y-1 pl-1">
                                <li>Analyzed spending behaviour across categories and time to understand financial habits</li>
                                <li>Generated Personalized savings and investment suggestions based on spending analysis.</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Certifications */}
                        <div>
                          <h2 className="text-sm font-extrabold tracking-wider text-slate-900 uppercase border-b-2 border-slate-800 pb-1 mb-3">
                            Certifications
                          </h2>
                          <ul className="list-disc list-inside text-slate-600 space-y-1">
                            <li>Generative Art & Animation Specialist - TechAR Innovation</li>
                            <li>Web Innovations with Design Thinking and SDGs - Pragati Engineering College</li>
                            <li>RPA Developer</li>
                            <li>Gen AI virtual internship</li>
                            <li>Google Android Developer virtual internship</li>
                            <li>Ethical Hacking virtual Internship</li>
                          </ul>
                        </div>

                      </div>

                      {/* Right Sub-Column */}
                      <div className="md:col-span-4 space-y-6 md:border-l md:border-slate-100 md:pl-6">
                        
                        {/* Education */}
                        <div>
                          <h2 className="text-sm font-extrabold tracking-wider text-slate-900 uppercase border-b-2 border-slate-800 pb-1 mb-3">
                            Education
                          </h2>
                          <div className="space-y-4">
                            <div>
                              <div className="text-[10px] font-bold text-sky-600">2024-2028</div>
                              <h3 className="font-bold text-slate-900">B.Tech in AI</h3>
                              <p className="text-slate-500">Pragati Engineering College, surampalem</p>
                              <p className="font-semibold text-slate-805 mt-0.5">CGPA: 9.33</p>
                            </div>

                            <div>
                              <div className="text-[10px] font-bold text-sky-600">2022-2024</div>
                              <h3 className="font-bold text-slate-900">Intermediate</h3>
                              <p className="text-slate-500">Narayana junior college - Kakinada</p>
                              <p className="font-semibold text-slate-805 mt-0.5">Percentage: 95%</p>
                            </div>

                            <div>
                              <div className="text-[10px] font-bold text-sky-600">2021-2022</div>
                              <h3 className="font-bold text-slate-900">SSC</h3>
                              <p className="text-slate-500">Dr.SRK MCH School - Kakinada</p>
                              <p className="font-semibold text-slate-805 mt-0.5">Percentage: 90%</p>
                            </div>
                          </div>
                        </div>

                        {/* Contacts & Links */}
                        <div>
                          <h2 className="text-sm font-extrabold tracking-wider text-slate-900 uppercase border-b-2 border-slate-800 pb-1 mb-3">
                            Links
                          </h2>
                          <div className="space-y-3 font-medium">
                            <div>
                              <div className="text-[10px] uppercase font-bold text-slate-400">Linkedin</div>
                              <a 
                                href="https://www.linkedin.com/in/sk-sohel-927753305" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-sky-600 hover:underline flex items-center gap-1 mt-0.5 cursor-pointer text-[11px]"
                              >
                                <span>sk-sohel-927753305</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>

                            <div>
                              <div className="text-[10px] uppercase font-bold text-slate-400">Github</div>
                              <a 
                                href="https://github.com/sohel-917" 
                                target="_blank" 
                                rel="noreferrer" 
                                className="text-sky-600 hover:underline flex items-center gap-1 mt-0.5 cursor-pointer text-[11px]"
                              >
                                <span>sohel-917</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Languages Known */}
                        <div>
                          <h2 className="text-sm font-extrabold tracking-wider text-slate-900 uppercase border-b-2 border-slate-800 pb-1 mb-3">
                            Languages
                          </h2>
                          <ul className="list-disc list-inside text-slate-600 pl-0.5">
                            <li>Telugu</li>
                            <li>English</li>
                            <li>Hindi</li>
                          </ul>
                        </div>

                        {/* Tools & DevOps */}
                        <div>
                          <h2 className="text-sm font-extrabold tracking-wider text-slate-900 uppercase border-b-2 border-slate-800 pb-1 mb-3">
                            Tools & DevOps
                          </h2>
                          <ul className="list-disc list-inside text-slate-600 pl-0.5">
                            <li>GitHub</li>
                            <li>VS Code</li>
                            <li>Excel Automation</li>
                          </ul>
                        </div>

                      </div>

                    </div>
                  </div>

                </main>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
