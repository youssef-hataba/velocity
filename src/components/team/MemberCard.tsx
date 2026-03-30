import { motion } from "framer-motion";
import { User2, CheckCircle2, Clock } from "lucide-react";
import { MemberActivityHeatmap } from "./MemberActivityHeatmap";
import { type Task } from "../../types/board";

interface MemberProps {
  id: string;
  name: string;
  role: string;
  completed: number;
  total: number;
  efficiency: number;
  tasks: Task[];
}

export const MemberCard = ({ id, name, role, completed, total, efficiency, tasks }: MemberProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-steel/5 border border-white/5 p-6 rounded-[2.5rem] backdrop-blur-md group hover:bg-white/10 transition-all duration-500"
  >
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
        <User2 className="text-primary/60" size={20} />
      </div>
      <div>
        <h4 className="text-xs font-black uppercase tracking-tighter">{name}</h4>
        <p className="text-[9px] font-bold opacity-30 uppercase">{role}</p>
      </div>
      <div className="ml-auto text-right">
        <span className="text-xl font-black italic text-primary">{efficiency}%</span>
      </div>
    </div>

    <MemberActivityHeatmap memberId={id} tasks={tasks} />

    <div className="space-y-3 mt-6">
      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${efficiency}%` }}
          className={`h-full rounded-full ${efficiency > 70 ? 'bg-emerald-500' : 'bg-primary'}`}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <div className="flex items-center gap-1">
            <CheckCircle2 size={10} className="text-emerald-500" />
            <span className="text-[9px] font-black opacity-60">{completed}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={10} className="text-primary" />
            <span className="text-[9px] font-black opacity-60">{total - completed}</span>
          </div>
        </div>
        <span className="text-[8px] font-bold opacity-20 uppercase tracking-widest">Performance Index</span>
      </div>
    </div>
  </motion.div>
);