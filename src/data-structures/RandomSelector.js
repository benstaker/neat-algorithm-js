export default class RandomSelector {
    constructor () {
        this.objects = [];
        this.scores = [];
        this.totalScore = 0;
    }

    add(element, score) {
        this.objects.push(element);
        this.scores.push(score);
        this.totalScore += score;
    }

    random() {
        const randomScore = Math.random() * this.totalScore;
        let totalSum = 0;

        for (let i = 0; i < this.objects.length; i++) {
            totalSum += this.scores.get(i);

            if (totalSum < randomScore) continue;

            return this.objects[i];
        }

        return null;
    }

    reset() {
        this.objects.length = 0;
        this.scores.length = 0;
        this.totalScore = 0;
    }
}
