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
  Button,
  Hr,
} from "@react-email/components";

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
}: AppointmentNotificationEmailProps) {
  return (
    <Html lang="pt">
      <Head />
      <Preview>Novo agendamento: {assunto} — {nome}</Preview>
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

          <Section style={titleSection}>
            <Text style={heading}>Novo agendamento recebido</Text>
          </Section>

          <Section style={infoCard}>
            <Text style={infoRow}>
              <span style={infoLabel}>Nome</span>
              <span style={infoValue}>{nome}</span>
            </Text>
            <Hr style={infoHr} />
            <Text style={infoRow}>
              <span style={infoLabel}>E-mail</span>
              <span style={infoValue}>{email}</span>
            </Text>
            <Hr style={infoHr} />
            <Text style={infoRow}>
              <span style={infoLabel}>Telefone</span>
              <span style={infoValue}>{telefone}</span>
            </Text>
            <Hr style={infoHr} />
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

          {mensagem && (
            <>
              <Hr style={hr} />
              <Section>
                <Text style={label}>Mensagem:</Text>
                <Text style={messageBox}>&ldquo;{mensagem}&rdquo;</Text>
              </Section>
            </>
          )}

          <Hr style={hr} />

          <Section style={footerSection}>
            <Text style={footerText}>
              Responda diretamente ao contato clicando abaixo.
            </Text>
            <Button style={button} href={`mailto:${email}`}>
              Responder {nome}
            </Button>
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
  accent: "hsl(240, 4.8%, 95.9%)",
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

const titleSection = {
  marginBottom: "24px",
  textAlign: "center" as const,
};

const heading = {
  fontSize: "22px",
  fontWeight: "bold" as const,
  color: colors.text,
  margin: "0",
};

const infoCard = {
  backgroundColor: colors.muted,
  borderRadius: "8px",
  padding: "16px 20px",
};

const infoRow = {
  display: "flex" as const,
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

const label = {
  fontSize: "15px",
  fontWeight: "600" as const,
  color: colors.text,
  marginBottom: "8px",
};

const messageBox = {
  backgroundColor: colors.muted,
  padding: "16px",
  borderRadius: "6px",
  fontSize: "15px",
  color: colors.text,
  fontStyle: "italic" as const,
};

const hr = {
  borderColor: colors.border,
  margin: "24px 0",
};

const footerSection = {
  textAlign: "center" as const,
  paddingTop: "8px",
};

const footerText = {
  fontSize: "14px",
  color: colors.mutedForeground,
  marginBottom: "16px",
};

const button = {
  backgroundColor: colors.primary,
  color: "hsl(0, 0%, 98%)",
  padding: "12px 28px",
  borderRadius: "6px",
  fontSize: "15px",
  textDecoration: "none",
  fontWeight: "500" as const,
};
