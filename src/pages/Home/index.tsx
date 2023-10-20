import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardPostagem from "../../components/CardPostagem";
import { IPostagem } from "../../interfaces/IPostagem";
import { getPosts } from "../../services/postagemService";
import { getUserById } from "../../services/usuarioService";

export default function Home() {
  const [lastPost, setLastPost] = useState<IPostagem>({} as IPostagem);

  const getLastPostAndAuthor = async () => {
    const [post] = await getPosts(true);

    if (post.id) {
      const id = post.idUsuarioFk;
      const [users] = await getUserById([id]);

      post.escritor = users;

      setLastPost(post);
    }
  };

  useEffect(() => {
    getLastPostAndAuthor();
  }, []);

  return (
    <main>
      <div className="container mt-5">
        <div className="p-5 mb-4 bg-body-tertiary border rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold text-warning">News.blog</h1>
            <p className="fs-4">
              Neste blog você vai encontrar postagens dos mais diversos temas
              para você se atualizar, curtir e comentar. Aqui também você pode
              realizar a vontade de compartilhar suas idéias e pensamentos e se
              cadastrar como um <span className="fw-bold">escritor</span>.
            </p>
            <Link className="btn btn-warning" to="/postagens">
              Ver todas as postagens
            </Link>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-6">
            <div className="h-100 p-5 text-bg-dark rounded-3">
              <h2>Sobre nós</h2>
              <p>
                Explore uma vasta gama de tópicos interessantes e informativos
                em nosso blog. Aqui, você encontrará artigos envolventes que
                cobrem tecnologia, ciência, cultura, viagens, dicas de estilo de
                vida e muito mais. Nossa missão é fornecer conteúdo cativante
                que inspire a curiosidade e o aprendizado. Dê uma olhada e
                mergulhe em um mundo de conhecimento diversificado.
              </p>
              <Link className="btn btn-outline-light" to="/sobre">
                Veja mais
              </Link>
            </div>
          </div>
          <div className="col-6">
            <div className="h-100 p-5 bg-body-tertiary border rounded-3">
              <h2>Última postagem</h2>
              {lastPost.id ? (
                <CardPostagem post={lastPost} />
              ) : (
                <p>Nenhuma postagem foi cadastrada ainda</p>
              )}
            </div>
          </div>
        </div>

        <footer className="pt-3 my-4 text-body-secondary border-top">
          PI 2 • 2023
        </footer>
      </div>
    </main>
  );
}
