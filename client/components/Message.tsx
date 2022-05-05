import React, { ReactElement } from "react";
import styled from "styled-components";

const MessageBox = styled.div`
    z-index: 50;
    background-color: #2b83c6;
    color: white;
    border-radius: 5px;
    padding: 5px;
    min-width: 100px;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    position: fixed;
    top: 30%;
    left: 80%;
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
