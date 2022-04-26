import React, { useState } from "react";
import { RegisterInput } from "../components/RegisterInput";
import styled from "styled-components";
import { PlayerAPI } from "../apis/PlayerAPI";

let RegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export function RegisterPage() {
    const [username, setUsername] = useState() as any;
    const [lastname, setLastname] = useState() as any;
    const [firstname, setFirstname] = useState() as any;
    const [email, setEmail] = useState() as any;
    const [password, setPassword] = useState() as any;
    const [balance, setBalance] = useState() as any;
    const [winnings, setWinnings] = useState() as any;

    return (
        <RegisterContainer>
            <h1>Register</h1>
            <RegisterInput
                onUsernameTyped={(event) => setUsername(event?.target.value)}
                onFirstnameTyped={(event) => setFirstname(event?.target.value)}
                onLastnameTyped={(event) => setLastname(event?.target.value)}
                onEmailTyped={(event) => setEmail(event?.target.value)}
                onPasswordTyped={(event) => setPassword(event?.target.value)}
                onBalanceTyped={(event) => setBalance(event?.target.value)}
                onWinningsTyped={(event) => setWinnings(event?.target.value)}
                onClicked= {() => registerPlayer()}
            ></RegisterInput>
        </RegisterContainer>
    );

    async function registerPlayer() {
        console.log(await PlayerAPI.registerPlayer(username, firstname, lastname, email, password, balance, winnings));
    }
}