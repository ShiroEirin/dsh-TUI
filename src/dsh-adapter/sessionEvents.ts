/**
 * dsh 0.1.2-rc.1 session-log seam, shared across the adapter: read a live
 * session's events through the rc.1+ snapshotEvents() method, falling back to
 * the legacy `events` getter on older host lines (the vendored devDependency
 * types still describe it). Never throws — an unknown shape yields no events.
 *
 * Kept structurally typed so one helper serves both the strict consumers
 * (channel folds, cast to SessionEvent[]) and the loose ones (approval
 * command lookup, exit-resume marker, prompt debug).
 *
 * @module @deepseek-harness-tui/dsh-tui/sessionEvents
 */
export function sessionEventsOf(session: {
  snapshotEvents?(): readonly { type: string; data: unknown }[]
  readonly events?: readonly { type: string; data: unknown }[]
}): readonly { type: string; data: unknown }[] {
  if (typeof session.snapshotEvents === 'function') return session.snapshotEvents()
  return session.events ?? []
}
