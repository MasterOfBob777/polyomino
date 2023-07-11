const ids = {
	"rising-arrow": <>&#xE8E5;</>,
	wrench: <>&#xE869;</>,
	dpad: <>&#xE021;</>,
	replay: <>&#xE04A;</>,
	left: <>&#xE5C4;</>,
	right: <>&#xE5C8;</>,
	"soft-drop": <>&#xE906;</>,
	"hard-drop": <>&#xE2C4;</>,
	hold: <>&#xE8D4;</>,
	"rot-right": <>&#xE15A;</>,
	"rot-left": <>&#xE166;</>,
	"rot-180": <>&#xE5D5;</>,
	retry: <>&#xE040;</>,
	pause: <>&#xE034;</>,
} as const;

export function Icon({ id }: { id: keyof typeof ids }) {
	return <i class="material-icons">{ids[id]}</i>;
}
