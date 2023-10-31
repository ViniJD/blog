import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { IUsuario } from "../../../interfaces/IUsuario";
import { getItem } from "../../../services/localStorageService";
import { deleteUser, getUsers } from "../../../services/usuarioService";

export default function TodosUsuarios() {
  const [users, setUsers] = useState<IUsuario[]>([]);
  const [loggedUser] = useState<IUsuario>(getItem("loggedUser"));
  const location = useLocation();

  const getAllUsers = async () => {
    let usersResponse = await getUsers();
    usersResponse = usersResponse.filter((user) => user.id !== loggedUser.id);

    setUsers(usersResponse);
  };

  const handleDeleteUser = async (id: number) => {
    iziToast.question({
      timeout: 10000,
      close: true,
      overlay: true,
      zindex: 999,
      message:
        "Deseja realmente excluir esse usuário? Todos as informações relacionadas ao usuário também serão excluidas",
      position: "center",
      buttons: [
        [
          "<button><b>Não</b></button>",
          (instance, toast) => {
            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
          },
          true,
        ],
        [
          "<button>Sim</button>",
          async (instance, toast) => {
            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
            const success = await deleteUser(id);

            if (success) {
              getAllUsers();

              iziToast.success({
                position: "bottomCenter",
                message: "Usuário excluído com sucesso",
              });
            } else {
              iziToast.error({
                position: "bottomCenter",
                message: "Erro ao excluir usuário",
              });
            }
          },
          false,
        ],
      ],
    });
  };

  useEffect(() => {
    getAllUsers();
  }, [location]);

  return (
    <>
      <h1 className="display-5 fw-bold mb-5">Todos Usuários</h1>
      <div className="row">
        {users.length > 0 ? (
          users.map((user) => (
            <div className="col-4 mb-4" key={user.id}>
              <div className="card">
                <div className="card-body">
                  <p>
                    <Link
                      to={`/postagens/${user.id}`}
                      target="_blank"
                      className="text-dark fw-bold"
                    >
                      {user.nome}
                    </Link>
                  </p>
                  <p>{user.nivel === "ESC" ? "Escritor" : "Leitor"}</p>
                </div>
                <div className="card-footer text-muted">
                  <button
                    className="btn btn-outline-danger me-1"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum usuário se cadastrou ainda</p>
        )}
      </div>
    </>
  );
}
