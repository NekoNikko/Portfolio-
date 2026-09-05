import { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Linkedin, Github, MapPin, FileText, Send, CheckCircle2, AlertCircle, RefreshCw, Phone } from "lucide-react";
import { personalInfo } from "../data";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setTerminalLogs(["&gt; initiating smtp connection...", "&gt; resolving mailmx server..."]);

    // Simulate system connection steps for the contact form
    setTimeout(() => {
      setTerminalLogs((prev) => [...prev, "&gt; secure tls authentication authorized..."]);
      setTimeout(() => {
        setTerminalLogs((prev) => [...prev, "&gt; packaging message body...", "&gt; transmission delivered successfully!"]);
        setTimeout(() => {
          setStatus("success");
          setFormData({ name: "", email: "", subject: "", message: "" });
        }, 1000);
      }, 1000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-950/40 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-xs sm:text-sm tracking-widest text-primary uppercase mb-2">
            GET IN TOUCH
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Contact Me
          </h3>
          <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm sm:text-base font-sans">
            Have an IT project, network audit need, or system engineering task? Reach out via form terminal or standard direct channels.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent mx-auto mt-4 rounded-full" />
        </div>

        {/* Form and info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left panel: Direct info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-panel p-6 sm:p-8 rounded-3xl border-white/5 relative overflow-hidden shadow-2xl">
            {/* Background glowing corner */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-primary/5 rounded-br-full -z-10" />

            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none block">DIRECT_CHANNEL_INFO</span>
                <h4 className="font-display font-extrabold text-2xl text-white">
                  Marlon T. Argente
                </h4>
                <p className="text-slate-400 text-sm font-sans leading-relaxed">
                  Available for system design, active directory clustering, network validation, software support pipelines, and consulting.
                </p>
              </div>

              {/* Direct channels parameters */}
              <div className="space-y-4 font-mono text-xs sm:text-sm text-slate-300">
                
                {/* Email */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-primary/40 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase leading-none mb-1">Email Channel</div>
                    <a href={`mailto:${personalInfo.email}`} className="text-white hover:text-accent font-semibold transition-colors break-all">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-primary/40 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase leading-none mb-1">Location Node</div>
                    <span className="text-white font-semibold">{personalInfo.location}</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-primary/40 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase leading-none mb-1">Direct Hotline</div>
                    <a href={`tel:${personalInfo.phone}`} className="text-white hover:text-accent font-semibold transition-colors">
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Resume Action */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-primary/40 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase leading-none mb-1">Systems Document</div>
                    <a href="#" className="text-white hover:text-accent font-semibold transition-colors flex items-center gap-1.5">
                      Download Full Resume PDF
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Social channels badges footer */}
            <div className="mt-12 pt-6 border-t border-slate-800/80">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-4">SOCIAL_NODES_PING</span>
              <div className="flex items-center gap-4">
                <a
                  href={personalInfo.linkedin}
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-900 border border-slate-800 hover:border-primary/40 text-slate-400 hover:text-white hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 interactive"
                  title="Connect on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                <a
                  href={personalInfo.github}
                  className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-900 border border-slate-800 hover:border-primary/40 text-slate-400 hover:text-white hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 interactive"
                  title="Explore Github Repos"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right panel: Form Terminal (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between glass-panel p-6 sm:p-8 rounded-3xl border-white/5 relative overflow-hidden shadow-2xl">
            {/* Background glowing corner */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full -z-10" />

            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">MESSAGE_CONSOLE // SECURE_PORT_25</span>
                <span className="text-[10px] text-accent font-mono flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent" /> READY
                </span>
              </div>

              {/* Status handling */}
              <AnimatePresence mode="wait">
                {status === "idle" || status === "submitting" || status === "error" ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">sender_name:</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          disabled={status === "submitting"}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-850 text-white font-sans text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all disabled:opacity-50"
                          placeholder="e.g. John Doe"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">sender_email:</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          disabled={status === "submitting"}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-850 text-white font-sans text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all disabled:opacity-50"
                          placeholder="e.g. john@example.com"
                        />
                      </div>
                    </div>

                    {/* Subject input */}
                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">message_subject:</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        disabled={status === "submitting"}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-850 text-white font-sans text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all disabled:opacity-50"
                        placeholder="e.g. Active Directory Restructuring Request"
                      />
                    </div>

                    {/* Message textarea */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-xs font-mono text-slate-500 uppercase tracking-wider font-bold">message_body:</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        disabled={status === "submitting"}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-850 text-white font-sans text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all resize-none disabled:opacity-50 scrollbar-thin"
                        placeholder="Type system inquiry details here..."
                      />
                    </div>

                    {/* Error indicator */}
                    {status === "error" && (
                      <div className="flex items-center gap-2 p-3.5 bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs rounded-xl font-mono">
                        <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                        <span>ERROR: Core parameters empty. Make sure sender_name, sender_email, and message_body are complete.</span>
                      </div>
                    )}

                    {/* Submit action button */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="px-5 py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold text-xs tracking-wide flex items-center gap-2 shadow-lg shadow-primary/25 disabled:opacity-50 hover:shadow-primary/40 active:scale-95 transition-all duration-300 interactive"
                      >
                        {status === "submitting" ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" /> Packaging Transmission...
                          </>
                        ) : (
                          <>
                            Transmit Message <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>

                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="flex flex-col items-center justify-center py-16 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-display font-extrabold text-2xl text-white">Transmission Delivered!</h4>
                      <p className="text-slate-400 text-sm font-sans max-w-sm mx-auto">
                        Your inquiry packet successfully passed gateway filters. Marlon will respond to your registered node shortly.
                      </p>
                    </div>

                    <button
                      onClick={() => setStatus("idle")}
                      className="px-4 py-2 text-xs font-mono font-bold bg-slate-900 border border-slate-800 hover:border-primary text-slate-300 hover:text-white rounded-xl transition-all interactive"
                    >
                      &gt; reset terminal
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Live connection telemetry logs at bottom */}
            {status === "submitting" && (
              <div className="mt-6 border-t border-slate-800/80 pt-4">
                <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl font-mono text-[10px] text-slate-400 space-y-1">
                  {terminalLogs.map((log, idx) => (
                    <div key={idx} dangerouslySetInnerHTML={{ __html: log }} />
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
