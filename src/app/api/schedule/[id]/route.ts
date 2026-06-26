import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/components";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { supabase } from "@/lib/supabase";
import { SCHEDULING_CONFIG } from "@/lib/scheduling-config";
import { AppointmentCancellationEmail } from "@/emails/appointment-cancellation";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data: appointment } = await supabase
    .from("appointments")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!appointment) {
    return NextResponse.json({ error: "Agendamento não encontrado" }, { status: 404 });
  }

  const { error } = await supabase.from("appointments").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Erro ao cancelar agendamento" }, { status: 500 });
  }

  const formattedDate = format(
    new Date(`${appointment.date}T12:00:00`),
    "EEEE, dd 'de' MMMM 'de' yyyy",
    { locale: ptBR }
  );

  const cancellationHtml = await render(
    AppointmentCancellationEmail({
      nome: appointment.name,
      data: formattedDate,
      horario: appointment.time,
      assunto: appointment.subject,
      ownerName: SCHEDULING_CONFIG.ownerName,
    })
  );

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: appointment.email,
    subject: `Agendamento cancelado — ${formattedDate} às ${appointment.time}`,
    html: cancellationHtml,
  }).catch(() => {});

  return NextResponse.json({ success: true });
}
