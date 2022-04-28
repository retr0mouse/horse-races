import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import styled from "styled-components";

const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export function Main() {
    return (
        <BodyContainer>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/registration" element={<RegisterPage/>}></Route>
            </Routes>
        </BodyContainer>
    )
}