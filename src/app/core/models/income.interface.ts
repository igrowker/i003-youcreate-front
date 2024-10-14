export interface Income {
  origen: string,
  fecha?: Date,
  monto: number,
  categoria?: string,
  descripcion?: string
}

export interface IncomeHistory {
  year:string;
  data:number[]
}
