<script>
	let pin = '';
	let pw = '1234';
	let x = -20;
	let y = -20;
	let buttonEl;
	let filled = false;
	let correct = false;
	let success = false;
	let moving = false;

	function check(event) {
		resetButton();
		if (pin.length === 4) {
			filled = true;
			pin === pw ? (correct = true) : (correct = false);
		} else {
			filled = false;
		}
	}
	let rect;
	function moveButton(event) {
		if (correct || !filled) return;
		moving = true;
		const rect = buttonEl.getBoundingClientRect();
		const mouseX = event.clientX;
		const mouseY = event.clientY;

		const distLeft = Math.abs(mouseX - rect.left);
		const distRight = Math.abs(mouseX - rect.right);
		const distTop = Math.abs(mouseY - rect.top);
		const distBottom = Math.abs(mouseY - rect.bottom);

		const minDist = Math.min(distLeft, distRight, distTop, distBottom);

		let dx = 0;
		let dy = 0;

		if (minDist === distLeft) {
			dx = 15;
		} else if (minDist === distRight) {
			dx = -15;
		} else if (minDist === distTop) {
			dy = 15;
		} else {
			dy = -15;
		}

		// prospective new pos
		let newX = x + dx;
		let newY = y + dy;

		// viewport bounds (minus button size so it stays fully visible)
		const maxX = window.innerWidth - rect.width;
		const maxY = window.innerHeight - rect.height;

		// rect.left/top are current screen coords,
		// but your x/y are relative offset, so adjust with rect
		if (rect.left + dx < 0 || rect.right + dx > window.innerWidth) {
			// would overflow → push opposite
			newX = x - dx * 2; // 30 in opposite
		}
		if (rect.top + dy < 0 || rect.bottom + dy > window.innerHeight) {
			newY = y - dy * 2;
		}

		x = newX;
		y = newY;
	}

	function resetButton() {
		x = -20;
		y = -20;
	}
</script>

<div class="flex h-screen w-screen items-center justify-center bg-purple-400">
	<div
		class="relative flex flex-col items-center justify-center gap-4 rounded-xl bg-white p-10 transition-shadow duration-300 focus-within:shadow-xl"
	>
		<h1 class="text-center text-gray-600">Enter PIN</h1>

		<!-- svelte-ignore a11y_autofocus -->
		<input
			autofocus
			type="text"
			placeholder="0000"
			maxlength="4"
			bind:value={pin}
			on:input={check}
			class=" rounded-lg border border-black/30 bg-transparent p-2 text-center focus:ring-purple-700 focus:outline-purple-700"
		/>
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="absolute -right-5 bottom-2 p-3" on:mousemove={moveButton} on:mouseleave={() => (moving = false)}>
			<button
				on:click={(success = true)}
				bind:this={buttonEl}
				disabled={!filled}
				aria-label="Submit"
				class="absolute w-fit rounded-lg {success && correct
					? 'bg-green-300 text-black'
					: 'bg-purple-950 text-white'} {correct
					? ' cursor-pointer'
					: ''} {moving? 'bg-purple-800 text-white':''} p-2 shadow-lg transition-all ease-out select-none disabled:text-white disabled:bg-purple-500"
				style="left:{x}px; top:{y}px;"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					class="h-6 w-6"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>
			</button>
		</div>
	</div>
	<div class="absolute bottom-10 left-1/2">
		<p>{rect ? rect.left : ''}</p>
	</div>
</div>
