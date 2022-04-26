import React, { ReactElement } from "react";
import styled from "styled-components";

interface Props {
    onClicked(query: any): void;
    onEmailTyped(text: any): void;
    onPasswordTyped(text: any): void;
}

export function LoginInput(props: Props): ReactElement {
    return (
        <>
            <label>
                Email
                <input type="text" placeholder="email" onChange={(event) => props.onEmailTyped(event)}/>
            </label>
            <label>
                Password
                <input type="text" placeholder="password" onChange={(event) => props.onPasswordTyped(event)}/>
            </label>
            <button onClick={(credentials) => props.onClicked(credentials)}>GO!</button>
        </>
    );
}