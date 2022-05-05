import React, { ReactElement, useState } from "react";
import styled from "styled-components";

const Input = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    padding: 25px;
    border-radius: 15px;
    font-family: 'Poppins', sans-serif;
    width: min-content;
    
    input, label {
        align-self: center;
        width: 300px;
    }

    input {
        border: none;
        border-radius: 5px;
        margin: 10px 10px 5px 0;
    }

    button {
        margin-top: 10px;
        width: 150px;
        height: 30px;
        align-self: center;
        font-family: 'Open Sans', sans-serif;
        font-weight: 700;
        border: none;
        background-color: #26B259;
        color: white;
    }

    button:hover {
        background-color: #26b259d3;
        cursor: pointer;
    }

    label {
        color: red;
        font-size: 10px;
        margin: 0;
        padding: 0;
    }
`;

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
            <h1>Create a new race</h1>
            <Input>
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
            </Input>
        </>
    );
}
