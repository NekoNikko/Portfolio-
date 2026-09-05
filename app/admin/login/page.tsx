import type { Metadata } from "next";
import AdminLoginForm from "./AdminLoginForm";
import { adminConfigured } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="p-8 rounded-xl border border-line bg-surface">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent mb-2">
            Restricted
          </p>
          <h1 className="text-xl font-bold text-foreground">Admin Login</h1>
          <p className="mt-1 text-sm text-muted">
            Publication queue and content management — owner only.
          </p>
          {adminConfigured() ? (
            <AdminLoginForm />
          ) : (
            <div className="mt-6 p-4 rounded-lg border border-warning/30 bg-warning/10 text-sm text-foreground">
              The admin area is not configured. Set{" "}
              <code className="font-mono text-xs">ADMIN_PASSWORD</code> in{" "}
              <code className="font-mono text-xs">.env.local</code> and restart
              the server.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}