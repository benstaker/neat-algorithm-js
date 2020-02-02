import Neat from './neat/Neat.js';

const neat = new Neat(2, 2, 20);
const genome = neat.createEmptyGenome();

output('left', neat.output());
output('right', genome.output());

function output(side, data) {
    document.getElementById('output-' + side).innerHTML = JSON.stringify(data, undefined, 4);
}

window.addConnection = function () {
    var nodeOne = genome.nodes.randomElement();
    var nodeTwo = genome.nodes.randomElement();

    neat.getConnection(nodeOne, nodeTwo);
};

window.mutate = function () {
    genome.mutate();
    output('right', genome.output());
};

/**
 * Runner
 */
let runnerInterval;
let iterations = 1;

window.stop = function () {
    clearInterval(runnerInterval);
};

window.start = function () {
    // Run the simulation
    window.stop();
    runnerInterval = setInterval(function () {
        document.querySelector('#iterations span').innerHTML = iterations;
        window.mutate();
        iterations++;
    }, 250);
};
