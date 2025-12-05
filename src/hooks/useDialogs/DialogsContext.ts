import { createContext, useContext } from "react";

/** Opções disponíveis para a caixa de diálogo de confirmação. */
export interface ConfirmOptions {
  title?: string;
  description?: string;
  severity?: "info" | "warning" | "error" | "success";
  confirmText?: string; // botão de confirmação
  cancelText?: string; // botão de cancelamento
}

/** Tipagem para o contexto de diálogos. */
export interface DialogsContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

/** Contexto global de diálogos. */
export const DialogsContext = createContext<DialogsContextType | undefined>(undefined);

/** Hook que fornece acesso ao contexto de diálogos.
 * Lança um erro caso seja usado fora de um DialogsProvider. */
export function useDialogs(): DialogsContextType {
  const context = useContext(DialogsContext);
  if (!context) {
    throw new Error("useDialogs must be used within a DialogsProvider");
  }
  return context;
}
