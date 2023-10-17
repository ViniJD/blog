import { useEffect, useState } from "react";
import CardPostagem from "../../components/CardPostagem";
import { getPosts } from "../../services/postagemService";
import { IPostagem } from "../../interfaces/IPostagem";
import { getUserById } from "../../services/usuarioService";
import { IUsuario } from "../../interfaces/IUsuario";

export default function Postagens() {
  const [posts, setPosts] = useState<IPostagem[]>([]);

  const getPostsAndWriters = async () => {
    const posts = await getPosts();
    setPosts(posts);

    let usersId = posts.map((post) => post.idUsuarioFk);
    usersId = usersId.filter((item, index) => usersId.indexOf(item) === index);
    // getUsersByIdAndSetInPost(usersId);
  };

  const getUsersByIdAndSetInPost = async (ids: number[]) => {
    let users: IUsuario[] = [];

    ids.forEach(async (id) => {
      const user = await getUserById(id);
      users.push(user);
    });

    console.log(users);
  };

  useEffect(() => {
    getPostsAndWriters();
  }, []);

  return (
    <main>
      <div className="container mt-5">
        <h1 className="display-5 fw-bold mb-5">Todas as postagens</h1>
        <div className="row">
          {posts.map((post) => (
            <div className="col-4 mb-4" key={post.id}>
              <CardPostagem post={post} />
            </div>
          ))}
        </div>

        <footer className="pt-3 my-4 text-body-secondary border-top">
          PI 2 • 2023
        </footer>
      </div>
    </main>
  );
}
