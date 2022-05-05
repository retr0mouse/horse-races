import React, { ReactElement } from "react";
import styled from "styled-components";
import { Race, HorseInRace, RaceAPI } from "../apis/RaceAPI";

const Horse = styled.div<HorseProps>`
    background-color: ${(props) => props.selected ? "#55d082" : "none"};
    padding: ${(props) => props.selected ? "5px" : 0};
    border-radius: 20px;
    margin: 15px;
    padding: 15px;
`;

const Container = styled.div`
    h1 {
        align-self: center;
    }

    .input-container {
        align-self: center;
    }

    input {
        align-self: center;
        border: none;
        border-radius: 5px;
        margin: 10px 10px 5px 0;
        width: 300px;
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
        <Container>
            {props.races?.map((race: Race, index) => {
                {console.log(race.horseInRaces.map(relation => relation.bets.map(bet => bet.amount)))}
                return race.horseInRaces.length > 0 ? (
                <Horse
                    key={index}
                    selected={race.horseInRaces.some(relation => relation.bets.some(bet => bet.id.playerId === props.playerId))}
                >
                    {!race.horseInRaces.some(relation => relation.bets.some(bet => bet.id.playerId === props.playerId))?
                    <div>
                        <h2>{race.place} on {race.date}</h2>
                        <select defaultValue={"Choose a horse"} onChange={(event) => props.onSelected(event.target.value)}>
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
                        <input type="text" name="amount" placeholder="The amount of bet" onChange={(event) => props.onTyped(event?.target.value)} />
                        <button type="submit" disabled={race.horseInRaces.some(relation => relation.bets.some(bet => bet.id.playerId === props.playerId))} onClick={() => props.onClicked(race.id)}>Bet</button>
                    </div>:<div>
                        <h1>{race.place} on {race.date}</h1>
                        <h2>Already betted on {
                            race.horseInRaces
                            .filter(relation => relation.bets
                            .find(bet => bet.id.playerId === props.playerId))
                            .map(relation => <div><p>{relation.horse.name} {relation.horse.color}</p></div>)}
                        </h2>
                    </div>}
                </Horse>) : "";
            })}
        </Container>
    );
}