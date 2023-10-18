import { IComentario } from "./IComentario";
import { ICurtida } from "./ICurtida";
import { IUsuario } from "./IUsuario";

export interface IPostagem {
  id: number;
  titulo: string;
  imagem: string;
  conteudo: string;
  ativo: number;
  idUsuarioFk: number;

  escritor?: IUsuario;
  comentarios?: IComentario[];
  curtidas?: ICurtida[];
}
