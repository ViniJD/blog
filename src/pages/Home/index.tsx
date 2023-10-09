import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <div className="container mt-5">
        <div className="p-5 mb-4 bg-body-tertiary border rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">News.blog</h1>
            <p className="fs-4">
              Neste blog você vai encontrar postagens dos mais diversos temas
              para você se atualizar, curtir e comentar. Aqui também você pode
              realizar a vontade de compartilhar suas idéias e pensamentos e se
              cadastrar como um <span className="fw-bold">escritor</span>.
            </p>
            <Link className="btn btn-warning" to="/postagens">
              Ver todas as postagens
            </Link>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div className="h-100 p-5 text-bg-dark rounded-3">
              <h2>Sobre nós</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque
                atque cumque eaque asperiores rerum beatae omnis tenetur
                perspiciatis, error assumenda corporis odit excepturi.
              </p>
              <Link className="btn btn-outline-light" to="/sobre">
                Veja mais
              </Link>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 p-5 bg-body-tertiary border rounded-3">
              <h2>Última postagem</h2>
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
                    <Link className="btn btn-warning ms-auto" to="/postagens/1">
                      Ver postagem
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="pt-3 my-4 text-body-secondary border-top">
          PI 2 • 2023
        </footer>
      </div>
    </main>
  );
}
