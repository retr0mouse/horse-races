export class PlayerAPI {
    static async registerPlayer(username: string, firstname: string, lastname: string,  email: string, password: string, balance: number, winnings: number) {
        const data = {
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            balance: balance,
            winnings: winnings
        };
        const response = await fetch("http://localhost:8080/api/v1/player/add", {
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
        const response = await fetch(`http://localhost:8080/api/v1/player/get?username=${username}&password=${password}`, {
            method: "GET"
        });
        if (!response.ok) {
            throw new Error("Request failed with status code " + response.status);
        }
        const token = await response.json() as Token;
        return token;
    }
}
interface Token {
  id: string;
  playerId: number;
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