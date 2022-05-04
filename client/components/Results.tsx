import React, { ReactElement } from "react";
import styled from "styled-components";
import { Race } from "../apis/RaceAPI";
import { Races } from "./Races";

interface Props {
    items: Race[];
}

export function Results(props: Props): ReactElement {
    return (
        <>
            {props.items?.map((race: Race) => {
                return (
                    <div>
                        <h1>{race.place} {race.date}</h1>
                        {race.horseInRaces?.map(relation => <p><b>{relation.position}. </b>{relation.horse.name}, {relation.horse.color}</p>)}
                    </div>
                )
            })}
        </>
    );
}