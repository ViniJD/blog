import { Link } from "react-router-dom";

export default function Postagens() {
  return (
    <main>
      <div className="container mt-5">
        <h1 className="fs-1 mb-5">Todas as postagens</h1>
        <div className="row">
          {Array.from(Array(10).keys()).map((id) => (
            <div className="col-4 mb-4">
              <div className="card">
                <img
                  src="https://i.pinimg.com/originals/a1/a2/87/a1a2877a97033a48df935d3a3a5bd347.jpg"
                  className="card-img-top"
                  alt="Imagem do post"
                />
                <div className="card-body">
                  <h5 className="card-title">Post Title</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <p className="text-end">
                    <Link
                      className="btn btn-warning ms-auto"
                      to={`/postagens/${id}`}
                    >
                      Ver postagem
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="pt-3 my-4 text-body-secondary border-top">
          PI 2 • 2023
        </footer>
      </div>
    </main>
  );
}
