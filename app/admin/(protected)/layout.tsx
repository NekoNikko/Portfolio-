import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminSession } from "@/lib/admin-session";
import { adminConfigured } from "@/lib/admin-auth";
import AdminLogoutButton from "./AdminLogoutButton";

export const dynamic = "force-dynamic";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/queue", label: "Publication Queue" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/audit", label: "Audit Log" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!adminConfigured() || !(await isAdminSession())) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-[80vh]">
      <div className="border-b border-line bg-background-soft/70 sticky top-16 z-40 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center gap-1 overflow-x-auto">
          <span className="mr-2 font-mono text-xs uppercase tracking-widest text-warning">
            Admin
          </span>
          {ADMIN_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-3 text-sm text-muted hover:text-foreground whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/api/admin/export?type=all"
            className="px-3 py-3 text-sm text-muted hover:text-foreground whitespace-nowrap"
          >
            Export Data
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-muted hover:text-accent whitespace-nowrap"
            >
              View site ↗
            </Link>
            <AdminLogoutButton />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">{children}</div>
    </div>
  );
}