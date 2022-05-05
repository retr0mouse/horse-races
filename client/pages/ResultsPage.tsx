import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { RaceAPI } from "../apis/RaceAPI";
import { Results } from "../components/Results";
import { SignOutButton } from "../components/UserInfo";
import { LoginPage } from "./LoginPage";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    background-color: #80808016;
    padding: 25px;
    border-radius: 15px;
    font-family: 'Poppins', sans-serif;
    width: min-content;
`;

export function ResultsPage(): ReactElement {
    const [races, setRaces] = useState([]) as any;
    const [notice, setNotice] = useState("") as any;
    
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            fetchRaces();
        }
    }, ["",  notice])

    useEffect(() => {
        if (!notice) {
            return;
        }
        const timeout = setTimeout(() => setNotice(""), 2000);
        return () => {
            clearTimeout(timeout);
        };
    }, [notice])

    return (
        <>
            {sessionStorage.getItem("token")?
            <Container>
                <Results
                    items={races}
                ></Results>
                <SignOutButton/>
            </Container>:<LoginPage></LoginPage>}
        </>
    ); 

    async function fetchRaces() {
        try {
            const racesList = await RaceAPI.getAllRaces();
            setRaces(racesList);
        } catch (error) {
            return;
        }
    }
}