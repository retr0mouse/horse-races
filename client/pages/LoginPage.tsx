import React, { useState } from "react";
import { LoginInput } from "../components/LoginInput";
import styled from "styled-components";

let LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export function LoginPage() {
    const [email, setEmail] = useState() as any;
    const [password, setPassword] = useState() as any;
    return (
        <LoginContainer>
            <h1>Login</h1>
            <LoginInput
                onEmailTyped={(event) => setEmail(event?.target.value)}
                onPasswordTyped={(event) => setPassword(event?.target.value)}
                onClicked={() => console.log(`email: ${email},  password: ${password}`)}
            ></LoginInput>
        </LoginContainer>
    );
}