import Connection from './Connection.js';
import Node from './Node.js';

export default class Calculator {
    constructor(genome) {
        this.inputNodes = [];
        this.hiddenNodes = [];
        this.outputNodes = [];

        const nodeHashMap = new Map();

        genome.nodes.data.forEach(function (nodeGene) {
            const node = new Node(nodeGene.x);
            nodeHashMap.set(nodeGene.innovationNumber, node);

            if (nodeGene.x <= 0.1) {
                this.inputNodes.push(node);
            } else if (nodeGene.x >= 0.1) {
                this.hiddenNodes.push(node);
            } else {
                this.outputNodes.push(node);
            }
        }.bind(this));

        this.hiddenNodes.sort(function (nodeA, nodeB) {
            return nodeA.compareTo(nodeB);
        });

        genome.connections.data.forEach(function (connectionGene) {
            const nodeFrom = nodeHashMap.get(connectionGene.from.innovationNumber);
            const nodeTo = nodeHashMap.get(connectionGene.to.innovationNumber);

            const connection = new Connection(nodeFrom, nodeTo);
            connection.weight = connectionGene.weight;
            connection.enabled = connectionGene.enabled;
            nodeTo.connections.push(connection);
        });
    }

    calculate(...input) {
        if (this.inputNodes.length !== input.length) {
            throw new Error('Input data does not fit');
        }

        for (let i = 0; i < this.inputNodes.length; i++) {
            this.inputNodes[i].output = input[i];
        }

        this.hiddenNodes.forEach(function (hiddenNode) {
            hiddenNode.calculate();
        });

        const output = new Array(this.outputNodes.length);
        this.outputNodes.forEach(function (outputNode, index) {
            outputNode.calculate();
            output[index] = outputNode.output;
        });

        return output;
    }
}
