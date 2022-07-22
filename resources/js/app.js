import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";

const App = () => {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <BrowserRouter>
                <Navigation />
            </BrowserRouter>
        </MantineProvider>
    )
}


ReactDOM.render(
    <App />,
    document.getElementById("root")
)


