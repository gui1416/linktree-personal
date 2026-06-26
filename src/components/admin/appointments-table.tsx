"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
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

interface AppointmentsTableProps {
  appointments: Appointment[];
  onDelete: (id: string) => void;
}

export function AppointmentsTable({ appointments, onDelete }: AppointmentsTableProps) {
  const [selected, setSelected] = useState<Appointment | null>(null);

  return (
    <>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Data</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Assunto</TableHead>
                <TableHead className="hidden md:table-cell">Mensagem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-12 text-center text-muted-foreground"
                  >
                    Nenhum agendamento ainda.
                  </TableCell>
                </TableRow>
              ) : (
                appointments.map((apt) => (
                  <TableRow
                    key={apt.id}
                    className="cursor-pointer"
                    onClick={() => setSelected(apt)}
                  >
                    <TableCell className="whitespace-nowrap font-medium">
                      {format(new Date(`${apt.date}T12:00:00`), "dd/MM/yyyy", {
                        locale: ptBR,
                      })}
                    </TableCell>
                    <TableCell>{apt.time}</TableCell>
                    <TableCell>{apt.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {apt.email}
                    </TableCell>
                    <TableCell>
                      <Badge variant={subjectColors[apt.subject] ?? "secondary"}>
                        {apt.subject}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden max-w-[200px] truncate text-muted-foreground md:table-cell">
                      {apt.message || "—"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
