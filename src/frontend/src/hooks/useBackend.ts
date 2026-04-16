import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  ContactInput,
  ContactSubmission,
  DashboardStats,
  Project,
} from "../types";

export function useProjects() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProject(id: bigint) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Project | null>({
    queryKey: ["project", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProject(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDashboardStats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      if (!actor) {
        return {
          totalProjects: 0n,
          vulnerabilitiesFound: 0n,
          bugsFixed: 0n,
          securityScore: 0n,
        };
      }
      return actor.getDashboardStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useContacts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ContactSubmission[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getContacts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContact() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: ContactInput) => {
      if (!actor) throw new Error("Actor not available");
      const result = await actor.submitContact(input);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}
