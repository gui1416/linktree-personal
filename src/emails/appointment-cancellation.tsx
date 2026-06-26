import * as React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Img,
  Link,
  Text,
  Hr,
} from "@react-email/components";

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
}: AppointmentCancellationEmailProps) {
  return (
    <Html lang="pt">
      <Head />
      <Preview>Agendamento cancelado — {data} às {horario}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Link href="https://portifolio-v8.vercel.app/" target="_blank">
              <Img
                src="https://portifolio-v8.vercel.app/logo.png"
                width="120"
                height="auto"
                alt="Guilherme Machado"
                style={logo}
              />
            </Link>
          </Section>

          <Section style={iconSection}>
            <Text style={cancelIcon}>✕</Text>
          </Section>

          <Section style={titleSection}>
            <Text style={heading}>Agendamento cancelado</Text>
            <Text style={subheading}>
              Olá, <strong>{nome}</strong>! Seu agendamento foi cancelado.
            </Text>
          </Section>

          <Section style={infoCard}>
            <Text style={infoRow}>
              <span style={infoLabel}>Data</span>
              <span style={infoValue}>{data}</span>
            </Text>
            <Hr style={infoHr} />
            <Text style={infoRow}>
              <span style={infoLabel}>Horário</span>
              <span style={infoValue}>{horario}</span>
            </Text>
            <Hr style={infoHr} />
            <Text style={infoRow}>
              <span style={infoLabel}>Assunto</span>
              <span style={infoValue}>{assunto}</span>
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={footerSection}>
            <Text style={footerText}>
              Se desejar reagendar, acesse o site e escolha um novo horário.
              Em caso de dúvidas, entre em contato com <strong>{ownerName}</strong>.
            </Text>
            <Text style={footerSmall}>
              © {new Date().getFullYear()} {ownerName} · Todos os direitos reservados
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const colors = {
  primary: "hsl(240, 5.9%, 10%)",
  background: "hsl(0, 0%, 100%)",
  text: "hsl(240, 10%, 3.9%)",
  border: "hsl(240, 5.9%, 90%)",
  muted: "hsl(240, 4.8%, 95.9%)",
  mutedForeground: "hsl(240, 5%, 64.9%)",
  red: "#dc2626",
  redBg: "#fef2f2",
};

const main = {
  backgroundColor: colors.muted,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "32px 20px",
  maxWidth: "600px",
  backgroundColor: colors.background,
  borderRadius: "12px",
};

const headerSection = {
  paddingBottom: "24px",
  textAlign: "center" as const,
};

const logo = {
  display: "block",
  margin: "0 auto",
};

const iconSection = {
  textAlign: "center" as const,
  marginBottom: "8px",
};

const cancelIcon = {
  display: "inline-block",
  width: "56px",
  height: "56px",
  lineHeight: "56px",
  backgroundColor: colors.redBg,
  color: colors.red,
  borderRadius: "50%",
  fontSize: "24px",
  fontWeight: "bold" as const,
  textAlign: "center" as const,
  margin: "0 auto",
};

const titleSection = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const heading = {
  fontSize: "22px",
  fontWeight: "bold" as const,
  color: colors.text,
  margin: "0 0 8px",
};

const subheading = {
  fontSize: "15px",
  color: colors.mutedForeground,
  margin: "0",
};

const infoCard = {
  backgroundColor: colors.muted,
  borderRadius: "8px",
  padding: "16px 20px",
};

const infoRow = {
  fontSize: "15px",
  color: colors.text,
  margin: "0",
  padding: "4px 0",
};

const infoLabel = {
  fontWeight: "600" as const,
  minWidth: "80px",
  marginRight: "12px",
  color: colors.mutedForeground,
};

const infoValue = {
  color: colors.text,
};

const infoHr = {
  borderColor: colors.border,
  margin: "8px 0",
};

const hr = {
  borderColor: colors.border,
  margin: "24px 0",
};

const footerSection = {
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "14px",
  color: colors.mutedForeground,
  marginBottom: "16px",
  lineHeight: "1.6",
};

const footerSmall = {
  fontSize: "12px",
  color: colors.mutedForeground,
  margin: "0",
};
