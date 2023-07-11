import { SectionMiddle } from "./center/SectionMiddle";
import { SectionLeft } from "./left/SectionLeft";
import { SectionRight } from "./right/SectionRight";

export default function MainComponent() {
	return (
		<>
		{/* TODO: Flex layout */}
			<SectionLeft />

			<SectionMiddle />

			<SectionRight />
		</>
	);
}
