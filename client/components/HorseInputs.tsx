import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { Horse } from "../apis/RaceAPI";

const Background = styled.div`
    z-index: 1;
    background-color: #a7a3a390;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Field = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: white;
    position: absolute;
    width: 70%;
    height: 70%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 16px;

    .create {
        display: flex;
        flex-direction: column;
        margin-bottom: 50px;
        width: 200px;
    }

    .add {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
    }
`;

const CloseButton = styled.button`
    z-index: 2;
    position: absolute;
    top: 15%;
    right: 15%;
    border-radius: 10px;
    border: none;
    color: black;
    font-size: 25px;
    background: none;
    cursor: pointer;
`;

interface Props {
    place: string;
    onHorseSelected(value: any): void;
    selectedHorseId: number;
    onClickedClose(): void;
    onNameTyped(value: any): void;
    onColorTyped(value: any): void;
    onClickedCreate(): void;
    onClickedAdd(): void;
    horses: Horse[];
}


export function HorseInputs(props: Props): ReactElement {
    const [nameMessage, setNameMessage] = useState("") as any;
    const [colorMessage, setColorMessage] = useState("") as any;

    return (
        <Background>
            <Field>
                <h1 color="red">Create a new horse or add existing</h1>
                <h2>Race: {props.place}</h2>
                <div className="create"> 
                    <input className="input" name="username" type="text" placeholder="horse name" onChange={(event) => {
                        props.onNameTyped(event);
                        setNameMessage(typeof event?.target.value === "undefined" || event?.target.value.length == 0 ? "please provide a username" : "");
                    }}/>
                    <label className="label" htmlFor="username">{nameMessage}</label>
                    <input className="input" name="color" type="text" placeholder="horse color" onChange={(event) => {
                        props.onColorTyped(event);
                        setColorMessage(typeof event?.target.value === "undefined" || event?.target.value.length == 0 ? "please provide a username" : "");
                    }}/>
                    <label className="label" htmlFor="username">{colorMessage}</label>
                    <button onClick={() => props.onClickedCreate()}>Create</button>
                </div>
                <div className="add">
                    <select
                        value={props.selectedHorseId}
                        onChange={(event) => props.onHorseSelected(event.target.value)}
                    >
                        <option
                            value=""
                            disabled
                        >Choose horse</option>
                        {props.horses?.map((horse, index) => <option key={index} value={index}>{horse.name} {horse.color}</option>)}
                    </select>
                    <button onClick={() => props.onClickedAdd()}>Add</button>
                </div>
            </Field>
            <CloseButton onClick={() => props.onClickedClose()}>x</CloseButton>
        </Background>
    );
}

