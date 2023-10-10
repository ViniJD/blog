import { Link } from "react-router-dom";

export default function MeusComentarios() {
  return (
    <>
      <h1 className="display-5 fw-bold mb-5">Meus comentários</h1>
      <div className="row">
        {Array.from(Array(3).keys()).map((id) => (
          <div className="col-4 mb-4" key={id}>
            <div className="card">
              <div className="card-body">
                <p>
                  <Link to="/postagens/1" className="text-dark fw-bold">
                    Postagem 1
                  </Link>
                </p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                consectetur officiis consequuntur non, blanditiis quam
                dignissimos voluptatum
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
