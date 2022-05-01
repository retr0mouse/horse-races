import React, { ReactElement, useEffect, useState } from "react";
import { PlayerAPI } from "../apis/PlayerAPI";
import { RaceAPI } from "../apis/RaceAPI";
import { CreateRaceInput } from "../components/CreateRaceInput";
import { Message } from "../components/Message";
import { SignOutButton } from "../components/SignOutButton";
import { UserSummary } from "../components/UserSummary";

export function CreateRacePage() {
    const [place, setPlace] = useState("") as any;
    const [date, setDate] = useState("") as any;
    const [notice, setNotice] = useState("") as any;

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
            <SignOutButton/>
        </>
    );

    async function addRace() {
        if (place != '' && date != '') {
            try {
                await RaceAPI.createRace(place, date);
            } catch (error) {
                setNotice("Creation " + error);
                return;
            }
            setNotice("👍");
        }
        return;
    }
}
