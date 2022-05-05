import { ResponseError } from "../responses/ApiError";
import { ResponsePlayer } from "./AuthAPI";

export class PlayerAPI {
    static async getByToken() {
        const token = sessionStorage.getItem("token");
        if (token == null) {
            throw new Error("You need to sign in first");
        }
        const response = await fetch("http://localhost:8080/api/v1/player/getByJwt", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        if (!response.ok) {
            const error = await response.json() as ResponseError;
            throw new Error(error.message);
        }
        const player = await response.json() as ResponsePlayer;
        return player;
    }

    static async getBalance(playerId: number) {
        const token = sessionStorage.getItem("token");
        if (token == null) {
            throw new Error("You need to sign in first");
        }
        const response = await fetch(`http://localhost:8080/api/v1/player/getBalance?id=${playerId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        if (!response.ok) {
            const error = await response.json() as ResponseError;
            throw new Error(error.message);
        }
        return await response.json() as number;
    }
}
