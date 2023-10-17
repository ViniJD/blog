import { IUsuario } from "./IUsuario";

export interface ICurtida {
  id: number;
  idUsuarioFk: number;
  idPostagemFk: number;

  usuario?: IUsuario;
}
