<script>
    import { page } from "$app/stores";
    import { themeState } from "$lib/theme.svelte.js";

    let { scrollY = 0 } = $props();

    let isScrolled = $derived(scrollY > 50);
    let currentPath = $derived($page.url.pathname);
    let isMobileMenuOpen = $state(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/projects", label: "Projects" },
        { href: "/blog", label: "Blog" },
        { href: "/tools", label: "Tools" },
        { href: "/about", label: "About" },
    ];

    function isActive(href) {
        if (href === "/") return currentPath === "/";
        return currentPath.startsWith(href);
    }

    function toggleTheme() {
        themeState.toggle();
    }

    function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
    }

    function closeMobileMenu() {
        isMobileMenuOpen = false;
    }
</script>

<nav
    class="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 {isScrolled
        ? 'top-4'
        : 'top-6'}"
>
    <div class="glass rounded-full px-2 py-2 flex items-center gap-1">
        <!-- Logo/Name -->
        <a
            href="/"
            class="px-4 py-2 font-display font-semibold text-sm tracking-tight"
            style="color: var(--accent);"
        >
            ali<span style="color: var(--text-primary);">.</span>
        </a>

        <!-- Divider -->
        <div class="w-px h-6 bg-[var(--border)]"></div>

        <!-- Desktop Nav Links -->
        <div class="hidden md:flex items-center">
            {#each navLinks as link}
                <a
                    href={link.href}
                    class="px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
                        {isActive(link.href)
                        ? 'text-accent-gradient'
                        : 'hover:bg-[var(--bg-tertiary)]'}"
                    style="color: {isActive(link.href)
                        ? 'var(--accent)'
                        : 'var(--text-secondary)'};"
                >
                    {link.label}
                </a>
            {/each}
        </div>

        <!-- Divider -->
        <div class="w-px h-6 bg-[var(--border)]"></div>

        <!-- Theme Toggle -->
        <button
            onclick={toggleTheme}
            class="relative w-[3.25rem] h-[1.75rem] rounded-full transition-colors duration-300 ml-2 shadow-inner overflow-hidden cursor-pointer flex items-center px-1
                {themeState.value === 'serious'
                ? 'bg-[#1a1a2e] border border-[var(--border)]'
                : 'bg-[#e2e8f0] border border-gray-300'}"
            aria-label="Toggle theme"
        >
            <!-- Background Icons -->
            <div
                class="absolute inset-0 flex justify-between items-center px-[6px] text-[11px] pointer-events-none w-full h-full"
            >
                <i
                    class="fa-solid fa-briefcase {themeState.value === 'serious'
                        ? 'text-white'
                        : 'text-gray-400'}"
                ></i>
                <i
                    class="fa-solid fa-rocket {themeState.value === 'serious'
                        ? 'text-gray-600'
                        : 'text-black'}"
                ></i>
            </div>

            <!-- Sliding Circle -->
            <div
                class="absolute w-[1.25rem] h-[1.25rem] rounded-full bg-white transition-transform duration-300 shadow-md transform
                    {themeState.value === 'serious'
                    ? 'translate-x-[0]'
                    : 'translate-x-[1.5rem]'}"
            ></div>
        </button>

        <!-- Mobile Menu Toggle Button -->
        <button
            class="md:hidden ml-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--bg-tertiary)]"
            style="color: var(--text-primary);"
            onclick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
        >
            <i class="fa-solid {isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}"></i>
        </button>
    </div>

    <!-- Mobile Dropdown Menu -->
    {#if isMobileMenuOpen}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div
            class="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[90vw] max-w-[320px] rounded-2xl glass p-4 flex flex-col gap-2 md:hidden"
            onclick={(e) => e.target === e.currentTarget && closeMobileMenu()}
        >
            {#each navLinks as link}
                <a
                    href={link.href}
                    onclick={closeMobileMenu}
                    class="px-4 py-3 text-base text-center font-medium rounded-xl transition-all duration-200
                        {isActive(link.href)
                        ? 'text-accent-gradient bg-[var(--bg-tertiary)]'
                        : 'hover:bg-[var(--bg-tertiary)]'}"
                    style="color: {isActive(link.href)
                        ? 'var(--accent)'
                        : 'var(--text-secondary)'};"
                >
                    {link.label}
                </a>
            {/each}
        </div>
    {/if}
</nav>

<style>
    nav {
        will-change: transform;
    }
</style>
