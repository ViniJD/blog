import iziToast from "izitoast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  handleChangeValue as changeValue,
  handleSetError,
  verifyIfHasError,
} from "../../hooks/useForm";
import { IForm, IFormValues } from "../../interfaces/IFormControl";
import { setItem } from "../../services/localStorageService";
import { register } from "../../services/usuarioService";
import {
  minLengthValidator,
  requiredValidator,
} from "../../services/validators";

export default function Cadastrar() {
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [values, setValues] = useState<IFormValues>({
    nome: {} as IForm,
    login: {} as IForm,
    senha: {} as IForm,
    nivel: {
      value: "LEI",
      hasError: false,
      errorMessage: "",
    },
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

    if (name === "senha") {
      if (requiredValidator(value)) {
        auxValues = handleSetError(
          values,
          name,
          true,
          requiredValidator(value)
        );
      } else if (minLengthValidator(value, 6)) {
        auxValues = {
          ...values,
          ...handleSetError(values, name, true, minLengthValidator(value, 6)),
        };
      } else {
        auxValues = {
          ...values,
          ...handleSetError(values, name, false, ""),
        };
      }
    }

    setValues(auxValues);
    setDisableButton(verifyIfHasError(values));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();

    const user = await register(
      values.nome.value,
      values.login.value,
      btoa(values.senha.value),
      values.nivel.value
    );
    if ("status" in user && user.status === 409) {
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
                    Bem vindo! Entre com seus dados para se cadastrar.
                  </p>
                  <div className="mb-3">
                    <label htmlFor="nome" className="form-label">
                      Nome
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        values.nome.hasError ? "is-invalid" : ""
                      }`}
                      id="nome"
                      name="nome"
                      placeholder="Seu Nome Completo"
                      value={values.nome ? values.nome.value : ""}
                      onChange={handleChangeValue}
                      onBlur={handleVerifyIfHasError}
                    />
                    {values.nome.hasError && (
                      <div className="invalid-feedback">
                        {values.nome.errorMessage}
                      </div>
                    )}
                  </div>
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
                  <div className="row mb-3">
                    <div className="col-6">
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
                            onChange={handleChangeValue}
                            checked={values.nivel.value === "LEI"}
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
                            onChange={handleChangeValue}
                            checked={values.nivel.value === "ESC"}
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
                    {!loading ? (
                      <button
                        className="btn btn-warning"
                        type="submit"
                        disabled={disableButton}
                      >
                        Cadastrar
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
