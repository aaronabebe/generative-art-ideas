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



(() => {
	const {ctx, W, H} = initCanvas();

	const draw = (x, y, width, height) => {
		const leftToRight = Math.random() >= 0.5;

		if (leftToRight) {
			ctx.moveTo(x, y);
			ctx.lineTo(x + width, y + height);
		} else {
			ctx.moveTo(x + width, y);
			ctx.lineTo(x, y + height);

		}
		ctx.stroke();
	};

	const step = 50;

	for (let x = 0; x < W; x += step) {
		for (let y = 0; y < H; y += step) {
			draw(x, y, step, step);
		}
	}


})();
