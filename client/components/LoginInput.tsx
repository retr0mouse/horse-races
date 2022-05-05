import React, { ReactElement, useState } from "react";

interface Props {
    onClicked(query: any): void;
    onUsernameTyped(text: any): void;
    onPasswordTyped(text: any): void;
}

export function LoginInput(props: Props): ReactElement {
    const [usernameMessage, setUsernameMessage] = useState("") as any;
    const [passwordMessage, setPasswordMessage] = useState("") as any;

    return (
        <>
            <input name="username" type="text" placeholder="username" onChange={(event) => {
                props.onUsernameTyped(event);
                setUsernameMessage(event?.target.value.length == 0 ? "please provide a username" : "");
            }}/>
            <label htmlFor="username">{usernameMessage}</label>

            <input name="password" type="password" placeholder="password" onChange={(event) => {
                props.onPasswordTyped(event);
                setPasswordMessage(event?.target.value.length == 0 ? "please provide a password" : "");
            }}/>
            <label htmlFor="password">{passwordMessage}</label>
            <button onClick={(credentials) => props.onClicked(credentials)}>Submit</button>
        </>
    );
}