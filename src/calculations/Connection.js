export default class Connection {
    constructor(from, to) {
        this.from = from;
        this.to = to;
        this.enabled = false;
        this.weight = 0;
    }

    static copy(original) {
		const copy = new Connection(original.from, original.to);

		copy.weight = original.weight;
        copy.enabled = original.enabled;

        return copy;
    }
}
