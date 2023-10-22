import { useEffect, useState } from "react";
import CardPostagem from "../../components/CardPostagem";
import { getPosts } from "../../services/postagemService";
import { IPostagem } from "../../interfaces/IPostagem";
import { getUserById } from "../../services/usuarioService";
import { IUsuario } from "../../interfaces/IUsuario";

export default function Postagens() {
  const [posts, setPosts] = useState<IPostagem[]>([]);

  const getPostsAndAuthors = async () => {
    const posts = await getPosts();

    let ids = posts.map((post) => post.idUsuarioFk);
    ids = ids.filter((item, index) => ids.indexOf(item) === index);
    const users: IUsuario[] = await getUserById(ids);

    const postsWithAuthors = posts.map((post) => {
      const user = users.find((user) => user.id === post.idUsuarioFk);
      post.escritor = user;
      return post;
    });

    setPosts(postsWithAuthors);
  };

  useEffect(() => {
    getPostsAndAuthors();
  }, []);

  return (
    <main>
      <div className="container mt-5">
        <h1 className="display-5 fw-bold mb-5">Todas postagens</h1>
        <div className="row">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div className="col-4 mb-4" key={post.id}>
                <CardPostagem post={post} />
              </div>
            ))
          ) : (
            <p>Nenhuma postagem foi feita ainda</p>
          )}
        </div>

        <footer className="pt-3 my-4 text-body-secondary border-top">
          PI 2 • 2023
        </footer>
      </div>
    </main>
  );
}
