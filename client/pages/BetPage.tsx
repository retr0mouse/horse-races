import React, { ReactElement, useEffect, useState } from "react";
import { BetAPI } from "../apis/BetAPI";
import { PlayerAPI } from "../apis/PlayerAPI";
import { Race, RaceAPI } from "../apis/RaceAPI";
import { HorsesToBetOn } from "../components/HorsesToBetOn";
import { Message } from "../components/Message";

export function BetPage(): ReactElement {
    const [races, setRaces] = useState([]) as any;
    const [selectedHorseId, setSelectedHorseId] = useState(0) as any;
    const [bet, setBet] = useState(0) as any;
    const [notice, setNotice] = useState("") as any;

    useEffect(() => {
        fetchRaces();
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

    return (
        <>
            <HorsesToBetOn
                races={races}
                onSelected={(horseId) => setSelectedHorseId(horseId)}
                onClicked={(raceId) => addBet(raceId)}
                onTyped={(amount) => setBet(amount)}
            ></HorsesToBetOn>
            <Message
                message={notice}
            />
        </>
    );

    async function fetchRaces() {
        const playerId = (await PlayerAPI.getPlayer()).id;
        try {
            const racesList = await RaceAPI.getRacesByCreator(playerId);
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
}