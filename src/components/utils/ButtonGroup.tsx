import { useState } from "preact/hooks";

interface ButtonGroupProps {
	onClick: (index: number) => void;
	data: string[];
	selected: number;
}

export function ButtonGroup({ onClick, data, selected }: ButtonGroupProps) {
	const [selectedIndex, setSelectedIndex] = useState(selected);

	return (
		<div class="btn-group">
			{data.map((item, index) => (
				<button
					key={index}
					onClick={() => {
						onClick(index);
						setSelectedIndex(index);
					}}
					{...(selectedIndex == index ? { class: "active" } : {})}
				>
					{item}
				</button>
			))}
		</div>
	);
}
