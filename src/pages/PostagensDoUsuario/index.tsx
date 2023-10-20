import { useLocation, useParams } from "react-router-dom";
import CardPostagem from "../../components/CardPostagem";
import { useEffect, useState } from "react";
import { IPostagem } from "../../interfaces/IPostagem";
import { getPostsByAuthorId } from "../../services/postagemService";
import { getUserById } from "../../services/usuarioService";
import { IUsuario } from "../../interfaces/IUsuario";

export default function PostagensDoUsuarios() {
  const [posts, setPosts] = useState<IPostagem[]>([]);
  const [author, setAuthor] = useState<IUsuario>({} as IUsuario);
  const { id } = useParams();
  const location = useLocation();

  const getPostsByAuthor = async () => {
    const posts = await getPostsByAuthorId(Number(id));
    const [user] = await getUserById([Number(id)]);
    setAuthor(user);
    posts.forEach((post) => (post.escritor = user));
    setPosts(posts);
  };

  useEffect(() => {
    getPostsByAuthor();
  }, [location]);

  return (
    <main>
      <div className="container mt-5">
        <h1 className="display-5 fw-bold mb-5">Postagens por {author.nome}</h1>
        <div className="row">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div className="col-4 mb-4" key={post.id}>
                <CardPostagem post={post} />
              </div>
            ))
          ) : (
            <p>Nenhuma postagem foi cadastrada por {author.nome}</p>
          )}
        </div>

        <footer className="pt-3 my-4 text-body-secondary border-top">
          PI 2 • 2023
        </footer>
      </div>
    </main>
  );
}
