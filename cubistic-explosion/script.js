function initCanvas() {
	const canvas = document.getElementById("canvas");
	const ctx = canvas.getContext("2d");

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx.lineWidth = 100;
	ctx.lineCap = 'round';

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

function vecLen(a, b) {
	return Math.sqrt((b.x - a.x)**2 + (b.y-a.y)**2)
}

function midPoint(aX, aY, bX, bY) {
	const cX = (aX + bX) / 2
	const cY = (aY + bY) / 2

	return {'x': cX, 'y': cY}
}

(() => {
	const {ctx, W, H} = initCanvas();

	const draw = (x, y, w, h, color) => {
		width = getRandomInRange(20, 70);
		ctx.beginPath();
		ctx.lineWidth = width;
		ctx.strokeStyle = 'black';
		ctx.moveTo(x, y);
		ctx.lineTo(w, h);

		ctx.stroke();

		ctx.lineWidth = width - 5;
		ctx.strokeStyle = color;
		ctx.stroke();

		ctx.lineWidth = width / 8;
		ctx.strokeStyle = 'black';
		ctx.stroke();

		ctx.lineWidth = (width / 8) - 2;
		ctx.strokeStyle = 'white';
		ctx.stroke();
	};


	const drawTriangle = (aX, aY, bX, bY, cX, cY, color) => {
		color = color === 'undefined' ? 'black' : color;
		draw(aX, aY, bX, bY, color);
		draw(bX, bY, cX, cY, color);
		draw(cX, cY, aX, aY, color);
	};

	let depth = 1000;
	const seed = Math.random() > 0.5;
	const seed2 = Math.random() > 0.5;
	const cutOff = getRandomInRange(110, 150);
	const triangulate = (a, b, c) => {
		const randOffset = getRandomInRange(30, 50);

		const d = midPoint(a.x, a.y, c.x, c.y);
		d.x += getRandomInRange(-randOffset, randOffset);
		d.y += getRandomInRange(-randOffset, randOffset);

		const e = midPoint(a.x, a.y, b.x, b.y);
		e.x += getRandomInRange(-randOffset, randOffset);
		e.y += getRandomInRange(-randOffset, randOffset);

		const f = midPoint(b.x, b.y, c.x, c.y);
		f.x += getRandomInRange(-randOffset, randOffset);
		f.y += getRandomInRange(-randOffset, randOffset);

		const lenA = vecLen(a, b)
		const lenB = vecLen(a, c)
		const area = (lenA + lenB) / 2

		console.log(depth);
		if ((Math.random() > 0.5) && (depth < 850)) {
			return
		}

		if (area < cutOff) {
			depth--;
			let color;
			if (seed) {
				color = `hsl(${Math.random() > 0.5 ? '30' : '80'}, 100%, ${depth % 70}%)`;
			}
			else if (seed2) {
				color = `hsl(${Math.random() > 0.5 ? '5' : '190'}, 100%, ${depth % 70}%)`;
			}
			else if (!seed2) {
				color = `hsl(${Math.random() > 0.5 ? '270' : '60'}, 100%, ${depth % 70}%)`;
			} else {
				color = `hsl(${Math.random() > 0.5 ? '150' : '210'}, 100%, ${depth % 70}%)`;
			}
			drawTriangle(a.x, a.y, b.x, b.y, c.x, c.y, color);
			return
		}

		triangulate(a, e, d);
		triangulate(e, b, f);
		triangulate(d, f, c);
		triangulate(d, e, f);
	};

	const a = {'x': 0, 'y': 0};
	const b = {'x': W, 'y': 0};
	const c = {'x': W, 'y': H};
	const d = {'x': 0, 'y': H};

	triangulate(a, b, c);
	depth = 1000;
	triangulate(a, c, d);

})();
