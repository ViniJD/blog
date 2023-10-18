import { IUsuario } from "./IUsuario";

export interface IComentario {
  id: number;
  conteudo: string;
  idUsuarioFk: number;
  idPostagemFk: number;

  usuario?: IUsuario;
}
