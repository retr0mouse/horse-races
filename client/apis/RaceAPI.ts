import { ResponseError } from "../responses/ApiError";

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

    static async getHorsesInRace(raceId: number): Promise<Horse[]> {
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
        const horses = await response.json() as Horse[];
        return horses;
    }

    static async getAvailableHorses(raceId: number): Promise<Horse[]> {
        const token = sessionStorage.getItem("token");
        const response = await fetch(`http://localhost:8080/api/v1/race/getAvailableHorses?raceId=${raceId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        if (!response.ok) {
            const error = await response.json() as ResponseError;
            throw new Error(error.message);
        }
        const horses = await response.json() as Horse[];
        return horses;
    }

    static async addHorseToRace(raceId: number, horseId: number) {
        const token = sessionStorage.getItem("token");
        const data = {
            horseId: horseId,
            raceId: raceId
        }
        if (token == null) {
            throw new Error("You need to sign in first");
        }
        const response = await fetch(`http://localhost:8080/api/v1/horseInRace/add`, {
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

export interface Race {
  id: number;
  date: string;
  place: string;
  horseInRaces: HorseInRace[];
}

export interface HorseInRace {
  id: Id;
  horse: Horse;
  position?: number;
  bets: Bet[];
}

export interface Bet {
  id: Id2;
  amount: number;
}

export interface Id2 {
  playerId: number;
}

export interface Horse {
  id: number;
  name: string;
  color: string;
}

export interface Id {
  horseId: number;
  raceId: number;
}
