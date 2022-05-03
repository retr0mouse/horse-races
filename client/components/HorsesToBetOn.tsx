import React, { ReactElement } from "react";
import styled from "styled-components";
import { Race, HorseInRace, RaceAPI } from "../apis/RaceAPI";

interface Props {
    races: Race[];
    onSelected(selection: any): void;
    onClicked(query: any): void;
    onTyped(text: any): void;
}

export function HorsesToBetOn(props: Props): ReactElement {
    return(
        <>
            {props.races?.map((race: Race, index) => {
                return race.horseInRaces.length > 0 ? (
                <div>
                    <h1>{race.place} on {race.date}</h1>
                    <select defaultValue={"Choose a horse"} onChange={(event) => props.onSelected(event.target.value)}>
                        <option disabled value="" key={index}>Choose a horse</option>
                        {race.horseInRaces.map((relation, id) => 
                            <option
                                key={index + id}
                                value={relation.horse.id}
                            >
                                {relation.horse.name} {relation.horse.color}
                            </option>)
                        }
                    </select>
                    <label htmlFor="amount">Amount:</label>
                    <input type="text" name="amount" onChange={(event) => props.onTyped(event?.target.value)} />
                    <button type="submit" onClick={() => props.onClicked(race.id)}>Bet</button>
                </div>) : "";
            })}
        </>
    );  
}