import Calculator from '../calculations/Calculator.js';

export default class Client {
    constructor(genome) {
        this.genome = genome;
        this.species = null;
        this.score = 0;
    }

    calculate(...input) {
        const calculator = new Calculator(this.genome);
        return calculator.calculate(...input);
    }

    distance(other) {
        this.genome.distance(other.genome);
    }

    mutate() {
        this.genome.mutate();
    }
}
