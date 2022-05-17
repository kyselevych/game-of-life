import Game from "./Game.js";

const COLUMNS = 32;
const ROWS = 20;
const RESOLUTION = 25;

const game = new Game("#field", COLUMNS, ROWS, RESOLUTION);

const startLoopBtn = document.querySelector("#startLoop");
const stopLoopBtn = document.querySelector("#stopLoop");
const nextGenBtn = document.querySelector("#next");
const resetBtn = document.querySelector("#reset");
const fillCellsInput = document.querySelector("#fillCells");
const fillCellsBtn = document.querySelector("#setFillCells");
const moveCounterSpan = document.querySelector("#moveCounter");

renderMoveCounter();

function handlerValidationFillCellsInput(event) {
	const valueString = event.target.value;
	const value = parseInt(valueString);
	
	if (value < 2) {
		event.target.value = 2;
	} else if (value > ROWS * COLUMNS - 1) {
		event.target.value = ROWS * COLUMNS - 1;
	}
}

function handlerClickFillCellBtn() {
	const value = parseInt(fillCellsInput.value);
	
	try {
		game.fillRandomGrid(value);
	} catch (err) {
		alert(err.message)
	}
}

function handlerClickStartLoopBtn() {
	game.startIntervalGenerations(() => {
		renderMoveCounter();
	});
}

function handlerClickStopLoopBtn() {
	game.stopIntervalGenerations();
}

function handlerClickNextGenBtn() {
	game.stopIntervalGenerations();
	game.nextGeneration();
	renderMoveCounter();
}

function handlerClickResetBtn() {
	game.stopIntervalGenerations();
	game.reset();
	renderMoveCounter();
}

function handlerOnbeforeunload() {
	game.saveToStorage();
}

function renderMoveCounter() {
	moveCounterSpan.textContent = game.getMoveCounter();
}

fillCellsInput.addEventListener("change", handlerValidationFillCellsInput);
fillCellsBtn.addEventListener("click", handlerClickFillCellBtn);
startLoopBtn.addEventListener("click", handlerClickStartLoopBtn);
stopLoopBtn.addEventListener("click", handlerClickStopLoopBtn);
nextGenBtn.addEventListener("click", handlerClickNextGenBtn);
resetBtn.addEventListener("click", handlerClickResetBtn);
window.addEventListener("beforeunload", handlerOnbeforeunload);