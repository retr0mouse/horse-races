import React, { ReactElement, useState } from "react";
import { Race } from "../apis/RaceAPI";

interface Props {
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
                            {race.date} in {race.place}, horses: {race.horses.length}
                        </p>
                        <button onClick={() => props.onClicked(index)}>Add horse</button>
                    </div>
                )
            })}
        </>
    );

    
}