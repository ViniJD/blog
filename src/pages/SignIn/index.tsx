import { FormEvent, useContext, useState } from "react";
import {Link, useNavigate} from "react-router-dom";

import logo from "../../assets/logo.png";
import { AuthContext } from "../../contexts/auth";
import "./signin.css";

import { toast } from "react-toastify";

export function SignIn(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn }: any = useContext(AuthContext);

    const navigate = useNavigate();

    function handleSubmit(e: FormEvent){
        e.preventDefault();

        if(email !== "" && password !== ""){
            signIn(email, password);
            navigate("/dashboard")
        } else {
            toast.error("Preencha os campos em branco.")
        }
    }

    return(
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="sistema logo" />
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Entrar</h1>
                    <input type="emai" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" placeholder="*****" value={password} onChange={((e) => setPassword(e.target.value))} />
                    <button type="submit">Acessar</button>
                </form>

                <Link to="/register">Criar uma conta</Link>
            </div>
        </div>
    );
}

export default SignIn;