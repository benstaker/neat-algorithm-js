import RandomHashSet from '../data-structures/RandomHashSet.js';
import ConnectionGene from '../genes/ConnectionGene.js';
import NodeGene from '../genes/NodeGene.js';
import Genome from '../genome/Genome.js';

export default class Neat {
    constructor(inputSize, outputSize, clients) {
        this.allConnections = new Map();
        this.allNodes = new RandomHashSet();

        this.C1 = 1;
        this.C2 = 1;
        this.C3 = 1;

        this.reset(inputSize, outputSize, clients);
    }

    static get MAX_NODES() { return 100000; }

    static get PROBABILITY_MUTATE_LINK() { return 0.4; }
    static get PROBABILITY_MUTATE_NODE() { return 0.4; }
    static get PROBABILITY_MUTATE_WEIGHT_SHIFT() { return 0.4; }
    static get PROBABILITY_MUTATE_WEIGHT_RANDOM() { return 0.4; }
    static get PROBABILITY_MUTATE_TOGGLE_LINK() { return 0.4; }

    static get WEIGHT_RANDOM_STRENGTH() { return 1; }
    static get WEIGHT_SHIFT_STRENGTH() { return 0.3; }

    reset(inputSize, outputSize, clients) {
		this.clients = clients;
		this.inputSize = inputSize;
        this.outputSize = outputSize;

        this.allConnections.clear();
        this.allNodes.clear();

		this.createInitialNodes(inputSize, 0.1);
		this.createInitialNodes(outputSize, 0.9);
    }

    createInitialNodes(size, x) {
		for (let i = 0; i < size; i++) {
            let node = this.getNode();
			node.x = x;
			node.y = (i + 1) / (size + 1);
		}
	}

    createEmptyGenome() {
		const genome = new Genome(this);

        for (let i = 0; i < (this.inputSize + this.outputSize); i++) {
            genome.nodes.add(this.getNode());
		}

        return genome;
	}

	getNode(innovationNumber) {
        if (this.allNodes.hasIndex(innovationNumber)) {
            return this.allNodes.get(innovationNumber)
        }

        let node = new NodeGene(this.allNodes.size());
        this.allNodes.add(node);
        return node;
	}

	getConnection() {
        let connectionGene;

        if (arguments.length === 1) {
            let connection = arguments[0];

            connectionGene = new ConnectionGene(connection.from, connection.to);
            connectionGene.weight = connection.weight;
            connectionGene.enabled = connection.enabled;
        } else if (arguments.length === 2) {
            let fromNode = arguments[0];
            let toNode = arguments[1];

            const connectionGene = new ConnectionGene(fromNode, toNode);
            const connectionExists = this.allConnections.has(connectionGene);

            let innovationNumber = connectionExists
                ? this.allConnections.get(connectionGene).innovationNumber
                : this.allConnections.size;
            connectionGene.innovationNumber = innovationNumber;

            if (!connectionExists) {
                this.allConnections.set(connectionGene, connectionGene);
            }
        }

		return connectionGene;
    }

    output() {
        return {
            clients: this.clients,
            inputSize: this.inputSize,
            outputSize: this.outputSize,
            connections: this.allConnections,
            nodes: this.allNodes.data
        };
    }
}
