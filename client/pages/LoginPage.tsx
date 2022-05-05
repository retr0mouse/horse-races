import React, { useEffect, useState } from "react";
import { LoginInput } from "../components/LoginInput";
import styled from "styled-components";
import { AuthAPI, ResponsePlayer } from "../apis/AuthAPI";
import { UserSummary } from "../components/UserSummary";
import { Message } from "../components/Message";
import { SignOutButton } from "../components/UserInfo";

let LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 200px;
    background-color: #80808016;
    padding: 25px;
    border-radius: 15px;
    font-family: 'Poppins', sans-serif;
    width: min-content;

    h1 {
        align-self: center;
    }

    .input-container {
        align-self: center;
    }

    input {
        border: none;
        border-radius: 5px;
        margin: 10px 10px 5px 0;
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
                onClicked={() => {
                    login();
                }}
            ></LoginInput>
            <Message 
                message={notice}
            ></Message>
            <SignOutButton/>
        </LoginContainer>
    );

    async function login() {
        if (username !== '' && password !== '') {
            try {
                const player = await AuthAPI.loginPlayer(username, password) as ResponsePlayer;
                window.sessionStorage.setItem("token", player.accessToken);
                window.location.reload();
            } catch (error) {
                console.log(error);
                setNotice("Authorization " + error)
                return;
            }
        }
        else {
            setNotice("Please provide the needed data");
        }
        return;
    }
}