import { Link } from "react-router-dom";

export default function CardPostagem() {
  return (
    <div className="card">
      <img
        src="https://i.pinimg.com/originals/a1/a2/87/a1a2877a97033a48df935d3a3a5bd347.jpg"
        className="card-img-top"
        alt="Imagem do post"
      />
      <div className="card-body">
        <p>
          escrito por{" "}
          <Link to="/postagens/usuario/1" className="text-dark fw-bold">
            Otávio
          </Link>
        </p>
        <h5 className="card-title">Post Title</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </p>
        <p className="text-end">
          <Link className="btn btn-warning ms-auto" to="/postagens/1">
            Ver postagem
          </Link>
        </p>
      </div>
    </div>
  );
}
