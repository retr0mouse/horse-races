import React, { useEffect, useState } from "react";
import { ResponsePlayer } from "../apis/AuthAPI";
import { HorseAPI } from "../apis/HorseAPI";
import { PlayerAPI } from "../apis/PlayerAPI";
import { RaceAPI } from "../apis/RaceAPI";
import { CreateRaceInput } from "../components/CreateRaceInput";
import { HorseInputs } from "../components/HorseInputs";
import { Message } from "../components/Message";
import { Races } from "../components/Races";
import { SignOutButton } from "../components/UserInfo";
import { LoginPage } from "./LoginPage";
import styled from "styled-components";

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

export function CreateRacePage() {
    const [racePlace, setRacePlace] = useState("") as any;
    const [raceDate, setRaceDate] = useState("") as any;
    const [horseName, setHorseName] = useState("") as any;
    const [horseColor, setHorseColor] = useState("") as any;
    const [notice, setNotice] = useState("") as any;
    const [races, setRaces] = useState([]) as any;
    const [horses, setHorses] = useState([]) as any;
    const [selectedHorseId, setSelectedHorseId] = useState() as any;
    const [showHorseInput, setShowHorseInput] = useState(false) as any;
    const [selectedRaceId, setSelectedRaceId] = useState() as any;

    useEffect(() => {
        if (sessionStorage.getItem("token")) {
            fetchRaces();
        }
    }, [notice])

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
        if (sessionStorage.getItem("token")) {
            fetchHorses();
        }
    }, [showHorseInput])

    return (
        <>
            {sessionStorage.getItem("token")?
            <Container>
                <CreateRaceInput
                    onPlaceTyped={(event) => setRacePlace(event?.target.value)}
                    onDateEntered={(event) => setRaceDate(event?.target.value)}
                    onClicked={() => addRace()}
                ></CreateRaceInput>
                <Message 
                    message={notice}
                ></Message>
                <Races
                    onClicked={(raceId) => {
                        setShowHorseInput(true);
                        setSelectedRaceId(raceId);
                        setSelectedHorseId("");
                    }}
                    items={races}
                    buttonTitle="Add Horse"
                ></Races>
                {showHorseInput?
                <HorseInputs 
                    place={races[selectedRaceId].place}
                    onClickedClose={() => {
                        setShowHorseInput(false);
                    }}
                    onNameTyped={(event) => setHorseName(event?.target.value)}
                    onColorTyped={(event) => setHorseColor(event?.target.value)}
                    onClickedCreate={() => createHorse()}
                    onClickedAdd={() => addHorseToRace(races[selectedRaceId]?.id, horses[selectedHorseId]?.id)}
                    horses={horses} 
                    selectedHorseId={selectedHorseId}
                    onHorseSelected={(horseId) => setSelectedHorseId(horseId)}
                ></HorseInputs>:null}
                <SignOutButton/>
            </Container>:<LoginPage></LoginPage>}
            
        </>
    );

    async function addRace() {
        if (racePlace !== '' && raceDate !== '') {
            try {
                const player = await PlayerAPI.getByToken() as ResponsePlayer;
                await RaceAPI.createRace(racePlace, raceDate, player.username);
            } catch (error) {
                setNotice("Creation " + error);
                return;
            }
            setNotice("👍");
        }
        else {
            setNotice("Please provide the needed data");
        }
        return;
    }

    async function fetchRaces() {
        const playerId = (await PlayerAPI.getByToken()).id;
        try {
            const racesList = await RaceAPI.getRacesByCreator(playerId);
            setRaces(racesList);
        } catch (error) {
            return;
        }
    }

    async function fetchHorses() {
        if (selectedRaceId !== "") {
            try {
                const horses = await RaceAPI.getAvailableHorses(races[selectedRaceId]?.id);
                setHorses(horses);
            } catch (error) {
                return;
            }
        }
    }

    async function createHorse() {
        if (horseName !== "" && horseColor !== "") {
            try {
                await HorseAPI.createHorse(horseName, horseColor);
            } catch(error) {
                console.log(error);
                setNotice("Horse creation " + error)
                return;
            }
            setNotice("Horse created successfully");
            return; 
        }
        else {
            setNotice("Please provide the needed data");
        }
    }

    async function addHorseToRace(raceId: number, horseId: number) {
        if (raceId !== undefined && horseId !== undefined) {
            try {
                await RaceAPI.addHorseToRace(raceId, horseId);
            } catch(error) {
                console.log(error);
                setNotice("Horse in race adding " + error)
                return;
            }
            setNotice("Horse added to race successfully");
            return; 
        }
        else {
            setNotice("Please provide the needed data");
        }
    }
}



