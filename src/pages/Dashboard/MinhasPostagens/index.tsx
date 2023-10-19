import { useEffect, useState } from "react";
import CardPostagem from "../../../components/CardPostagem";
import { IPostagem } from "../../../interfaces/IPostagem";
import { IUsuario } from "../../../interfaces/IUsuario";
import { useLocation } from "react-router-dom";
import { getItem } from "../../../services/localStorageService";
import { getPostsByAuthorId } from "../../../services/postagemService";
import { getUserById } from "../../../services/usuarioService";

export default function MinhasPostagens() {
  const [posts, setPosts] = useState<IPostagem[]>([]);
  const [loggedUser, setLoggedUser] = useState<IUsuario>({} as IUsuario);
  const location = useLocation();

  const getPostsByAuthor = async () => {
    const posts = await getPostsByAuthorId(loggedUser.id);
    const [user] = await getUserById([loggedUser.id]);
    posts.forEach((post) => (post.escritor = user));
    setPosts(posts);
  };

  useEffect(() => {
    const user = getItem("loggedUser");
    setLoggedUser(user);
    setTimeout(() => {
      getPostsByAuthor();
    }, 1000);
  }, [location]);

  return (
    <>
      <h1 className="display-5 fw-bold mb-5">Minhas postagens</h1>
      <div className="row">
        {posts.map((post) => (
          <div className="col-4 mb-4" key={post.id}>
            <CardPostagem post={post} openLinksWithTargetBlank={true} />
          </div>
        ))}
      </div>
    </>
  );
}
