<script>
    import FloatingNav from "../components/FloatingNav.svelte";
    import "../app.css";
    import { themeState } from "$lib/theme.svelte.js";
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    let scrollY = $state(0);
    let showScrollTop = $derived(scrollY > 300);

    let { children } = $props();

    function goTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    onMount(() => {
        themeState.init();
    });
</script>

<svelte:window bind:scrollY />

<div class="min-h-screen bg-primary relative overflow-hidden">
    <!-- Skip to content link for accessibility -->
    <a
        href="#main-content"
        class="absolute top-4 left-4 -translate-y-[150%] focus:translate-y-0 z-[100] btn-primary transition-transform duration-300"
    >
        Skip to content
    </a>

    <!-- Dynamic Backgrounds -->
    {#if themeState.value === "serious"}
        <!-- Serious Mode -->
        <div class="fixed inset-0 bg-serious-grid pointer-events-none opacity-30"></div>
        <div class="fixed inset-0 bg-noise pointer-events-none opacity-[0.03] mix-blend-overlay"></div>
        <div class="glow-orb fixed top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-20" style="background: var(--accent);"></div>
        <div class="glow-orb fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none opacity-20" style="background: var(--gradient-end);"></div>
        <div class="glow-orb fixed top-[30%] left-[50%] -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-[0.08]" style="background: var(--terminal-green);"></div>
    {:else}
        <!-- Fun Mode -->
        <div class="fixed inset-0 pointer-events-none mesh-gradient opacity-70"></div>
        <div class="fixed inset-0 pointer-events-none overflow-hidden">
           <div class="blob-shape blob-1"></div>
           <div class="blob-shape blob-2"></div>
           <div class="blob-shape blob-3"></div>
        </div>
        <div class="fixed inset-0 bg-white/30 backdrop-blur-[60px] pointer-events-none"></div>
    {/if}

    <!-- Floating Navigation -->
    <FloatingNav {scrollY} />

    <!-- Main Content -->
    <main id="main-content" class="relative z-10" tabindex="-1">
        {#if children}
            {@render children()}
        {/if}
    </main>

    <!-- Footer -->
    <footer class="relative z-10 py-12 px-8 border-t border-theme">
        <div
            class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
        >
            <div class="flex items-center gap-2">
                <span
                    class="font-display font-semibold"
                    style="color: var(--accent);">ali</span
                >
                <span style="color: var(--text-muted);">© 2024</span>
            </div>

            <div class="flex items-center gap-6">
                <a
                    href="https://github.com/aliirsyaadn"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="link-hover text-sm"
                >
                    <i class="fa-brands fa-github mr-2"></i>GitHub
                </a>
                <a
                    href="https://linkedin.com/in/aliirsyaadn"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="link-hover text-sm"
                >
                    <i class="fa-brands fa-linkedin mr-2"></i>LinkedIn
                </a>
                <a
                    href="mailto:ali.irsyaad.n@gmail.com"
                    class="link-hover text-sm"
                >
                    <i class="fa-solid fa-envelope mr-2"></i>Email
                </a>
            </div>
        </div>
    </footer>

    <!-- Scroll to top button -->
    <button
        onclick={goTop}
        class="fixed bottom-8 right-8 z-[100] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl hover:border-accent group
            {showScrollTop
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8 pointer-events-none'}"
        style="background: color-mix(in srgb, var(--bg-secondary) 80%, transparent); border: 1px solid var(--border); backdrop-filter: blur(12px);"
        aria-label="Scroll to top"
    >
        <i
            class="fa-solid fa-arrow-up text-lg transition-transform duration-300 group-hover:-translate-y-1"
            style="color: var(--accent);"
        ></i>
    </button>
</div>
