export interface IPatient {
  NumeroExpediente?: number | string;
  Nombres?: string;
  Apellidos?: string;
  FechaIngreso?: Date;
  DireccionTrabajo?: string;
  DireccionCasa?: string;
  Edad?: number;
  TelefonoCasa?: string;
  Sexo?: string;
  TelefonoOficina?: string;
  EstadoCivil?: string;
  TelefonoCelular?: string;
  NumeroHijos?: number;
  Fax?: string;
  Nacionalidad?: string;
  Email?: string;
  Departamento?: string;
  Municipio?: string;

  MotivoConsulta?: string;

  AgudezaVisualOjoDerecho?: number;
  AgudezaVisualOjoIzquierdo?: number;
  OjoDerechoSinLentes?: number;
  OjoIzquierdoSinLentes?: number;
  OjoDerechoConLentes?: number;
  OjoIzquierdoConLentes?: number;
  OjoDerechoEstenopeico?: number;
  OjoIzquierdoEstenopeico?: number;

  RefraccionOjoDerecho?: number;
  RefraccionOjoIzquierdo?: number;
  OjoDerechoSKDinamica?: number;
  OjoIzquierdoSKDinamica?: number;
  OjoDerechoSKCiclopegica?: number;
  OjoIzquierdoSKCiclopegica?: number;

  PrescripcionOjoDerecho?: number;
  PrescripcionOjoIzquierdo?: number;
  EsferaOjoDerecho?: number;
  EsferaOjoIzquierdo?: number;
  CilindroOjoDerecho?: number;
  CilindroOjoIzquierdo?: number;
  EjesOjoDerecho?: number;
  EjesOjoIzquierdo?: number;
  DPOjoDerecho?: number;
  ADDOjoIzquierdo?: number;

  LamparaDeEndidura?: string;
  FondoDeOjo?: string;
  PresionIntraOcular?: string;
  MotilidadOcular?: string;
}
