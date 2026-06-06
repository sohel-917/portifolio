import { Sparkles, Calendar, Award, GraduationCap } from "lucide-react";
import EducationTimeline from "../components/EducationTimeline";

export default function Education() {
  return (
    <div id="education-page-container" className="max-w-4xl mx-auto px-4 py-12 md:py-20 space-y-16">
      
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/20 border border-sky-150/50 dark:border-sky-800/40">
          <Award className="h-3.5 w-3.5 text-sky-500" />
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-sky-700 dark:text-sky-305">
            Education Milestones
          </span>
        </div>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight">
          My Academic Narrative
        </h1>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-405 leading-relaxed font-sans max-w-lg mx-auto">
          From secondary primary foundation metrics to cutting-edge artificial intelligence systems at Pragati Engineering College.
        </p>
      </div>

      {/* Vertical Timeline component */}
      <div className="p-2 md:p-6 bg-slate-50/25 dark:bg-slate-950/20 rounded-3xl border border-slate-150/60 dark:border-slate-800/30 dark:glass">
        <EducationTimeline />
      </div>

      {/* High GPA Callout Badge */}
      <div className="accent-gradient text-white rounded-3xl p-8 text-center space-y-4 shadow-xl shadow-sky-500/10 dark:shadow-sky-500/5">
        <h3 className="font-display font-black text-2xl md:text-3xl tracking-tight text-white">
          Current Academic Standings: 9.33 / 10 CGPA
        </h3>
        <p className="text-sm text-sky-100 max-w-md mx-auto leading-relaxed">
          Maintaining topmost grades across numerical algebra, statistical analysis systems, artificial neural modules, and software architecture fundamentals.
        </p>
        <div className="text-xs font-mono font-semibold bg-white/20 px-3 py-1.5 rounded-lg inline-block text-white">
          Semester Exams Audit Rank: Top Percentile
        </div>
      </div>

    </div>
  );
}
