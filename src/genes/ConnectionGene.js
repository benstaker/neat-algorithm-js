import Gene from './Gene.js';
import Neat from '../neat/Neat.js';

export default class ConnectionGene extends Gene {
	constructor(from, to) {
        super();

        this.from = from;
        this.to = to;
        this.enabled = false;
        this.weight = 0;
    }

    static copy(original) {
		const copy = new ConnectionGene(original.from, original.to);

        copy.innovationNumber = original.innovationNumber;
		copy.weight = original.weight;
        copy.enabled = original.enabled;

        return copy;
    }

	equals(other) {
		if (!(other instanceof ConnectionGene)) {
			return false;
		}

		return other.from.equals(this.from) && other.to.equals(this.to);
	}

	hashCode() {
		return this.from.innovationNumber * Neat.MAX_NODES + this.to.innovationNumber;
	}

    output() {
        return {
            innovationNumber: this.innovationNumber,
            to: this.to,
            from: this.from,
            enabled: this.enabled,
            weight: this.weight
        };
    }
}
