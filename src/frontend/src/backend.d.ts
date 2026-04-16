import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactInput {
    name: string;
    email: string;
    message: string;
}
export type Result = {
    __kind__: "ok";
    ok: ContactSubmission;
} | {
    __kind__: "err";
    err: string;
};
export interface ContactSubmission {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: bigint;
}
export interface Project {
    id: bigint;
    status: ProjectStatus;
    vulnerabilityType: string;
    description: string;
    beforeCode: string;
    targetName: string;
    category: string;
    severity: Severity;
    afterCode: string;
}
export interface DashboardStats {
    vulnerabilitiesFound: bigint;
    bugsFixed: bigint;
    totalProjects: bigint;
    securityScore: bigint;
}
export enum ProjectStatus {
    Fixed = "Fixed",
    InProgress = "InProgress"
}
export enum Severity {
    Low = "Low",
    High = "High",
    Medium = "Medium",
    Critical = "Critical"
}
export interface backendInterface {
    getContacts(): Promise<Array<ContactSubmission>>;
    getDashboardStats(): Promise<DashboardStats>;
    getProject(id: bigint): Promise<Project | null>;
    getProjects(): Promise<Array<Project>>;
    submitContact(input: ContactInput): Promise<Result>;
}
