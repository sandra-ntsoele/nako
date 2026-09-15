export const SESSION_DURATION_OPTIONS = [25, 45, 60] as const;

export type SessionDuration = (typeof SESSION_DURATION_OPTIONS)[number];