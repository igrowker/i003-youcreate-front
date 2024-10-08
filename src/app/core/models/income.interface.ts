export interface Income {
  origen: string,
  date?: string,
  total: number,
  category?: string,
  description?: string
}

export interface IncomeHistory {
  year:string;
  data:number[]
}
