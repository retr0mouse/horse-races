import React, { useEffect, useState } from "react";
import { RegisterInput } from "../components/RegisterInput";
import styled from "styled-components";
import { AuthAPI } from "../apis/AuthAPI";
import { Message } from "../components/Message";

let RegisterContainer = styled.div`
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

export function RegisterPage() {
    const [username, setUsername] = useState() as any;
    const [lastname, setLastname] = useState() as any;
    const [firstname, setFirstname] = useState() as any;
    const [email, setEmail] = useState() as any;
    const [password, setPassword] = useState() as any;
    const [balance, setBalance] = useState() as any;
    const [winnings, setWinnings] = useState() as any;
    const [notice, setNotice] = useState("") as any;
    
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
                onClicked={() => registerPlayer()}
            ></RegisterInput>
            <Message 
                message={notice}
            ></Message>
        </RegisterContainer>
    );

    async function registerPlayer() {
        if (username !== '' && firstname !== '' && lastname !== '' && email !== '' && password !== '' && +balance && +winnings) {
            try {
                await AuthAPI.registerPlayer(username, firstname, lastname, email, password, balance, winnings);
            } catch (error) {
                setNotice("Registration " + error);
                return;
            }
            setNotice("Registation successful!");    
        }
        else {
            setNotice("Please provide the needed data");
        }
        return;      
    }
}