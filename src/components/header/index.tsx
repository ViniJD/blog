import { Link } from "react-router-dom"
import avatar from "../../assets/avatar.png"
import './header.css'

import {FiHome, FiUser, FiSettings} from 'react-icons/fi'

export default function Header(){
    return(
        <div className="sidebar">
            <div>
                
                <img src={avatar} alt="avatar"/>
            </div>

            <Link to="/dashboard">
                <FiHome size={24} color="#FFF"/>
                Chamados
            </Link>
            <Link to="/customers">
                <FiUser size={24} color="#FFF"/>
                Clientes
            </Link>
            <Link to="/profile">
                <FiSettings size={24} color="#FFF"/>
                Configurações
            </Link>
        </div>
    )
}