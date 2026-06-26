import { supabase } from "@/lib/supabase";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminContent } from "@/components/admin/admin-content";
import type { Appointment } from "@/components/admin/appointment-detail-dialog";

async function logout() {
  "use server";
  (await cookies()).delete("admin-session");
  redirect("/admin/login");
}

async function getAppointments(): Promise<Appointment[]> {
  const { data } = await supabase
    .from("appointments")
    .select("*")
    .order("date", { ascending: true })
    .order("time", { ascending: true });
  return (data ?? []) as Appointment[];
}

export default async function AdminPage() {
  const appointments = await getAppointments();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-xl font-bold">Agenda</h1>
              <p className="text-sm text-muted-foreground">
                {appointments.length} agendamento
                {appointments.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <AdminHeader logoutAction={logout} />
        </div>

        <AdminContent appointments={appointments} />
      </div>
    </div>
  );
}
