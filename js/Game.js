import Grid from './Grid.js';
import Canvas from './Canvas.js';
import Storage from './Storage.js';

class Game {
	#canvasClass = null
	#gridClass = null
	#generationsInterval = null
	#moveCounter = null
	
	constructor(canvasSelector, columns, rows, resolution) {
		this.#canvasClass = new Canvas(canvasSelector, columns, rows, resolution);
		this.#gridClass = new Grid(columns, rows, Storage.get("state"));
		
		this.#moveCounter = Storage.get("moveCounter") ?? 0;
		
		this.#canvasClass.render(this.#gridClass.getGrid());
	}
	
	fillRandomGrid(countCells) {
		this.#gridClass.fillRandomGrid(countCells);
		this.#canvasClass.render(this.#gridClass.getGrid());
	}
	
	nextGeneration() {
		this.#gridClass.generateNextGen();
		this.#canvasClass.render(this.#gridClass.getGrid());
		this.incrementMoveCounter();
	}
	
	startIntervalGenerations(callback) {
		if (this.#generationsInterval) return;
		
		this.#generationsInterval = setInterval(() => {
			this.nextGeneration();
			
			if (callback) callback();
		}, 50)
	}
	
	stopIntervalGenerations(callback) {
		if (callback) callback();
		
		clearInterval(this.#generationsInterval);
		this.#generationsInterval = null;
	}
	
	reset() {
		this.#gridClass.resetGrid();
		this.#canvasClass.render(this.#gridClass.getGrid());
		this.resetMoveCounter();
		this.stopIntervalGenerations();
	}
	
	getMoveCounter() {
		return this.#moveCounter;
	}
	
	incrementMoveCounter() {
		this.#moveCounter++;
	}
	
	resetMoveCounter() {
		this.#moveCounter = 0;
	}
	
	saveToStorage() {
		Storage.set("state", this.#gridClass.getGrid());
		Storage.set("moveCounter", this.#moveCounter);
	}
}

export default Game;