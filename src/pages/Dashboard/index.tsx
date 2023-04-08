import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import Header from "../../components/header"

export default function Dashboard(){

    const { signOut }: any = useContext(AuthContext)

    return(
        <div>
            <Header/>
            <h1>Dashboard </h1>
            <button onClick={signOut}>SignOut</button>
        </div>
    )
};