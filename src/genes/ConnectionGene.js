import Gene from './Gene.js';
import Neat from '../neat/Neat.js';

export default class ConnectionGene extends Gene {
	constructor(from, to) {
        super();

        this.from = from;
        this.to = to;
        this.enabled = null;
        this.weight = null;
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

	copy(original) {
		const copy = new ConnectionGene(original.from, original.to);

        copy.enabled = original.enabled;
		copy.weight = original.weight;

        return copy;
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
