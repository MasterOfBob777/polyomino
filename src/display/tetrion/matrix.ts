import { settings } from "../../settings";
import { $ } from "../../utils/utils";

export const matrix = {
	position: {
		horizontal: 0,
		vertical: 0,
	},
	velocity: {
		right: 0,
		left: 0,
		down: 0,
	},
};

export enum MatrixDir {
	RIGHT,
	LEFT,
	DOWN,
}

export enum MatrixPosition {
	HORIZONTAL = "horizontal",
	VERTICAL = "vertical",
}

export function shiftMatrix(direction: MatrixDir) {
	if (settings.MatrixSway) {
		if (direction === MatrixDir.RIGHT) {
			matrix.velocity.left = 0;
			matrix.velocity.right = 1;
		} else if (direction === MatrixDir.LEFT) {
			matrix.velocity.right = 0;
			matrix.velocity.left = 1;
		} else if (direction === MatrixDir.DOWN) {
			matrix.velocity.down = 1;
		}
	}
}

export enum Sign {
	POSITIVE = 1,
	NEGATIVE = -1,
}

export function matrixReturn(
	direction: MatrixDir,
	type: MatrixPosition,
	sign: Sign
) {
	const { velocity, position } = matrix;
	if (velocity[direction] > 1) {
		velocity[direction] = 1;
	}
	if (position[type] < 0.5 && position[type] > -0.5) {
		position[type] += sign * 0.2;
	}
	velocity[direction] -= 0.2;
	if (velocity[direction] < 0) {
		velocity[direction] = 0;
	}
}

export function updateMatrixPosition() {
	if (matrix.velocity.right === 0 && matrix.velocity.left === 0) {
		matrix.position.horizontal /= 1.1;
	} else if (matrix.velocity.right !== 0) {
		matrixReturn(MatrixDir.RIGHT, MatrixPosition.HORIZONTAL, Sign.POSITIVE);
	} else if (matrix.velocity.left !== 0) {
		matrixReturn(MatrixDir.LEFT, MatrixPosition.HORIZONTAL, Sign.NEGATIVE);
	}

	if (matrix.velocity.down === 0) {
		matrix.position.vertical /= 1.1;
	} else {
		matrixReturn(MatrixDir.DOWN, MatrixPosition.VERTICAL, Sign.POSITIVE);
	}
	if (Math.abs(matrix.position.horizontal) < 0.01) {
		matrix.position.horizontal = 0;
	}
	if (matrix.position.vertical < 0.01) {
		matrix.position.vertical = 0;
	}

	$("b").style.transform = `translate(${matrix.position.horizontal / 3}em, ${
		matrix.position.vertical / 3
	}em)`;
	// elements.statsDiv.style.transform = "translate(" + matrix.position.horizontal + "em, " + matrix.position.vertical + "em)"
}
