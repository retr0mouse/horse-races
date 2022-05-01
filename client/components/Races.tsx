import React, { ReactElement, useState } from "react";
import { Race } from "../apis/RaceAPI";

interface Props {
    onClicked(): void;
    items: Race[];
}

export function Races(props: Props): ReactElement {
    return(
        <>
            {/* <button onClick={() => props.onClicked()}>DO SOMETHING</button> */}
            {props.items?.map((race, index) => {
                return (
                    <ol>
                        <li 
                            key={index}
                        >
                        {race.date} in {race.place}
                        </li>
                    </ol>
                    
                )
            })}
        </>
    );

    
}