import React, { ReactElement, useEffect, useState } from "react";
import { HorseAPI } from "../apis/HorseAPI";
import { PlayerAPI } from "../apis/PlayerAPI";
import { HorseInRace, Race, RaceAPI } from "../apis/RaceAPI";
import { Message } from "../components/Message";
import { Races } from "../components/Races";

export function StartRacePage(): ReactElement {
    const [races, setRaces] = useState() as any;
    const [notice, setNotice] = useState("") as any;
    
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
            <Races
                onClicked={(raceId) => startARace(raceId)}
                items={races}
                buttonTitle="Start this race"
            ></Races>
            <Message
                message={notice}
            ></Message>
        </>
    );

    async function fetchRaces() {
        await HorseAPI.getHorses();
        const playerId = (await PlayerAPI.getPlayer()).id;
        try {
            const racesList = await RaceAPI.getRacesByCreator(playerId);
            setRaces(racesList);
        } catch (error) {
            return;
        }
    }

    async function startARace(raceId: number) {
        const race = races[raceId] as Race;
        if (race.horseInRaces.length > 0) {
            let indexes = Array.from(Array(race.horseInRaces.length).keys())
            indexes = shuffleArray(indexes);
            for (let i = 0; i < indexes.length; i++) {
                await HorseAPI.addPosition(race.horseInRaces[i].horse.id, race.id, indexes[i] + 1);                
            }
        }
    }

    function shuffleArray(array: any[], ) {
        let currentIndex = array.length,  randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
    }
}