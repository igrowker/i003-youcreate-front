export interface Collaboration {
  date: string;
  name: string;
  servicio: string;
  monto: string;
  state?: State;
  paymentMethod?: string
}

export type State = 'Pagado' | 'Por pagar' | 'Vencido';

