import { useCookies } from "react-cookie";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import { useNavigate, Navigate } from "react-router-dom"
import Dashboard from "./pages/User/Dashboard";
import ManageData from "./pages/User/ManageData";
import Profile from "./pages/User/Profile";
import ListUser from "./pages/SuperAdmin/ListUser";
import Summary from "./components/dashboard/Summary";
import GraphMenu from "./components/GraphMenu";
import Area from "./components/dashboard/Area";

const Authentication = (props) => {
    const [cookies, setCookie, removeCookie] = useCookies(['devina']);
    const navigate = useNavigate();

    if (!cookies['devina']) {
        // return <Navigate to={"/login"} />
        return props.children
    } else {
        return props.children
    }
}

const GraphNavigation = () => {
    return (
        <Routes>
            <Route path="*" element={<Summary />} />
            <Route path="/area" element={<Area />} />
        </Routes>
    )
}

const AuthNavigation = () => {
    return (
        <Routes>
            <Route path="/dashboard/*" element={<NavBar><GraphMenu><GraphNavigation /></GraphMenu></NavBar>} />
            <Route path="/manage_data" element={<NavBar><ManageData /></NavBar>} />
            <Route path="/profile" element={<NavBar><Profile /></NavBar>} />
            <Route path="/list_user" element={<NavBar><ListUser /></NavBar>} />
            <Route path="/graph/*" element={<NavBar><GraphMenu><GraphNavigation /></GraphMenu></NavBar>} />
        </Routes>
    )
}

const Navigation = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<NavBar><Welcome /></NavBar>} />
            <Route path="/a/*" element={<Authentication><AuthNavigation /></Authentication>} />
        </Routes>
    )
}

export default Navigation
