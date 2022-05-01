import React, { ReactElement } from "react";
import styled from "styled-components";

const Background = styled.div`
    z-index: 1;
    background-color: #a7a3a390;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    div {
        background-color: white;
        position: absolute;
        width: 70%;
        height: 70%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 16px;
    }
    
    
`;

const CloseButton = styled.button`
    button {
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
    }
`;

interface Props {
    onClickedClose(): void;
    onNameTyped(event: any): void;
    onColorTyped(event: any): void;
    onClickedSubmit(): void;
}


export function HorseInputs(props: Props): ReactElement {
    const [nameMessage, setNameMessage] = useState("") as any;
    const [colorMessage, setColorMessage] = useState("") as any;


    return (
        <Background>
            <div>
                <h1 color="red">HERE WE GOOOOOO!</h1>
            </div>
            <input name="username" type="text" placeholder="horse name" onChange={(event) => {
                props.onNameTyped(event);
                setNameMessage(typeof event?.target.value === "undefined" || event?.target.value.length == 0 ? "please provide a username" : "");
            }}/>
            <label htmlFor="username">{nameMessage}</label>
            <input name="color" type="text" placeholder="horse color" onChange={(event) => {
                props.onColorTyped(event);
                setColorMessage(typeof event?.target.value === "undefined" || event?.target.value.length == 0 ? "please provide a username" : "");
            }}/>
            <label htmlFor="username">{colorMessage}</label>
            <CloseButton onClick={() => props.onClickedClose()}>x</CloseButton>
            <button onClick={() => props.onClickedSubmit()}>Submit</button>
        </Background>
    );
}

function useState(arg0: string): any {
    throw new Error("Function not implemented.");
}
