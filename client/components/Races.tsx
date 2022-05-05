import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { Race } from "../apis/RaceAPI";

const Container = styled.div`
    width: 300px;

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
    buttonTitle: string;
    onClicked(raceId: number): void;
    items: Race[];
}

export function Races(props: Props): ReactElement {
    return(
        <Container>
            <h1>Races</h1>
            {props.items?.map((race, index) => {
                return !race.horseInRaces.some(relation => relation.position)?(
                    <div
                        key={index}
                    >
                        <p>
                            {race.date} in {race.place}, horses: {race.horseInRaces?.length}
                        </p>
                        <button onClick={() => props.onClicked(index)}>{props.buttonTitle}</button>
                    </div>
                ):null
            })}
        </Container>
    );
}
