import { IComentario } from "../interfaces/IComentario";
import api from "./api";

const getCommentsByPostId = async (id: number): Promise<IComentario[]> => {
  const { data } = await api.get<IComentario[]>(`/comentarios/postagem/${id}`);
  return data;
};

export { getCommentsByPostId };
