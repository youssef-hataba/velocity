import { Users, Star, TrendingUp } from "lucide-react";

interface MetricsProps {
  totalMembers: number;
  topPerformer: string;
  avgEfficiency: number;
}

export const TeamMetrics = ({ totalMembers, topPerformer, avgEfficiency }: MetricsProps) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <div className="bg-primary/5 border border-primary/10 p-6 rounded-[2.5rem] flex items-center gap-5">
      <div className="p-4 bg-primary/10 rounded-2xl text-primary"><Users size={24}/></div>
      <div>
        <p className="text-[9px] font-black opacity-40 uppercase tracking-widest">Team Size</p>
        <p className="text-2xl font-black">{totalMembers}</p>
      </div>
    </div>
    <div className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-[2.5rem] flex items-center gap-5">
      <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500"><Star size={24}/></div>
      <div>
        <p className="text-[9px] font-black opacity-40 uppercase tracking-widest">Top Talent</p>
        <p className="text-2xl font-black truncate max-w-30">{topPerformer}</p>
      </div>
    </div>
    <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-[2.5rem] flex items-center gap-5">
      <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500"><TrendingUp size={24}/></div>
      <div>
        <p className="text-[9px] font-black opacity-40 uppercase tracking-widest">Avg. Efficiency</p>
        <p className="text-2xl font-black">{avgEfficiency}%</p>
      </div>
    </div>
  </div>
);