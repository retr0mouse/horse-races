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
            const data = await response.json();
            throw new Error(data.message);
        }
    }
}