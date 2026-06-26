"use client";

import { useState } from "react";
import { isSameDay, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DayButton } from "react-day-picker";
import type React from "react";
import {
  AppointmentDetailDialog,
  type Appointment,
} from "./appointment-detail-dialog";

const subjectColors: Record<string, "default" | "secondary" | "outline"> = {
  Projeto: "default",
  Freelance: "secondary",
  Mentoria: "outline",
  Outro: "outline",
};

function DayButtonWithDot({
  day,
  modifiers,
  children,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const hasAppointment = (modifiers as Record<string, boolean>).hasAppointment;

  return (
    <CalendarDayButton day={day} modifiers={modifiers} {...props}>
      {children}
      {hasAppointment && (
        <div className="h-1 w-1 shrink-0 rounded-full bg-primary" aria-hidden />
      )}
    </CalendarDayButton>
  );
}

interface AppointmentsCalendarProps {
  appointments: Appointment[];
  onDelete: (id: string) => void;
}

export function AppointmentsCalendar({ appointments, onDelete }: AppointmentsCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selected, setSelected] = useState<Appointment | null>(null);

  const appointmentDates = appointments.map(
    (apt) => new Date(`${apt.date}T12:00:00`)
  );

  const appointmentsForDate = selectedDate
    ? appointments.filter((apt) =>
        isSameDay(new Date(`${apt.date}T12:00:00`), selectedDate)
      )
    : [];

  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr]">
        <Card className="min-w-[280px] w-fit">
          <CardContent className="p-3">
            <Calendar
              locale={ptBR}
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              modifiers={{ hasAppointment: appointmentDates }}
              components={{ DayButton: DayButtonWithDot }}
            />
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium capitalize">
              {selectedDate
                ? format(selectedDate, "EEEE, dd 'de' MMMM", { locale: ptBR })
                : "Agendamentos do dia"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedDate ? (
              <p className="text-sm text-muted-foreground">
                Selecione um dia no calendário para ver os agendamentos.
              </p>
            ) : appointmentsForDate.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Sem agendamentos neste dia.
              </p>
            ) : (
              <ul className="space-y-2">
                {appointmentsForDate.map((apt) => (
                  <li
                    key={apt.id}
                    className="flex cursor-pointer items-center justify-between rounded-md border p-3 transition-colors hover:bg-accent"
                    onClick={() => setSelected(apt)}
                  >
                    <div>
                      <p className="text-sm font-medium">{apt.name}</p>
                      <p className="text-xs text-muted-foreground">{apt.time}</p>
                    </div>
                    <Badge
                      variant={subjectColors[apt.subject] ?? "secondary"}
                      className="text-xs"
                    >
                      {apt.subject}
                    </Badge>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <AppointmentDetailDialog
        appointment={selected}
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
        onDelete={(id) => {
          onDelete(id);
          setSelected(null);
        }}
      />
    </>
  );
}
