import React, { ReactElement } from "react";
import styled from "styled-components";
import { Race, HorseInRace, RaceAPI } from "../apis/RaceAPI";

const Horse = styled.div<HorseProps>`
    background-color: ${(props) => props.selected ? "rgb(129, 179, 64)" : "none"};
    padding: ${(props) => props.selected ? "5px" : 0};

    button:disabled{

    }
`;

interface Props {
    races: Race[];
    onSelected(selection: any): void;
    onClicked(query: any): void;
    onTyped(text: any): void;
    playerId: number;
}

interface HorseProps {
    selected: boolean
}

export function HorsesToBetOn(props: Props): ReactElement {
    return(
        <>
            {props.races?.map((race: Race, index) => {
                {console.log(race.horseInRaces.map(relation => relation.bets.map(bet => bet.amount)))}
                return race.horseInRaces.length > 0 ? (
                <Horse
                    key={index}
                    selected={race.horseInRaces.some(relation => relation.bets.some(bet => bet.id.playerId === 1))}
                >
                    <h1>{race.place} on {race.date}</h1>
                    <select value={"Choose a horse"} onChange={(event) => props.onSelected(event.target.value)}>
                        <option disabled key={index}>Choose a horse</option>
                        {race.horseInRaces.map((relation, id) => 
                        
                            <option
                                key={index + id}
                                value={relation.horse.id}
                            >
                                {relation.horse.name} {relation.horse.color}
                            </option>)
                        }
                    </select>
                    <h4>You betted: </h4>
                    <label htmlFor="amount">Amount:</label>
                    <input type="text" name="amount" placeholder="The amount of bet" onChange={(event) => props.onTyped(event?.target.value)} />
                    <button type="submit" disabled={race.horseInRaces.some(relation => relation.bets.some(bet => bet.id.playerId === props.playerId))} onClick={() => props.onClicked(race.id)}>Bet</button>
                </Horse>) : "";
            })}
        </>
    );  
}