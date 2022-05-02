import { ResponseError } from "../errors/ResponseError";

export class RaceAPI {
    static async createRace(place: string, date: string, username: string) {
        const token = sessionStorage.getItem("token");
        if (token == null) {
            throw new Error("You need to sign in first");
        }
        const data = {
            place: place,
            date: date
        };
        const response = await fetch(`http://localhost:8080/api/v1/race/add?creator=${username}`, {
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

    static async getRaces(id: number) {
        const token = sessionStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/v1/race/get?creatorId=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        if (!response.ok) {
            const error = await response.json() as ResponseError;
            throw new Error(error.message);
        }
        const races = await response.json() as Race;
        return races;
    }

    static async getHorsesInRace(raceId: number) {
        const token = sessionStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/v1/race/get?raceId=${raceId}`, {
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

    static async getAvailableHorses(raceId: number) {
        const token = sessionStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/v1/race/getNot?raceId=${raceId}`, {
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

    static async addHorseToRace(raceId: number, horseId: number) {
        const token = sessionStorage.getItem("token");
        if (token == null) {
            throw new Error("You need to sign in first");
        }
        const response = await fetch(`http://localhost:8080/api/v1/race/addHorse/${horseId}/${raceId}`, {
            method: "POST",
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

export interface Race {
  id: number;
  date: string;
  place: string;
  horses: Horse[];
}

export interface Horse {
  includes(element: object): boolean;
  id: number;
  name: string;
  color: string;
  filter: any;
}