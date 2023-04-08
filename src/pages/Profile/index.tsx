import Header from "../../components/header";
import Breadcrumbs from "../../components/Breadcrumbs";
import {FiSettings, FiUpload} from 'react-icons/fi'
import { toast } from "react-toastify";

import avatar from '../../assets/avatar.png'
import { useContext,useState, FormEvent} from 'react'
import { AuthContext } from "../../contexts/auth";

import './profile.css'

export default function Profile () {

    const {user, signOut, setUser, storageUser }: any = useContext(AuthContext);

    const [nome, setNome] = useState(user && user.nome)
    const [email, setEmail] = useState(user && user.email)
    const [avatarUrl, setAvatarUrl] = useState("")

    const [imageAvatar, setImageAvatar] = useState("");

    function handleFIle(e: FormEvent) {
        const target = e.target as HTMLInputElement;

        if(target.files) {
            const image = target.files[0];

            if(image.type === 'image/png' || image.type == "image/jpeg" || image.type ==="image/jpg") {
                setImageAvatar(URL.createObjectURL(target.files[0]));
            } else {
                alert("Envie uma imagem do tipo PNG ou JPEG");
                setImageAvatar("")
                return null;
            }
        }
    }

    async function hangleSave (e: FormEvent) {
        e.preventDefault();

        if(nome !== "") {
            await fetch(`http://localhost:3000/users/${user.id}`,
                {
                    method: "PATCH",
                    headers : {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "nome": nome
                    })
                })
                .then(res => res.json())
                .then(() => {
                    let data = {
                        ...user,
                        nome: nome
                    }

                    setUser(data);
                    storageUser(data);

                    toast.success('Alterado com sucesso')
                })
                .catch(err => {
                    console.log(err.message)
                })
        } else {
            toast.error("Preencha os campos em branco")
        }
                ;
        }

    return (
        <div>
            <Header/>
            <div className="content">
                <Breadcrumbs name="Meu Perfil">
                    <FiSettings size={24}/>
                </Breadcrumbs>

                <div className="container">
                    <form className="form-profile">
                        <label className="label-avatar">
                            <span>
                                <FiUpload color="#FFF" size={25}/>
                            </span>

                            <input type="file" accept="image/*" onChange={handleFIle}/>
                            <br/>
                            {imageAvatar === ""? 
                            <img src={avatar} width="250" height="250"/>
                            :
                            <img src={imageAvatar} width="250" height="250"/>
                            }

                        </label>

                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>

                        <label>Email</label>
                        <input type="email" value={nome} disabled={true}/>

                        <button type="submit" onClick={hangleSave}>Salvar</button>
                        <button type="submit" className="logout-btn"
                        onClick={() => signOut()}
                        >Sair</button>

                    </form>
                </div>
            </div>
        </div>
    );
}