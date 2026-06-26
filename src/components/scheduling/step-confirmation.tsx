import { CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface StepConfirmationProps {
  date: Date;
  time: string;
  name: string;
}

export function StepConfirmation({ date, time, name }: StepConfirmationProps) {
  return (
    <div className="flex flex-col items-center space-y-4 py-4 text-center">
      <CheckCircle2 className="h-16 w-16 text-green-500" />
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">Agendamento confirmado!</h3>
        <p className="text-muted-foreground capitalize">
          {format(date, "EEEE, dd 'de' MMMM", { locale: ptBR })} às {time}
        </p>
      </div>
      <p className="text-sm text-muted-foreground max-w-xs">
        Olá, <strong>{name}</strong>! Um e-mail de confirmação foi enviado. Aguarde o contato em breve.
      </p>
    </div>
  );
}
