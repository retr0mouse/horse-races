import React, { useEffect, useState } from "react";
import { LoginInput } from "../components/LoginInput";
import styled from "styled-components";
import { PlayerAPI, ResponsePlayer } from "../apis/PlayerAPI";
import { UserSummary } from "../components/UserSummary";
import { Message } from "../components/Message";
import { SignOutButton } from "../components/SignOutButton";

let LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export function LoginPage() {
    const [notice, setNotice] = useState() as any;
    const [username, setUsername] = useState("") as any;
    const [password, setPassword] = useState("") as any;

    useEffect(() => {
        if (!notice) {
            return;
        }
        const timeout = setTimeout(() => setNotice(""), 2000);
        return () => {
            clearTimeout(timeout);
        };
    }, [notice])

    return (
        <LoginContainer>
            <h1>Login</h1>
            <LoginInput
                onUsernameTyped={(event) => setUsername(event?.target.value)}
                onPasswordTyped={(event) => setPassword(event?.target.value)}
                onClicked={() => login()}
            ></LoginInput>
            <Message 
                message={notice}
            ></Message>
            <SignOutButton/>
        </LoginContainer>
    );

    async function login() {
        if (username != '' && password != '') {
            try {
                const player = await PlayerAPI.loginPlayer(username, password) as ResponsePlayer;
                window.sessionStorage.setItem("token", player.accessToken);
            } catch (error) {
                console.log(error);
                setNotice("Authorization " + error)
                return;
            }
            setNotice("👍");
        }
        return;
    }
}