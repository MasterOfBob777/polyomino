// WebGL2 - 2D Rectangles
// from https://webgl2fundamentals.org/webgl/webgl-2d-rectangles.html

"use strict";

const vertexShaderSource = /*glsl*/`#version 300 es
	
	// an attribute is an input (in) to a vertex shader.
	// It will receive data from a buffer
	in vec2 a_position;
	
	// Used to pass in the resolution of the canvas
	uniform vec2 u_resolution;
	
	// all shaders have a main function
	void main() {
		// convert the position from pixels to 0.0 to 1.0
		vec2 zeroToOne = a_position / u_resolution;
		
		// convert from 0->1 to 0->2
		vec2 zeroToTwo = zeroToOne * 2.0;
		
		// convert from 0->2 to -1->+1 (clipspace)
		vec2 clipSpace = zeroToTwo - 1.0;
		
		gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
	}
`;

const fragmentShaderSource = /*glsl*/`#version 300 es
	
	precision highp float;
	
	uniform vec4 u_color;
	
	// we need to declare an output for the fragment shader
	out vec4 outColor;
	
	void main() {
	 	outColor = u_color;
	}
`;

const board = {
	width: 10,
	height: 21,
};
const gameData = Array(board.height * board.width).fill(0);

const rgbTo1_0 = (v) => v.map((v) => v / 255);

const Mino = {
	None: 0,
	I: 1,
	L: 2,
	J: 3,
	T: 4,
	S: 5,
	Z: 6,
	O: 7,
};

const colors = {
	[Mino.None]: rgbTo1_0([0, 0, 0]),
	[Mino.I]: rgbTo1_0([15, 155, 215]),
	[Mino.L]: rgbTo1_0([227, 91, 2]),
	[Mino.J]: rgbTo1_0([33, 65, 198]),
	[Mino.T]: rgbTo1_0([175, 41, 138]),
	[Mino.S]: rgbTo1_0([89, 177, 1]),
	[Mino.Z]: rgbTo1_0([215, 15, 55]),
	[Mino.O]: rgbTo1_0([227, 159, 2]),
};

const pieceData = {
	[Mino.I]: {
		draw: [+1, +1, +1, +1, -1, -1, -1, -1, -1, -1, -1, -1],
		width: 4,
		height: 1,
	},
	[Mino.L]: {
		draw: [-1, -1, +2, -1, +2, +2, +2, -1, -1, -1, -1, -1],
		width: 3,
		height: 2,
	},
	[Mino.J]: {
		draw: [+3, -1, -1, -1, +3, +3, +3, -1, -1, -1, -1, -1],
		width: 3,
		height: 2,
	},
	[Mino.T]: {
		draw: [-1, +4, -1, -1, +4, +4, +4, -1, -1, -1, -1, -1],
		width: 3,
		height: 2,
	},
	[Mino.S]: {
		draw: [+5, +5, -1, -1, -1, +5, +5, -1, -1, -1, -1, -1, -1],
		width: 3,
		height: 2,
	},
	[Mino.Z]: {
		draw: [-1, +6, +6, -1, +6, +6, -1, -1, -1, -1, -1, -1, -1],
		width: 3,
		height: 2,
	},
	[Mino.O]: {
		draw: [+7, +7, -1, -1, +7, +7, -1, -1, -1, -1, -1, -1, -1],
		width: 2,
		height: 2,
	},
};

let currentPiece = randomPiece();

function main() {
	// Get A WebGL context
	var canvas = document.querySelector("#c");
	var gl = canvas.getContext("webgl2");
	if (!gl) {
		return;
	}

	// Use our boilerplate utils to compile the shaders and link into a program
	var program = webglUtils.createProgramFromSources(gl, [
		vertexShaderSource,
		fragmentShaderSource,
	]);

	// look up where the vertex data needs to go.
	var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

	// look up uniform locations
	var resolutionUniformLocation = gl.getUniformLocation(
		program,
		"u_resolution"
	);
	var colorLocation = gl.getUniformLocation(program, "u_color");

	// Create a buffer
	var positionBuffer = gl.createBuffer();

	// Create a vertex array object (attribute state)
	var vao = gl.createVertexArray();

	// and make it the one we're currently working with
	gl.bindVertexArray(vao);

	// Turn on the attribute
	gl.enableVertexAttribArray(positionAttributeLocation);

	// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

	// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
	var size = 2; // 2 components per iteration
	var type = gl.FLOAT; // the data is 32bit floats
	var normalize = false; // don't normalize the data
	var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
	var offset = 0; // start at the beginning of the buffer
	gl.vertexAttribPointer(
		positionAttributeLocation,
		size,
		type,
		normalize,
		stride,
		offset
	);

	webglUtils.resizeCanvasToDisplaySize(gl.canvas);
	function render(time) {
		// Tell WebGL how to convert from clip space to pixels
		gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

		// Clear the canvas
		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		// Tell it to use our program (pair of shaders)
		gl.useProgram(program);

		// Bind the attribute/buffer set we want.
		gl.bindVertexArray(vao);

		// Pass in the canvas resolution so we can convert from
		// pixels to clipspace in the shader
		gl.uniform2f(
			resolutionUniformLocation,
			gl.canvas.width,
			gl.canvas.height
		);

		remove3x4(
			pieceData[currentPiece.type].draw,
			currentPiece.lastX,
			currentPiece.lastY
		);
		draw3x4(
			pieceData[currentPiece.type].draw,
			currentPiece.x,
			currentPiece.y
		);
		currentPiece.lastX = currentPiece.x;
		currentPiece.lastY = currentPiece.y;

		for (let x = 0; x < board.width; ++x) {
			for (let y = 0; y < board.height; ++y) {
				// Put a rectangle in the position buffer
				setRectangle(gl, x * 16, y * 16, 16, 16);

				const rgb = colors[gameData[y * board.width + x]];
				// Set a random color.
				gl.uniform4f(colorLocation, rgb[0], rgb[1], rgb[2], 1);

				// Draw the rectangle.
				let primitiveType = gl.TRIANGLES;
				let offset = 0;
				let count = 6;
				gl.drawArrays(primitiveType, offset, count);
			}
		}
		setTimeout(() => {
			window.requestAnimationFrame(render);
		}, 50);
	}

	render(0);
}

// Returns a random integer from 1 to range - 1.
function randomInt(range) {
	return Math.floor(Math.random() * range + 1);
}

// Fill the buffer with the values that define a rectangle.
function setRectangle(gl, x, y, width, height) {
	var x1 = x;
	var x2 = x + width;
	var y1 = y;
	var y2 = y + height;
	gl.bufferData(
		gl.ARRAY_BUFFER,
		new Float32Array([x1, y1, x2, y1, x1, y2, x1, y2, x2, y1, x2, y2]),
		gl.STATIC_DRAW
	);
}

main();

function getXY(x, y) {
	return gameData[y * board.width + x];
}

function drawXY(n, x, y) {
	gameData[y * board.width + x] = n;
}

function draw3x4(data, x, y) {
	data[0] !== -1 && drawXY(data[0], x + 0, y + 0);
	data[1] !== -1 && drawXY(data[1], x + 1, y + 0);
	data[2] !== -1 && drawXY(data[2], x + 2, y + 0);
	data[3] !== -1 && drawXY(data[3], x + 3, y + 0);
	data[4] !== -1 && drawXY(data[4], x + 0, y + 1);
	data[5] !== -1 && drawXY(data[5], x + 1, y + 1);
	data[6] !== -1 && drawXY(data[6], x + 2, y + 1);
	data[7] !== -1 && drawXY(data[7], x + 3, y + 1);
	data[8] !== -1 && drawXY(data[8], x + 0, y + 2);
	data[9] !== -1 && drawXY(data[9], x + 1, y + 2);
	data[10] !== -1 && drawXY(data[10], x + 2, y + 2);
	data[11] !== -1 && drawXY(data[11], x + 3, y + 2);
}

function remove3x4(data, x, y) {
	data[0] !== -1 && drawXY(0, x + 0, y + 0);
	data[1] !== -1 && drawXY(0, x + 1, y + 0);
	data[2] !== -1 && drawXY(0, x + 2, y + 0);
	data[3] !== -1 && drawXY(0, x + 3, y + 0);
	data[4] !== -1 && drawXY(0, x + 0, y + 1);
	data[5] !== -1 && drawXY(0, x + 1, y + 1);
	data[6] !== -1 && drawXY(0, x + 2, y + 1);
	data[7] !== -1 && drawXY(0, x + 3, y + 1);
	data[8] !== -1 && drawXY(0, x + 0, y + 2);
	data[9] !== -1 && drawXY(0, x + 1, y + 2);
	data[10] !== -1 && drawXY(0, x + 2, y + 2);
	data[11] !== -1 && drawXY(0, x + 3, y + 2);
}

function clamp(n, min, max) {
	return Math.min(Math.max(n, min), max);
}

function randomPiece() {
	return {
		type: randomInt(7),
		x: 3,
		y: 0,
		lastX: 3,
		lastY: 0,
	};
}

let lockdelay = 0;

function loop(time = 0) {
	if (time % 20 === 0) {
		currentPiece.y = clamp(
			currentPiece.y + 1,
			0,
			board.height - pieceData[currentPiece.type].height
		);
		const minoBelow = getXY(
			currentPiece.x,
			currentPiece.y + pieceData[currentPiece.type].height
		);
		if (minoBelow !== 0) {
			lockdelay++;
		}
		if (lockdelay > 2) {
			lockdelay = 0;
			currentPiece = randomPiece();
		}
	}
	setTimeout(() => loop(time + 1), 50);
}
loop();

const keys = {
	left: "ArrowLeft",
	right: "ArrowRight",
	hardDrop: "ArrowUp",
	softDrop: "ArrowDown",
	rotateClockwise: "KeyX",
	rotateCounterClockwise: "KeyZ",
	rotate180: "KeyC",
	hold: "Space",
};

let currentKey;

document.addEventListener("keydown", (e) => {
	currentKey = e.code;
});

document.addEventListener("keyup", (e) => {
	currentKey = undefined;
});

function keyLoop() {
	switch (currentKey) {
		case keys.left:
			currentPiece.x--;
			break;
		case keys.right:
			currentPiece.x++;
			break;
		case keys.hardDrop:
			while (
				currentPiece.y + pieceData[currentPiece.type].height <
					board.height &&
				getXY(
					currentPiece.x,
					currentPiece.y + pieceData[currentPiece.type].height
				) !== 0
			) {
				currentPiece.y++;
			}
			break;
		case keys.softDrop:
			currentPiece.y++;
			break;
		case keys.rotateClockwise:
			break;
		case keys.rotateCounterClockwise:
			break;
		case keys.rotate180:
			break;
		case keys.hold:
			break;
		default:
			break;
	}

	currentPiece.x = clamp(
		currentPiece.x,
		0,
		board.width - pieceData[currentPiece.type].width
	);
	currentPiece.y = clamp(
		currentPiece.y,
		0,
		board.height - pieceData[currentPiece.type].height
	);
	setTimeout(keyLoop, 100);
}
keyLoop();
