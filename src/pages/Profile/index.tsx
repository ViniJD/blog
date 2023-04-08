import Header from "../../components/header";
import Breadcrumbs from "../../components/Breadcrumbs";
import {FiSettings, FiUpload} from 'react-icons/fi'

import avatar from '../../assets/avatar.png'
import { useContext,useState} from 'react'
import { AuthContext } from "../../contexts/auth";

import './profile.css'

export default function Profile () {

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [avatarUrl, setAvatarUrl] = useState("")

    const {signOut}: any = useContext(AuthContext);

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

                            <input type="file" accept="image/*"/>
                            <br/>
                            <img src={avatar} width="250" height="250"/>
                        </label>

                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)}/>

                        <label>Email</label>
                        <input type="email" value={nome} disabled={true}/>

                        <button type="submit">Salvar</button>
                        <button type="submit" className="logout-btn"
                        onClick={() => signOut()}
                        >Sair</button>

                    </form>
                </div>
            </div>
        </div>
    );
}