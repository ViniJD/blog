import { Link } from "react-router-dom";
import { IPostagem } from "../../interfaces/IPostagem";

interface IProps {
  post: IPostagem;
}

export default function CardPostagem({ post }: IProps) {
  return (
    <div className="card">
      <img src={post.imagem} className="card-img-top" alt={post.titulo} />
      <div className="card-body">
        <p>
          escrito por{" "}
          <Link
            to={`/postagens/usuario/${post.idUsuarioFk}`}
            className="text-dark fw-bold"
          >
            {post.escritor?.nome}
          </Link>
        </p>
        <h5 className="card-title">{post.titulo}</h5>
        <p
          className="card-text"
          dangerouslySetInnerHTML={{
            __html: post.conteudo.slice(0, 80),
          }}
        />
        <p className="text-end">
          <Link
            className="btn btn-warning ms-auto"
            to={`/postagens/${post.id}`}
          >
            Ver postagem
          </Link>
        </p>
      </div>
    </div>
  );
}
