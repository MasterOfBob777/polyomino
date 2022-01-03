module.exports = (grunt) => require("@masterofbob777/grunt-config")(grunt, {
	configs: { platform: "browser", target: "chrome96" },
	options: { typescript: true, jsx: true,  },
	general: { indir: "src", outdir: "build", entry: "main" },
});
