import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { IPostagem } from "../../interfaces/IPostagem";
import { getPostById } from "../../services/postagemService";
import { getUserById } from "../../services/usuarioService";
import { IUsuario } from "../../interfaces/IUsuario";
import { getItem } from "../../services/localStorageService";
import iziToast from "izitoast";
import { getLikesByPostId } from "../../services/curtidaService";
import { getCommentsByPostId } from "../../services/comentarioService";

export default function MostrarPostagem() {
  const [post, setPost] = useState<IPostagem>({} as IPostagem);
  const [loggedUser, setLoggedUser] = useState<IUsuario>();
  const { id } = useParams();
  const location = useLocation();

  const getPostsByAuthor = async () => {
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

  const showUnloggedAlert = () => {
    iziToast.error({
      position: "bottomCenter",
      message: `Você precisa estar logado para curtir ou comentar`,
    });
  };

  useEffect(() => {
    setLoggedUser(getItem("loggedUser"));
    getPostsByAuthor();
  }, [location]);

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

            <form autoComplete="off">
              <label htmlFor="conteudo" className="form-label fs-3 fw-bold">
                Comentários
              </label>
              <textarea
                className="form-control"
                placeholder="Digite seu comentário"
                id="conteudo"
                rows={3}
                maxLength={250}
                disabled={!loggedUser && true}
              ></textarea>
              <div className="form-text">0 caracteres de 250.</div>
              <div className="text-end">
                <button
                  type="submit"
                  className="btn btn-warning mb-3"
                  disabled={!loggedUser && true}
                >
                  Enviar
                </button>
              </div>
            </form>

            {post.comentarios?.map((comentario, idx) => (
              <p className="col-10 offset-1" key={comentario.id}>
                <strong className="me-1">{comentario.usuario?.nome}</strong>
                {comentario.conteudo}
                {post.comentarios && post.comentarios?.length < idx + 1 ? (
                  <hr />
                ) : (
                  <></>
                )}
              </p>
            ))}
          </div>
          <div className="col-4 d-flex justify-content-center mt-4 pt-5">
            <span
              className={`${!loggedUser && "opacity-75"}`}
              style={{ cursor: "pointer" }}
            >
              <i className="fa-regular fa-heart fa-2xl"></i>
              {/* <i className="fa-solid fa-heart fa-2xl"></i> */}
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
