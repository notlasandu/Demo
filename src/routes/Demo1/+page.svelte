<script>
	let x = 0;
	let y = 0;
	let box = false;
	let startX = 0;
	let startY = 0;
	let width = 0;
	let height = 0;
	let endX = 0;
	let endY = 0;

	function handleMouseMove(event) {
		x = event.clientX - 15;
		y = event.clientY - 15;

		if (box) {
			width = x - startX;
			height = y - startY;

			// normalize for negative drag
			endX = width < 0 ? startX + width : startX;
			endY = height < 0 ? startY + height : startY;
		}
	}

	function createBox() {
		box = true;
		startX = x;
		startY = y;
		endX = startX;
		endY = startY;
	}
	function destroyBox() {
		box = false;
		width = 0;
		height = 0;
	}
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<div class="relative h-screen overflow-hidden bg-purple-200 p-4">
	<div
		role="main"
		class="relative h-full cursor-crosshair overflow-clip rounded-xl bg-white select-none"
		on:mousemove={handleMouseMove}
		on:mousedown={createBox}
		on:mouseup={destroyBox}
        on:mouseleave={destroyBox}
	>
		<div class="absolute" style="left:{x}px; top:{y}px;">
			<div
				class="absolute {width < 0 ? 'right-0' : 'left-0'} 
                {height < 0 ? 'bottom-0' : 'top-0'}  flex flex-col p-4"
			>
				<p class="truncate">(x : {x}, y : {y})</p>
				{#if box}
					<p class="truncate">(w : {Math.abs(width)}, h : {Math.abs(height)})</p>
				{/if}
			</div>
		</div>
		<div
			class="absolute inset-0 bg-[repeating-linear-gradient(to_right,rgba(0,0,0,0.1)_0_1px,transparent_1px_20%)] bg-[length:20%_100%]"
		></div>
		<div
			class="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(0,0,0,0.1)_0_1px,transparent_1px_20%)] bg-[length:100%_20%]"
		></div>

		<div
			class="absolute rounded-md bg-purple-500/50 {box
				? ''
				: 'opacity-0'} transition-all duration-300 ease-out"
			style="
				left:{endX}px;
				top:{endY}px;
				width:{Math.abs(width)}px;
				height:{Math.abs(height)}px;
			"
		></div>
	</div>
</div>
