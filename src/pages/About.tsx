import { Sparkles, Brain, Award, Users, Coffee, Mail, Phone, MapPin, CheckCircle } from "lucide-react";

export default function About() {
  const stats = [
    { label: "B.Tech CGPA", value: "9.33/10" },
    { label: "Completion year", value: "2028" },
    { label: "Logical Language stack", value: "Python / Java / C" },
    { label: "Focus Domain", value: "Machine Learning / Analytics" },
  ];

  return (
    <div id="about-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16">
      
      {/* Title block */}
      <div className="max-w-3xl">
        <div className="text-xs font-mono font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase flex items-center gap-2 mb-2">
          <Sparkles className="h-4 w-4" />
          <span>About Me</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight">
          Pioneering AI-Driven Automation & <span className="text-gradient font-black">Intelligent Systems</span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 leading-relaxed font-sans">
          Get to know my academic journey, research motivations, and the core coding ethics I follow at Pragati Engineering College.
        </p>
      </div>

      {/* Grid: Narrative bio & Quick Profile details card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Biography */}
        <div className="lg:col-span-7 space-y-6 text-gray-700 dark:text-gray-300">
          <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl tracking-tight">
            Shaik Sohel — Scholar, Developer & Problem Solver
          </h2>
          
          <p className="leading-relaxed">
            I am currently pursuing my **B.Tech in Artificial Intelligence (2024 - 2028)** at the prestigious **Pragati Engineering College** in Andhra Pradesh, India. With an outstanding CGPA of **9.33/10**, I focus on building real-world machine learning algorithms and software automation workflows.
          </p>

          <p className="leading-relaxed">
            My development journey started with basic automation logic and mathematical systems, which quickly evolved into building complex engineering platforms. Whether it's crafting typing metrics for **Type Master**, parsing financial ledgers for **Personalized Financial Behaviour Analyzer**, or writing Python scripts for excel formatting, I'm passionate about writing production-grade code.
          </p>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/45 border border-slate-150 dark:border-slate-800/80 space-y-4 dark:glass">
            <h3 className="font-display font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-base">
              <Brain className="h-5 w-5 text-sky-505" />
              <span>Academic Interests & Objectives</span>
            </h3>
            <p className="text-sm text-slate-650 dark:text-slate-400 leading-relaxed font-sans">
              My technical research seeks to democratize advanced prediction and analysis tools for non-technical users. I specialize in predictive analytics, mathematical foundations of machine learning, automated office pipelines, and relational database integrations.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-display font-semibold text-slate-900 dark:text-white text-lg">
              Technical Principles I Hold Close:
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <li className="flex items-center gap-2.5">
                <CheckCircle className="h-4.5 w-4.5 text-sky-500 shrink-0" />
                <span>Type Safe, Fully Documented Code</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="h-4.5 w-4.5 text-sky-500 shrink-0" />
                <span>Mobile Responsive & Accessible UI</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="h-4.5 w-4.5 text-sky-500 shrink-0" />
                <span>Offline-safe Data Fallbacks</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle className="h-4.5 w-4.5 text-sky-500 shrink-0" />
                <span>Modular Architecture Patterns</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick specs Sidebar Card */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm dark:glass">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-sky-100 dark:bg-sky-950/40 rounded-2xl flex items-center justify-center text-sky-600 dark:text-sky-400">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-slate-950 dark:text-white text-lg">
                Shaik Sohel
              </h3>
              <p className="text-xs font-mono text-slate-500">B.Tech Student (AI)</p>
            </div>
          </div>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Contact & Detail rows */}
          <div className="space-y-4 text-sm font-sans">
            <div className="flex items-center gap-3">
              <Mail className="h-4.5 w-4.5 text-sky-500 shrink-0" />
              <div>
                <div className="text-xs font-bold font-mono text-slate-405 dark:text-slate-500 uppercase">Primary Email</div>
                <a href="mailto:sks510805@gmail.com" className="text-slate-700 dark:text-slate-300 hover:underline">sks510805@gmail.com</a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4.5 w-4.5 text-sky-505 shrink-0" />
              <div>
                <div className="text-xs font-bold font-mono text-slate-405 dark:text-slate-500 uppercase">Contact Phone</div>
                <a href="tel:+919177338220" className="text-slate-700 dark:text-slate-300 hover:underline">+91 9177338220</a>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin className="h-4.5 w-4.5 text-sky-505 shrink-0" />
              <div>
                <div className="text-xs font-bold font-mono text-slate-405 dark:text-slate-500 uppercase">Location</div>
                <span className="text-slate-700 dark:text-slate-300">Kakinada, Andhra Pradesh, India</span>
              </div>
            </div>
          </div>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Quick Metrics */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold font-mono text-slate-405 dark:text-slate-500 uppercase tracking-wider">
              Academic Dashboard Status
            </h4>
            <div className="grid grid-cols-2 gap-3.5">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-150 dark:border-slate-850">
                <span className="block text-xl font-display font-black text-sky-600 dark:text-sky-400">9.33</span>
                <span className="block text-[10px] font-mono font-bold uppercase tracking-tight text-slate-450 dark:text-slate-400 mt-0.5">CGPA</span>
              </div>
              <div className="p-3.5 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-150 dark:border-slate-850">
                <span className="block text-xl font-display font-black text-indigo-650 dark:text-indigo-400">3+</span>
                <span className="block text-[10px] font-mono font-bold uppercase tracking-tight text-slate-450 dark:text-slate-400 mt-0.5">Core builds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
