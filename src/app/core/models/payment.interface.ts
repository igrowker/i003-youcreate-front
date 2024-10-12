export interface Payment {
  id?: number,
  nombre: string,
  apellido: string;
  monto: string,
  fecha_pago: string,
  descripcion: string,
  metodo_pago: string,
  colaborador_id?: number
}
