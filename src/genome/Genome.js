import RandomHashSet from '../data-structures/RandomHashSet';

export default class Genome {
	constructor(neat) {
        this.connections = new RandomHashSet();
		this.nodes = new RandomHashSet();
		this.neat = neat;
	}

	distance(other) {
		return 0;
	}

	crossOver(genomeOne, genomeTwo) {
		return null;
	}

	mutate() {

	}

	getConnections() {
		return this.connections;
	}

	getNodes() {
		return this.nodes;
	}
}
