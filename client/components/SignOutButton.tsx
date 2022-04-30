import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { Message } from "./Message";

const Button = styled.button`
    position: absolute;
    right: 15px;
    top: 40px;
    width: 100px;
    height: 25px;
`

export function SignOutButton(): ReactElement {
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!message) {
            return;
        }
        const timeout = setTimeout(() => setMessage(""), 2000);
        return () => {
            clearTimeout(timeout);
        };
    }, [message])

    return (
        <>
            <Message 
                message={message}
            />
            {sessionStorage.getItem("token") != undefined ? <Button onClick={() => signOut()}>Sign out</Button> : ""}
        </>
    );

    function signOut() {
        if (sessionStorage.getItem("token") != undefined) {
            sessionStorage.removeItem("token");
            setMessage("👍");
        } else {
            setMessage("already signed out");
        }
    }
}