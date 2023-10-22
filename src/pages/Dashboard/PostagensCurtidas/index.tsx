import { Link, useLocation } from "react-router-dom";
import CardPostagem from "../../../components/CardPostagem";
import { useEffect, useState } from "react";
import { ICurtida } from "../../../interfaces/ICurtida";
import { IUsuario } from "../../../interfaces/IUsuario";
import { getItem } from "../../../services/localStorageService";
import { deleteLike, getLikesByUserId } from "../../../services/curtidaService";
import iziToast from "izitoast";

export default function PostagensCurtidas() {
  const [likes, setLikes] = useState<ICurtida[]>([]);
  const [loggedUser] = useState<IUsuario>(getItem("loggedUser"));
  const location = useLocation();

  const getLikesById = async () => {
    const likesResponse = await getLikesByUserId(loggedUser.id);
    setLikes(likesResponse);
  };

  const handleLikeOrDislike = async (id: number) => {
    iziToast.question({
      timeout: 10000,
      close: true,
      overlay: true,
      zindex: 999,
      message: "Deseja realmente descurtir essa postagem?",
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
            const success = await deleteLike(id);

            if (success) {
              getLikesById();

              iziToast.success({
                position: "bottomCenter",
                message: "Postagem descurtida",
              });
            } else {
              iziToast.error({
                position: "bottomCenter",
                message: "Erro ao descurtir postagem",
              });
            }
          },
          false,
        ],
      ],
    });
  };

  useEffect(() => {
    getLikesById();
  }, [location]);

  return (
    <>
      <h1 className="display-5 fw-bold mb-5">Postagens curtidas</h1>
      <div className="row">
        {likes.length > 0 ? (
          likes.map((like) => (
            <div className="col-4 mb-4" key={like.id}>
              <div className="card">
                <div className="card-body">
                  <p>
                    <Link
                      to={`/postagens/${like.idPostagemFk}`}
                      target="_blank"
                      className="text-dark fw-bold"
                    >
                      Ver postagem
                    </Link>
                  </p>
                </div>
                <div className="card-footer text-muted">
                  <button
                    className="btn btn-outline-danger me-1"
                    onClick={() => handleLikeOrDislike(like.id)}
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma postagem foi curtida ainda</p>
        )}
      </div>
    </>
  );
}
