import React, { ReactElement } from "react";
import styled from "styled-components";

interface Props {
    onClicked(query: any): void;
    onUsernameTyped(text: any): void;
    onPasswordTyped(text: any): void;
}

export function LoginInput(props: Props): ReactElement {
    return (
        <>
            <label>
                Username
                <input type="text" placeholder="username" onChange={(event) => props.onUsernameTyped(event)}/>
            </label>
            <label>
                Password
                <input type="text" placeholder="password" onChange={(event) => props.onPasswordTyped(event)}/>
            </label>
            <button onClick={(credentials) => props.onClicked(credentials)}>GO!</button>
        </>
    );
}