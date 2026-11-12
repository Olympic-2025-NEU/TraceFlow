export const modules = {
  platform: [
    "identity",
    "tenancy",
    "access",
    "audit",
    "workflow",
    "files",
    "outbox",
  ],
  contexts: [
    "master-data",
    "sales",
    "procurement",
    "inventory",
    "finance",
  ],
} as const;
