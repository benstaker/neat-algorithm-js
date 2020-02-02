import Calculator from '../calculations/Calculator.js';
import RandomHashSet from '../data-structures/RandomHashSet.js';
import ConnectionGene from '../genes/ConnectionGene.js';
import Neat from '../neat/Neat.js';

export default class Genome {
	constructor(neat) {
        this.connections = new RandomHashSet();
		this.nodes = new RandomHashSet();
        this.neat = neat;
    }

    static crossOver(gOne, gTwo) {
        const neat = gOne.neat;
        let genome = neat.createEmptyGenome();

		let gOneIndex = 0;
        let gOneItem = null;

        let gTwoIndex = 0;
        let gTwoItem = null;

        while(gOneIndex < gOne.connections.length && gTwoIndex < gTwo.connections.length) {
            gOneItem = gOne.connections.get(gOneIndex);
            gTwoItem = gTwo.connections.get(gTwoIndex);

            if (gOneItem.innovationNumber === gTwoItem.innovationNumber) {
                // Similar gene
                if (Math.random() > 0.5) {
                    genome.connections.add(neat.getConnection(gOneItem));
                } else {
                    genome.connections.add(neat.getConnection(gTwoItem));
                }

                gOneIndex++;
                gTwoIndex++;
            } else if (gOneItem.innovationNumber > gTwoItem.innovationNumber) {
                // Disjoint gene of Two
                gTwoIndex++;
            } else {
                // Disjoint gene of One
                genome.connections.add(neat.getConnection(gOneItem));
                gOneIndex++;
            }
        }

        // Add the remainding genes
        while(gOneIndex < gOne.connections.length) {
            genome.connections.add(neat.getConnection(gOneItem)); // TODO: Add gene of One
            gOneIndex++;
        }

        // Add the nodes from the connections
        genome.connections.getData().forEach(function (connection) {
            genome.nodes.add(connection.from);
            genome.nodes.add(connection.to);
        });

        return genome;
    }

    calculate(...inputs) {
        this.calculator = new Calculator(this);
        return this.calculator.calculate(...inputs);
    }

	distance(gTwo) {
        let gOne = this;

        const gOneHighestInnovation = gOne.connections.size()
            ? gOne.connections.get(gOne.connections.length - 1).innovationNumber
            : 0;
        const gTwoHighestInnovation = gTwo.connections.size()
            ? gTwo.connections.get(gTwo.connections.length - 1).innovationNumber
            : 0;

        // Swap them around if g two is higher
        if (gOneHighestInnovation < gTwoHighestInnovation) {
            let tempGenome = gOne;
            gOne = gTwo;
            gTwo = tempGenome;
        }

        let gOneIndex = 0;
        let gOneItem = null;

        let gTwoIndex = 0;
        let gTwoItem = null;

        let disjointGenes = 0;
        let excessGenes = 0;
        let weightDifference = 0;
        let similarGenes = 0;

        while(gOneIndex < gOne.connections.length && gTwoIndex < gTwo.connections.length) {
            gOneItem = gOne.connections.get(gOneIndex);
            gTwoItem = gTwo.connections.get(gTwoIndex);

            if (gOneItem.innovationNumber === gTwoItem.innovationNumber) {
                // Similar gene
                similarGenes++;
                weightDifference += Math.abs(gOneItem.weight - gTwoItem.weight);
                gOneIndex++;
                gTwoIndex++;
            } else if (gOneItem.innovationNumber > gTwoItem.innovationNumber) {
                // Disjoint gene of Two
                disjointGenes++;
                gTwoIndex++;
            } else {
                // Disjoint gene of One
                disjointGenes++;
                gOneIndex++;
            }
        }

        weightDifference /= similarGenes;
        excessGenes = gOne.connections.length - gOneIndex;

        // Calculate N value
        let N = Math.max(gOne.connections.length, gTwo.connections.length);
        if (N < 20) {
            N = 1;
        }

        return (
            ((this.neat.C1 * excessGenes) / N) +
            ((this.neat.C2 * disjointGenes) / N) +
            (this.neat.C3 * weightDifference)
        );
	}

	mutate() {
        if (Neat.PROBABILITY_MUTATE_LINK > Math.random()) {
            this.mutateLink();
        }
        if (Neat.PROBABILITY_MUTATE_NODE > Math.random()) {
            this.mutateNode();
        }
        if (Neat.PROBABILITY_MUTATE_WEIGHT_SHIFT > Math.random()) {
            this.mutateWeightShift();
        }
        if (Neat.PROBABILITY_MUTATE_WEIGHT_RANDOM > Math.random()) {
            this.mutateWeightRandom();
        }
        if (Neat.PROBABILITY_MUTATE_TOGGLE_LINK > Math.random()) {
            this.mutateLinkToggle();
        }
    }

    mutateLink() {
        let nodeFrom, nodeTo, connection;

        for (var i = 0; i < 100; i++) {
            nodeFrom = this.nodes.randomElement();
            nodeTo = this.nodes.randomElement();

            // Continue loop if from and to's X value are the same
            if (nodeFrom.x === nodeTo.x) continue;

            // Flip the connection if the from's X is less than to's
            connection = nodeFrom.x < nodeTo.x
                ? new ConnectionGene(nodeFrom, nodeTo)
                : new ConnectionGene(nodeTo, nodeFrom);

            // Do not add connection if we already have it
            if (this.connections.contains(connection)) continue;

            // Add a new connection and setting a random weight
            connection = this.neat.getConnection(connection.from, connection.to);
            connection.weight = this.randomWeight();
            this.connections.addSorted(connection);
            console.log('mutated connection: ', connection);
            return;
        }
    }

    mutateNode() {
        const connection = this.connections.randomElement();
        console.log('mutating node...', connection ? connection.innovationNumber : null);

        if (connection === null) return;

        const nodeMiddle = this.neat.getNode();
        nodeMiddle.x = (connection.from.x + connection.to.x) / 2;
        nodeMiddle.y = ((connection.from.y + connection.to.y) / 2) + (Math.random() * 0.1 - 0.05);

        const connectionOne = this.neat.getConnection(connection.from, nodeMiddle);
        const connectionTwo = this.neat.getConnection(nodeMiddle, connection.to);
        connectionOne.weight = 1;
        connectionTwo.weight = connection.weight;
        connectionTwo.enabled = connection.enabled;

        this.connections.remove(connection);
        this.nodes.add(nodeMiddle);
        this.connections.add(connectionOne);
        this.connections.add(connectionTwo);
        console.log('mutated node: ', nodeMiddle);
    }

    mutateWeightShift() {
        const connection = this.connections.randomElement();
        console.log('mutating weight shift...', connection ? connection.innovationNumber : null);

        if (connection !== null) {
            connection.weight = connection.weight + ((Math.random() * 2 - 1) * Neat.WEIGHT_SHIFT_STRENGTH);
            console.log('mutated weight shift: ', connection);
        }
    }

    mutateWeightRandom() {
        const connection = this.connections.randomElement();
        console.log('mutating weight random...', connection ? connection.innovationNumber : null);

        if (connection !== null) {
            connection.weight = this.randomWeight();
            console.log('mutated weight random: ', connection);
        }
    }

    mutateLinkToggle() {
        const connection = this.connections.randomElement();
        console.log('mutating link toggle...', connection ? connection.innovationNumber : null);

        if (connection !== null) {
            connection.enabled = !connection.enabled;
            console.log('mutated link toggle: ', connection.enabled);
        }
    }

    randomWeight() {
        return (Math.random() * 2 - 1) * Neat.WEIGHT_RANDOM_STRENGTH;
    }

    output() {
        return {
            connections: this.connections.data,
            nodes: this.nodes.data
        };
    }
}
