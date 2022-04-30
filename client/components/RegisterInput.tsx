import React, { ReactElement, useState } from "react";
import styled from "styled-components";



interface Props {
    onUsernameTyped(text: any): void;
    onFirstnameTyped(text: any): void;
    onLastnameTyped(text: any): void;
    onEmailTyped(text: any): void;
    onPasswordTyped(text: any): void;
    onBalanceTyped(text: any): void;
    onWinningsTyped(text: any): void;
    onClicked(query: any): void;
}

export function RegisterInput(props: Props): ReactElement {
    const [usernameMessage, setUsernameMessage] = useState("") as any;
    const [lastnameMessage, setLastnameMessage] = useState("") as any;
    const [firstnameMessage, setFirstnameMessage] = useState("") as any;
    const [emailMessage, setEmailMessage] = useState("") as any;
    const [passwordMessage, setPasswordMessage] = useState("") as any;
    const [balanceMessage, setBalanceMessage] = useState("") as any;
    const [winningsMessage, setWinningsMessage] = useState("") as any;

    return (
        <>
            <div className="input-container">
                <input name="username" type="text" placeholder="username" onChange={(event) => {
                    props.onUsernameTyped(event);
                    setUsernameMessage(typeof event?.target.value === "undefined" || event?.target.value.length == 0 ? "please provide a username" : "");
                }}/>
                <label htmlFor="username">{usernameMessage}</label>
            </div>
            
            <div className="input-container">
                <input name="firstname" type="text" placeholder="firstname" onChange={(event) => {
                    props.onFirstnameTyped(event);
                    setFirstnameMessage(typeof event?.target.value === "undefined" || event?.target.value.length == 0 ? "please provide a firstname" : "");
                }}/>
                <label htmlFor="firstname">{firstnameMessage}</label>
            </div>
            
            <div className="input-container">
                <input name="lastname" type="text" placeholder="lastname" onChange={(event) => {
                    props.onLastnameTyped(event);
                    setLastnameMessage(typeof event?.target.value === "undefined" || event?.target.value.length == 0 ? "please provide a lastname" : "");
                }}/>
                <label htmlFor="lastname">{lastnameMessage}</label>
            </div>
            
            <div className="input-container">
                <input name="email" type="text" placeholder="email" onChange={(event) => {
                    props.onEmailTyped(event);
                    setEmailMessage(typeof event?.target.value === "undefined" || event?.target.value.length == 0 ? "please provide a email" : "");
                }}/>
                <label htmlFor="email">{emailMessage}</label>
            </div>
            
            <div className="input-container">
                <input name="password" type="password" placeholder="password" onChange={(event) => {
                    props.onPasswordTyped(event);
                    setPasswordMessage(typeof event?.target.value === "undefined" || event?.target.value.length == 0 ? "please provide a password" : "");
                }}/>
                <label htmlFor="password">{passwordMessage}</label>
            </div>
            
            <div className="input-container">
                <input name="balance" type="text" placeholder="balance" onChange={(event) => {
                    props.onBalanceTyped(event);
                    setBalanceMessage(typeof event?.target.value === "undefined" || event?.target.value.length == 0 ? "please provide a balance" : "");
                }}/>
                <label htmlFor="balance">{balanceMessage}</label>
            </div>
            
            <div className="input-container">
                <input name="winnings" type="text" placeholder="winnings" onChange={(event) => {
                    props.onWinningsTyped(event);
                    setWinningsMessage(typeof event?.target.value === "undefined" || event?.target.value.length == 0 ? "please provide a winnings" : "");
                }}/>
                <label htmlFor="winnings">{winningsMessage}</label>
            </div>

            <button onClick={(credentials) => props.onClicked(credentials)}>Register</button>
        </>
    );
}