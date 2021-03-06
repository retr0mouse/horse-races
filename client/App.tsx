import React from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Navigation } from "./components/Navigation";
import { BetPage } from "./pages/BetPage";
import { CreateRacePage } from "./pages/CreateRacePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ResultsPage } from "./pages/ResultsPage";
import { StartRacePage } from "./pages/StartRacePage";

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
                <Route path="/login" element={<LoginPage/>}></Route>
                <Route path="/registration" element={<RegisterPage/>}></Route>
                <Route path="/create_race" element={<CreateRacePage/>}></Route>
                <Route path="/bet" element={<BetPage/>}></Route>
                <Route path="/raceStart" element={<StartRacePage/>}></Route>
                <Route path="/results" element={<ResultsPage/>}></Route>
            </Routes>
        </BodyContainer>
        </>
    );
}
