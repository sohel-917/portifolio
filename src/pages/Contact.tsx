import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";
import { api } from "../api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successStatus, setSuccessStatus] = useState("");
  const [errorStatus, setErrorStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorStatus("");
    setSuccessStatus("");

    // Form Validations
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setErrorStatus("All details are required. Please check your form input fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorStatus("Please enter a valid, active email address.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await api.submitContact(formData);
      setSuccessStatus(response.message || "Your message was sent successfully! Under fallback mode, it is logged inside the server database.");
      // Reset form on success
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (err: any) {
      console.error("Inquiry submission failed:", err);
      setErrorStatus(
        err.response?.data?.error || "Unable to submit your request right now. Please test connection status."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="contact-page-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16">
      
      {/* Page Title */}
      <div className="max-w-3xl font-sans">
        <div className="text-xs font-mono font-bold tracking-widest text-sky-600 dark:text-sky-400 uppercase flex items-center gap-2 mb-2">
          <Send className="h-4 w-4" />
          <span>Get Connected</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl md:text-5xl text-slate-900 dark:text-white tracking-tight">
          Let’s Build Something <span className="text-gradient font-black">Meaningful Together</span>
        </h1>
        <p className="text-lg text-slate-650 dark:text-slate-400 mt-4 leading-relaxed">
          Have an AI pipeline challenge, an automation pipeline idea, or a project in mind? Drop a line here—all inquiries are stored securely in the database.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Side: Detail column */}
        <div className="lg:col-span-5 accent-gradient text-white p-8 md:p-10 rounded-3xl flex flex-col justify-between space-y-10 shadow-lg shadow-sky-500/10">
          <div className="space-y-6">
            <h3 className="font-display font-extrabold text-2xl tracking-tight text-white">
              Direct Contact Channels
            </h3>
            <p className="text-sm text-sky-100 leading-relaxed font-sans">
              Reach out via standard messaging channels or fill in the secure contact form. I respond to collegiate and engineering invitations within 24 hours.
            </p>
          </div>

          {/* Quick Info Rows */}
          <div className="space-y-6 text-sm font-sans">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="block text-xs font-bold font-mono tracking-widest text-sky-200 uppercase">Email Me</span>
                <a href="mailto:sks510805@gmail.com" className="hover:underline font-medium text-base select-all text-white">
                  sks510805@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="block text-xs font-bold font-mono tracking-widest text-sky-200 uppercase">Call Me</span>
                <a href="tel:+919177338220" className="hover:underline font-medium text-base select-all text-white">
                  +91 9177338220
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="block text-xs font-bold font-mono tracking-widest text-sky-200 uppercase">Location</span>
                <span className="font-medium text-base text-white">
                  Kakinada, Andhra Pradesh, India
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/15 pt-6 text-xs text-sky-200 font-mono">
            <span>Security Status: Connected via HTTPS </span>
          </div>
        </div>

        {/* Right Side: Interactive Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800/80 rounded-3xl p-6 md:p-10 shadow-sm flex flex-col justify-center dark:glass">
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <h3 className="font-display font-bold text-slate-955 dark:text-white text-xl tracking-tight mb-2">
              Send a Secure Message
            </h3>

            {/* Validation/Feedback displays */}
            {successStatus && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/25 border border-emerald-150 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-350 text-sm flex items-start gap-2.5">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500 mt-0.5" />
                <span>{successStatus}</span>
              </div>
            )}

            {errorStatus && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/25 border border-rose-150 dark:border-rose-900/60 text-rose-800 dark:text-rose-350 text-sm flex items-start gap-2.5">
                <AlertCircle className="h-5 w-5 shrink-0 text-rose-500 mt-0.5" />
                <span>{errorStatus}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-mono text-slate-405 dark:text-slate-500 uppercase">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Jane Doe"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 focus:outline-none focus:ring-2 focus:ring-sky-500 hover:border-slate-350 dark:hover:border-slate-700 transition-colors"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold font-mono text-slate-405 dark:text-slate-500 uppercase">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g., example@mail.com"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 focus:outline-none focus:ring-2 focus:ring-sky-500 hover:border-slate-350 dark:hover:border-slate-700 transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold font-mono text-slate-405 dark:text-slate-500 uppercase">Subject Topic</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g., Collaboration proposal"
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 focus:outline-none focus:ring-2 focus:ring-sky-500 hover:border-slate-350 dark:hover:border-slate-700 transition-colors"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold font-mono text-slate-405 dark:text-slate-500 uppercase">Message Details</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Type your inquiry details here..."
                className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-205 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 focus:outline-none focus:ring-2 focus:ring-sky-500 hover:border-slate-350 dark:hover:border-slate-700 transition-colors resize-none"
                required
              />
            </div>

            {/* Submit button with loader */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-xl text-white font-semibold text-sm tracking-wide shadow-md shadow-sky-500/10 cursor-pointer disabled:opacity-50 hover:scale-[1.01] transition-all font-sans accent-gradient"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Transmit Inquiry Message</span>
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
