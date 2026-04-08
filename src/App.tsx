import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Hero } from "./components/Hero";
import { AboutSection, WhoCanApplySection, HowItWorksSection } from "./components/Sections";
import { ApplicationForm, SuccessPage } from "./components/ApplicationForm";
import { AdminDashboard } from "./components/AdminDashboard";
import { Button } from "./components/ui/Button";
import { Applicant } from "./types";
import { Trophy, Menu, X, ShieldCheck } from "lucide-react";
import { cn } from "./lib/utils";

const MOCK_APPLICANTS: Applicant[] = [
  {
    id: "1",
    fullName: "Alex Rivera",
    email: "alex@example.com",
    age: 24,
    country: "Mexico",
    whyPickYou: "I've survived a week in the jungle with nothing but a knife. I'm ready for anything.",
    whatMakesYouDifferent: "I have zero fear of heights or spiders.",
    craziestThing: "Skydived from a hot air balloon.",
    videoUrl: "https://youtube.com/watch?v=123",
    socialMedia: "@alex_wild",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    fullName: "Sarah Chen",
    email: "sarah@example.com",
    age: 21,
    country: "Singapore",
    whyPickYou: "I'm a professional rock climber and I've won 3 national championships.",
    whatMakesYouDifferent: "I can hold my breath for 4 minutes.",
    craziestThing: "Climbed a 300ft building without ropes.",
    videoUrl: "https://youtube.com/watch?v=456",
    socialMedia: "@sarah_climbs",
    status: "selected",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    fullName: "Marcus Thorne",
    email: "marcus@example.com",
    age: 29,
    country: "United Kingdom",
    whyPickYou: "I'm a former paratrooper. I thrive under pressure.",
    whatMakesYouDifferent: "My tactical thinking is my greatest weapon.",
    craziestThing: "Completed a 100-mile ultramarathon in the desert.",
    videoUrl: "https://youtube.com/watch?v=789",
    socialMedia: "@m_thorne_tactical",
    status: "rejected",
    createdAt: new Date().toISOString(),
  }
];

export default function App() {
  const [view, setView] = useState<'home' | 'apply' | 'success' | 'admin'>('home');
  const [applicants, setApplicants] = useState<Applicant[]>(MOCK_APPLICANTS);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleApply = (data: any) => {
    const newApplicant: Applicant = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    setApplicants([newApplicant, ...applicants]);
    setView('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateStatus = (id: string, status: Applicant['status']) => {
    setApplicants(applicants.map(a => a.id === id ? { ...a, status } : a));
  };

  return (
    <div className="min-h-screen bg-black selection:bg-neon-blue selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => setView('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-neon-blue flex items-center justify-center shadow-[0_0_15px_rgba(0,242,255,0.3)] group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6 text-black stroke-[2.5]" />
            </div>
            <span className="text-xl font-display font-black uppercase tracking-tighter text-white">
              BEAST <span className="text-neon-blue">GAMES</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#who">Who Can Apply</NavLink>
            <NavLink href="#how">How It Works</NavLink>
            <button 
              onClick={() => setView('admin')}
              className="text-xs uppercase tracking-widest font-bold text-white/40 hover:text-white transition-colors flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" /> Admin
            </button>
            <button 
              onClick={() => setView('apply')}
              className="px-6 py-2 rounded-full bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-neon-blue transition-all"
            >
              Apply Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-4 md:hidden"
          >
            <div className="flex flex-col gap-6 text-center">
              <MobileNavLink href="#about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
              <MobileNavLink href="#who" onClick={() => setIsMenuOpen(false)}>Who Can Apply</MobileNavLink>
              <MobileNavLink href="#how" onClick={() => setIsMenuOpen(false)}>How It Works</MobileNavLink>
              <button 
                onClick={() => { setView('admin'); setIsMenuOpen(false); }}
                className="text-lg font-display font-bold uppercase text-white/40"
              >
                Admin
              </button>
              <button 
                onClick={() => { setView('apply'); setIsMenuOpen(false); }}
                className="py-4 rounded-2xl bg-neon-blue text-black font-display font-black uppercase text-xl"
              >
                Apply Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-20">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero onApplyClick={() => setView('apply')} />
              <AboutSection />
              <WhoCanApplySection />
              <HowItWorksSection />
              
              {/* Footer */}
              <footer className="py-12 border-t border-white/10 text-center">
                <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold">
                  © 2026 BEAST GAMES. All Rights Reserved.
                </p>
              </footer>
            </motion.div>
          )}

          {view === 'apply' && (
            <motion.div
              key="apply"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-20 px-4"
            >
              <ApplicationForm 
                onSuccess={handleApply} 
                onCancel={() => setView('home')} 
              />
            </motion.div>
          )}

          {view === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="px-4"
            >
              <SuccessPage onShare={() => alert("Shared to social media!")} />
              <div className="text-center pb-20">
                <Button variant="outline" onClick={() => setView('home')}>
                  Back to Home
                </Button>
              </div>
            </motion.div>
          )}

          {view === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AdminDashboard 
                applicants={applicants} 
                onUpdateStatus={updateStatus} 
              />
              <div className="text-center pb-20">
                <Button variant="outline" onClick={() => setView('home')}>
                  Exit Admin View
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a 
      href={href} 
      className="text-xs uppercase tracking-widest font-bold text-white/60 hover:text-neon-blue transition-colors"
    >
      {children}
    </a>
  );
}

function MobileNavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return (
    <a 
      href={href} 
      onClick={onClick}
      className="text-2xl font-display font-bold uppercase text-white hover:text-neon-blue transition-colors"
    >
      {children}
    </a>
  );
}
