class Canvas {
	#canvas = null
	#ctx = null
	#resolution = null
	#columns = null
	#rows = null
	
	constructor(selector, columns, rows, resolution) {
		this.#canvas = document.querySelector(selector);
		this.#ctx = this.#canvas.getContext("2d");
		
		this.#resolution = resolution;
		this.#columns = columns;
		this.#rows = rows;
		
		this.#build();
	}
	
	#build() {
		this.#canvas.width = this.#columns * this.#resolution;
		this.#canvas.height = this.#rows * this.#resolution;
	}
	
	render(grid) {
		const ctx = this.#ctx;
		
		for (let row = 0; row < grid.length; row++) {
			for (let col = 0; col < grid[row].length; col++) {
				const cell = grid[row][col];
				
				const x = col * this.#resolution;
				const y = row * this.#resolution;
				
				ctx.beginPath();
				ctx.rect(x, y, this.#resolution, this.#resolution);
				ctx.fillStyle = cell ? '#51e141' : '#0E0E0EFF';
				ctx.fill();
				ctx.stroke();
			}
		}
	}
}

export default Canvas;