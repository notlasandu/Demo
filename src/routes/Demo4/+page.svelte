<script>
	import { onMount } from 'svelte';

	const sequence = [
		{ text: 'I wanna da', duration: 0.9 },
		{ text: 'I wanna dance in the lights', duration: 2 },
		{ text: 'I wanna ro-', duration: 1.6 },
		{ text: 'I wanna rock your body', duration: 2.3 },
		{ text: 'I wanna go', duration: 1.1 },
		{ text: 'I wanna go for a ride', duration: 2.1 },
		{ text: 'Hop in the music and', duration: 2.2 },
		{ text: 'Rock your body', duration: 2 },
		{ text: 'Rock that body', duration: 1 },
		{ text: 'come on,', duration: 0.4 },
		{ text: 'come on, come on', duration: 0.4 },
		{ text: 'Rock that body', duration: 1.1 },
		{ text: '(Rock your body)', duration: 1.3 },
		{ text: 'Rock that body', duration: 1.3 },
		{ text: 'come on, come on', duration: 1 },
		{ text: 'Rock that body', duration: 2 }
	];

	const total = sequence.reduce((s, x) => s + x.duration, 0);

	let running = false;
	let time = 0;
	let tick = null;
	let lastTs = 0;
	let currentIndex = -1;

	function start() {
		if (tick) return;
		lastTs = performance.now();
		tick = setInterval(() => {
			if (!running) {
				lastTs = performance.now();
				return;
			}

			const now = performance.now();
			const delta = (now - lastTs) / 1000;
			lastTs = now;
			time += delta;

			if (time >= total) {
				time = total;
				running = false;
				console.clear();
				console.log('Again?');
				return;
			}

			let acc = 0;
			let idx = 0;
			for (let i = 0; i < sequence.length; i++) {
				acc += sequence[i].duration;
				if (time < acc) {
					idx = i;
					break;
				}
			}

			if (idx !== currentIndex) {
				currentIndex = idx;
				const text = sequence[currentIndex].text;

				let i = 0;
				const interval = setInterval(() => {
					console.clear();
					console.log(text.slice(0, i + 1));
					i++;

					if (i === text.length) {
						clearInterval(interval);
					}
				}, 75); // 100ms delay between letters
			}
		}, 100);
	}

	function stop() {
		if (tick) {
			clearInterval(tick);
			tick = null;
		}
	}

	onMount(() => {
		start();
		return stop;
	});

	// derived UI helpers (no modulo now)
	$: activeIndex = (() => {
		let acc = 0;
		for (let i = 0; i < sequence.length; i++) {
			acc += sequence[i].duration;
			if (time < acc) return i;
		}
		return sequence.length - 1;
	})();
	$: active = sequence[activeIndex];
</script>

<!-- Canvas -->
<div class="relative h-screen w-screen overflow-hidden bg-black">
	<!-- HUD time (centiseconds label kept similar to yours) -->
	<!-- <div class="absolute bottom-4 left-4 font-mono text-sm tracking-wide text-white/70">
    {Math.round(time * 100)}ms
  </div> -->

	<!-- Controls -->
	<div class="absolute right-4 bottom-4 flex items-center gap-2">
		<button
			disabled={time >= total}
			class="z-10 rounded-full bg-white p-2 font-semibold text-black shadow-lg transition hover:scale-[1.03] active:scale-95 disabled:opacity-50"
			on:click={() => (running = !running)}
			aria-label={running ? 'Pause' : 'Play'}
		>
			{#if running}
				<svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
					><path d="M6 5h4v14H6zm8 0h4v14h-4z" /></svg
				>
			{:else}
				<svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
					><path d="M8 5v14l11-7-11-7z" /></svg
				>
			{/if}
		</button>
	</div>
	{#if running === false && time === 0}
		<button on:click={() => (running = true)} class="absolute inset-0 grid place-items-center">
			<h2 class="animate-pulse text-center text-5xl font-semibold text-white md:text-4xl">
				Press any where to start
			</h2>
		</button>
	{:else if time >= total && time - total < 0.05}
		<section class="absolute inset-0 grid place-items-center">
			<button
				on:click={() => {
					running = true;
					time = 0;
				}}
				class="text-center text-5xl font-semibold text-white transition-colors duration-300 hover:text-blue-500 md:text-4xl"
				>Again?</button
			>
		</section>
	{:else}
		<!-- 2) render based on the *active* segment from the shared sequence -->
		{#if active.text === 'Now'}
			<section class="absolute inset-0 grid place-items-center">
				<h1 class="text-center text-5xl font-bold text-white md:text-7xl">Now</h1>
			</section>
		{:else if active.text === 'or'}
			<section class="absolute inset-0 grid place-items-center bg-white">
				<h1 class="text-center text-5xl font-bold text-black md:text-7xl">or</h1>
			</section>
		{:else if active.text === 'never'}
			<section class="absolute inset-0 grid place-items-center">
				<h1 class="text-center text-5xl font-bold text-white md:text-7xl">never</h1>
			</section>
		{/if}

		<!-- 3) loop control: when the sequence completes once, show restart UI -->
	{/if}
</div>
