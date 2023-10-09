import { Link } from "react-router-dom";

export default function Cadastrar() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-6">
            <h1 className="fw-bold display-4 mb-3 text-center">
              <Link to="/" className="text-warning text-decoration-none">
                News.blog
              </Link>
            </h1>
            <div className="card bg-body-tertiary">
              <div className="card-body p-5">
                <form className="mb-3" autoComplete="off">
                  <p className="mb-3">
                    Bem vindo! Entre com seus dados para se cadastrar.
                  </p>
                  <div className="mb-3">
                    <label htmlFor="nome" className="form-label">
                      Nome
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nome"
                      placeholder="Seu Nome Completo"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="login" className="form-label">
                      Login
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="login"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div className="row mb-3">
                    <div className="col-6">
                      <label htmlFor="senha" className="form-label">
                        Senha
                      </label>
                      <input
                        type="senha"
                        className="form-control"
                        id="password"
                        placeholder="*******"
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label">Selecione seu nível</label>
                      <div className="d-flex mt-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="LEI"
                            name="nivel"
                            id="leitor"
                            checked
                          />
                          <label className="form-check-label" htmlFor="leitor">
                            Leitor
                          </label>
                        </div>
                        <div className="form-check ms-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="ESC"
                            name="nivel"
                            id="escritor"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="escritor"
                          >
                            Escritor
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <p className="small">
                    <a className="text-primary" href="forget-password.html">
                      Forgot password?
                    </a>
                  </p> */}
                  <div className="d-grid">
                    <button className="btn btn-warning" type="submit">
                      Cadastrar
                    </button>
                  </div>
                </form>
                <div>
                  <p className="text-center">
                    Já possui conta?{" "}
                    <Link to="/login" className="text-primary">
                      Faça login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
