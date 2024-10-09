export interface Payment {
  id?: number,
  monto: string,
  fecha_pago: string,
  descripcion: string,
  colaborador_id?: number
}
