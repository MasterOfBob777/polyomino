export function Btn({ click, children, class: clazz = "" }) {
	return (
		<a class={"btn " + clazz} onClick={click}>
			{children}
		</a>
	);
}
