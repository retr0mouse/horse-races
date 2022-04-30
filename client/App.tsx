import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Navigation } from "./components/Navigation";
import { CreateRacePage } from "./pages/CreateRacePage";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function App() {
    return (
        <>
            <BodyContainer>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/registration" element={<RegisterPage/>}></Route>
                <Route path="/create_race" element={<CreateRacePage/>}></Route>
            </Routes>
        </BodyContainer>
        </>
    );
}
