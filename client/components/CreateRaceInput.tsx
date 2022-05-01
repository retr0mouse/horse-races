import React, { ReactElement, useState } from "react";
import styled from "styled-components";

interface Props {
    onClicked(query: any): void;
    onPlaceTyped(text: any): void;
    onDateEntered(text: any): void;
}

export function CreateRaceInput(props: Props): ReactElement {
    const [placeMessage, setPlaceMessage] = useState("") as any;
    const [dateMessage, setDateMessage] = useState("") as any;

    return (
        <>
            <input name="place" type="text" placeholder="location of the race" onChange={(event) => {
                props.onPlaceTyped(event);
                setPlaceMessage(event?.target.value.length == 0 ? "please provide a place" : "");
            }}></input>
            <label htmlFor="place">{placeMessage}</label>
            <input name="date" type="date" onChange={(event) => {
                props.onDateEntered(event);
                setDateMessage(event?.target.value.length == 0 ? "please provide a date" : "");
            }}></input>
            <label htmlFor="date">{dateMessage}</label>
            <button onClick={(credentials) => props.onClicked(credentials)}>Create</button>
        </>
    );
}