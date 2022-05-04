import React, { ReactElement, useEffect, useState } from "react";
import { RaceAPI } from "../apis/RaceAPI";
import { Results } from "../components/Results";
import { SignOutButton } from "../components/SignOutButton";
import { LoginPage } from "./LoginPage";

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
            {sessionStorage.getItem("token")?
            <div>
                <Results
                    items={races}
                ></Results>
                <SignOutButton/>
            </div>:<LoginPage></LoginPage>}
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