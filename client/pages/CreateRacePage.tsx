import React, { ReactElement, useEffect, useState } from "react";
import { ResponsePlayer } from "../apis/AuthAPI";
import { PlayerAPI } from "../apis/PlayerAPI";
import { Race, RaceAPI } from "../apis/RaceAPI";
import { CreateRaceInput } from "../components/CreateRaceInput";
import { HorseInputs } from "../components/HorseInputs";
import { Message } from "../components/Message";
import { Races } from "../components/Races";
import { SignOutButton } from "../components/SignOutButton";
import { UserSummary } from "../components/UserSummary";

export function CreateRacePage() {
    const [place, setPlace] = useState("") as any;
    const [date, setDate] = useState("") as any;
    const [notice, setNotice] = useState("") as any;
    const [races, setRaces] = useState([]) as any;
    const [showHorseInput, setShowHorseInput] = useState(false) as any;

    useEffect(() => {
        fetchRaces();
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
            <CreateRaceInput
                onPlaceTyped={(event) => setPlace(event?.target.value)}
                onDateEntered={(event) => setDate(event?.target.value)}
                onClicked={() => addRace()}
            ></CreateRaceInput>
            <Message 
                message={notice}
            ></Message>
            {showHorseInput?
            <HorseInputs 
                    onClickedClose={() => setShowHorseInput(!showHorseInput)} onNameTyped={function (event: any): void {
                        throw new Error("Function not implemented.");
                    } } onColorTyped={function (event: any): void {
                        throw new Error("Function not implemented.");
                    } } onClickedSubmit={function (): void {
                        throw new Error("Function not implemented.");
                    } }></HorseInputs>:null}
            <Races
                onClicked={() => setShowHorseInput(!showHorseInput)}
                items={races}
            ></Races>
            <SignOutButton/>
        </>
    );

    async function addRace() {
        if (place != '' && date != '') {
            try {
                const player = await PlayerAPI.getPlayer() as ResponsePlayer;
                await RaceAPI.createRace(place, date, player.username);
            } catch (error) {
                setNotice("Creation " + error);
                return;
            }
            setNotice("👍");
        }
        return;
    }

    async function fetchRaces() {
        const playerId = (await PlayerAPI.getPlayer()).id;
        try {
            const racesList = await RaceAPI.getRaces(playerId);
            setRaces(racesList);
        } catch (error) {
            return;
        }
    }
}
