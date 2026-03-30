import { LayoutDashboard, Columns3, Calendar, Users } from "lucide-react";
import type { NavItemConfig } from "../types/board";

export const NAVIGATION_ITEMS: NavItemConfig[] = [
  { id: "board", label: "Board View", icon: Columns3 },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "timeline", label: "Timeline", icon: Calendar },
  { id: "team", label: "Team", icon: Users },
];