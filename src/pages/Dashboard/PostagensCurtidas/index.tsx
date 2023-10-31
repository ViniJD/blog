import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ICurtida } from "../../../interfaces/ICurtida";
import { IUsuario } from "../../../interfaces/IUsuario";
import { getItem } from "../../../services/localStorageService";
import { deleteLike, getLikesByUserId } from "../../../services/curtidaService";
import iziToast from "izitoast";
import { getPostById } from "../../../services/postagemService";
import { IPostagem } from "../../../interfaces/IPostagem";

interface IPostagemECurtida {
  post: IPostagem;
  like: ICurtida;
}

export default function PostagensCurtidas() {
  const [postsAndLikes, setPostsAndLikes] = useState<IPostagemECurtida[]>([]);
  const [loggedUser] = useState<IUsuario>(getItem("loggedUser"));
  const location = useLocation();

  const getLikesById = async () => {
    const likesResponse = await getLikesByUserId(loggedUser.id);
    const postIds = likesResponse.map((lk) => lk.idPostagemFk);

    if (postIds.length > 0) {
      const postsResponse = await getPostById(postIds);

      const postAndLike = likesResponse.map((like) => {
        const post = postsResponse.find(
          (post) => post.id === like.idPostagemFk
        ) as IPostagem;

        return {
          like,
          post,
        };
      });

      setPostsAndLikes(postAndLike);
    } else {
      setPostsAndLikes([]);
    }
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
        {postsAndLikes.length > 0 ? (
          postsAndLikes.map((pl) => (
            <div className="col-4 mb-4" key={pl.like.id}>
              <div className="card">
                <div className="card-body">
                  <p className="d-flex alig-items-center justify-content-between">
                    <Link
                      to={`/postagens/${pl.like.idPostagemFk}`}
                      target="_blank"
                      className="text-dark fw-bold"
                    >
                      {pl.post.titulo}
                    </Link>
                  </p>
                  <span className={`fa-solid fa-heart fa-2xl`}></span>
                </div>
                <div className="card-footer text-muted">
                  <button
                    className="btn btn-outline-danger me-1"
                    onClick={() => handleLikeOrDislike(pl.like.id)}
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
