import React, { useState } from "react";
import { LoginInput } from "../components/LoginInput";
import styled from "styled-components";
import { PlayerAPI } from "../apis/PlayerAPI";
import { UserSummary } from "../components/UserSummary";

let LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export function LoginPage() {
    const [notice, setNotice] = useState() as any;
    const [username, setUsername] = useState("") as any;
    const [password, setPassword] = useState("") as any;

    return (
        <LoginContainer>
            <h1>Login</h1>
            <LoginInput
                onUsernameTyped={(event) => setUsername(event?.target.value)}
                onPasswordTyped={(event) => setPassword(event?.target.value)}
                onClicked={() => login()}
            ></LoginInput>
            <UserSummary/>
        </LoginContainer>
    );

    async function login() {
        if (username != '' && password != '') {
            try {
                const token = await PlayerAPI.loginPlayer(username, password);
                window.sessionStorage.setItem("token", token);
            } catch (error) {
                setNotice("something went wrong: " + error)
                return;
            }
            setNotice("👍");
        }
        return;
    }
}