export function Stats({ }) {
	return (
		<table id="stats">
			<tr id="nesratetr" class="gone">
				<th class="white-border-span" style="font-size: 0.5em">
					<b>Tetris</b> Rate
				</th>
				<td id="nesrate">0</td>
			</tr>
			<tr>
				<th id="score-label" class="white-border-span">
					Score
				</th>
				<td id="score">0</td>
				<td id="nesscore">0</td>
			</tr>
			<tr>
				<th id="level" class="white-border-span" />
				<th id="strict-ind">STRICT MODE</th>
			</tr>

			<tr>
				<th class="white-border-span">Lines</th>
				<td id="levelline">
					<div id="promode" />
					<div id="line">0</div>
				</td>
			</tr>
			<tr>
				<th class="white-border-span">Pieces</th>
				<td id="piece">0</td>
			</tr>
			<tr>
				<th id="time">
					<canvas />
				</th>
			</tr>
		</table>
	);
}
