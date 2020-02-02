import Neat from './neat/Neat.js';

let neat, genome;
let speed = 250;

function output(side, data) {
    document.getElementById('output-' + side).innerHTML = JSON.stringify(data, undefined, 4);
}


/**
 * Actions
 */
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

window.reset = function () {
    window.stop();

    neat = new Neat(2, 2, 10);
    genome = neat.createEmptyGenome();

    iterations = 1;
    window.start();
};

window.start = function () {
    // Run the simulation
    window.stop();
    runnerInterval = setInterval(function () {
        document.querySelector('#iterations span').innerHTML = iterations;
        document.querySelector('#speed span').innerHTML = speed;

        genome.mutate();
        genome.calculate(1, 1);

        output('left', genome.output());
        output('right-top', neat.output());
        output('right-bottom', {
            inputNodes: genome.calculator.inputNodes,
            outputNodes: genome.calculator.outputNodes
        });

        iterations++;
    }, speed);
};

window.slower = function () {
    window.stop();
    speed = speed + 100;
    window.start();
};

window.faster = function () {
    window.stop();
    speed = speed >= 150 ? speed - 100 : 150;
    window.start();
};

// Init
window.reset();
