import React, { ReactElement, useState } from "react";
import { Race } from "../apis/RaceAPI";

interface Props {
    onClicked(): void;
    items: Race[];
}

export function Races(props: Props): ReactElement {
    return(
        <>
            {props.items?.map((race, index) => {
                return (
                    <div>
                        <p 
                            key={index}
                        >
                            {race.date} in {race.place}, horses: {race.horses.length}
                        </p>
                        <button onClick={() => props.onClicked()}>Add horse</button>
                    </div>
                    
                )
            })}
        </>
    );

    
}