//Aqui fica nosso context API

import { useState, createContext, useEffect } from "react";
import { compare, hash } from "bcryptjs"; //biblioteca para importar criptografia

export const AuthContext = createContext({});

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


interface User {
    id: string;
    nome: string;
    email: string;
}

function AuthProvider({children}: any) {

    const [user, setUser] = useState<User | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(false); //Processo de carregamento
    const [loading, setLoading] = useState(true); //Caso eleclique no botão de carregamento

    //Serve pra quando a aplicação abrir, verificar se já existe algum usuário logado
    //Se existir, já será inserido dentro da STATE USER os dados, 
    //e a aplicaçãojá redireciona p/ o dashboard
    useEffect(() => {

        function loadStorage(){
            const storageUser = localStorage.getItem('SistemaUser');

            if(storageUser) {
                setUser(JSON.parse(storageUser));
            }

            setLoading(false);
        }

        loadStorage();

    },[]);

    async function signUp(email: string, password:string, nome:string){
        setLoading(true);

        const passwordHash = await hash(password, 8);
        
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": Date.now(),
                "nome": nome,
                "email": email,
                "password": passwordHash
            })
        })
        .then(res => res.json())
        .then(result => { //retorno de resposta de sucesso
            let data = {
                "id": result.id, //Estou restaurando o que foi inserido
                "nome": result.nome,
                "email": result.email,
            }

            setUser(data);
            storageUser(data);
        })
        .catch((e) => toast.error("ERRO"));

        setLoading(false);
    }

    async function signIn(email: string, password: string) {
        setLoadingAuth(true);

        await fetch(`http://localhost:3000/users?email=${email}`)
        .then(res => res.json())
        .then(async result => {

            if(result[0]) {
                const passwordMatch = await compare(password, result[0].password);

                if(!passwordMatch){
                    toast.error("Email/Password incorrect")
                    setLoadingAuth(false);
                    return;
                }

                let data = {
                    id: result[0].id,
                    nome: result[0].nome,
                    email: result[0].email
                };

                setUser(data);
                storageUser(data);

            } else {
                console.log("Email/Password incorrect");
            }
        })
        .catch(err => {
            toast.error(err)
        });

        setLoadingAuth(false);
    }

    function storageUser(data: User){
        localStorage.setItem("SistemaUser", JSON.stringify(data))
    }

    function signOut() {
        localStorage.removeItem('SistemaUser');
        setUser(null)
    }

    return( //As duas exclamações transformam o valor em boolean
        <AuthContext.Provider value={{
            signed: !!user, 
            user, 
            loading, 
            signUp,
            signIn,
            signOut
            }}> 
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;