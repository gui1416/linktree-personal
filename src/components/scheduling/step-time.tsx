"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SCHEDULING_CONFIG } from "@/lib/scheduling-config";

interface StepTimeProps {
  date: Date;
  selected: string | undefined;
  onSelect: (time: string) => void;
}

export function StepTime({ date, selected, onSelect }: StepTimeProps) {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dateStr = format(date, "yyyy-MM-dd");
    setLoading(true);
    fetch(`/api/schedule/slots?date=${dateStr}`)
      .then((r) => r.json())
      .then((data) => setBookedSlots(data.bookedSlots ?? []))
      .catch(() => setBookedSlots([]))
      .finally(() => setLoading(false));
  }, [date]);

  const dateLabel = format(date, "EEEE, dd/MM", { locale: ptBR });

  if (loading) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-muted-foreground text-center capitalize">{dateLabel}</p>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-9 rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  const available = SCHEDULING_CONFIG.timeSlots.filter((s) => !bookedSlots.includes(s));

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground text-center capitalize">{dateLabel}</p>
      {available.length === 0 ? (
        <p className="text-sm text-center text-muted-foreground py-4">
          Todos os horários desta data estão ocupados. Escolha outro dia.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {SCHEDULING_CONFIG.timeSlots.map((slot) => {
            const isBooked = bookedSlots.includes(slot);
            return (
              <Button
                key={slot}
                variant={selected === slot ? "default" : "outline"}
                size="sm"
                disabled={isBooked}
                onClick={() => onSelect(slot)}
                className={isBooked ? "line-through opacity-40 cursor-not-allowed" : ""}
              >
                {slot}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
