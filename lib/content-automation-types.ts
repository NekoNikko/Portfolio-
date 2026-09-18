export type ContentType =
  | "PROJECT"
  | "JOURNAL_ENTRY"
  | "CASE_STUDY"
  | "CURRENT_BUILD"
  | "ENGINEERING_UPDATE";

export type ApprovalStatus =
  | "DRAFT"
  | "REVIEW_REQUIRED"
  | "APPROVED"
  | "REJECTED"
  | "PUBLISHED";

export interface SanitizationReport {
  clean: boolean;
  count: number;
  violations: string[];
  redactedCount: number;
}

export interface QueueItem {
  id: string;
  contentType: ContentType;
  targetSlug: string;
  sourceReference: string;
  sourceType:
    | "jarvis_task"
    | "jarvis_journal"
    | "jarvis_verification"
    | "jarvis_report"
    | "manual";
  sourceTimestamp: string;
  generatedAt: string;
  sanitizedAt: string | null;
  approvalStatus: ApprovalStatus;
  proposedContent: Record<string, unknown>;
  sanitizationReport: SanitizationReport | null;
}
