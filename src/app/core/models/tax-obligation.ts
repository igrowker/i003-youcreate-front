export interface TaxObligation {
  id: number;
  tipo_impuesto: string;
  monto_a_pagar: number;
  fecha_vencimiento: Date;
  email_automatico: boolean;
  estado_pago: boolean;
}

export interface ApiTax {
  obligaciones : TaxObligation[];
}