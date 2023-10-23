import iziToast, { IziToast } from "izitoast";
import { useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  ContentEditableEvent,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import {
  handleChangeValue as changeValue,
  handleSetError,
  verifyIfHasError,
} from "../../../hooks/useForm";
import { IForm, IFormValues } from "../../../interfaces/IFormControl";
import { IUsuario } from "../../../interfaces/IUsuario";
import { getItem } from "../../../services/localStorageService";
import { createPost } from "../../../services/postagemService";
import {
  maxLengthValidator,
  requiredValidator,
} from "../../../services/validators";

export default function NovaPostagem() {
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [loggedUser] = useState<IUsuario>(getItem("loggedUser"));
  const [loading, setLoading] = useState<boolean>(false);
  const [values, setValues] = useState<IFormValues>({
    imagem: {} as IForm,
    titulo: {} as IForm,
    conteudo: {} as IForm,
  });

  const handleChangeContent = (e: ContentEditableEvent) => {
    handleChangeValue({
      target: {
        name: e.target.name,
        value: e.target.value,
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleBlurContent = () => {
    handleVerifyIfHasError({
      preventDefault: () => {},
      target: {
        name: "conteudo",
        value: values.conteudo.value || "",
      },
    } as React.FocusEvent<HTMLInputElement>);
  };

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

    if (name === "titulo") {
      if (maxLengthValidator(value, 250)) {
        auxValues = {
          ...values,
          ...handleSetError(values, name, true, maxLengthValidator(value, 250)),
        };
      } else if (requiredValidator(value)) {
        auxValues = handleSetError(
          values,
          name,
          true,
          requiredValidator(value)
        );
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

    const post = await createPost({
      idUsuarioFk: loggedUser.id,
      imagem: values.imagem.value,
      titulo: values.titulo.value,
      conteudo: values.conteudo.value,
      ativo: 0,
      id: 0,
    });

    if ("status" in post && post.status === 500) {
      iziToast.error({
        position: "bottomCenter",
        message: post.message,
      });
    } else {
      let valuesUpdated = values;
      valuesUpdated = {
        imagem: {
          value: "",
          errorMessage: "",
          hasError: false,
        },
        titulo: {
          value: "",
          errorMessage: "",
          hasError: false,
        },
        conteudo: {
          value: "",
          errorMessage: "",
          hasError: false,
        },
      };
      setValues(valuesUpdated);
      setDisableButton(true);

      iziToast.success({
        position: "bottomCenter",
        message: "Postagem cadastrada com sucesso",
        buttons: [
          [
            "<button><b>Ver postagem</b></button>",
            (instance: IziToast, toast: HTMLDivElement) => {
              instance.hide({ transitionOut: "fadeOut" }, toast, "button");

              window.open(`/postagens/${"id" in post && post.id}`, "_blank");
            },
            true,
          ],
        ],
      });
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="display-5 fw-bold mb-5">Nova postagem</h1>
        <div className="col-8 offset-2">
          <form className="mb-3" autoComplete="off" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6 offset-3 mb-3">
                <img
                  src={
                    values.imagem.value
                      ? values.imagem.value
                      : "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                  }
                  className="img-thumbnail"
                  alt="Foto de perfil"
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="imagem" className="form-label">
                URL da imagem
              </label>
              <input
                type="text"
                className={`form-control ${
                  values.imagem.hasError ? "is-invalid" : ""
                }`}
                id="imagem"
                name="imagem"
                placeholder="https://image.com/image.png"
                value={values.imagem ? values.imagem.value : ""}
                onChange={handleChangeValue}
                onBlur={handleVerifyIfHasError}
              />
              {values.imagem.hasError && (
                <div className="invalid-feedback">
                  {values.imagem.errorMessage}
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="titulo" className="form-label">
                Título
              </label>
              <input
                className={`form-control ${
                  values.titulo.hasError ? "is-invalid" : ""
                }`}
                placeholder="Título da sua postagem"
                id="titulo"
                name="titulo"
                maxLength={250}
                value={values.titulo ? values.titulo.value : ""}
                onChange={handleChangeValue}
                onBlur={handleVerifyIfHasError}
              />
              {values.titulo.hasError && (
                <div className="invalid-feedback">
                  {values.titulo.errorMessage}
                </div>
              )}
              <div className="form-text">
                {values.titulo && values.titulo.value
                  ? values.titulo.value.length
                  : "0"}{" "}
                caracteres de 250.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="conteudo" className="form-label ">
                Conteúdo
              </label>
              <div
                className={
                  values.conteudo.hasError
                    ? "border border-danger border-2 rounded is-invalid"
                    : ""
                }
              >
                <EditorProvider>
                  <Editor
                    value={values.conteudo ? values.conteudo.value : ""}
                    onChange={handleChangeContent}
                    onBlur={handleBlurContent}
                    name="conteudo"
                    id="conteudo"
                  >
                    <Toolbar>
                      <BtnUndo />
                      <BtnRedo />
                      <Separator />
                      <BtnBold />
                      <BtnItalic />
                      <BtnUnderline />
                      <BtnStrikeThrough />
                      <Separator />
                      <BtnNumberedList />
                      <BtnBulletList />
                      <Separator />
                      <BtnLink />
                      <BtnClearFormatting />
                      <HtmlButton />
                      <Separator />
                      <BtnStyles />
                    </Toolbar>
                  </Editor>
                </EditorProvider>
              </div>
              {values.conteudo.hasError && (
                <div className="invalid-feedback">
                  {values.conteudo.errorMessage}
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
                  Postar
                </button>
              ) : (
                <button className="btn btn-warning" type="button" disabled>
                  <span className="spinner-border text-dark spinner-border-sm"></span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
