import { Navigate } from "react-router-dom";
import { useRole } from "@/contexts/RoleContext";
import type { AppRole } from "@/lib/types";

export function RoleGate({ allow, children }: { allow: AppRole[]; children: JSX.Element }) {
  const { role } = useRole();
  if (!role) return <Navigate to="/role" replace />;
  if (!allow.includes(role)) return <Navigate to="/role" replace />;
  return children;
}
