import { Link } from "react-router-dom";

export default function Login() {
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
                    Por favor, entre com seu login e sua senha!
                  </p>
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
                  <div className="mb-3">
                    <label htmlFor="senha" className="form-label ">
                      Senha
                    </label>
                    <input
                      type="senha"
                      className="form-control"
                      id="password"
                      placeholder="*******"
                    />
                  </div>
                  {/* <p className="small">
                    <a className="text-primary" href="forget-password.html">
                      Forgot password?
                    </a>
                  </p> */}
                  <div className="d-grid">
                    <button className="btn btn-warning" type="submit">
                      Logar
                    </button>
                  </div>
                </form>
                <div>
                  <p className="text-center">
                    Não possui conta?{" "}
                    <Link to="/cadastrar" className="text-primary">
                      Cadastre-se
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
