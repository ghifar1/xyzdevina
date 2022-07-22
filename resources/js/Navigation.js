import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Welcome from "./pages/Welcome";

const Navigation = () => {
    return (
        <Routes>
            <Route path="/" element={<NavBar><Welcome /></NavBar>} />
        </Routes>
    )
}

export default Navigation