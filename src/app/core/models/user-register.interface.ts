export interface UserRegister{
  nombre: string;
  apellido: string;
  email: string;
  password1: string;
  password2: string;
  pais_residencia: string;
  redes_sociales?: RedesSociales;
  telefono: string
  numero_fiscal?: string;
}

interface RedesSociales{
  youtube?: string;
  twitch?: string;
}
