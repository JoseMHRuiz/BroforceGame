class Rambo extends Player {
    constructor() {
    }
    receiveDamage(damage) {
        this.health -= damage;
        if (this.health > 0) {
            return `${this.name} has received ${damage} points of damage`
        }
        return `${this.name} has died in act of combat`
    }
    battleCry() {
        return `Odin Owns You All!`
    }
}

