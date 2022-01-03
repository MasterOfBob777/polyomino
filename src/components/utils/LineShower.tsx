export function LineShower() {
	return (
		<div
			id="lineshower"
			style="
				font-size: 2.5em;
				transform: translate(0, 9em);
				display: none;
			"
		>
			<img id="linevector" src="./assets/linevector.svg" />
			<p
				id="ivalue"
				style={`
					margin: 0px;
					text-align: center;
					font-family: 'Roboto Mono';
					font-weight: 200;
				`}
			>
				0
			</p>
		</div>
	);
}
