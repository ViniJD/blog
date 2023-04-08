//Aqui está nossa tela de cadastro

import { FormEvent, useContext, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import logo from "../../assets/logo.png";
import { AuthContext } from "../../contexts/auth";

export function SignUp(){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signUp}: any = useContext(AuthContext);

    const navigate = useNavigate();

    function handleSubmit(e: FormEvent){ //Handle submit sempre é usado para funções de envio de formulário
        e.preventDefault(); //Evita que a página seja renderizada

        if(nome !== "" && email !== "" && password !== ""){
            signUp(email, password, nome); //Nossos dados estão sendo enviados para nosso context api
            toast.success("Conta criada com sucesso")
            navigate("/");
        } else {
            toast.error("Necessário preencher os campos");
        }

        setNome("");
        setEmail("");
        setPassword("");
    }

    return(
        <div className="container-center">
            <div className="login">
                <div className="login-area">
                    <img src={logo} alt="sistema logo" />
                </div>

                <form onSubmit={handleSubmit}>
                    <h1>Cadastrar uma conta</h1>
                    <input type="text" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                    <input type="emai" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="*****" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button type="submit">Cadastrar</button>
                </form>

                <Link to="/register">Já tem uma conta? Entre!</Link>
            </div>
        </div>
    );
}

export default SignUp;