import React, { ReactElement, useEffect, useState } from "react";
import { ResponsePlayer } from "../apis/AuthAPI";
import { HorseAPI } from "../apis/HorseAPI";
import { PlayerAPI } from "../apis/PlayerAPI";
import { RaceAPI } from "../apis/RaceAPI";
import { CreateRaceInput } from "../components/CreateRaceInput";
import { HorseInputs } from "../components/HorseInputs";
import { Message } from "../components/Message";
import { Races } from "../components/Races";
import { SignOutButton } from "../components/SignOutButton";
import { UserSummary } from "../components/UserSummary";

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

    useEffect(() => {
        fetchHorses();
    }, [showHorseInput])

    return (
        <>
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
        </>
    );

    async function addRace() {
        if (racePlace != '' && raceDate != '') {
            try {
                const player = await PlayerAPI.getPlayer() as ResponsePlayer;
                await RaceAPI.createRace(racePlace, raceDate, player.username);
            } catch (error) {
                setNotice("Creation " + error);
                return;
            }
            setNotice("👍");
        }
        return;
    }

    async function fetchRaces() {
        await HorseAPI.getHorses();
        const playerId = (await PlayerAPI.getPlayer()).id;
        try {
            const racesList = await RaceAPI.getRaces(playerId);
            setRaces(racesList);
        } catch (error) {
            return;
        }
    }

    async function fetchHorses() {
        if (selectedRaceId != "") {
            try {
                const horses = await RaceAPI.getAvailableHorses(races[selectedRaceId]?.id);
                // console.log("keka");
                setHorses(horses);
            } catch (error) {
                return;
            }
        }
    }

    async function createHorse() {
        if (horseName != "" && horseColor != "") {
            try {
                await HorseAPI.createHorse(horseName, horseColor);
            } catch(error) {
                console.log(error);
                setNotice("Horse creation " + error)
                return;
            }
            setNotice("👍");
            return; 
        }
    }

    async function addHorseToRace(raceId: number, horseId: number) {
        if (raceId != undefined && horseId != undefined) {
            try {
                await RaceAPI.addHorseToRace(raceId, horseId);
            } catch(error) {
                console.log(error);
                setNotice("Horse in race adding " + error)
                return;
            }
            setNotice("👍");
            return; 
        }
    }
}



