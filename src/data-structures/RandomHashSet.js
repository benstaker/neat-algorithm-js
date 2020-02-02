export default class RandomHashSet {
    constructor() {
        this.set = new Set();
        this.data = [];
    }

    contains(value) {
        return this.set.has(value);
    }

    randomElement() {
        const randomIndex = Math.floor((Math.random() * this.data.length));
        return this.data[randomIndex];
    }

    clear() {
        this.data.length = 0;
        this.set.clear();
    }

    size() {
        return this.data.length;
    }

    add(value) {
        if (this.set.has(value)) return;

        this.set.add(value);
        this.data.push(value);
    }

    get(index) {
        return this.data[index];
    }

    getData() {
        return this.data;
    }
}
