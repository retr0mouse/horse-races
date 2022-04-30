import React, { ReactElement } from "react";
import { SignOutButton } from "../components/SignOutButton";
import { UserSummary } from "../components/UserSummary";

export function CreateRacePage(): ReactElement {
    return (
        <>
            <UserSummary/>
            <SignOutButton/>
        </>
    );
}