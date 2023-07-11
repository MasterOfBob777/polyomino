import { create, all, factory } from "mathjs";

export const safeMath = create(all);

function disable(name) {
	return () => {
		throw new Error(`Function ${name} is disabled`);
	};
}

declare module "mathjs" {
	interface MathJsStatic {
		BigInt(a: number): boolean;
		bigint(a: number | string): bigint;
	}
}

safeMath.import(
	[
		factory(
			"BigInt",
			["typed"],
			function createBigInt({ typed }) {
				(typed as typeof typed & { addType: any }).addType({
					name: "BigInt",
					test: (x) => typeof x === "bigint",
				});

				return BigInt;
			},
			{ lazy: false }
		),

		factory(
			"bigint",
			["typed", "BigInt"],
			function createBigint({ typed, BigInt }) {
				return typed!("bigint", {
					"number | string ": (x) => BigInt!(x),
				});
			}
		),

		factory("add", ["typed"], function createBigIntAdd({ typed }) {
			return typed!("add", {
				"BigInt, BigInt": (a, b) => a + b,
			});
		}),

		factory("pow", ["typed"], function createBigIntPow({ typed }) {
			return typed!("pow", {
				"BigInt, BigInt": (a, b) => a ** b,
			});
		}),
	],
	{}
);

safeMath.import(
	{
		import: disable("import"),
		createUnit: disable("createUnit"),
		simplify: disable("simplify"),
		derivative: disable("derivative"),
	},
	{ override: true }
);
