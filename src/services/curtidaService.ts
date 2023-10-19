import { ICurtida } from "../interfaces/ICurtida";
import api from "./api";

const getLikesByPostId = async (id: number): Promise<ICurtida[]> => {
  const { data } = await api.get<ICurtida[]>(`/curtidas/postagem/${id}`);
  return data;
};

const createLike = async (idUser: number, idPost: number): Promise<boolean> => {
  const { status } = await api.post<ICurtida>(`/curtidas`, {
    idPostagemFk: idPost,
    IdUsuarioFk: idUser,
  });
  return status === 201;
};

const deleteLike = async (id: number): Promise<boolean> => {
  const { status } = await api.delete<ICurtida>(`/curtidas/${id}`);
  return status === 204;
};

export { getLikesByPostId, createLike, deleteLike };
