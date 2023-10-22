import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CardPostagem from "../../../components/CardPostagem";
import { IPostagem } from "../../../interfaces/IPostagem";
import { IUsuario } from "../../../interfaces/IUsuario";
import { getItem } from "../../../services/localStorageService";
import {
  approveOrDisapprovePost,
  deletePost,
  getPosts,
  getPostsByAuthorId,
} from "../../../services/postagemService";
import { getUserById } from "../../../services/usuarioService";

export default function MinhasPostagens() {
  const [posts, setPosts] = useState<IPostagem[]>([]);
  const [loggedUser] = useState<IUsuario>(getItem("loggedUser"));
  const location = useLocation();

  const getPostsByAuthor = async () => {
    let postsResponse: IPostagem[] = [];
    let authors: IUsuario[] = [];

    if (loggedUser.nivel === "ADM") {
      postsResponse = await getPosts(false, true);
      let ids = postsResponse.map((post) => post.idUsuarioFk);
      ids = ids.filter(
        (item, index) => ids.indexOf(item) === index && item !== loggedUser.id
      );
      authors = await getUserById(ids);
      authors.push(loggedUser);
    } else {
      postsResponse = await getPostsByAuthorId(loggedUser.id, true);
      authors.push(loggedUser);
    }

    postsResponse.forEach(
      (post) =>
        (post.escritor = authors.find(
          (author) => author.id === post.idUsuarioFk
        ))
    );
    setPosts(postsResponse);
  };

  const handleDeletePost = (postToDelete: IPostagem) => {
    iziToast.question({
      timeout: 10000,
      close: true,
      overlay: true,
      zindex: 999,
      message: `Deseja excluir essa postagem?`,
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
            const success = await deletePost(postToDelete.id);

            if (success) {
              iziToast.success({
                position: "bottomCenter",
                message: `Postagem excluída`,
              });
              const postsUpdated = posts.filter(
                (p) => p.id !== postToDelete.id
              );
              setPosts(postsUpdated);
            } else {
              iziToast.error({
                position: "bottomCenter",
                message: `Erro excluir postagem`,
              });
            }
          },
          false,
        ],
      ],
    });
  };

  const handleApprovePost = (postToEdit: IPostagem, approve: boolean): void => {
    iziToast.question({
      timeout: 10000,
      close: true,
      overlay: true,
      zindex: 999,
      message: `Deseja ${approve ? "aprovar" : "reprovar"} essa postagem?`,
      position: "center",
      buttons: [
        [
          "<button><b>Não</b></button>",
          (instance, toast) => {
            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
            const postsUpdated = posts.map((p) => {
              if (p.id === postToEdit.id) {
                p.ativo = approve ? 0 : 1;
              }
              return p;
            });

            setPosts(postsUpdated);
          },
          true,
        ],
        [
          "<button>Sim</button>",
          async (instance, toast) => {
            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
            const success = await approveOrDisapprovePost(
              postToEdit.id,
              approve
            );

            if (success) {
              iziToast.success({
                position: "bottomCenter",
                message: `Postagem ${approve ? "aprovada" : "reprovada"}`,
              });

              const postsUpdated = posts.map((p) => {
                if (p.id === postToEdit.id) {
                  p.ativo = approve ? 1 : 0;
                }
                return p;
              });

              setPosts(postsUpdated);
            } else {
              iziToast.error({
                position: "bottomCenter",
                message: `Erro ao ${approve ? "aprovar" : "reprovar"} postagem`,
              });

              const postsUpdated = posts.map((p) => {
                if (p.id === postToEdit.id) {
                  p.ativo = approve ? 0 : 1;
                }
                return p;
              });

              setPosts(postsUpdated);
            }
          },
          false,
        ],
      ],
    });
  };

  useEffect(() => {
    getPostsByAuthor();
  }, [location]);

  return (
    <>
      <h1 className="display-5 fw-bold mb-5">
        {loggedUser.nivel === "ADM" ? "Todas postagens" : "Minhas postagens"}
      </h1>
      <div className="row">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="col-4 mb-4" key={post.id}>
              <CardPostagem
                post={post}
                openLinksWithTargetBlank
                children={
                  <>
                    <div className="card-footer text-muted">
                      <button
                        className="btn btn-outline-danger me-1"
                        onClick={() => handleDeletePost(post)}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                      <Link
                        className="btn btn-outline-primary me-1"
                        to={`/dashboard/postagens/${post.id}/editar`}
                      >
                        <i className="fa-regular fa-pen-to-square"></i>
                      </Link>
                    </div>
                    {loggedUser?.nivel !== "ADM" && (
                      <div className="card-footer text-muted">
                        {post.ativo === 1
                          ? "Essa postagem está ativa"
                          : "Essa postagem ainda não foi aprovada, aguarde o administrador aprova-lá"}
                      </div>
                    )}
                    {loggedUser?.nivel === "ADM" && (
                      <div className="card-footer text-muted">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="ativo"
                            checked={post.ativo === 1}
                            id="ativo"
                            onChange={(e) =>
                              handleApprovePost(post, e.target.checked)
                            }
                          />
                          <label className="form-check-label" htmlFor="ativo">
                            Aprovar postagem
                          </label>
                        </div>
                      </div>
                    )}
                  </>
                }
              />
            </div>
          ))
        ) : (
          <p>Nenhuma postagem foi feita ainda</p>
        )}
      </div>
    </>
  );
}
