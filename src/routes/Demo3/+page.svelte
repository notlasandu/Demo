<script>
	let ballX = 0;
	let ballY = 0;
	let objectX = 0;
	let objectY = 0;
	let moving = false;
	let divEl;

	function moveBall(event) {
		if (!moving) return;
		ballX = event.clientX;
		ballY = event.clientY;
	}

	function moveObject() {
		if (!moving) return;

		const rect = divEl.getBoundingClientRect();
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
			newX = x - dx * 2;
		}
		if (rect.top + dy < 0 || rect.bottom + dy > window.innerHeight) {
			newY = y - dy * 2;
		}

		objectX = newX;
		objectY = newY;
	}
</script>

<div
	class="relative h-screen bg-purple-200"
	on:mouseup={(moving = false)}
	on:mouseleave={(moving = false)}
	on:mousemove={moveBall}
>
	<div
		on:mousedown={(moving = true)}
		class="absolute h-8 w-8 rounded-lg bg-purple-800 transition-all ease-out z-10"
		style="left:{ballX}px; top:{ballY}px;"
	></div>
	<div bind:this={divEl} class="absolute p-10 transition-all ease-out" on:mouseenter={moveObject} style="left:{objectX}px; top:{objectY}px;">
		<div class="h-28 w-12 rounded-lg bg-green-400"></div>
	</div>
	<div class="absolute text-center left-1/2 bottom-20">
	<p>Ball (x = {ballX}, y = {ballY})</p>
	<p>Object (x = {objectX}, y = {objectY})</p>
	</div>
</div>
