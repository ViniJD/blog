import iziToast from "izitoast";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  handleChangeValue as changeValue,
  handleSetError,
  verifyIfHasError,
} from "../../hooks/useForm";
import { IForm, IFormValues } from "../../interfaces/IFormControl";
import { setItem } from "../../services/localStorageService";
import { signin } from "../../services/usuarioService";
import { requiredValidator } from "../../services/validators";

export default function Login() {
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [values, setValues] = useState<IFormValues>({
    login: {} as IForm,
    senha: {} as IForm,
  });
  const navigate = useNavigate();

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const auxValues = changeValue(values, e.target.name, e.target.value);
    setValues(auxValues);
  };

  const handleVerifyIfHasError = (
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    let auxValues: IFormValues;

    if (requiredValidator(value)) {
      auxValues = handleSetError(values, name, true, requiredValidator(value));
    } else {
      auxValues = handleSetError(values, name, false, "");
    }

    setValues(auxValues);
    setDisableButton(verifyIfHasError(values));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();

    const user = await signin(values.login.value, btoa(values.senha.value));
    if ("status" in user && user.status === 404) {
      iziToast.error({
        position: "bottomCenter",
        message: user.message,
      });
    } else {
      setItem("loggedUser", user);
      navigate("/");
    }

    setLoading(false);
  };

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
                <form
                  className="mb-3"
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <p className="mb-3">
                    Por favor, entre com seu login e sua senha!
                  </p>
                  <div className="mb-3">
                    <label htmlFor="login" className="form-label">
                      Login
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        values.login.hasError ? "is-invalid" : ""
                      }`}
                      id="login"
                      name="login"
                      placeholder="seu@email.com"
                      value={values.login ? values.login.value : ""}
                      onChange={handleChangeValue}
                      onBlur={handleVerifyIfHasError}
                    />
                    {values.login.hasError && (
                      <div className="invalid-feedback">
                        {values.login.errorMessage}
                      </div>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="senha" className="form-label">
                      Senha
                    </label>
                    <input
                      type="password"
                      className={`form-control ${
                        values.senha.hasError ? "is-invalid" : ""
                      }`}
                      id="senha"
                      name="senha"
                      placeholder="*******"
                      value={values.senha ? values.senha.value : ""}
                      onChange={handleChangeValue}
                      onBlur={handleVerifyIfHasError}
                    />
                    {values.senha.hasError && (
                      <div className="invalid-feedback">
                        {values.senha.errorMessage}
                      </div>
                    )}
                  </div>
                  <div className="d-grid">
                    {!loading ? (
                      <button
                        className="btn btn-warning"
                        type="submit"
                        disabled={disableButton}
                      >
                        Logar
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning"
                        type="button"
                        disabled
                      >
                        <span className="spinner-border text-dark spinner-border-sm"></span>
                      </button>
                    )}
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
