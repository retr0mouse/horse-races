import { ResponseError } from "../responses/ApiError";

export class AuthAPI {
    static async registerPlayer(username: string, firstname: string, lastname: string,  email: string, password: string, balance: number, winnings: number) {
        const data = {
            username: username,
            email: email,
            firstname: firstname,
            lastname: lastname,
            role: ["user", "admin", "mod"],
            password: password,
            balance: balance
        };
        const response = await fetch("http://localhost:8080/api/v1/auth/signup", {
            method: "POST",
            body: JSON.stringify(data),
            headers : {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const error = await response.json() as ResponseError;
            throw new Error(error.message);
        }
    }

    static async loginPlayer(username: string, password: string) {
        const data = {
            username: username,
            password: password
        }
        const response = await fetch(`http://localhost:8080/api/v1/auth/signin`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const error = await response.json() as ResponseError;
            throw new Error(error.message);
        }
        const player = await response.json() as ResponsePlayer;
        return player;
    }
}

export interface ResponsePlayer {
  id: number;
  username: string;
  email: string;
  roles: string[];
  accessToken: string;
  tokenType: string;
}

