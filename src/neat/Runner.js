import Neat from './Neat';

export default class Runner {
	constructor() {
		console.log('Running NEAT.');

		const neat = new Neat(3, 3, 100);
        const genome = neat.createEmptyGenome();

		console.log(genome.getNodes().size());
	}
}
