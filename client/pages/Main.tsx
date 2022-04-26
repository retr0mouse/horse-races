import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";

export function Main() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<LoginPage/>}></Route>
            <Route path="/registration" element={<RegisterPage/>}></Route>
        </Routes>
    )
}