import { GraduationCap, Award, BookOpen, MapPin, Calendar, CheckCircle2 } from "lucide-react";

export default function EducationTimeline() {
  const steps = [
    {
      institution: "Pragati Engineering College",
      location: "Surampalem, Kakinada, Andhra Pradesh, India",
      degree: "B.Tech in Artificial Intelligence",
      duration: "2024 - 2028 (Present)",
      metric: "CGPA: 9.33 / 10",
      description: "Undergoing extensive specialization in machine learning, artificial intelligence model training, Python neural network frameworks, automation architectures, and discrete data structures. Active in AI hackathons, research labs, and technical technical committees.",
      achievements: [
        "Earned outstanding 9.33 cumulative GPA over semesters",
        "Pioneered high-accuracy 'Type Master' web application and custom 'Fintech Spend Analyzer'",
        "Specialized in Excel office automation toolpacks and algorithmic problem solving in Python/Java"
      ],
      badgeColor: "bg-sky-100 text-sky-850 dark:bg-sky-950/45 dark:text-sky-300 border border-transparent dark:border-sky-505/10"
    },
    {
      institution: "Narayana Junior College",
      location: "Kakinada, Andhra Pradesh",
      degree: "Board of Intermediate Education, MPC",
      duration: "2022 - 2024",
      metric: "Percentage: 95.0%",
      description: "Excelled in high-level mathematics, physics, and chemistry (MPC). Built logical analysis foundations and secured excellent scores in national engineering entrance exams.",
      achievements: [
        "Ranked in top academic percentile with 95% total score",
        "Perfect marks in advanced mathematics and coordinate geometry chapters"
      ],
      badgeColor: "bg-emerald-100 text-emerald-850 dark:bg-emerald-950/40 dark:text-emerald-305"
    },
    {
      institution: "Dr. SRK MCH School",
      location: "Kakinada, Andhra Pradesh",
      degree: "SSC Secondary School Certification",
      duration: "2021 - 2022",
      metric: "Percentage: 90.0%",
      description: "Completed secondary education emphasizing math, foundational sciences, computer training, and regional languages. Cultivated coding interest here through early computer science electives.",
      achievements: [
        "Scored 90% in final state board exams with perfect grade in multiple subjects",
        "Represented school in state science fair and logic math Olympiads"
      ],
      badgeColor: "bg-indigo-100 text-indigo-850 dark:bg-indigo-950/40 dark:text-indigo-300"
    }
  ];

  return (
    <div id="education-timeline-vertical" className="relative border-l-2 border-slate-200 dark:border-slate-800/80 ml-4 md:ml-8 pl-6 md:pl-10 py-4 space-y-12">
      {steps.map((step, idx) => (
        <div key={idx} className="relative group">
          {/* Circular Indicator node */}
          <div className="absolute -left-[39px] md:-left-[55px] top-1.5 w-6 h-6 rounded-full border-4 border-white dark:border-slate-950 bg-sky-600 dark:bg-sky-500 flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-110 transition-transform">
            <GraduationCap className="h-3 w-3 text-white" />
          </div>

          <div className="bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/80 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow dark:glass">
            {/* Header metrics */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 font-sans">
              <div>
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-bold tracking-tight mb-2 ${step.badgeColor}`}>
                  {step.metric}
                </span>
                <h3 className="font-display font-bold text-slate-900 dark:text-white text-xl md:text-2xl tracking-tight">
                  {step.institution}
                </h3>
                <p className="text-sm font-mono text-slate-505 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-sky-500" />
                  <span className="font-semibold text-slate-705 dark:text-slate-300">{step.degree}</span>
                </p>
              </div>

              <div className="text-left md:text-right text-xs space-y-1 font-mono text-slate-500 dark:text-slate-400 shrink-0">
                <div className="flex items-center md:justify-end gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-sky-555" />
                  <span>{step.duration}</span>
                </div>
                <div className="flex items-center md:justify-end gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-sky-555" />
                  <span>{step.location}</span>
                </div>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-5 font-sans">
              {step.description}
            </p>

            {/* Achievements bullets with custom checkboxes */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold font-mono text-slate-405 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5 mb-3">
                <Award className="h-3.5 w-3.5 text-sky-500" />
                <span>Academic Achievements</span>
              </h4>
              <ul className="space-y-2 font-sans">
                {step.achievements.map((achievement, bulletIdx) => (
                  <li key={bulletIdx} className="flex items-start gap-2 text-sm text-slate-650 dark:text-slate-400">
                    <CheckCircle2 className="h-4.5 w-4.5 text-sky-500 dark:text-sky-400 shrink-0 mt-0.5" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
