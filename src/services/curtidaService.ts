import { ICurtida } from "../interfaces/ICurtida";
import api from "./api";

const getLikesByPostId = async (id: number): Promise<ICurtida[]> => {
  const { data } = await api.get<ICurtida[]>(`/curtidas/postagem/${id}`);
  return data;
};

export { getLikesByPostId };
