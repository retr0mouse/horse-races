import React, { ReactElement, useEffect, useState } from "react";
import { ResponsePlayer } from "../apis/AuthAPI";
import { PlayerAPI } from "../apis/PlayerAPI";
import { Race, RaceAPI } from "../apis/RaceAPI";
import { CreateRaceInput } from "../components/CreateRaceInput";
import { Message } from "../components/Message";
import { Races } from "../components/Races";
import { SignOutButton } from "../components/SignOutButton";
import { UserSummary } from "../components/UserSummary";

export function CreateRacePage() {
    const [place, setPlace] = useState("") as any;
    const [date, setDate] = useState("") as any;
    const [notice, setNotice] = useState("") as any;
    const [races, setRaces] = useState([]) as any;

    useEffect(() => {
        fetchRaces();
    }, ["", races])

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
            <Races
                onClicked={() => fetchRaces()}
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
