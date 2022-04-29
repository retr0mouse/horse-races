export class PlayerAPI {
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
            throw new Error("Request failed with status code " + response.status);
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
            throw new Error("Request failed with status code " + response.status);
        }
        const player = await response.json() as ResponsePlayer;
        return player.accessToken;
    }
}
interface Token {
  id: string;
  playerId: number;
}

interface ResponsePlayer {
  id: number;
  username: string;
  email: string;
  roles: string[];
  accessToken: string;
  tokenType: string;
}
// export interface Player {
//   id: number;
//   username: string;
//   firstname: string;
//   lastname: string;
//   email: string;
//   password: string;
//   balance: number;
//   winnings: number;
// }