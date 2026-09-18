import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  if (process.env.ADMIN_UI_ENABLED !== "true") {
    redirect("/");
  }

  return children;
}
