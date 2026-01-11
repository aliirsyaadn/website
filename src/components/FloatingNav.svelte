<script>
    import { page } from '$app/stores';
    import { theme } from '$lib/theme.js';

    let { scrollY = 0 } = $props();

    let currentTheme = $state('serious');
    let isScrolled = $derived(scrollY > 50);
    let currentPath = $derived($page.url.pathname);

    theme.subscribe(value => {
        currentTheme = value;
    });

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/projects', label: 'Projects' },
        { href: '/blog', label: 'Blog' },
        { href: '/tools', label: 'Tools' },
        { href: '/about', label: 'About' }
    ];

    function isActive(href) {
        if (href === '/') return currentPath === '/';
        return currentPath.startsWith(href);
    }

    function toggleTheme() {
        theme.toggle();
    }
</script>

<nav
    class="fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 {isScrolled ? 'top-4' : 'top-6'}"
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

        <!-- Nav Links -->
        <div class="flex items-center">
            {#each navLinks as link}
                <a
                    href={link.href}
                    class="px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
                        {isActive(link.href)
                            ? 'text-accent-gradient'
                            : 'hover:bg-[var(--bg-tertiary)]'}"
                    style="color: {isActive(link.href) ? 'var(--accent)' : 'var(--text-secondary)'};"
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
            class="px-3 py-2 rounded-full transition-all duration-300 hover:bg-[var(--bg-tertiary)] flex items-center gap-2 text-sm font-medium cursor-pointer"
            style="color: var(--text-secondary);"
            aria-label="Toggle theme"
        >
            {#if currentTheme === 'serious'}
                <i class="fa-solid fa-briefcase text-xs"></i>
                <span class="hidden sm:inline">Serious</span>
            {:else}
                <i class="fa-solid fa-rocket text-xs"></i>
                <span class="hidden sm:inline">Fun</span>
            {/if}
        </button>
    </div>
</nav>

<style>
    nav {
        will-change: transform;
    }
</style>
