export default class RandomHashSet {
    constructor() {
        this.set = new Set();
        this.data = [];
    }

    contains(value) {
        return this.set.has(value);
    }

    hasIndex(index) {
        return typeof this.data[index] !== 'undefined';
    }

    randomElement() {
        const randomIndex = Math.floor((Math.random() * this.data.length));
        return this.get(randomIndex);
    }

    clear() {
        this.data.length = 0;
        this.set.clear();
    }

    size() {
        return this.data.length;
    }

    add(value) {
        if (this.contains(value)) return;

        this.set.add(value);
        this.data.push(value);
    }

    addSorted(value) {
        for (let i = 0; i < this.size(); i++) {
            if (value.innovationNumber < this.data[i].innovationNumber) {
                this.set.add(value);
                this.data.splice(i, 0, value);
                return;
            }
        }

        this.add(value);
    }

    get(index) {
        return this.data[index] || null;
    }

    remove(index) {
        if (!this.hasIndex(index)) return;

        const removedItem = this.data.splice(index, 1)[0];
        this.set.remove(removedItem);
    }
}
