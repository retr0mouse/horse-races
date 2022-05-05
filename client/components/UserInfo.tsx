import React, { ReactElement, useEffect, useState } from "react";
import styled from "styled-components";
import { PlayerAPI } from "../apis/PlayerAPI";
import { Message } from "./Message";

const Details = styled.div`
    display: flex;
    border-radius: 15px;
    flex-direction: column;
    background-color: #f6f6f6;
    position: absolute;
    right: 15px;
    top: 40px;
    width: max-content;
    height: max-content;
    padding: 15px;

    p {
        margin-top: 0;
        font-family: 'Poppins', sans-serif;
        font-size: 20px;
        margin-bottom: 0;
    }

    button {
        margin-top: 10px;
        width: 150px;
        height: 30px;
        align-self: center;
        font-family: 'Open Sans', sans-serif;
        font-weight: 700;
        border: none;
        background-color: #b24b26;
        color: white;
    }

    button:hover {
        background-color: #b24726d2;
        cursor: pointer;
    }
`;


export function SignOutButton(): ReactElement {
    const [message, setMessage] = useState("") as any;
    const [username, setUsername] = useState("") as any;
    const [balance, setBalance] = useState(0) as any;

    useEffect(() => {
        if (!message) {
            return;
        }
        const timeout = setTimeout(() => setMessage(""), 2000);
        return () => {
            clearTimeout(timeout);
        };
    }, [message])

    useEffect(() => {
        fetchPlayer();
    }, [])

    return (
        <>
            <Message 
                message={message}
            />
            
            {sessionStorage.getItem("token") != undefined ? 
                <Details>
                    <p>Username: {username}</p>
                    <p>Balance: {balance}</p>
                    <button onClick={() => {
                        signOut();
                        window.location.reload();
                    }}>
                        Sign out
                    </button>
                </Details> : ""
            }
        </>
    );

    async function fetchPlayer() {
        if (sessionStorage.getItem("token")) {
            try {
                const player = await PlayerAPI.getByToken();
                const balance = await PlayerAPI.getBalance(player.id);
                setUsername(player.username);
                setBalance(balance);
            } catch (error) {
                setMessage("Log in :", error);
            }
        }
        
    }

    function signOut() {
        if (sessionStorage.getItem("token") != undefined) {
            sessionStorage.removeItem("token");
        } else {
            setMessage("already signed out");
        }
    }
}
