export default class Node {
    constructor(x) {
        this.x = x;
        this.output = 0;
        this.connections = [];
    }

    calculate() {
        const sum = this.connections.reduce(function (total, connection) {
            if (connection.enabled) {
                total += connection.weight * connection.from.output;
            }

            return total;
        }, 0);

        this.output = this.activation(sum);
    }

    activation(value) {
        return 1 / (1 + Math.exp(-value));
    }

    compareTo(other) {
        if (this.x > other.x) return 1;
        if (this.x < other.x) return -1;
        return 0;
    }
}
