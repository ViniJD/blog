import { IPostagem } from "../interfaces/IPostagem";
import api from "./api";

const getPosts = async (last: boolean = false): Promise<IPostagem[]> => {
  const { data } = await api.get<IPostagem[] | IPostagem>(
    `/postagens?last=${last}`
  );
  return Array.isArray(data) ? data : [data];
};

const getPostsByAuthorId = async (id: number): Promise<IPostagem[]> => {
  const { data } = await api.get<IPostagem[] | IPostagem>(
    `/postagens/usuario/${id}`
  );
  return Array.isArray(data) ? data : [data];
};

const getPostById = async (id: number): Promise<IPostagem> => {
  const { data } = await api.get<IPostagem>(`/postagens/${id}`);
  return data;
};

export { getPosts, getPostsByAuthorId, getPostById };
