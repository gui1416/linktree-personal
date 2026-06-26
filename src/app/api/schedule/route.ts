import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { render } from "@react-email/components";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { supabase } from "@/lib/supabase";
import { SCHEDULING_CONFIG } from "@/lib/scheduling-config";
import { AppointmentNotificationEmail } from "@/emails/appointment-notification";
import { AppointmentConfirmationEmail } from "@/emails/appointment-confirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Data inválida"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Horário inválido"),
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone inválido"),
  subject: z.enum(["Projeto", "Freelance", "Mentoria", "Outro"]),
  message: z.string().min(20).max(500),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Body inválido" }, { status: 400 });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dados inválidos", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { date, time, name, email, phone, subject, message } = parsed.data;

  // Race condition guard: verifica se slot ainda está livre
  const { data: existing } = await supabase
    .from("appointments")
    .select("id")
    .eq("date", date)
    .eq("time", time)
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ error: "Horário já ocupado" }, { status: 409 });
  }

  const { error: insertError } = await supabase.from("appointments").insert({
    date,
    time,
    name,
    email,
    phone,
    subject,
    message,
  });

  if (insertError) {
    return NextResponse.json({ error: "Erro ao salvar agendamento" }, { status: 500 });
  }

  const formattedDate = format(
    new Date(`${date}T12:00:00`),
    "EEEE, dd 'de' MMMM 'de' yyyy",
    { locale: ptBR }
  );

  const notificationHtml = await render(
    AppointmentNotificationEmail({
      nome: name,
      email,
      telefone: phone,
      data: formattedDate,
      horario: time,
      assunto: subject,
      mensagem: message,
    })
  );

  const confirmationHtml = await render(
    AppointmentConfirmationEmail({
      nome: name,
      data: formattedDate,
      horario: time,
      assunto: subject,
      ownerName: SCHEDULING_CONFIG.ownerName,
    })
  );

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: SCHEDULING_CONFIG.ownerEmail,
    subject: `Novo agendamento: ${subject} — ${name}`,
    html: notificationHtml,
  }).catch(() => {});

  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: email,
    subject: `Agendamento confirmado — ${formattedDate} às ${time}`,
    html: confirmationHtml,
  }).catch(() => {});

  return NextResponse.json({ success: true });
}
