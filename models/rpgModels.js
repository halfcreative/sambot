module.exports = class Character {

    constructor(player) { this.player = player.id }

    getName(name) {
        return this.name;
    }
    setName(name) {
        this.name = name
    }

}