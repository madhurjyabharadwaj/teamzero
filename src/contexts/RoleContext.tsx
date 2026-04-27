import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { AppRole } from "@/lib/types";

type RoleContextValue = {
  role: AppRole | null;
  setRole: (role: AppRole | null) => void;
  activeProjectId: string | null;
  setActiveProjectId: (id: string | null) => void;
};

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

const ROLE_KEY = "tz_role";
const PROJECT_KEY = "tz_active_project";

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<AppRole | null>(() => {
    if (typeof window === "undefined") return null;
    return (localStorage.getItem(ROLE_KEY) as AppRole | null) ?? null;
  });
  const [activeProjectId, setActiveProjectIdState] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(PROJECT_KEY);
  });

  useEffect(() => {
    if (role) localStorage.setItem(ROLE_KEY, role);
    else localStorage.removeItem(ROLE_KEY);
  }, [role]);

  useEffect(() => {
    if (activeProjectId) localStorage.setItem(PROJECT_KEY, activeProjectId);
    else localStorage.removeItem(PROJECT_KEY);
  }, [activeProjectId]);

  const value = useMemo(
    () => ({
      role,
      setRole: setRoleState,
      activeProjectId,
      setActiveProjectId: setActiveProjectIdState,
    }),
    [role, activeProjectId],
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
}