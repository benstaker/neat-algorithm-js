import Gene from './Gene';

export default class NodeGene extends Gene {
	constructor(innovationNumber) {
        super(innovationNumber);
	}

	getX() {
		return this.x;
	}

	setX(x) {
		this.x = x;
	}

	getY() {
		return this.y;
	}

	setY(y) {
		this.y = y;
	}

	equals(other) {
		if (!(other instanceof NodeGene)) {
			return false;
		} else {
			return this.innovationNumber === other.getInnovationNumber();
		}
	}

	hashCode() {
		return this.innovationNumber;
	}
}
