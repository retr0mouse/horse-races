import { ResponseError } from "../errors/ResponseError";

export class HorseAPI {
    static async createHorse(name: string, color: string) {
        const token = sessionStorage.getItem("token");
        if (token == null) {
            throw new Error("You need to sign in first");
        }
        const data = {
            name: name,
            color: color
        };
        const response = await fetch(`http://localhost:8080/api/v1/horse/add`, {
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

    static async getHorses() {
        const token = sessionStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/v1/horse/get`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        if (!response.ok) {
            const error = await response.json() as ResponseError;
            throw new Error(error.message);
        }
        const horses = await response.json() as Horse;
        return horses;
    }
} 

interface Horse {
    id: number;
    name: string;
    color: string;
    filter: any;
}