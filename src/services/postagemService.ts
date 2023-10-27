import { IErrorResponse } from "../interfaces/IErrorResponse";
import { IPostagem } from "../interfaces/IPostagem";
import api from "./api";

const getPosts = async (
  last: boolean = false,
  inactive: boolean = false
): Promise<IPostagem[]> => {
  const { data } = await api.get<IPostagem[] | IPostagem>(
    `/postagens?last=${last}&inactive=${inactive}`
  );
  return Array.isArray(data) ? data : [data];
};

const getPostsByAuthorId = async (
  id: number,
  inactive: boolean = false
): Promise<IPostagem[]> => {
  const { data } = await api.get<IPostagem[] | IPostagem>(
    `/postagens/usuario/${id}?inactive=${inactive}`
  );
  return Array.isArray(data) ? data : [data];
};

const approveOrDisapprovePost = async (
  id: number,
  active: boolean
): Promise<boolean> => {
  const { status } = await api.put(`/postagens/${id}`, {
    ativo: active ? 1 : 0,
  });
  return status === 204;
};

const deletePost = async (id: number): Promise<boolean> => {
  const { status } = await api.delete(`/postagens/${id}`);
  return status === 204;
};

const getPostById = async (ids: number[]): Promise<IPostagem[]> => {
  const { data } = await api.get<IPostagem[]>(
    `/postagens?ids=${ids.join(",")}`
  );
  return data;
};

const createPost = async (
  postData: IPostagem
): Promise<IPostagem | IErrorResponse> => {
  const { data, status } = await api.post<IPostagem>(`/postagens`, {
    titulo: postData.titulo,
    imagem: postData.imagem,
    conteudo: postData.conteudo,
    ativo: postData.ativo,
    idUsuarioFk: postData.idUsuarioFk,
  });

  if (status === 500) {
    return {
      status: status,
      message: "Erro ao cadastrar postagem. Tente novamente",
    };
  }

  return data;
};

export {
  getPosts,
  getPostsByAuthorId,
  getPostById,
  approveOrDisapprovePost,
  deletePost,
  createPost,
};
