function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

interface AppointmentNotificationEmailProps {
  nome: string;
  email: string;
  telefone: string;
  data: string;
  horario: string;
  assunto: string;
  mensagem?: string;
}

export function AppointmentNotificationEmail({
  nome,
  email,
  telefone,
  data,
  horario,
  assunto,
  mensagem,
}: AppointmentNotificationEmailProps): string {
  return `<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Novo agendamento: ${esc(assunto)} — ${esc(nome)}</title>
</head>
<body style="margin:0;padding:0;background-color:hsl(240,4.8%,95.9%);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;">Novo agendamento: ${esc(assunto)} — ${esc(nome)}</div>
  <div style="margin:0 auto;padding:32px 20px;max-width:600px;background-color:hsl(0,0%,100%);border-radius:12px;">

    <div style="padding-bottom:24px;text-align:center;">
      <a href="https://portifolio-v8.vercel.app/" target="_blank">
        <img src="https://portifolio-v8.vercel.app/logo.png" width="120" alt="Guilherme Machado" style="display:block;margin:0 auto;">
      </a>
    </div>

    <div style="margin-bottom:24px;text-align:center;">
      <p style="font-size:22px;font-weight:bold;color:hsl(240,10%,3.9%);margin:0;">Novo agendamento recebido</p>
    </div>

    <div style="background-color:hsl(240,4.8%,95.9%);border-radius:8px;padding:16px 20px;">
      <p style="font-size:15px;color:hsl(240,10%,3.9%);margin:0;padding:4px 0;">
        <span style="font-weight:600;min-width:80px;margin-right:12px;color:hsl(240,5%,64.9%);">Nome</span>
        <span>${esc(nome)}</span>
      </p>
      <hr style="border:none;border-top:1px solid hsl(240,5.9%,90%);margin:8px 0;">
      <p style="font-size:15px;color:hsl(240,10%,3.9%);margin:0;padding:4px 0;">
        <span style="font-weight:600;min-width:80px;margin-right:12px;color:hsl(240,5%,64.9%);">E-mail</span>
        <span>${esc(email)}</span>
      </p>
      <hr style="border:none;border-top:1px solid hsl(240,5.9%,90%);margin:8px 0;">
      <p style="font-size:15px;color:hsl(240,10%,3.9%);margin:0;padding:4px 0;">
        <span style="font-weight:600;min-width:80px;margin-right:12px;color:hsl(240,5%,64.9%);">Telefone</span>
        <span>${esc(telefone)}</span>
      </p>
      <hr style="border:none;border-top:1px solid hsl(240,5.9%,90%);margin:8px 0;">
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

    ${mensagem ? `
    <hr style="border:none;border-top:1px solid hsl(240,5.9%,90%);margin:24px 0;">
    <div>
      <p style="font-size:15px;font-weight:600;color:hsl(240,10%,3.9%);margin-bottom:8px;">Mensagem:</p>
      <p style="background-color:hsl(240,4.8%,95.9%);padding:16px;border-radius:6px;font-size:15px;color:hsl(240,10%,3.9%);font-style:italic;margin:0;">&ldquo;${esc(mensagem)}&rdquo;</p>
    </div>
    ` : ""}

    <hr style="border:none;border-top:1px solid hsl(240,5.9%,90%);margin:24px 0;">

    <div style="text-align:center;padding-top:8px;">
      <p style="font-size:14px;color:hsl(240,5%,64.9%);margin-bottom:16px;">Responda diretamente ao contato clicando abaixo.</p>
      <a href="mailto:${esc(email)}" style="display:inline-block;background-color:hsl(240,5.9%,10%);color:hsl(0,0%,98%);padding:12px 28px;border-radius:6px;font-size:15px;text-decoration:none;font-weight:500;">Responder ${esc(nome)}</a>
    </div>

  </div>
</body>
</html>`;
}
