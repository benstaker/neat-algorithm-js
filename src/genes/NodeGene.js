import Gene from './Gene.js';

export default class NodeGene extends Gene {
	constructor(innovationNumber) {
        super(innovationNumber);

        this.x = null;
        this.y = null;
	}

	equals(other) {
		if (!(other instanceof NodeGene)) {
			return false;
		}

        return this.innovationNumber === other.innovationNumber;
	}

	hashCode() {
		return this.innovationNumber;
    }

    output() {
        return {
            innovationNumber: this.innovationNumber,
            x: this.x,
            y: this.y
        };
    }
}
