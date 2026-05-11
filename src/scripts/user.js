export class User {
    constructor(name) {
        this.name = name;
        this.score = 0;
    }

    updateScore(points) {
        this.score += points;
    }
}