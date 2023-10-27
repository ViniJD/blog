import { IErrorResponse } from "../interfaces/IErrorResponse";
import { IUsuario } from "../interfaces/IUsuario";
import api from "./api";

const signin = async (
  login: string,
  password: string
): Promise<IUsuario | IErrorResponse> => {
  try {
    const { data } = await api.get<IUsuario>(
      `/usuarios/signin?login=${login}&senha=${password}`
    );

    return data;
  } catch (err: any) {
    return {
      status: err.response.status,
      message: err.response.data,
    };
  }
};

const register = async (
  name: string,
  login: string,
  password: string,
  level: string
): Promise<IUsuario | IErrorResponse> => {
  try {
    const { data } = await api.post<IUsuario>(`/usuarios`, {
      nome: name,
      login: login,
      senha: password,
      nivel: level,
    });

    return data;
  } catch (err: any) {
    return {
      status: err.response.status,
      message: err.response.data,
    };
  }
};

const updateUser = async (data: IUsuario): Promise<IErrorResponse> => {
  try {
    const { status } = await api.put(`/usuarios/${data.id}`, {
      nome: data.nome,
      login: data.login,
      nivel: data.nivel,
      ...(data.senha !== "" && { senha: data.senha }),
    });

    return {
      status: status,
      message: "",
    };
  } catch (err: any) {
    return {
      status: err.response.status,
      message: err.response.data,
    };
  }
};

const getUserById = async (ids: number[]): Promise<IUsuario[]> => {
  const { data } = await api.get<IUsuario[]>(`/usuarios?ids=${ids.join(",")}`);
  return data;
};

export { getUserById, register, signin, updateUser };
