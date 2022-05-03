import React, { ReactElement, useState } from "react";
import { Race } from "../apis/RaceAPI";

interface Props {
    buttonTitle: string;
    onClicked(raceId: number): void;
    items: Race[];
}

export function Races(props: Props): ReactElement {
    return(
        <>
            {props.items?.map((race, index) => {
                return (
                    <div
                        key={index}
                    >
                        <p>
                            {race.date} in {race.place}, horses: {race.horseInRaces?.length}
                        </p>
                        <button onClick={() => props.onClicked(index)}>{props.buttonTitle}</button>
                    </div>
                )
            })}
        </>
    );

    
}