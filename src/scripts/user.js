export class User {
    constructor(name, token) {
        this.name = name;
        this.token = token;
        this.score = 0;
    }

    updateScore(points) {
        this.score += points;
    }
}