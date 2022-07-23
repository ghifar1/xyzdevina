import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";

const App = () => {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <NotificationsProvider>
                <BrowserRouter>
                    <Navigation />
                </BrowserRouter>
            </NotificationsProvider>
        </MantineProvider>
    )
}


ReactDOM.render(
    <App />,
    document.getElementById("root")
)


