import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  handleChangeValue as changeValue,
  handleSetError,
  verifyIfHasError,
} from "../../hooks/useForm";
import { IForm, IFormValues } from "../../interfaces/IFormControl";
import { IPostagem } from "../../interfaces/IPostagem";
import { IUsuario } from "../../interfaces/IUsuario";
import {
  createComment,
  deleteComment,
  getCommentsByPostId,
} from "../../services/comentarioService";
import {
  createLike,
  deleteLike,
  getLikesByPostId,
} from "../../services/curtidaService";
import { getItem } from "../../services/localStorageService";
import { getPostById } from "../../services/postagemService";
import { getUserById } from "../../services/usuarioService";
import {
  maxLengthValidator,
  requiredValidator,
} from "../../services/validators";

export default function MostrarPostagem() {
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [showLike, setShowLike] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<IPostagem>({
    curtidas: [],
    comentarios: [],
    ...({} as IPostagem),
  });
  const [loggedUser, setLoggedUser] = useState<IUsuario>();
  const { id } = useParams();
  const location = useLocation();
  const [values, setValues] = useState<IFormValues>({
    conteudo: {} as IForm,
  });

  const getPostByAuthor = async () => {
    const postById = await getPostById(Number(id));
    const likes = await getLikesByPostId(postById.id);
    const comments = await getCommentsByPostId(postById.id);

    let ids: number[] = [];
    comments.forEach((comment) => ids.push(comment.idUsuarioFk));
    ids.push(postById.idUsuarioFk);
    ids = ids.filter((item, index) => ids.indexOf(item) === index);

    const users = await getUserById(ids);
    const author = users.find((user) => user.id === postById.idUsuarioFk);

    const commentsWithUser = comments.map((comment) => {
      const user = users.find((user) => user.id === comment.idUsuarioFk);
      comment.usuario = user;
      return comment;
    });

    postById.curtidas = likes;
    postById.escritor = author;
    postById.comentarios = commentsWithUser;
    setPost(postById);
  };

  const getLikes = async () => {
    const likes = await getLikesByPostId(post.id);

    const postUpdated = post;
    postUpdated.curtidas = likes;
    setPost(postUpdated);

    if (
      loggedUser &&
      loggedUser.id &&
      post.curtidas &&
      post.curtidas.some((x) => x.idUsuarioFk === loggedUser.id)
    ) {
      setShowLike(true);
    } else {
      setShowLike(false);
    }
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const auxValues = changeValue(values, e.target.name, e.target.value);
    setValues(auxValues);
  };

  const handleVerifyIfHasError = (
    event: React.FocusEvent<HTMLTextAreaElement>
  ) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    let auxValues: IFormValues;

    if (requiredValidator(value)) {
      auxValues = handleSetError(values, name, true, requiredValidator(value));
    } else if (maxLengthValidator(value, 250)) {
      auxValues = handleSetError(
        values,
        name,
        true,
        maxLengthValidator(value, 250)
      );
    } else {
      auxValues = handleSetError(values, name, false, "");
    }

    setValues(auxValues);
    setDisableButton(verifyIfHasError(values));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    if (!loggedUser) return;
    setLoading(true);
    e.preventDefault();

    const comment = await createComment(
      values.conteudo.value,
      loggedUser.id,
      post.id
    );

    iziToast.success({
      position: "bottomCenter",
      message: "Comentário realizado com sucesso",
    });

    const postUpdated = post;
    comment.usuario = loggedUser;
    postUpdated.comentarios?.push(comment);

    const valuesUpdated = values;
    values.conteudo = {
      value: "",
      errorMessage: "",
      hasError: false,
    };

    setValues(valuesUpdated);
    setPost(postUpdated);
    setDisableButton(true);
    setLoading(false);
  };

  const handleDeleteComment = async (id: number) => {
    if (!loggedUser) return;

    iziToast.question({
      timeout: 10000,
      close: true,
      overlay: true,
      zindex: 999,
      message: "Deseja realmente excluir esse comentário?",
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
            const success = await deleteComment(id);

            if (success) {
              getPostByAuthor();

              iziToast.success({
                position: "bottomCenter",
                message: "Comentário excluído com sucesso",
              });
            } else {
              iziToast.error({
                position: "bottomCenter",
                message: "Erro ao excluir comentário",
              });
            }
          },
          false,
        ],
      ],
    });
  };

  const handleLikeOrDislike = async () => {
    if (!loggedUser || !post.curtidas) return;

    if (!showLike) {
      const success = await createLike(loggedUser.id, post.id);

      if (success) {
        getLikes();

        iziToast.success({
          position: "bottomCenter",
          message: "Postagem curtida",
        });
      } else {
        iziToast.error({
          position: "bottomCenter",
          message: "Erro ao curtir postagem",
        });
      }
    } else {
      const likeId = post.curtidas.find((x) => x.idUsuarioFk === loggedUser.id);
      const success = await deleteLike(Number(likeId?.id));

      if (success) {
        getLikes();

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
    }
  };

  const showUnloggedAlert = () => {
    iziToast.warning({
      position: "bottomCenter",
      message: `Você precisa estar logado para curtir ou comentar`,
    });
  };

  useEffect(() => {
    setLoggedUser(getItem("loggedUser"));
    getPostByAuthor();
  }, [location]);

  useEffect(() => {
    if (
      loggedUser &&
      loggedUser.id &&
      post.curtidas &&
      post.curtidas.some((x) => x.idUsuarioFk === loggedUser.id)
    ) {
      setShowLike(true);
    }
  }, [loggedUser, post]);

  return (
    <main>
      <img
        src={post.imagem}
        className="img-fluid"
        alt={post.titulo}
        style={{
          maxHeight: 500,
          width: "100%",
          objectFit: "cover",
        }}
      />
      <div className="container mt-5">
        <h1 className="display-5 fw-bold">{post.titulo}</h1>
        <p>
          escrito por{" "}
          <Link
            to={`/postagens/usuario/${post.idUsuarioFk}`}
            className="text-dark fw-bold"
          >
            {post.escritor?.nome}
          </Link>
        </p>
        <p
          className="fs-4"
          dangerouslySetInnerHTML={{
            __html: post.conteudo,
          }}
        />
        <div className="row">
          <div className="col-8">
            {!loggedUser && (
              <div
                className="container mt-5 z-3 position-absolute rounded-3 bg-secondary opacity-0"
                style={{
                  height: 152,
                  cursor: "pointer",
                }}
                onClick={!loggedUser ? () => showUnloggedAlert() : () => {}}
              ></div>
            )}

            <form autoComplete="off" onSubmit={handleSubmit}>
              <label htmlFor="conteudo" className="form-label fs-3 fw-bold">
                Comentários
              </label>
              <textarea
                className={`form-control ${
                  values.conteudo.hasError ? "is-invalid" : ""
                }`}
                placeholder="Digite seu comentário"
                id="conteudo"
                name="conteudo"
                rows={3}
                disabled={!loggedUser && true}
                value={values.conteudo ? values.conteudo.value : ""}
                onChange={handleChangeValue}
                onBlur={handleVerifyIfHasError}
              />
              {values.conteudo.hasError && (
                <div className="invalid-feedback">
                  {values.conteudo.errorMessage}
                </div>
              )}
              <div className="form-text">
                {values.conteudo && values.conteudo.value
                  ? values.conteudo.value.length
                  : "0"}{" "}
                caracteres de 250.
              </div>

              <div className="text-end">
                {!loading ? (
                  <button
                    type="submit"
                    className="btn btn-warning mb-3"
                    disabled={(!loggedUser && true) || disableButton}
                  >
                    Enviar
                  </button>
                ) : (
                  <button className="btn btn-warning" type="button" disabled>
                    <span className="spinner-border text-dark spinner-border-sm"></span>
                  </button>
                )}
              </div>
            </form>

            {post.comentarios?.map((comentario, idx) => (
              <div key={comentario.id}>
                <div className="col-10 offset-1 d-flex justify-content-between align-items-center">
                  <span
                    className={
                      loggedUser && loggedUser?.id === comentario.idUsuarioFk
                        ? "me-4"
                        : ""
                    }
                  >
                    <strong className="me-1">{comentario.usuario?.nome}</strong>
                    {comentario.conteudo}
                  </span>
                  {loggedUser && loggedUser?.id === comentario.idUsuarioFk && (
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteComment(comentario.id)}
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </span>
                  )}
                </div>
                <>
                  {post.comentarios && post.comentarios?.length > idx + 1 ? (
                    <hr className="col-10 offset-1" />
                  ) : (
                    <></>
                  )}
                </>
              </div>
            ))}
          </div>
          <div className="col-4 d-flex justify-content-center mt-4 pt-5">
            <span
              className={`${!loggedUser && "opacity-75"} position-absolute`}
              style={{ cursor: "pointer" }}
              onClick={handleLikeOrDislike}
            >
              <>
                {showLike === true && (
                  <span>
                    <i className={`fa-solid fa-heart fa-2xl`}></i>
                  </span>
                )}
                {showLike === false && (
                  <span>
                    <i className={`fa-regular fa-heart fa-2xl`}></i>
                  </span>
                )}
              </>
              <span className="fs-5 ms-3 user-select-none">
                {post.curtidas?.length} curtidas
              </span>
            </span>
          </div>
        </div>
        <footer className="pt-3 my-4 text-body-secondary border-top">
          PI 2 • 2023
        </footer>
      </div>
    </main>
  );
}
