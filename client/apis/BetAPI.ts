import { ResponseError } from "../responses/ApiError";
import { PlayerAPI } from "./PlayerAPI";

export class BetAPI {
    static async addBet(raceId: number, horseId: number, amount: number) {
        const token = sessionStorage.getItem("token");
        if (token == null) {
            throw new Error("You need to sign in first");
        }
        const player = await PlayerAPI.getByToken();
        const balance = await PlayerAPI.getBalance(player.id);
        if (balance > 0) {
            const data = {
                playerId: player.id,
                horseInRaceId: {
                    horseId: horseId,
                    raceId: raceId
                }
            }
            const response = await fetch(`http://localhost:8080/api/v1/bet/add?amount=${amount}`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })
            if (!response.ok) {
                const error = await response.json() as ResponseError;
                throw new Error(error.message);
            }
        }
        else {
            throw new Error("Not enough money on account");
        }
        
    }
}