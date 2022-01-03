import { guid } from "../../utils/random-id";

interface ProgressBarProps {
	id?: string;
	"label-id"?: string;
	value: number;
	max: number;
}

export default function ProgressBar({
	id,
	"label-id": labelId,
	value,
	max,
}: ProgressBarProps) {
	const eleId = id || `progress-bar-${guid(5)}`;

	return (
		<>
			{labelId && (
				<label id={labelId} for={eleId} style="display: block" />
			)}
			<progress id={eleId} value={value} max={max} />
		</>
	);
}