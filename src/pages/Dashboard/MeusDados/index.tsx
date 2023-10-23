import iziToast from "izitoast";
import { ChangeEvent, useEffect, useState } from "react";

export default function MeusDados() {
  const [level, setLevel] = useState<string>("LEI");

  const handleChangeLevel = (e: ChangeEvent<HTMLInputElement>) => {
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
              setLevel("LEI");
            },
            true,
          ],
          [
            "<button>Sim</button>",
            (instance, toast) => {
              instance.hide({ transitionOut: "fadeOut" }, toast, "button");
              setLevel("ESC");
            },
            false,
          ],
        ],
        onClosing: () => {
          setLevel("LEI");
        },
      });
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

  return (
    <div className="container">
      <div className="row">
        <h1 className="display-5 fw-bold mb-5">Meus dados</h1>
        <div className="col-6 offset-3">
          <form className="mb-3" autoComplete="off">
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
                <label className="form-label">Seu nível</label>
                <div className="d-flex mt-2">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="LEI"
                      name="nivel"
                      id="leitor"
                      checked={level === "LEI"}
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
                      checked={level === "ESC"}
                      onChange={handleChangeLevel}
                    />
                    <label className="form-check-label" htmlFor="escritor">
                      Escritor
                    </label>
                  </div>
                </div>
                <p></p>
              </div>
            </div>
            <div className="d-grid">
              <button className="btn btn-warning" type="submit">
                Salvar
              </button>
              <button
                className="btn btn-outline-danger mt-4"
                type="button"
                onClick={handleDeleteAccount}
              >
                Excluir minha conta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
