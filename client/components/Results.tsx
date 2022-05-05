import React, { ReactElement } from "react";
import styled from "styled-components";
import { HorseInRace, Race } from "../apis/RaceAPI";
import { Races } from "./Races";

const Container = styled.div`
    width: 500px;
`;

interface Props {
    items: Race[];
}

export function Results(props: Props): ReactElement {
    return (
        <>
            {props.items?.map((race: Race) => {
                return (
                    <Container>
                        <h1>{race.place} {race.date}</h1>
                        {race.horseInRaces?.map(relation => <p><b>{relation.position}. </b>{relation.horse.name}, {relation.horse.color}</p>)}
                    </Container>
                )
            })}
        </>
    );
}
