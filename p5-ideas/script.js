import p5 from 'p5';

const s = (sketch) => {

	sketch.setup = () => {
		sketch.createCanvas(500, 500);
	};

	sketch.draw = () => {
		sketch.background(0);
		sketch.fill(255);
	};
};

let myp5 = new p5(s);
