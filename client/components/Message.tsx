import React, { ReactElement } from "react";
import styled from "styled-components";

const MessageBox = styled.div`
    z-index: 50;
    background-color: aquamarine;
    border-radius: 5px;
    padding: 5px;
    min-width: 100px;
    text-align: center;
    font-family: "Comic Sans MS", "Times New Roman";
    position: fixed;
    top: 20%;
    left: 70%;
    transform: translate(-50%, -50%);
`;

interface Props {
    message: string
}

export function Message(props: Props): ReactElement {
    return (
        <>
            {props.message &&
                <MessageBox>
                    <h4>{props.message}</h4>
                </MessageBox>
            }
        </>
    );
}
