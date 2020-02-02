import RandomHashSet from '../data-structures/RandomHashSet.js';
import Genome from '../genome/Genome.js';
import Neat from './Neat/Neat.js';

export default class Species {
    constructor(representative) {
        this.clients = new RandomHashSet();
        this.representative = representative;
        this.score = 0;

        // Assign this species to rep
        this.representative.species = this;
    }

    addClient(client, force = false) {
        if (force || client.distance(this.representative) < Neat.CP) {
            client.species = this;
            this.clients.add(client);
            return true;
        }

        return false;
    }

    goExtinct() {
        this.clients.forEach(function (client) {
            client.species = null;
        });
    }

    evaluateScore() {
        this.score = this.clients.data.reduce(function (score, client) {
            return score + client.score;
        }, 0);
    }

    reset() {
        this.representative = this.clients.randomElement();

        this.goExtinct();
        this.clients.clear();

        this.representative.species = this;
        this.clients.add(this.representative);
        this.evaluateScore();
    }

    kill(percentage) {
        // Sort clients from best to worst
        this.clients.data.sort(function (clientA, clientB) {
            if (clientA.score < clientB.score) return 1;
            if (clientA.score > clientB.score) return -1;
            return 0;
        });

        let toKill = Math.floor(percentage * this.clients.length);
        let killIndex;

        while (toKill) {
            killIndex = this.clients.length - 1;
            this.clients[killIndex].species = null;
            this.clients.remove(killIndex);

            toKill--;
        }
    }

    breed() {
        const clientOne = this.clients.randomElement();
        const clientTwo = this.clients.randomElement();

        if (clientOne.score > clientTwo.score) {
            return Genome.crossOver(clientOne, clientTwo);
        } else {
            return Genome.crossOver(clientTwo, clientOne);
        }
    }
}
