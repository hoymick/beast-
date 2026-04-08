import { useState } from "react";
import { motion } from "motion/react";
import { Applicant } from "@/src/types";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Search, Filter, Eye, CheckCircle, XCircle, Clock, Globe } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface AdminDashboardProps {
  applicants: Applicant[];
  onUpdateStatus: (id: string, status: Applicant['status']) => void;
}

export function AdminDashboard({ applicants, onUpdateStatus }: AdminDashboardProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Applicant['status'] | 'all'>('all');

  const filteredApplicants = applicants.filter(a => {
    const matchesSearch = a.fullName.toLowerCase().includes(search.toLowerCase()) || 
                         a.country.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || a.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 py-12 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl font-display font-black uppercase tracking-tighter text-white">
            Applicant <span className="text-neon-blue">Dashboard</span>
          </h2>
          <p className="text-white/40 text-sm uppercase tracking-widest font-bold">
            Reviewing {applicants.length} total applications
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input 
              placeholder="Search by name or country..." 
              className="pl-10 h-10 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'pending', 'reviewed', 'selected', 'rejected'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all",
                  filter === f 
                    ? "bg-neon-blue border-neon-blue text-black" 
                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredApplicants.map((applicant) => (
          <motion.div
            layout
            key={applicant.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-neon-blue/40 transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="space-y-1">
                <h3 className="text-xl font-display font-bold text-white group-hover:text-neon-blue transition-colors">
                  {applicant.fullName}
                </h3>
                <div className="flex items-center gap-2 text-xs text-white/40 font-medium uppercase tracking-widest">
                  <Globe className="w-3 h-3" /> {applicant.country} • {applicant.age}y/o
                </div>
              </div>
              <StatusBadge status={applicant.status} />
            </div>

            <div className="space-y-4 mb-6">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-widest font-bold text-white/20">Why pick you?</p>
                <p className="text-sm text-white/60 line-clamp-2 italic">"{applicant.whyPickYou}"</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-neon-blue hover:underline cursor-pointer">
                <Eye className="w-4 h-4" /> View Audition Video
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-white/10">
              <button 
                onClick={() => onUpdateStatus(applicant.id, 'selected')}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-green-500/10 text-green-500 text-[10px] font-bold uppercase tracking-widest hover:bg-green-500 hover:text-black transition-all"
              >
                <CheckCircle className="w-3 h-3" /> Select
              </button>
              <button 
                onClick={() => onUpdateStatus(applicant.id, 'rejected')}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500/10 text-red-500 text-[10px] font-bold uppercase tracking-widest hover:bg-red-500 hover:text-black transition-all"
              >
                <XCircle className="w-3 h-3" /> Reject
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: Applicant['status'] }) {
  const styles = {
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    reviewed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    selected: "bg-green-500/10 text-green-500 border-green-500/20",
    rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  const icons = {
    pending: <Clock className="w-3 h-3" />,
    reviewed: <Eye className="w-3 h-3" />,
    selected: <CheckCircle className="w-3 h-3" />,
    rejected: <XCircle className="w-3 h-3" />,
  };

  return (
    <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border", styles[status])}>
      {icons[status]}
      {status}
    </div>
  );
}
