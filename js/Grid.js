class Grid {
	#grid = null
	#tempGrid = null
	#columns = null
	#rows = null
	
	constructor(columns, rows, grid = null) {
		this.#columns = columns;
		this.#rows = rows;
		
		this.#grid = this.checkGridOnValid(grid) ? grid : this.#generateGrid();
	}
	
	#generateGrid() {
		return new Array(this.#rows).fill(null)
			.map(() => new Array(this.#columns).fill(0));
	}
	
	resetGrid() {
		this.#grid = this.#generateGrid();
	}
	
	fillRandomGrid(countCells) {
		const maxCountCells = this.#columns * this.#rows - this.getCountAliveCells();
		
		if (countCells < 2 || countCells > maxCountCells) {
			throw Error(`Count cells can't be less than 2 and more than ${maxCountCells}`);
		}
		
		while (countCells > 0) {
			const randomColumn = Grid.#getRandomNum(0, this.#columns);
			const randomRow = Grid.#getRandomNum(0, this.#rows);
			
			const cell = this.#grid[randomRow][randomColumn];
			
			if (cell === 1) continue;
			
			this.#grid[randomRow][randomColumn] = 1;
			countCells--;
		}
	}
	
	generateNextGen() {
		this.#tempGrid = this.#generateGrid();
		
		for (let row = 0; row < this.#rows; row++) {
			for (let col = 0; col < this.#columns; col++) {
				const state = this.#grid[row][col];
				const neighbours = this.countNeighbours(this.#grid, col, row);
				
				// rules
				if (state === 0 && neighbours === 3) {
					this.#tempGrid[row][col] = 1;
				} else if (state === 1 && (neighbours < 2 || neighbours > 3)) {
					this.#tempGrid[row][col] = 0;
				} else {
					this.#tempGrid[row][col] = state;
				}
			}
		}
		
		this.#grid = this.#tempGrid;
	}
	
	countNeighbours(grid, x, y) {
		let countAliveNeighbours = 0;
		
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				const row = (y + i + this.#rows) % this.#rows;
				const col = (x + j + this.#columns) % this.#columns;
				
				countAliveNeighbours += grid[row][col];
			}
		}
		
		countAliveNeighbours -= grid[y][x];
		
		return countAliveNeighbours;
	}
	
	getGrid() {
		return this.#grid;
	}
	
	getCountAliveCells() {
		let countAliveCells = 0 ;
		
		for (let row = 0; row < this.#rows; row++) {
			for (let col = 0; col < this.#columns; col++) {
				if (this.#grid[row][col] === 1) {
					countAliveCells++;
				}
			}
		}
		
		return countAliveCells;
	}
	
	checkGridIsStatic() {
		let countCoincidences = 0;
		
		for (let row = 0; row < this.#rows; row++) {
			for (let col = 0; col < this.#columns; col++) {
				if (this.#grid[row][col] === this.#tempGrid[row][col]) {
					countCoincidences++;
				}
			}
		}
		
		return countCoincidences === this.#rows * this.#columns;
	}
	
	static #getRandomNum(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}
	
	checkGridOnValid(grid) {
		//console.log(grid?.length === this.#rows && grid[0]?.length === this.#columns)
		return grid?.length === this.#rows && grid[0]?.length === this.#columns;
		
	}
}

export default Grid;