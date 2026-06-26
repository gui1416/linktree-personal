function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface AppointmentCancellationEmailProps {
  nome: string;
  data: string;
  horario: string;
  assunto: string;
  ownerName: string;
}

export function AppointmentCancellationEmail({
  nome,
  data,
  horario,
  assunto,
  ownerName,
}: AppointmentCancellationEmailProps): string {
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Agendamento cancelado — ${esc(data)} às ${esc(horario)}</title>
</head>
<body style="margin:0;padding:0;background-color:hsl(240,4.8%,95.9%);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;">Agendamento cancelado — ${esc(data)} às ${esc(horario)}</div>
  <div style="margin:0 auto;padding:32px 20px;max-width:600px;background-color:hsl(0,0%,100%);border-radius:12px;">

    <div style="padding-bottom:24px;text-align:center;">
      <a href="https://portifolio-v8.vercel.app/" target="_blank">
        <img src="https://portifolio-v8.vercel.app/logo.png" width="120" alt="Guilherme Machado" style="display:block;margin:0 auto;">
      </a>
    </div>

    <div style="text-align:center;margin-bottom:8px;">
      <p style="display:inline-block;width:56px;height:56px;line-height:56px;background-color:#fef2f2;color:#dc2626;border-radius:50%;font-size:24px;font-weight:bold;text-align:center;margin:0 auto;">✕</p>
    </div>

    <div style="text-align:center;margin-bottom:24px;">
      <p style="font-size:22px;font-weight:bold;color:hsl(240,10%,3.9%);margin:0 0 8px;">Agendamento cancelado</p>
      <p style="font-size:15px;color:hsl(240,5%,64.9%);margin:0;">Olá, <strong>${esc(nome)}</strong>! Seu agendamento foi cancelado.</p>
    </div>

    <div style="background-color:hsl(240,4.8%,95.9%);border-radius:8px;padding:16px 20px;">
      <p style="font-size:15px;color:hsl(240,10%,3.9%);margin:0;padding:4px 0;">
        <span style="font-weight:600;min-width:80px;margin-right:12px;color:hsl(240,5%,64.9%);">Data</span>
        <span>${esc(data)}</span>
      </p>
      <hr style="border:none;border-top:1px solid hsl(240,5.9%,90%);margin:8px 0;">
      <p style="font-size:15px;color:hsl(240,10%,3.9%);margin:0;padding:4px 0;">
        <span style="font-weight:600;min-width:80px;margin-right:12px;color:hsl(240,5%,64.9%);">Horário</span>
        <span>${esc(horario)}</span>
      </p>
      <hr style="border:none;border-top:1px solid hsl(240,5.9%,90%);margin:8px 0;">
      <p style="font-size:15px;color:hsl(240,10%,3.9%);margin:0;padding:4px 0;">
        <span style="font-weight:600;min-width:80px;margin-right:12px;color:hsl(240,5%,64.9%);">Assunto</span>
        <span>${esc(assunto)}</span>
      </p>
    </div>

    <hr style="border:none;border-top:1px solid hsl(240,5.9%,90%);margin:24px 0;">

    <div style="text-align:center;">
      <p style="font-size:14px;color:hsl(240,5%,64.9%);margin-bottom:16px;line-height:1.6;">Se desejar reagendar, acesse o site e escolha um novo horário. Em caso de dúvidas, entre em contato com <strong>${esc(ownerName)}</strong>.</p>
      <p style="font-size:12px;color:hsl(240,5%,64.9%);margin:0;">© ${year} ${esc(ownerName)} · Todos os direitos reservados</p>
    </div>

  </div>
</body>
</html>`;
}
