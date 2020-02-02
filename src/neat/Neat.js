import ConnectionGene from '../genes/ConnectionGene';
import NodeGene from '../genes/NodeGene';
import Genome from '../genome/Genome';

export default class Neat {
    constructor(inputSize, outputSize, clients) {
        this.allConnections = new Map();
        this.allNodes = [];

        this.reset(inputSize, outputSize, clients);
    }

    static get MAX_NODES() { return 100000; }

    reset(inputSize, outputSize, clients) {
		this.clients = clients;
		this.inputSize = inputSize;
		this.outputSize = outputSize;

		this.createInitialNodes(inputSize, 0.1);
		this.createInitialNodes(outputSize, 0.9);
    }

    createInitialNodes(size, x) {
		for (let i = 0; i < size; i++) {
            let node = this.createNode();
            let y = (i + 1) / (size + 1);

			node.setX(x);
			node.setY(y);
		}
	}

	createNode() {
		let node = new NodeGene(this.allNodes.length);
		this.allNodes.push(node);
		return node;
	}

	createOrGetNode(innovationNumber) {
        return typeof this.allNodes[innovationNumber] !== 'undefined'
            ? this.allNodes[innovationNumber]
            : this.createNode();
	}

	createEmptyGenome() {
		const genome = new Genome(this);

        for (let node, i = 0; i < this.inputSize + this.outputSize; i++) {
            node = this.createNode();
            genome.getNodes().add(node);
		}

        return genome;
	}

	createNewOrGet(fromNode, toNode) {
        const connectionGene = new ConnectionGene(fromNode, toNode);
        const connectionExists = this.allConnections.has(connectionGene);

        let innovationNumber = connectionExists
            ? this.allConnections.get(connectionGene).getInnovationNumber()
            : this.allConnections.size;
        connectionGene.setInnovationNumber(innovationNumber);

		if (!connectionExists) {
			this.allConnections.set(connectionGene, connectionGene);
        }

		return connectionGene;
	}
}
