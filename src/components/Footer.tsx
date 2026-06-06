import { Mail, Phone, MapPin, Github, Linkedin, Calendar, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer id="main-footer" className="bg-slate-50 dark:bg-slate-950 border-t border-slate-150 dark:border-slate-800/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Column 1: Brand & Subtext */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-lg text-gray-950 dark:text-white">
              Shaik Sohel
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm">
              B.Tech Artificial Intelligence scholar specialized in building high-accuracy models, typing automation engines, and personalized behavioral finance dashboards.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://github.com/sohel-917" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-350 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-500 transition-colors"
                title="GitHub Profile"
              >
                <Github className="h-4.5 w-4.5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/sk-sohel-927753305" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-350 hover:bg-sky-600 hover:text-white dark:hover:bg-sky-500 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Contacts */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-sm text-slate-900 dark:text-slate-200 uppercase tracking-wider">
              Get In Touch
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a 
                  href="mailto:sks510805@gmail.com" 
                  className="flex items-center space-x-2.5 text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-450 transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0 text-sky-500" />
                  <span className="truncate">sks510805@gmail.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+919177338220" 
                  className="flex items-center space-x-2.5 text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-450 transition-colors"
                >
                  <Phone className="h-4 w-4 shrink-0 text-sky-500" />
                  <span>+91 9177338220</span>
                </a>
              </li>
              <li className="flex items-center space-x-2.5 text-slate-600 dark:text-slate-400">
                <MapPin className="h-4 w-4 shrink-0 text-sky-500" />
                <span>Kakinada, Andhra Pradesh, India</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Stats Summary */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-sm text-slate-900 dark:text-slate-200 uppercase tracking-wider">
              Educational Details
            </h4>
            <div className="bg-slate-100/60 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/80 rounded-xl p-3.5 space-y-2.5 text-sm">
              <div className="flex justify-between items-center text-xs dark:text-slate-300">
                <span className="font-mono font-medium hover:text-sky-600">Pragati Engg College</span>
                <span className="font-bold bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-350 px-2 py-0.5 rounded">9.33 CGPA</span>
              </div>
              <div className="flex justify-between items-center text-xs dark:text-slate-300">
                <span className="font-mono">Intermediate MPC (Narayana)</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-450">95.0%</span>
              </div>
              <div className="flex justify-between items-center text-xs dark:text-slate-300">
                <span className="font-mono">SSC Secondary School</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400 font-bold">90.0%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800/60 mt-8 pt-6 text-center">
          <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">
            Personal Portfolio
          </p>
        </div>
      </div>
    </footer>
  );
}
