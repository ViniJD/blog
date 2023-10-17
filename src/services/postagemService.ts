import { IPostagem } from "../interfaces/IPostagem";
import api from "./api";

const getPosts = async (): Promise<IPostagem[]> => {
  const { data } = await api.get<IPostagem[]>("/postagens");
  return data;
};

export { getPosts };
