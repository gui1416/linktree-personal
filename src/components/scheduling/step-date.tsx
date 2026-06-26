"use client";

import { addDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { SCHEDULING_CONFIG } from "@/lib/scheduling-config";

interface StepDateProps {
  selected: Date | undefined;
  onSelect: (date: Date) => void;
}

export function StepDate({ selected, onSelect }: StepDateProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const minDate = addDays(today, SCHEDULING_CONFIG.minDaysAhead);
  const maxDate = addDays(today, SCHEDULING_CONFIG.maxDaysAhead);

  function isDisabled(date: Date) {
    return (
      date < minDate ||
      date > maxDate ||
      !(SCHEDULING_CONFIG.availableDays as readonly number[]).includes(date.getDay())
    );
  }

  return (
    <div className="flex flex-col items-center space-y-3">
      <p className="text-sm text-muted-foreground">Segunda a sexta, até 30 dias à frente</p>
      <Calendar
        mode="single"
        selected={selected}
        onSelect={(date) => date && onSelect(date)}
        disabled={isDisabled}
        startMonth={minDate}
        endMonth={maxDate}
        className="rounded-md border"
      />
    </div>
  );
}
