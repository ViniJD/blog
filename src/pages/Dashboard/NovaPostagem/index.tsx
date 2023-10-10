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

export default function NovaPostagem() {
  const [conteudo, setConteudo] = useState<string>("");

  const handleChangeContent = (e: ContentEditableEvent) => {
    setConteudo(e.target.value);
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="display-5 fw-bold mb-5">Nova postagem</h1>
        <div className="col-8 offset-2">
          <form className="mb-3" autoComplete="off">
            <div className="row">
              <div className="col-6 offset-3 mb-3">
                <img
                  src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
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
                className="form-control"
                id="imagem"
                name="imagem"
                placeholder="https://image.com/image.png"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="titulo" className="form-label">
                Título
              </label>
              <textarea
                className="form-control"
                placeholder="Digite seu comentário"
                id="titulo"
                name="titulo"
                rows={3}
                maxLength={250}
              ></textarea>
              <div className="form-text">10 caracteres de 250.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="conteudo" className="form-label ">
                Conteúdo
              </label>
              <EditorProvider>
                <Editor
                  value={conteudo}
                  onChange={handleChangeContent}
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
            <div className="d-grid">
              <button className="btn btn-warning" type="submit">
                Postar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
