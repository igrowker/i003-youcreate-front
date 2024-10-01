export interface Collaboration {
  name: string;
  wallet?: string
  date: string;
  service: string;
  monto: number;
  state?: State;
}

export type State = 'Pagado' | 'Por pagar' | 'Vencido';

