import { ResponseError } from "../errors/ResponseError";
import { ResponsePlayer } from "./AuthAPI";
import { PlayerAPI } from "./PlayerAPI";

export class RaceAPI {
    static async createRace(place: string, date: string) {
        const token = sessionStorage.getItem("token");
        if (token == null) {
            throw new Error("You need to sign in first");
        }
        const data = {
            place: place,
            date: date
        };
        const player = await PlayerAPI.getPlayer() as ResponsePlayer;
        const response = await fetch(`http://localhost:8080/api/v1/race/add?creator=${player.username}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        if (!response.ok) {
            const error = await response.json() as ResponseError;
            throw new Error(error.message);
        }
    }
}