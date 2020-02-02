import Gene from './Gene';
import Neat from '../neat/Neat';

export default class ConnectionGene extends Gene {
	constructor(from, to) {
        super();

        this.from = from;
		this.to = to;
	}

	getFrom() {
		return this.from;
	}

	setFrom(from) {
		this.from = from;
	}

	getTo() {
		return this.to;
	}

	setTo(to) {
		this.to = to;
	}

	getWeight() {
		return this.weight;
	}

	setWeight(weight) {
		this.weight = weight;
	}

	isEnabled() {
		return this.enabled;
	}

	setEnabled(enabled) {
		this.enabled = enabled;
	}

	equals(other) {
		if (!(other instanceof ConnectionGene)) {
			return false;
		}

		return other.getFrom().equals(this.from) && other.getTo().equals(this.to);
	}

	hashCode() {
		return this.from.getInnovationNumber() * Neat.MAX_NODES + this.to.getInnovationNumber();
	}

	copy(original) {
		const copy = new ConnectionGene(original.from, original.to);

        copy.setEnabled(original.isEnabled());
		copy.setWeight(original.getWeight());

        return copy;
	}
}
