import React from "react";
import styled from "styled-components";

interface Props {
    onUsernameTyped(text: any): void;
    onFirstnameTyped(text: any): void;
    onLastnameTyped(text: any): void;
    onEmailTyped(text: any): void;
    onPasswordTyped(text: any): void;
    onBalanceTyped(text: any): void;
    onWinningsTyped(text: any): void;
    onClicked(query: any): void;
}

export function RegisterInput(props: Props) {
    return (
        <>
            <input type="text" placeholder="username" onChange={(event) => props.onUsernameTyped(event)}/>
            <input type="text" placeholder="firstname" onChange={(event) => props.onFirstnameTyped(event)}/>
            <input type="text" placeholder="lastname" onChange={(event) => props.onLastnameTyped(event)}/>
            <input type="text" placeholder="email" onChange={(event) => props.onEmailTyped(event)}/>
            <input type="text" placeholder="password" onChange={(event) => props.onPasswordTyped(event)}/>
            <input type="text" placeholder="balance" onChange={(event) => props.onBalanceTyped(event)}/>
            <input type="text" placeholder="winnings" onChange={(event) => props.onWinningsTyped(event)}/>
            <button onClick={(credentials) => props.onClicked(credentials)}>Register</button>
        </>
    );
}