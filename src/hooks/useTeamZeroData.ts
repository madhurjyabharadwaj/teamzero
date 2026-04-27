import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Candidate, Invite, Project } from "@/lib/types";

export function useCandidates() {
  return useQuery({
    queryKey: ["candidates"],
    queryFn: async (): Promise<Candidate[]> => {
      const { data, error } = await supabase
        .from("candidates")
        .select("*")
        .order("name");
      if (error) throw error;
      return (data ?? []) as Candidate[];
    },
  });
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async (): Promise<Project[]> => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Project[];
    },
  });
}

export function useProject(projectId: string | null | undefined) {
  return useQuery({
    queryKey: ["project", projectId],
    enabled: !!projectId,
    queryFn: async (): Promise<Project | null> => {
      if (!projectId) return null;
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .maybeSingle();
      if (error) throw error;
      return (data as Project) ?? null;
    },
  });
}

export function useInvites(projectId?: string | null) {
  return useQuery({
    queryKey: ["invites", projectId ?? "all"],
    queryFn: async (): Promise<Invite[]> => {
      let query = supabase.from("invites").select("*").order("created_at", { ascending: false });
      if (projectId) query = query.eq("project_id", projectId);
      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as Invite[];
    },
  });
}

export function useAllInvites() {
  return useInvites(undefined);
}