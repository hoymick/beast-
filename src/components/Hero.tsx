import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Countdown } from "./ui/Countdown";
import { Users, Zap, Loader2 } from "lucide-react";
import { generateHeroImage } from "@/src/services/gemini";

interface HeroProps {
  onApplyClick: () => void;
}

export function Hero({ onApplyClick }: HeroProps) {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 7);

  useEffect(() => {
    async function loadImage() {
      const img = await generateHeroImage();
      if (img) setHeroImage(img);
      setIsLoading(false);
    }
    loadImage();
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {isLoading ? (
          <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
            <Loader2 className="w-12 h-12 text-neon-blue animate-spin" />
          </div>
        ) : (
          <motion.img
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 1.5 }}
            src={heroImage || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop"}
            alt="Competition Arena"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl w-full text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-purple/20 border border-neon-purple/40 text-neon-purple text-xs font-bold uppercase tracking-widest">
            <Zap className="w-4 h-4 fill-neon-purple" />
            Global Competition Live
          </div>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-display font-black uppercase tracking-tighter leading-none text-white">
            Apply for the <br />
            <span className="text-neon-blue glow-text-blue">BEAST GAMES</span>
          </h1>
          <p className="text-xl md:text-3xl font-medium text-white/80 max-w-2xl mx-auto">
            $1,000,000 prize. Only the bold will be selected.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col items-center gap-8"
        >
          <Button size="lg" variant="neon" onClick={onApplyClick} className="group">
            Apply Now
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="ml-2"
            >
              →
            </motion.span>
          </Button>

          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-white/40 font-bold">Registration Closes In</p>
            <Countdown targetDate={targetDate} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-8 pt-12"
        >
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-neon-blue/20">
              <Users className="w-5 h-5 text-neon-blue" />
            </div>
            <div className="text-left">
              <div className="text-xl font-display font-bold text-white">127 / 500</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">Spots Remaining</div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm">
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
            </div>
            <div className="text-left">
              <div className="text-xl font-display font-bold text-white">4,281</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">People Applying Now</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
