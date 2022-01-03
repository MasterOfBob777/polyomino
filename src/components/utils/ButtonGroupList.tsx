import { useState } from "preact/hooks";

interface ButtonGroupListProps {
	onClick: (index: number) => void;
	data: string[];
	selected: number;
}

export function ButtonGroupList({ onClick, data, selected }: ButtonGroupListProps) {
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
