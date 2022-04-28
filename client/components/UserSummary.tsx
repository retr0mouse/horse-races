import React, { ReactElement } from "react";

export function UserSummary(): ReactElement  {
    return (
        <>
            <h1>{window.sessionStorage.getItem("token")}</h1>
        </>
    );
}