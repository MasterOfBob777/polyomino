import { menu } from "../../display/menu";
import { t } from "../../utils/lang";
import { Btn } from "../utils/Btn";
import { Icon } from "../utils/Icon";

export function MainMenu() {
	return (
		<nav class="menu on">
			{/*
			<img
				class="no-margin"
				width="72%"
				src="tetrjslogoenhanced.svg"
			/> 
			*/}
			<h1 style="font-weight: 4; font-size: 2rem; margin: 0px">
				Polyomino
			</h1>
			<p class="no-margin">
				{/*
				<a class="link" href="changelog.html">
					(view changelog)
				</a>
				*/}
			</p>

			<div class="btn-container no-margin">
				<a
					class="btn btn-inline"
					target="_blank"
					rel="noreferrer"
					href="javascript:void(0)"
					style="margin-bottom: 1.1em"
				>
					Discord
				</a>

				<Btn click={() => menu(9, 1)}>
					<Icon id="rising-arrow" />
					{t("game-sprint")}
				</Btn>
				<Btn click={() => menu(10, 1)}>
					<Icon id="rising-arrow" />
					{t("game-marathon")}
				</Btn>
				<Btn click={() => menu(11, 1)}>
					<Icon id="rising-arrow" />
					{t("game-master")}
				</Btn>
				<Btn click={() => menu(8, 1)}>
					<Icon id="rising-arrow" />
					{t("game-retro")}
				</Btn>
				<Btn click={() => menu(7, 1)}>
					<Icon id="rising-arrow" />
					{t("game-dig")}
				</Btn>
				<Btn click={() => menu(16, 1)}>
					<Icon id="rising-arrow" />
					{t("game-survival")}
				</Btn>
				<Btn click={() => menu(17, 1)} class="margin-bottom-1-1">
					<Icon id="rising-arrow" />
					{t("game-grades")}
				</Btn>
				<Btn click={() => menu(2)}>
					<Icon id="dpad" />
					{t("menu-controls")}
				</Btn>
				<Btn click={() => menu(12)}>
					<Icon id="wrench" />
					{t("menu-settings")}
				</Btn>
				<Btn click={() => menu(6, 1)}>
					<Icon id="replay" />
					{t("menu-replay")}
				</Btn>
			</div>
		</nav>
	);
}
