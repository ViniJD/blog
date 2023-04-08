import{Fragment} from "react";
import {
    Routes, //instead of "Switch"
    Route
} from "react-router-dom";

//Pages
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";

//Private Route
import PrivateRoute from "./privateRoute";

export default function RoutesIndex(){
    return(
        <Fragment>
            <Routes>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/profile" element={<Profile/>}/>
                <Route element={<PrivateRoute/>}>

                </Route>
                <Route path="/" element={<SignIn/>}/>
                <Route path="/register" element={<SignUp />}/>
            </Routes>
        </Fragment>
    );
}