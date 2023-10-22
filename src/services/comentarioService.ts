import { IComentario } from "../interfaces/IComentario";
import api from "./api";

const getCommentsByPostId = async (id: number): Promise<IComentario[]> => {
  const { data } = await api.get<IComentario[]>(`/comentarios/postagem/${id}`);
  return data;
};

const getComments = async (): Promise<IComentario[]> => {
  const { data } = await api.get<IComentario[]>(`/comentarios`);
  return data;
};

const getCommentsByUserId = async (id: number): Promise<IComentario[]> => {
  const { data } = await api.get<IComentario[]>(`/comentarios/usuario/${id}`);
  return data;
};

const createComment = async (
  conteudo: string,
  IdUsuarioFk: number,
  idPostagemFk: number
): Promise<IComentario> => {
  const { data } = await api.post<IComentario>(`/comentarios`, {
    conteudo,
    IdUsuarioFk,
    idPostagemFk,
  });
  return data;
};

const deleteComment = async (id: number): Promise<boolean> => {
  const { status } = await api.delete(`/comentarios/${id}`);
  return status === 204;
};

export {
  getCommentsByPostId,
  createComment,
  deleteComment,
  getComments,
  getCommentsByUserId,
};
