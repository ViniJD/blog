import { IUsuario } from "./IUsuario";

export interface IComentarios {
  id: number;
  conteudo: string;
  idUsuarioFk: number;
  idPostagemFk: number;

  usuario?: IUsuario;
}
