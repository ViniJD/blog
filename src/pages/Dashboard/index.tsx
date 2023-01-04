import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"

export default function Dashboard(){

    const { signOut }: any = useContext(AuthContext)

    return(
        <div>
            <h1>Dashboard</h1>
            <button onClick={signOut}>SignOut</button>
        </div>
    )
};