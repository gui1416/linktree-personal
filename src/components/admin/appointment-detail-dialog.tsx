"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export interface Appointment {
  id: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string | null;
  created_at: string;
}

const subjectColors: Record<string, "default" | "secondary" | "outline"> = {
  Projeto: "default",
  Freelance: "secondary",
  Mentoria: "outline",
  Outro: "outline",
};

interface AppointmentDetailDialogProps {
  appointment: Appointment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (id: string) => void;
}

export function AppointmentDetailDialog({
  appointment,
  open,
  onOpenChange,
  onDelete,
}: AppointmentDetailDialogProps) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (!appointment) return null;

  const formattedDate = format(
    new Date(`${appointment.date}T12:00:00`),
    "EEEE, dd 'de' MMMM",
    { locale: ptBR }
  );

  const formattedCreatedAt = format(
    new Date(appointment.created_at),
    "dd/MM/yyyy 'às' HH:mm",
    { locale: ptBR }
  );

  function handleOpenChange(open: boolean) {
    if (!open) setConfirming(false);
    onOpenChange(open);
  }

  async function handleDelete() {
    if (!appointment) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/schedule/${appointment.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        onDelete(appointment.id);
        onOpenChange(false);
      }
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Detalhes do Agendamento</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          <p className="text-base font-medium capitalize">
            {formattedDate} · {appointment.time}
          </p>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Contato
            </p>
            <div className="divide-y rounded-md border text-sm">
              <InfoRow label="Nome" value={appointment.name} />
              <InfoRow label="E-mail" value={appointment.email} />
              <InfoRow label="Telefone" value={appointment.phone} />
            </div>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Solicitação
            </p>
            <div className="divide-y rounded-md border text-sm">
              <div className="flex items-center gap-3 px-3 py-2">
                <span className="w-20 shrink-0 text-muted-foreground">Assunto</span>
                <Badge variant={subjectColors[appointment.subject] ?? "secondary"}>
                  {appointment.subject}
                </Badge>
              </div>
              {appointment.message && (
                <div className="flex gap-3 px-3 py-2">
                  <span className="w-20 shrink-0 text-muted-foreground">Mensagem</span>
                  <span className="italic text-muted-foreground">
                    &ldquo;{appointment.message}&rdquo;
                  </span>
                </div>
              )}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Criado em {formattedCreatedAt}
          </p>

          {confirming ? (
            <div className="rounded-md border border-destructive/40 bg-destructive/5 p-4 space-y-3">
              <div className="flex items-start gap-2 text-sm text-destructive">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Tem certeza? Esta ação não pode ser desfeita.</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex-1"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? "Cancelando..." : "Confirmar cancelamento"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setConfirming(false)}
                  disabled={deleting}
                >
                  Voltar
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="destructive"
              className="w-full"
              onClick={() => setConfirming(true)}
            >
              Cancelar Agendamento
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3 px-3 py-2">
      <span className="w-20 shrink-0 text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
