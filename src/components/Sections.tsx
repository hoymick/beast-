import React from "react";
import { motion } from "motion/react";
import { Trophy, Globe, Zap, CheckCircle2 } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-white">
                The World's <span className="text-neon-pink glow-text-pink">Most Intense</span> Games
              </h2>
              <p className="text-xl text-white/60 leading-relaxed">
                We're searching for 500 individuals to compete in a series of high-stakes, 
                adrenaline-pumping challenges. This isn't just a game—it's BEAST GAMES.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FeatureCard 
                icon={<Trophy className="w-6 h-6 text-neon-yellow" />}
                title="$1,000,000 Grand Prize"
                description="The winner takes it all. No second place, no excuses."
              />
              <FeatureCard 
                icon={<Globe className="w-6 h-6 text-neon-blue" />}
                title="Global Stage"
                description="Compete in front of millions of viewers worldwide."
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-3xl overflow-hidden neon-border-pink"
          >
            <img 
              src="https://picsum.photos/seed/arena/800/800" 
              alt="BEAST GAMES Arena" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neon-pink/40 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function WhoCanApplySection() {
  return (
    <section id="who" className="py-24 px-4 bg-white/5">
      <div className="max-w-7xl mx-auto text-center space-y-16">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-white">
            Who Can <span className="text-neon-purple">Apply?</span>
          </h2>
          <p className="text-xl text-white/40 max-w-2xl mx-auto">
            We don't care who you are, we care what you can do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <RequirementCard 
            number="01"
            title="Age 18+"
            description="Must be of legal age to participate in high-intensity challenges."
          />
          <RequirementCard 
            number="02"
            title="Any Country"
            description="We are accepting applications from every corner of the globe."
          />
          <RequirementCard 
            number="03"
            title="Bold & Creative"
            description="If you're boring, don't bother. We want the wild ones."
          />
        </div>
      </div>
    </section>
  );
}

export function HowItWorksSection() {
  const steps = [
    { title: "Apply", description: "Fill out the form and upload your audition video.", icon: <Zap className="w-6 h-6" /> },
    { title: "Get Selected", description: "Our team reviews every single application.", icon: <CheckCircle2 className="w-6 h-6" /> },
    { title: "Compete", description: "Fly to our secret arena and face the challenges.", icon: <Trophy className="w-6 h-6" /> },
    { title: "Win", description: "Be the last one standing and claim the $1M.", icon: <Zap className="w-6 h-6" /> },
  ];

  return (
    <section id="how" className="py-24 px-4 bg-black">
      <div className="max-w-7xl mx-auto space-y-16">
        <h2 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-center text-white">
          How It <span className="text-neon-yellow">Works</span>
        </h2>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex flex-col items-center text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-black border-2 border-neon-yellow flex items-center justify-center text-neon-yellow shadow-[0_0_15px_rgba(247,255,0,0.3)]">
                  {step.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-bold text-white">{step.title}</h3>
                  <p className="text-sm text-white/40">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
        {icon}
      </div>
      <div className="space-y-1">
        <h4 className="text-lg font-bold text-white uppercase tracking-tight">{title}</h4>
        <p className="text-sm text-white/40">{description}</p>
      </div>
    </div>
  );
}

function RequirementCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="p-8 rounded-3xl bg-black border border-white/10 space-y-6 group hover:border-neon-purple transition-all duration-300">
      <div className="text-5xl font-display font-black text-white/10 group-hover:text-neon-purple/20 transition-colors">
        {number}
      </div>
      <div className="space-y-2">
        <h4 className="text-2xl font-display font-bold text-white">{title}</h4>
        <p className="text-sm text-white/40 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
