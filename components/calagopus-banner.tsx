export default function CalagopusBanner() {
	return (
		<section className="w-full px-4 pt-4">
			<div className="relative mx-auto flex w-full max-w-[900px] items-center overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0c] px-6 py-6 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_80px_rgba(0,0,0,0.45)] sm:px-8 sm:py-8 lg:h-[200px] lg:px-11">
				<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(116,192,252,0.03)_1px,transparent_1px)] bg-[size:100%_4px]" />
				<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(116,192,252,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,146,43,0.12),transparent_30%)]" />

				<div className="relative z-10 grid w-full gap-8 lg:grid-cols-[1fr_1.2fr_0.8fr] lg:items-center">
					<div className="flex flex-col">
						<svg
							className="mb-2 h-[65px] w-[65px] drop-shadow-[0_0_15px_rgba(116,192,252,0.85)]"
							viewBox="0 0 320 340"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								fill="#fff"
								d="M200.88 9.04811C208.817 8.05664 227.604 22.5785 238.94 35.0827C239.081 35.2383 239.288 35.3164 239.497 35.2973C247.127 34.6028 251.467 34.4353 258.306 35.2665C258.6 35.3021 258.885 35.1407 258.998 34.8678C260.371 31.5572 260.173 30.3128 268.456 22.3544C277.112 14.038 288.43 9.38077 294.422 11.3767C300.414 13.3727 302.078 24.3503 301.413 38.6546C300.753 52.8253 299.523 57.8832 296.829 66.6806C296.78 66.8398 296.793 67.0145 296.862 67.1656C301.025 76.1761 298.422 86.5943 299.082 90.8816C299.748 95.2061 316.558 102.704 317.724 112.837C318.89 122.971 298.417 135.79 296.419 136.788C294.535 137.73 288.926 138.714 283.706 138.782C283.248 138.788 282.923 139.236 283.063 139.672C288.114 155.374 287.733 173.535 286.1 181.697C284.445 189.967 279.172 206.139 272.563 214.816C272.489 214.913 272.443 215.031 272.43 215.152C268.177 253.791 268.695 266.936 273.707 278.001C273.756 278.11 273.837 278.205 273.935 278.273C284.212 285.387 288.927 289.528 292.092 297.462L296.556 310.528C296.667 310.852 296.505 311.212 296.192 311.353C253.255 330.64 229.491 335.824 185.696 329.748C185.612 329.736 185.523 329.741 185.44 329.761C146.921 339.413 110.644 339.696 91.0252 327.401C71.3846 315.093 66.3913 301.454 67.057 290.809C67.7184 280.234 73.2924 266.926 86.109 256.747C86.2691 256.62 86.3645 256.426 86.3648 256.221C86.4243 218.644 104.408 181.63 127.643 158.078C150.869 134.538 154.828 134.489 175.047 114.697C175.172 114.574 175.248 114.398 175.251 114.223C175.558 95.1436 178.18 85.8305 186.132 71.4356C186.196 71.3192 186.226 71.1841 186.214 71.0515C183.553 40.9234 192.908 10.0438 200.88 9.04811Z"
							/>
						</svg>
						<h1 className="m-0 text-3xl font-black uppercase tracking-[-0.08em] sm:text-[34px]">CALAGOPUS</h1>
					</div>

					<div className="flex flex-col gap-4 border-white/10 lg:border-l lg:pl-9">
						<div className="flex items-baseline gap-2">
							<span className="text-[28px] font-black leading-none text-[#74C0FC]">32,800%</span>
							<span className="text-[11px] uppercase tracking-[0.18em] text-white/60">faster throughput</span>
						</div>

						<div className="inline-flex w-fit items-center gap-2 rounded-[4px] border border-[#ff922b]/30 bg-[#ff922b]/10 px-3 py-1.5">
							<span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#ff922b]">Rust</span>
							<span className="text-[10px] font-medium text-white/80">Memory-safe by design</span>
						</div>

						<div className="flex items-baseline gap-2">
							<span className="text-[18px] font-black leading-none text-[#74C0FC]">100%</span>
							<span className="text-[11px] uppercase tracking-[0.18em] text-white/60">Open Source</span>
						</div>
					</div>

					<div className="flex items-center justify-start lg:justify-end">
						<a
							href="https://calagopus.com"
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-[13px] font-extrabold uppercase tracking-[0.16em] text-black transition-transform duration-200 hover:scale-105 hover:bg-[#74C0FC]"
						>
							Join the vault
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}