import iziToast from "izitoast";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  handleChangeValue as changeValue,
  handleSetError,
  verifyIfHasError,
} from "../../../hooks/useForm";
import { IForm, IFormValues } from "../../../interfaces/IFormControl";
import { IUsuario } from "../../../interfaces/IUsuario";
import { getItem, setItem } from "../../../services/localStorageService";
import { updateUser } from "../../../services/usuarioService";
import {
  minLengthValidator,
  requiredValidator,
} from "../../../services/validators";

export default function MeusDados() {
  const [levelHasBeenChangedPreviuosly, setLevelHasBeenChangedPreviuosly] =
    useState<boolean>(true);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [loggedUser, setLoggedUser] = useState<IUsuario>(getItem("loggedUser"));
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const [values, setValues] = useState<IFormValues>({
    nome: {} as IForm,
    login: {} as IForm,
    nivel: {} as IForm,
    senha: {} as IForm,
  });

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

    if (name !== "senha") {
      if (requiredValidator(value)) {
        auxValues = handleSetError(
          values,
          name,
          true,
          requiredValidator(value)
        );
      } else {
        auxValues = handleSetError(values, name, false, "");
      }

      setValues(auxValues);
      setDisableButton(verifyIfHasError(values));
    } else {
      if (minLengthValidator(value) && !requiredValidator(value)) {
        auxValues = handleSetError(
          values,
          name,
          true,
          minLengthValidator(value)
        );
      } else {
        auxValues = handleSetError(values, name, false, "");
      }

      setValues(auxValues);
      setDisableButton(verifyIfHasError(values));
    }
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();

    const response = await updateUser({
      id: loggedUser.id,
      nome: values.nome.value,
      login: values.login.value,
      nivel: values.nivel.value,
      senha: values.senha.value === "" ? "" : btoa(values.senha.value),
    });

    if (response.status === 409) {
      iziToast.error({
        position: "bottomCenter",
        message: response.message,
      });
    } else if (response.status === 204) {
      iziToast.success({
        position: "bottomCenter",
        message: "Dados atualizados com sucesso",
      });

      setItem("loggedUser", {
        id: loggedUser.id,
        nome: values.nome.value,
        login: values.login.value,
        nivel: values.nivel.value,
        senha: null,
      });

      setLoggedUser({
        id: loggedUser.id,
        nome: values.nome.value,
        login: values.login.value,
        nivel: values.nivel.value,
        senha: undefined,
      });

      setValues({
        nome: {
          value: values.nome.value,
          hasError: false,
          errorMessage: "",
        },
        login: {
          value: values.login.value,
          hasError: false,
          errorMessage: "",
        },
        nivel: {
          value: values.nivel.value,
          hasError: false,
          errorMessage: "",
        },
        senha: {
          value: "",
          hasError: false,
          errorMessage: "",
        },
      });
    } else {
      iziToast.error({
        position: "bottomCenter",
        message: "Erro ao atualizar dados",
      });
    }

    setLoading(false);
  };

  const handleChangeLevel = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "ESC") {
      iziToast.question({
        timeout: 10000,
        close: true,
        overlay: true,
        zindex: 999,
        title: "Quer mudar seu nível?",
        message:
          "Após essa mudança, você não poderá voltar para o nível de LEITOR. Tem certeza?",
        position: "center",
        buttons: [
          [
            "<button><b>Não</b></button>",
            (instance, toast) => {
              instance.hide({ transitionOut: "fadeOut" }, toast, "button");
              e.target.value = "LEI";
              handleChangeValue(e);
            },
            true,
          ],
          [
            "<button>Sim</button>",
            (instance, toast) => {
              instance.hide({ transitionOut: "fadeOut" }, toast, "button");
              handleChangeValue(e);
            },
            false,
          ],
        ],
      });
    } else {
      handleChangeValue(e);
    }
  };

  const handleDeleteAccount = () => {
    iziToast.question({
      timeout: 10000,
      close: true,
      overlay: true,
      zindex: 999,
      message: `Deseja realmente excluir sua conta? Todos as curtidas e comentários que você fez e que foram feitas nas suas postagens e também serão excluidas.`,
      position: "center",
      buttons: [
        [
          "<button><b>Não</b></button>",
          (instance, toast) => {
            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
          },
          true,
        ],
        [
          "<button>Sim</button>",
          async (instance, toast) => {
            instance.hide({ transitionOut: "fadeOut" }, toast, "button");
          },
          false,
        ],
      ],
    });
  };

  const showWriterMessage = () => {
    iziToast.warning({
      position: "bottomCenter",
      message: `O seu perfil é do nível ESCRITOR. Não é mais possível voltar para LEITOR.`,
    });
  };

  const showADMMessage = () => {
    iziToast.warning({
      position: "bottomCenter",
      message: `O seu perfil é do nível ADMINISTRADOR. Você possui total controle sobre as postagens, curtidas, comentários e usuários. Além disso pode ter suas próprias postagens.`,
    });
  };

  useEffect(() => {
    setLevelHasBeenChangedPreviuosly(loggedUser.nivel !== "ESC");

    setValues({
      nome: {
        value: loggedUser.nome,
        hasError: false,
        errorMessage: "",
      },
      login: {
        value: loggedUser.login,
        hasError: false,
        errorMessage: "",
      },
      nivel: {
        value: loggedUser.nivel,
        hasError: false,
        errorMessage: "",
      },
      senha: {
        value: "",
        hasError: false,
        errorMessage: "",
      },
    });
  }, [location]);

  return (
    <div className="container">
      <div className="row">
        <h1 className="display-5 fw-bold mb-5">Meus dados</h1>
        <div className="col-6 offset-3">
          <form className="mb-3" autoComplete="off" onSubmit={handleSubmit}>
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
              {loggedUser.nivel !== "ADM" ? (
                <div className="col-6">
                  <label className="form-label">Seu nível</label>
                  <div
                    className="d-flex mt-2"
                    onClick={
                      loggedUser.nivel === "ESC"
                        ? () => showWriterMessage()
                        : () => {}
                    }
                  >
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="LEI"
                        name="nivel"
                        id="leitor"
                        disabled={
                          values.nivel.value === "ESC" &&
                          !levelHasBeenChangedPreviuosly
                        }
                        checked={values.nivel.value === "LEI"}
                        onChange={
                          levelHasBeenChangedPreviuosly
                            ? (e) => handleChangeLevel(e)
                            : () => {}
                        }
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
                        disabled={
                          values.nivel.value === "ESC" &&
                          !levelHasBeenChangedPreviuosly
                        }
                        checked={values.nivel.value === "ESC"}
                        onChange={handleChangeLevel}
                      />
                      <label className="form-check-label" htmlFor="escritor">
                        Escritor
                      </label>
                    </div>
                  </div>
                  <p></p>
                </div>
              ) : (
                <div className="col-6">
                  <label className="form-label">Seu nível</label>
                  <div
                    className="d-flex mt-2"
                    onClick={
                      loggedUser.nivel === "ADM"
                        ? () => showADMMessage()
                        : () => {}
                    }
                  >
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="ADM"
                        name="nivel"
                        id="adm"
                        disabled={values.nivel.value === "ADM"}
                        checked={values.nivel.value === "ADM"}
                      />
                      <label className="form-check-label" htmlFor="adm">
                        Administrador
                      </label>
                    </div>
                  </div>
                  <p></p>
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
                  Salvar
                </button>
              ) : (
                <button className="btn btn-warning" type="button" disabled>
                  <span className="spinner-border text-dark spinner-border-sm"></span>
                </button>
              )}
              {loggedUser.nivel !== "ADM" && (
                <button
                  className="btn btn-outline-danger mt-4"
                  type="button"
                  onClick={handleDeleteAccount}
                >
                  Excluir minha conta
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
