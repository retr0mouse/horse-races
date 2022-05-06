import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { ResponsePlayer } from "../apis/AuthAPI";
import { BetAPI } from "../apis/BetAPI";
import { PlayerAPI } from "../apis/PlayerAPI";
import { RaceAPI } from "../apis/RaceAPI";
import { HorsesToBetOn } from "../components/HorsesToBetOn";
import { Message } from "../components/Message";
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

const ItemsContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 500px;
`;

export function BetPage(): ReactElement {
    const [races, setRaces] = useState([]) as any;
    const [selectedHorseId, setSelectedHorseId] = useState(0) as any;
    const [bet, setBet] = useState(0) as any;
    const [notice, setNotice] = useState("") as any;
    const [playerId, setPlayerId] = useState(0) as any;

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            fetchRaces();
        }
    }, ["", notice]);

    useEffect(() => {
        if (!notice) {
            return;
        }
        const timeout = setTimeout(() => setNotice(""), 2000);
        return () => {
            clearTimeout(timeout);
        };
    }, [notice])

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            getPlayer();
        }
    }, [])

    return (
        <>
            {sessionStorage.getItem("token")? 
            <Container>
                <h1>Races to bet in</h1>
                <HorsesToBetOn
                    playerId={playerId}
                    races={races}
                    onSelected={(horseId) => setSelectedHorseId(horseId)}
                    onClicked={(raceId) => addBet(raceId)}
                    onTyped={(amount) => setBet(amount)}
                ></HorsesToBetOn>
                <Message
                    message={notice}
                />
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

    async function addBet(raceId: number) {
        if (selectedHorseId != null && bet != null && bet > 0) {
            try {
                await BetAPI.addBet(raceId, +selectedHorseId, +bet);
            } catch(error) {
                setNotice("Betting " + error);
                console.log(error);
                return;
            }
            setNotice("👍");
        }
        else {
            setNotice("Please choose a horse to bet on");
        }
    }

    async function getPlayer() {
        setPlayerId((await PlayerAPI.getByToken()).id);
    }
}
