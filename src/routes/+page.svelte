<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	type Project = {
		title: string;
		description: string;
		tags: string[];
		href: string; // live demo
		repo?: string; // github
		image?: string; // optional image url
	};

	// --- Demo data: replace with your own projects ---
	const projects: Project[] = [
		{
			title: 'Realtime Notes',
			description:
				'Collaborative note-taking with OT, presence, and offline sync. Built with SvelteKit + WebSockets.',
			tags: ['SvelteKit', 'WebSocket', 'Prisma', 'SQLite'],
			href: 'https://example.com/notes',
			repo: 'https://github.com/you/realtime-notes'
		},
		{
			title: 'Image Diffusion Sandbox',
			description: 'Local-first playground for promptable image pipelines with shareable states.',
			tags: ['Vite', 'Web Workers', 'Canvas'],
			href: 'https://example.com/diffusion',
			repo: 'https://github.com/you/diffusion-sandbox'
		},
		{
			title: 'API Uptime Monitor',
			description: 'Lightweight status page & monitor with incident history and latency charts.',
			tags: ['SvelteKit', 'Cron', 'Tailwind', 'Charts'],
			href: 'https://example.com/uptime',
			repo: 'https://github.com/you/uptime-monitor'
		},
		{
			title: 'Markdown Slides',
			description: 'Turn Markdown files into speaker-ready slides with hot reload & export.',
			tags: ['Svelte', 'MD', 'Hot Reload'],
			href: 'https://example.com/slides',
			repo: 'https://github.com/you/markdown-slides'
		}
	];

	let isDark = false;

	onMount(() => {
		// initialize theme
		isDark =
			localStorage.getItem('theme') === 'dark' ||
			(!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);

		document.documentElement.classList.toggle('dark', isDark);
	});

	function toggleTheme() {
		isDark = !isDark;
		document.documentElement.classList.toggle('dark', isDark);
		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	}

	const year = new Date().getFullYear();
</script>

<svelte:head>
	<title>Your Name — Demo Projects</title>
	<meta
		name="description"
		content="A focused collection of my demo projects, built with SvelteKit."
	/>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<!-- Page wrapper -->
<div
	class="min-h-screen bg-white text-gray-900 selection:bg-indigo-200 selection:text-indigo-900 dark:bg-gray-950 dark:text-gray-100 dark:selection:bg-indigo-400/30"
>
	<!-- Radial glow background -->
	<div aria-hidden="true" class="pointer-events-none fixed inset-0 overflow-hidden">
		<div
			class="absolute top-[-8rem] left-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-400 via-fuchsia-400 to-emerald-400 opacity-30 blur-3xl dark:opacity-20"
		></div>
	</div>

	<!-- Header -->
	<header
		class="sticky top-0 z-30 border-b border-black/5 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-white/10 dark:supports-[backdrop-filter]:bg-gray-950/50"
	>
		<div class="mx-auto max-w-7xl px-6">
			<div class="flex h-16 items-center justify-between">
				<a href="#top" class="inline-flex items-center gap-2 font-semibold tracking-tight">
					<span class="inline-block h-2.5 w-2.5 rounded-full bg-indigo-500"></span>
					<span class="text-sm sm:text-base">yourname.dev</span>
				</a>

				<nav class="hidden items-center gap-6 text-sm sm:flex">
					<a href="#projects" class="hover:text-indigo-600 dark:hover:text-indigo-400">Projects</a>
					<a href="#stack" class="hover:text-indigo-600 dark:hover:text-indigo-400">Stack</a>
					<a href="#contact" class="hover:text-indigo-600 dark:hover:text-indigo-400">Contact</a>
				</nav>

				<div class="flex items-center gap-3">
					<a
						href="https://github.com/you"
						class="rounded-md border border-black/10 px-3 py-1.5 text-sm transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
					>
						GitHub
					</a>
					<button
						on:click={toggleTheme}
						class="group inline-flex items-center gap-2 rounded-full border border-black/10 p-2 transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
						aria-label="Toggle theme"
					>
						<!-- Sun / Moon icon -->
						<svg
							class="block size-5 dark:hidden"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.6"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
							><circle cx="12" cy="12" r="4" /><path
								d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
							/></svg
						>
						<svg
							class="hidden size-5 dark:block"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="1.6"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg
						>
					</button>
				</div>
			</div>
		</div>
	</header>

	<main id="top" class="mx-auto max-w-7xl px-6">
		<!-- Hero -->
		<section class="relative py-20 sm:py-28">
			<div class="grid gap-10 lg:grid-cols-2 lg:items-center">
				<div in:fly={{ y: 12, duration: 350 }}>
					<h1 class="text-4xl font-extrabold tracking-tight sm:text-6xl">
						Build fast. Ship often.
					</h1>
					<p class="mt-4 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-300">
						Hi, I’m <span class="font-semibold">Your Name</span>. I prototype tools, utilities, and
						interfaces—then open-source the useful bits. Here are a few small but mighty demos.
					</p>
					<div class="mt-8 flex flex-wrap gap-3">
						<a
							href="#projects"
							class="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow transition hover:shadow-md active:scale-[.99]"
						>
							View Projects
						</a>
						<a
							href="mailto:you@domain.com"
							class="rounded-lg border border-black/10 px-5 py-3 text-sm font-medium transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
						>
							Get in touch
						</a>
					</div>
					<!-- Quick stats -->
					<div class="mt-10 flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-300">
						<div><span class="font-semibold text-gray-900 dark:text-white">12+</span> demos</div>
						<div>
							<span class="font-semibold text-gray-900 dark:text-white">100%</span> open-source
						</div>
						<div><span class="font-semibold text-gray-900 dark:text-white">Sub-20KB</span> CSS</div>
					</div>
				</div>

				<!-- Pretty placeholder visual -->
				<div class="relative isolate" in:fly={{ y: 12, duration: 400, delay: 70 }}>
					<div
						class="aspect-[4/3] w-full rounded-2xl border border-black/10 bg-gradient-to-br from-indigo-500/10 via-fuchsia-500/10 to-emerald-500/10 p-1 dark:border-white/10"
					>
						<div
							class="flex h-full w-full items-center justify-center rounded-[1rem] bg-white/60 backdrop-blur dark:bg-gray-900/60"
						>
							<div class="text-center">
								<div
									class="mx-auto grid h-16 w-16 place-items-center rounded-full border border-black/10 dark:border-white/10"
								>
									<svg
										class="size-7"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="1.6"><path d="M3 7h18M3 12h18M3 17h18" /></svg
									>
								</div>
								<p class="mt-4 text-sm text-gray-600 dark:text-gray-300">
									SvelteKit + Tailwind starter visual
								</p>
							</div>
						</div>
					</div>
					<div
						class="absolute -inset-x-4 -bottom-4 -z-10 h-24 rounded-b-2xl bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-emerald-500/20 opacity-50 blur-2xl"
					></div>
				</div>
			</div>
		</section>

		<!-- Projects -->
		<section id="projects" class="scroll-mt-24 py-8 sm:py-10">
			<h2 class="text-2xl font-bold tracking-tight sm:text-3xl">Demo Projects</h2>
			<p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
				Small, focused builds. Click through for a live demo or source.
			</p>

			<div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each projects as p (p.title)}
					<article
						class="group relative overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-gray-900"
						in:fly={{ y: 12, duration: 250 }}
					>
						<!-- Thumb -->
						<a rel="noopener noreferrer" target="_blank" href={p.href} class="block">
							<div class="relative aspect-video w-full overflow-hidden">
								{#if p.image}
									<img
										src={p.image}
										alt={`${p.title} preview`}
										class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
									/>
								{:else}
									<!-- gradient placeholder -->
									<div
										class="grid h-full w-full place-items-center bg-gradient-to-br from-indigo-500/15 via-fuchsia-500/15 to-emerald-500/15"
									>
										<svg
											class="size-10 opacity-60"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="1.6"
											><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 10h18" /></svg
										>
									</div>
								{/if}
								<div
									class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								></div>
								<div
									class="pointer-events-none absolute bottom-0 left-0 p-3 text-xs text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								>
									Live demo →
								</div>
							</div>
						</a>

						<!-- Body -->
						<div class="p-4">
							<h3 class="leading-tight font-semibold">{p.title}</h3>
							<p class="mt-1 line-clamp-3 text-sm text-gray-600 dark:text-gray-300">
								{p.description}
							</p>

							<ul class="mt-3 flex flex-wrap gap-1.5">
								{#each p.tags as tag}
									<li
										class="rounded-full border border-black/10 px-2 py-1 text-[11px] text-gray-700 dark:border-white/10 dark:text-gray-300"
									>
										{tag}
									</li>
								{/each}
							</ul>

							<div class="mt-4 flex items-center gap-2">
								<a
									rel="noopener noreferrer"
									target="_blank"
									href={p.href}
									class="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
								>
									Open
								</a>
								{#if p.repo}
									<span class="text-gray-400">·</span>
									<a
										rel="noopener noreferrer"
										target="_blank"
										href={p.repo}
										class="text-sm text-gray-600 hover:underline dark:text-gray-300"
									>
										Source
									</a>
								{/if}
							</div>
						</div>
					</article>
				{/each}
			</div>
		</section>

		<!-- Stack -->
		<section id="stack" class="scroll-mt-24 py-16">
			<h2 class="text-2xl font-bold tracking-tight sm:text-3xl">What I use</h2>
			<p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
				A small, reliable toolkit for rapid prototyping.
			</p>

			<div class="mt-6 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
				<div class="rounded-lg border border-black/10 p-4 dark:border-white/10">
					<div class="font-semibold">SvelteKit</div>
					<p class="mt-1 text-gray-600 dark:text-gray-300">
						End-to-end app framework with great DX and adapters.
					</p>
				</div>
				<div class="rounded-lg border border-black/10 p-4 dark:border-white/10">
					<div class="font-semibold">Tailwind</div>
					<p class="mt-1 text-gray-600 dark:text-gray-300">
						Utility-first styling. Fast, expressive, maintainable.
					</p>
				</div>
				<div class="rounded-lg border border-black/10 p-4 dark:border-white/10">
					<div class="font-semibold">TypeScript</div>
					<p class="mt-1 text-gray-600 dark:text-gray-300">
						Safer refactors and autocomplete everywhere.
					</p>
				</div>
				<div class="rounded-lg border border-black/10 p-4 dark:border-white/10">
					<div class="font-semibold">Prisma/SQLite</div>
					<p class="mt-1 text-gray-600 dark:text-gray-300">
						Simple local DB for quick demos & protos.
					</p>
				</div>
			</div>
		</section>

		<!-- Contact -->
		<section id="contact" class="scroll-mt-24 pb-20">
			<div
				class="rounded-2xl border border-black/10 bg-gradient-to-br from-indigo-500/5 via-fuchsia-500/5 to-emerald-500/5 p-6 dark:border-white/10"
			>
				<h2 class="text-2xl font-bold tracking-tight sm:text-3xl">Let’s build something</h2>
				<p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
					Have feedback or want to collaborate? Reach out.
				</p>
				<div class="mt-6 flex flex-wrap gap-3">
					<a
						href="mailto:you@domain.com"
						class="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow transition hover:shadow-md"
						>Email me</a
					>
					<a
						href="https://cal.com/you"
						class="rounded-lg border border-black/10 px-5 py-3 text-sm font-medium transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
						>Book a chat</a
					>
					<a
						href="https://github.com/you"
						class="rounded-lg border border-black/10 px-5 py-3 text-sm font-medium transition hover:bg-black/5 dark:border-white/10 dark:hover:bg-white/5"
						>GitHub</a
					>
				</div>
			</div>
		</section>
	</main>

	<footer class="border-t border-black/5 dark:border-white/10">
		<div
			class="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-10 text-sm text-gray-600 dark:text-gray-400"
		>
			<p>© {year} Your Name. Built with SvelteKit + Tailwind.</p>
			<div class="flex items-center gap-3">
				<a href="#top" class="hover:text-indigo-600 dark:hover:text-indigo-400">Back to top</a>
			</div>
		</div>
	</footer>
</div>

<style>
	/* smooth scroll without needing Tailwind plugin */
	:global(html) {
		scroll-behavior: smooth;
	}
	/* nice text wrapping */
	:global(.text-balance) {
		text-wrap: balance;
	}
</style>
