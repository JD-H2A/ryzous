export type {
  Project,
  DashboardStats,
  ContactSubmission,
  ContactInput,
  Result as BackendResult,
} from "../backend.d";
export { ProjectStatus, Severity } from "../backend.d";

export type SeverityLevel = "Critical" | "High" | "Medium" | "Low";
export type StatusType = "Fixed" | "InProgress";
