import { Link } from "react-router-dom";
import { IPostagem } from "../../interfaces/IPostagem";

interface IProps {
  post: IPostagem;
  openLinksWithTargetBlank?: boolean;
  children?: React.ReactNode;
}

export default function CardPostagem({
  post,
  openLinksWithTargetBlank = false,
  children,
}: IProps) {
  return (
    <div className="card">
      <img src={post.imagem} className="card-img-top" alt={post.titulo} />
      <div className="card-body">
        <p>
          escrito por{" "}
          <Link
            to={`/postagens/usuario/${post.idUsuarioFk}`}
            target={openLinksWithTargetBlank ? "_blank" : "_self"}
            className="text-dark fw-bold"
          >
            {post.escritor?.nome}
          </Link>
        </p>
        <h5 className="card-title">{post.titulo}</h5>
        <p
          className="card-text text-truncate"
          style={{ maxHeight: "4rem" }}
          dangerouslySetInnerHTML={{
            __html: `${post.conteudo}`,
          }}
        />
        <p className="text-end">
          <Link
            className="btn btn-warning ms-auto"
            target={openLinksWithTargetBlank ? "_blank" : "_self"}
            to={{
              pathname: `/postagens/${post.id}`,
              search: openLinksWithTargetBlank ? `?from_dashboard=true` : ``,
            }}
          >
            Ver postagem
          </Link>
        </p>
      </div>
      {children}
    </div>
  );
}
