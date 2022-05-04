import React, { ReactElement, useEffect, useState } from "react";
import { HorseAPI } from "../apis/HorseAPI";
import { PlayerAPI } from "../apis/PlayerAPI";
import { RaceAPI } from "../apis/RaceAPI";
import { Results } from "../components/Results";

export function ResultsPage(): ReactElement {
    const [races, setRaces] = useState([]) as any;
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
            <Results
                items={races}
            ></Results>
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