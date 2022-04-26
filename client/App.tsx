import React, {useState, useEffect} from "react";
import { LoginInput } from "./components/LoginInput";

export default function App() {
    const [email, setEmail] = useState() as any;
    const [password, setPassword] = useState() as any;

    return (
        <>
            <LoginInput 
                onEmailTyped={(event) => setEmail(event?.target.value)}
                onPasswordTyped={(event) => setPassword(event?.target.value)}
                onClicked={() => console.log(`email: ${email},  password: ${password}`)} 
            ></LoginInput>
        </>
    );
}
