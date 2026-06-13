/**
 * Acceptance specimen — Keystone admin console typography at semantic scale.
 * Mirrors keystone.intrinsicvalue.llc/users list density.
 */
export function KeystoneAdminSpecimen() {
  const nav = ["Home", "Users", "Feedback", "Households", "Hygiene", "Platform"];

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-keystone-line)] bg-white text-[var(--color-keystone-fg)] dark:bg-black">
      <header className="border-b border-[var(--color-keystone-line)] px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-5">
            <span className="shrink-0 text-[15px] font-semibold tracking-tight">Keystone</span>
            <nav className="hidden items-center gap-1 text-[var(--color-keystone-muted)] sm:flex">
              {nav.map((item) => (
                <span
                  key={item}
                  className={`iv-tab rounded-md px-2.5 py-1 ${
                    item === "Users"
                      ? "bg-[var(--color-keystone-line)]/40 text-[var(--color-keystone-fg)]"
                      : ""
                  }`}
                >
                  {item}
                </span>
              ))}
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="iv-body hidden truncate text-[var(--color-keystone-muted)] sm:inline">
              alex@intrinsicvalue.llc
            </span>
            <span className="iv-body text-[var(--color-keystone-muted)]">Sign out</span>
          </div>
        </div>
      </header>

      <div className="space-y-6 p-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Users</h2>
          <p className="iv-body max-w-2xl text-[var(--color-keystone-muted)]">
            Tasteful customers — recent signups below, or search by email, USR- ID, UUID, name, or Apple
            transaction id.
          </p>
        </div>

        <div
          className="iv-body rounded-xl border border-[var(--color-keystone-line)] bg-[var(--color-keystone-surface)] px-3 py-2 text-[var(--color-keystone-muted)]"
          aria-hidden
        >
          Email, USR- ID, UUID, name, or Apple transaction id
        </div>

        <div className="space-y-3">
          <p className="iv-label font-medium text-[var(--color-keystone-muted)]">Recent users (1)</p>

          <div className="overflow-x-auto rounded-xl border border-[var(--color-keystone-line)]">
            <table className="iv-table">
              <thead>
                <tr className="border-b border-[var(--color-keystone-line)]">
                  <th>Email</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Households</th>
                  <th>Meals</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--color-keystone-line)] last:border-0">
                  <td>
                    <span className="font-medium text-[var(--color-keystone-accent)]">alexdgunter@gmail.com</span>
                  </td>
                  <td className="iv-table-code">USR-G8VBDV</td>
                  <td>Alex Gunter</td>
                  <td className="tabular-nums">1</td>
                  <td className="tabular-nums">69</td>
                  <td className="text-[var(--color-keystone-muted)]">Nov 27, 2025</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="iv-body text-[var(--color-keystone-muted)]">
            Showing the 25 most recent signups. Search to find anyone else.
          </p>
        </div>
      </div>
    </div>
  );
}
