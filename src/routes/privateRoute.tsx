import { useContext } from 'react';
import {
    Outlet, //Serve para manter o que já renderizamos pra não precisar renderizar denovo
    Navigate //Forçar o usuário voltar para o login
} from 'react-router-dom';
import { AuthContext } from '../contexts/auth';

export default function privateRoute(){

    const{signed, loading} : any = useContext(AuthContext);
    
    return signed? <Outlet/> : <Navigate to='/'/>
}