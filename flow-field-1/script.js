function initCanvas() {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");

	const dpr = window.devicePixelRatio;
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx.lineWidth = 2;

	return {
		ctx: ctx,
		W: canvas.width,
		H: canvas.height
	} 
}

function getRandomInRange(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

(() => {
	const {ctx, W, H} = initCanvas();

	const draw = (x, y, w, h, angle, color) => {
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.moveTo(x, y);
		ctx.lineTo(w, h);
		ctx.stroke();
	};


	const createGrid = (step, angle_function) => {
		const num_cols = W / step;
		const num_rows = H / step;
		let grid = [];

		for (let col = 0; col < num_cols; col++){
			grid[col] = [];
			for (let row = 0; row < num_rows; row++) {
				angle = angle_function(col, num_cols);
				grid[col][row] = angle;
			}
		}
		return grid;
	};

	const drawGrid = (grid, step, color) => {
		for (col in grid) {
			for (row in grid[col]) {
				const x = col * step;
				const y = row * step;
				const current_angle = grid[col][row];
				const next_x = x + step * Math.cos(current_angle);
				const next_y = y + step * Math.sin(current_angle);

				draw(x, y, next_x, next_y, grid[col][row], color);
			}
		}
	};

	const step = 20;
	const grid = createGrid(step, (x, y) => (x / y) * Math.PI);
	//drawGrid(grid, step, 'white');

	const vertical_step = 50;
	const vertical_grid = createGrid(vertical_step, (x, y) => (x / y) * Math.PI * Math.random());

	const right_step = 30;
	const right_grid = createGrid(right_step, (x, y) => (y / x) * Math.PI * Math.random());
	//drawGrid(right_grid, right_step, 'yellow');

	//drawGrid(vertical_grid, vertical_step, 'yellow');


	const drawCurve = (x_start, y_start, curve_step, num_steps, grid, step, color) => {
		for (n = 0; n < num_steps; n++) {
			col_index = parseInt(x_start / step)
			row_index = parseInt(y_start / step)

			if (col_index < 0 || row_index < 0 || col_index >= grid.length || row_index >= grid[col_index].length) {
				break;
			} else {
				grid_angle = grid[col_index][row_index]
				xNext = x_start + curve_step * Math.cos(grid_angle);
				yNext = y_start + curve_step * Math.sin(grid_angle);

				draw(x_start, y_start, xNext, yNext, grid_angle, color) 

				x_start = xNext;
				y_start = yNext;
			}
		}
	};

	for (x = 0; x < W; x++) {
		const gradient_ratio = Math.random();
		const sub_color = Math.floor(255 - gradient_ratio);
		const color = `rgb(${sub_color}, ${sub_color}, ${sub_color})`;	
		drawCurve(x, 0, 10, Math.random() * 100, grid, step, Math.random() > 0.5 ? 'black' : 'beige');
	}

	for (y = 0; y < H; y++) {
		const gradient_ratio = Math.random();
		const sub_color = Math.floor(255 - gradient_ratio);
		const color = `rgb(${sub_color}, ${sub_color}, ${sub_color})`;	
		drawCurve(0, y, 10, Math.random() * 200, vertical_grid, vertical_step, Math.random() > 0.5 ? 'red' : '#ae53ed');
	}

	for (x = W; x > 0; x--) {
		const gradient_ratio = Math.random();
		const sub_color = Math.floor(255 - gradient_ratio);
		const color = `rgb(${sub_color}, ${sub_color}, ${sub_color})`;	
		drawCurve(x, 0, 10, Math.random() * 200, right_grid, right_step, Math.random() > 0.5 ? 'green' : 'yellow');
	}

})();
