import { Link, useParams } from "react-router-dom";

export default function MostrarPostagem() {
  const { id } = useParams();

  console.log(id);

  return (
    <main>
      <img
        src="https://i.pinimg.com/originals/a1/a2/87/a1a2877a97033a48df935d3a3a5bd347.jpg"
        className="img-fluid"
        alt="Imagem do post"
        style={{
          maxHeight: 500,
          width: "100%",
          objectFit: "cover",
        }}
      />
      <div className="container mt-5">
        <h1 className="display-5 fw-bold">Title Post</h1>
        <p>
          escrito por{" "}
          <Link to="/postagens/usuario/1" className="text-dark fw-bold">
            Otávio
          </Link>
        </p>
        <p
          className="fs-4"
          dangerouslySetInnerHTML={{
            __html: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut
          repellendus dolores reprehenderit facilis maxime aperiam a, at
          necessitatibus illo earum. Sit amet, eligendi impedit mollitia eos
          eius magni quas. Pariatur quasi assumenda exercitationem dicta fuga?
          Delectus enim consectetur illo magni porro unde illum, id temporibus
          rerum amet, incidunt quos vero praesentium voluptatem numquam,
          eligendi cumque. Praesentium illo iure facilis. Hic vel veniam esse,
          dicta saepe totam repudiandae natus quaerat enim magni dolorem beatae
          a itaque assumenda voluptate minima impedit quae ab tempora quidem
          vero. Eum ratione velit rem non consequuntur perspiciatis quibusdam
          explicabo blanditiis illum veniam at, quos consequatur facilis`,
          }}
        />
        <div className="row">
          <div className="col-8">
            <form autoComplete="off">
              <div>
                <label htmlFor="conteudo" className="form-label fs-3 fw-bold">
                  Comentários
                </label>
                <textarea
                  className="form-control"
                  placeholder="Digite seu comentário"
                  id="conteudo"
                  rows={3}
                  maxLength={250}
                ></textarea>
                <div className="form-text">10 caracteres de 250.</div>
              </div>
              <div className="text-end ">
                <button type="submit" className="btn btn-warning mb-3">
                  Enviar
                </button>
              </div>
            </form>

            {Array.from(Array(5).keys()).map((id, idx) => (
              <p className="col-10 offset-1" key={id}>
                <strong className="me-1">Otávio Barreto</strong>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
                {idx + 1 < Array.from(Array(5).keys()).length ? <hr /> : <></>}
              </p>
            ))}
          </div>
          <div className="col-4 d-flex justify-content-center mt-4 pt-5">
            <i
              className="fa-regular fa-heart fa-2xl"
              style={{ cursor: "pointer" }}
            ></i>
            {/* <i className="fa-solid fa-heart fa-2xl"></i> */}
            <span className="fs-5 ms-3">123 curtidas</span>
          </div>
        </div>
        <footer className="pt-3 my-4 text-body-secondary border-top">
          PI 2 • 2023
        </footer>
      </div>
    </main>
  );
}
