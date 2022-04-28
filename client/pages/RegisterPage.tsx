import React, { useEffect, useState } from "react";
import { RegisterInput } from "../components/RegisterInput";
import styled from "styled-components";
import { PlayerAPI } from "../apis/PlayerAPI";
import { Message } from "../components/Message";
import { UserSummary } from "../components/UserSummary";

let RegisterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 200px;

    h1 {
        align-self: center;
    }

    .input-container {
        align-self: baseline;
    }

    input {
        margin: 10px 10px 5px 0;
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
        const timeout = setTimeout(() => setNotice(""), 5000);
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
                onClicked= {() => registerPlayer()}
            ></RegisterInput>
            <UserSummary/>
            <Message 
                message={notice}
            ></Message>
        </RegisterContainer>
    );

    async function registerPlayer() {
        if (username != '' && firstname != '' && lastname != '' && email != '' && password != '' && balance != '' && winnings != '') {
            try {
                await PlayerAPI.registerPlayer(username, firstname, lastname, email, password, balance, winnings);
            } catch (error) {
                console.log(error);
                setNotice("something went wrong: " + error);
                return;
            }
            setNotice("👍");    
        }
        return;      
    }
}