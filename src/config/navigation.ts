import { LayoutDashboard, Columns3, Calendar, Users } from "lucide-react";
import type { NavItemConfig } from "../types/board";

export const NAVIGATION_ITEMS: NavItemConfig[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "board", label: "Board View", icon: Columns3 },
  { id: "timeline", label: "Timeline", icon: Calendar },
  { id: "team", label: "Team", icon: Users },
];