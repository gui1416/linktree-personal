"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StepDate } from "./step-date";
import { StepTime } from "./step-time";
import { StepForm, type FormData } from "./step-form";
import { StepConfirmation } from "./step-confirmation";

type Step = 1 | 2 | 3 | "done";

const STEP_TITLES: Record<string, string> = {
  "1": "Escolha uma data",
  "2": "Escolha um horário",
  "3": "Seus dados",
  done: "Agendamento realizado",
};

export function SchedulingDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [submittedName, setSubmittedName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function reset() {
    setStep(1);
    setDate(undefined);
    setTime(undefined);
    setSubmittedName("");
    setError("");
    setLoading(false);
  }

  async function handleFormSubmit(formData: FormData) {
    if (!date || !time) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: format(date, "yyyy-MM-dd"),
          time,
          ...formData,
        }),
      });

      if (res.ok) {
        setSubmittedName(formData.name);
        setStep("done");
      } else {
        const data = await res.json();
        setError(data.error ?? "Erro ao realizar agendamento. Tente novamente.");
      }
    } catch {
      setError("Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-start h-12 px-4 transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md dark:hover:bg-primary/10 hover:bg-primary/10 group animate-fade-in delay-500"
        >
          <Calendar className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          <span className="flex-grow text-center">Agendar Contato</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>{STEP_TITLES[String(step)]}</DialogTitle>
          {step !== "done" && (
            <div className="flex gap-1.5 pt-1">
              {([1, 2, 3] as const).map((s) => (
                <div
                  key={s}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                    Number(step) >= s ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          )}
        </DialogHeader>

        <div className="py-2">
          {step === 1 && (
            <>
              <StepDate selected={date} onSelect={setDate} />
              <div className="flex justify-end mt-4">
                <Button onClick={() => setStep(2)} disabled={!date}>
                  Próximo
                </Button>
              </div>
            </>
          )}

          {step === 2 && date && (
            <>
              <StepTime date={date} selected={time} onSelect={setTime} />
              <div className="flex justify-between mt-4">
                <Button variant="ghost" onClick={() => { setStep(1); setTime(undefined); }}>
                  Voltar
                </Button>
                <Button onClick={() => setStep(3)} disabled={!time}>
                  Próximo
                </Button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              {error && (
                <p className="text-sm text-destructive mb-3 p-2 rounded bg-destructive/10">
                  {error}
                </p>
              )}
              <StepForm onSubmit={handleFormSubmit} loading={loading} />
              <Button
                variant="ghost"
                className="mt-2 w-full"
                onClick={() => { setStep(2); setError(""); }}
                disabled={loading}
              >
                Voltar
              </Button>
            </>
          )}

          {step === "done" && date && time && (
            <>
              <StepConfirmation date={date} time={time} name={submittedName} />
              <Button className="w-full mt-4" onClick={() => setOpen(false)}>
                Fechar
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
