import { Sparkles, Code2, Terminal, Hammer, Cpu, Database, Binary, CheckCircle } from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Core Programming Languages",
      icon: <Code2 className="h-5 w-5 text-blue-500" />,
      skills: [
        { name: "Python", rating: 95, desc: "Primary language for analytical neural networks, machine learning operations, and excel automation files." },
        { name: "Java", rating: 90, desc: "Strong object-oriented architecture foundation, multi-threading pipelines, and data structure benchmarks." },
        { name: "C Language", rating: 85, desc: "Deep understanding of pointers, system memory maps, algorithm efficiency, and machine cycles." }
      ]
    },
    {
      title: "Professional Competencies",
      icon: <Cpu className="h-5 w-5 text-emerald-500" />,
      skills: [
        { name: "Problem Solving", rating: 92, desc: "Algorithmic analysis, discrete operations, space-time complexity analysis, and mathematical logic." },
        { name: "Excel Automation", rating: 95, desc: "Writing background openpyxl scripts, automating messy spreadsheets, data cleansing, and formulas." }
      ]
    },
    {
      title: "Tools & Ecosystems",
      icon: <Hammer className="h-5 w-5 text-amber-500" />,
      skills: [
        { name: "GitHub", rating: 88, desc: "Version controls, branches, collaborative pipelines, actions integration, and repo distribution." },
        { name: "VS Code", rating: 94, desc: "Primary IDE optimized with custom linter extensions, terminal configurations, and remote workspace." }
      ]
    }
  ];

  return (
    <div id="skills-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16">
      
      {/* Title Header */}
      <div className="max-w-3xl">
        <div className="text-xs font-mono font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase flex items-center gap-2 mb-2">
          <Terminal className="h-4 w-4" />
          <span>Capability Matrix</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight">
          Shaik Sohel's Engineering <span className="text-gradient font-black">Stack & Skills</span>
        </h1>
        <p className="text-lg text-slate-650 dark:text-slate-400 mt-4 leading-relaxed font-sans">
          A metrics-driven look into my coding fluency, theoretical analytical limits, and daily workspace operations.
        </p>
      </div>

      {/* Grid containing categories of metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/80 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm hover:shadow-md transition-shadow dark:glass">
            
            {/* Category Header */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center border border-slate-150 dark:border-slate-800">
                {category.icon}
              </div>
              <h2 className="font-display font-bold text-slate-900 dark:text-white text-lg tracking-tight">
                {category.title}
              </h2>
            </div>

            {/* List of skills */}
            <div className="space-y-6">
              {category.skills.map((skill, skillIdx) => (
                <div key={skillIdx} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="font-display font-bold text-sm text-slate-900 dark:text-white">
                      {skill.name}
                    </span>
                    <span className="font-mono text-xs font-bold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/40 px-2 py-0.5 rounded">
                      {skill.rating}%
                    </span>
                  </div>

                  {/* Progressive Bar */}
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden bg-slate-200">
                    <div
                      className="h-full bg-gradient-to-r from-sky-455 via-indigo-405 to-indigo-600 rounded-full transition-all duration-1000 bg-sky-500"
                      style={{ width: `${skill.rating}%` }}
                    />
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                    {skill.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* Logic Testbeds certifications statement */}
      <div className="bg-gradient-to-br from-emerald-555/5 to-sky-500/5 dark:from-emerald-950/10 dark:to-sky-950/15 border border-emerald-150/80 dark:border-emerald-900/30 p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 dark:glass">
        <div className="space-y-1.5 max-w-2xl font-sans">
          <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
            <Binary className="h-5 w-5 text-emerald-500" />
            <span>Competitive Programming & Problem Solving</span>
          </h3>
          <p className="text-sm text-slate-650 dark:text-slate-450 leading-relaxed">
            Proficient in resolving mid-to-high core algorithm challenges on platforms like LeetCode and HackerRank, focusing on tree traversal systems, array sorting methodologies, and dynamic mathematical recursion paths.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-white dark:bg-slate-950 px-4 py-2 border border-emerald-250 dark:border-emerald-800/60 rounded-xl text-emerald-700 dark:text-emerald-300 font-mono text-xs font-bold">
          <CheckCircle className="h-4.5 w-4.5 text-emerald-505" />
          <span>Active Practice Matrix</span>
        </div>
      </div>

    </div>
  );
}
