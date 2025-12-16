import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

/**
 * Formata apenas data simples (ex: 15/12/2025)
 */
export function formatDate(value?: string | Date | null): string {
  if (!value) return "";
  const date = typeof value === "string" ? new Date(value) : value;
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("pt-BR");
}

/**
 * Formata data e hora (ex: 15/12/2025 às 08:45)
 */
export function formatarDataHora(data?: string | Date | null, hora?: string | null): string {
  if (!data) return "Sem data";
  try {
    const parsed = dayjs(data);
    const formatada = parsed.isValid() ? parsed.format("DD/MM/YYYY") : String(data);
    return hora ? `${formatada} às ${hora}` : formatada;
  } catch {
    return String(data);
  }
}

/**
 * Formata CPF (ex: 123.456.789-00)
 */
export function formatCpf(cpf?: string): string {
  if (!cpf) return "";
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
}

/**
 * Formata telefone (ex: +55 (11) 98765-4321)
 */
export function formatPhone(phone?: string): string {
  if (!phone) return "";
  return phone.replace(/^(\d{2})(\d{2})(\d{5})(\d{4})$/, "+$1 ($2) $3-$4");
}

/**
 * Formata CNPJ (ex: 12.345.678/0001-90)
 */
export function formatCnpj(cnpj?: string): string {
  if (!cnpj) return "";
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}
