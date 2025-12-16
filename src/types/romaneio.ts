// src/types/romaneio.ts
export interface RomaneioSimpleDTO {
  codigoId: number;
  dtBipEmb: string | null;
  hrBipEmb: string | null;
}

export interface RomaneioItemDTO {
  codigoId: number | null;
  nf: string | null;
  chaveNfe: string | null;
  nomeCd: string | null;
  valorNf: number | null;
  peso: number | null;
  obs: string | null;
  remCnpj: string | null;
  remRazao: string | null;
  cnpj: string | null;
  nomeDest: string | null;
  destMun: string | null;
  destBairr: string | null;
}

export interface RomaneioDTO {
  codigoId: number;
  status: string | null;
  motCod: string | null;
  data: string | null;
  hora: string | null;
  motNome: string | null;
  codMot2: string | null;
  motNome2: string | null;
  placaM1: string | null;
  placaM2: string | null;
  statSep: string | null;
  confNome: string | null;
  confCod: string | null;
  hrEmb: string | null;
  dtEmb: string | null;
  obs: string | null;
  regiao: number | null;
  totPeso: number | null;
  vlFrete: number | null;
  vlFechado: number | null;
  codFretF: string | null;
  totNota: number | null;
  placaCM1: string | null;
  placaCM2: string | null;
  tipo: string | null;
  cfCodEmb: string | null;
  cfNomeEm: string | null;
  oc: string | null;
  cliente: string | null;
  freteKg: number | null;
  freteReg: number | null;
  freteVl: number | null;
  freteCap: number | null;
  freteInt: number | null;
  freteBc: number | null;
  coleta: string | null;
  pedagDist: number | null;
  pedagVl: number | null;
  flagNulo: string | null;
  pedagHr: string | null;
  qtdEixo: number | null;
  datac: string | null;
  dtSep: string | null;
  hrSep: string | null;
  tipoCarga: string | null;
  dtBipSep: string | null;
  hrBipSep: string | null;
  dtBipEmb: string | null;
  hrBipEmb: string | null;
  myProtocolo: string | null;
  myStatus: string | null;
  myDti: string | null;
  myHri: string | null;
  obs2: string | null;
  horac: string | null;
  tipoDoc: string | null;
  margemRom: number | null;
  motApr: string | null;
  motAprDt: string | null;
  motAprHr: string | null;
  priorizar: string | null;
  sacApr: string | null;
  sacDtApr: string | null;

  itens?: RomaneioItemDTO[];
}
