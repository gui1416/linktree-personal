"use client";

import { useState } from "react";
import { CalendarDays, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppointmentsTable } from "./appointments-table";
import { AppointmentsCalendar } from "./appointments-calendar";
import type { Appointment } from "./appointment-detail-dialog";

type View = "table" | "calendar";

interface AdminContentProps {
  appointments: Appointment[];
}

export function AdminContent({ appointments: initial }: AdminContentProps) {
  const [view, setView] = useState<View>("table");
  const [list, setList] = useState<Appointment[]>(initial);

  function handleDelete(id: string) {
    setList((prev) => prev.filter((a) => a.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex w-fit items-center gap-1 rounded-lg border bg-muted/40 p-1">
        <Button
          variant={view === "table" ? "default" : "ghost"}
          size="sm"
          onClick={() => setView("table")}
          className="h-8"
        >
          <LayoutList className="mr-1.5 h-4 w-4" />
          Tabela
        </Button>
        <Button
          variant={view === "calendar" ? "default" : "ghost"}
          size="sm"
          onClick={() => setView("calendar")}
          className="h-8"
        >
          <CalendarDays className="mr-1.5 h-4 w-4" />
          Calendário
        </Button>
      </div>

      {view === "table" ? (
        <AppointmentsTable appointments={list} onDelete={handleDelete} />
      ) : (
        <AppointmentsCalendar appointments={list} onDelete={handleDelete} />
      )}
    </div>
  );
}
