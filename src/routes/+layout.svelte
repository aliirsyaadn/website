<script>
    import FloatingNav from "../components/FloatingNav.svelte";
    import "../app.css";
    import { theme } from '$lib/theme.js';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    let scrollY = $state(0);
    let showScrollTop = $derived(scrollY > 300);

    let { children } = $props();

    // Check if we're on a tools subpage (not the tools index)
    let isToolPage = $derived($page.url.pathname.startsWith('/tools/') && $page.url.pathname !== '/tools');

    function goTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    onMount(() => {
        theme.init();
    });
</script>

<svelte:window bind:scrollY={scrollY} />

<div class="min-h-screen bg-primary relative">
    <!-- Grid background -->
    <div class="fixed inset-0 bg-grid pointer-events-none opacity-50"></div>

    <!-- Gradient orb decorations -->
    <div class="fixed top-0 left-0 w-96 h-96 opacity-20 blur-3xl pointer-events-none"
        style="background: radial-gradient(circle, var(--accent-glow), transparent 70%);"></div>
    <div class="fixed bottom-0 right-0 w-96 h-96 opacity-20 blur-3xl pointer-events-none"
        style="background: radial-gradient(circle, var(--accent-glow), transparent 70%);"></div>

    <!-- Floating Navigation (hide on tool pages) -->
    {#if !isToolPage}
        <FloatingNav {scrollY} />
    {/if}

    <!-- Main Content -->
    <main class="relative z-10">
        {#if children}
            {@render children()}
        {/if}
    </main>

    <!-- Footer -->
    <footer class="relative z-10 py-12 px-8 border-t border-theme">
        <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex items-center gap-2">
                <span class="font-display font-semibold" style="color: var(--accent);">ali</span>
                <span style="color: var(--text-muted);">© 2024</span>
            </div>

            <div class="flex items-center gap-6">
                <a href="https://github.com/aliirsyaadn" target="_blank" rel="noopener noreferrer"
                    class="link-hover text-sm">
                    <i class="fa-brands fa-github mr-2"></i>GitHub
                </a>
                <a href="https://linkedin.com/in/aliirsyaadn" target="_blank" rel="noopener noreferrer"
                    class="link-hover text-sm">
                    <i class="fa-brands fa-linkedin mr-2"></i>LinkedIn
                </a>
                <a href="mailto:ali.irsyaad.n@gmail.com"
                    class="link-hover text-sm">
                    <i class="fa-solid fa-envelope mr-2"></i>Email
                </a>
            </div>
        </div>
    </footer>

    <!-- Scroll to top button -->
    <button
        onclick={goTop}
        class="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer
            {showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}"
        style="background: var(--accent); color: white;"
        aria-label="Scroll to top"
    >
        <i class="fa-solid fa-arrow-up"></i>
    </button>
</div>
