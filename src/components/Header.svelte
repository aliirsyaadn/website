<script>
    import { theme } from '$lib/theme.js';
    
    let { y, tabs = [
        { name: "Experiences", link: "/#experiences" },    
        { name: "Projects", link: "/#projects" },
        { name: "About Me", link: "/#about" },
    ] } = $props();
    
    let showToolsDropdown = $state(false);
    let currentTheme = $state('dark');
    
    theme.subscribe(value => {
        currentTheme = value;
    });
    
    const tools = [
        { name: "Pomodoro Timer", path: "/tools/pomodoro" },
        { name: "JSON Lint", path: "/tools/json-lint" },
        { name: "JSON Escape/Unescape", path: "/tools/json-escape" },
        { name: "JWT Parser", path: "/tools/jwt-parser" },
        { name: "UUID Generator", path: "/tools/uuid" },
        { name: "Base64 Encoder", path: "/tools/base64" }
    ];
</script>

<header
    class={"sticky z-[10] top-0 duration-200 px-8 md:px-16 lg:px-24 flex items-center justify-between border-b border-solid " +
        (y > 0
            ? " py-4 bg-white/80 dark:bg-black/80 backdrop-blur-md border-gray-200 dark:border-zinc-800"
            : " py-6 bg-transparent border-transparent")}
>
    <a href="/" class="font-medium text-xl">
        <b class="font-bold poppins">aliirsyaadn</b>
    </a>
    <div class="sm:flex items-center gap-12 hidden">
        {#each tabs as tab, index}
            <a
                href={tab.link}
                class="duration-200 hover:text-gray-600 dark:hover:text-zinc-400"
                target={index === 3 ? "_blank" : ""}
            >
                <p>{tab.name}</p>
            </a>
        {/each}
        <div class="relative">
            <button
                onclick={() => showToolsDropdown = !showToolsDropdown}
                class="duration-200 hover:text-gray-600 dark:hover:text-zinc-400 flex items-center gap-2"
            >
                <p>Tools</p>
                <svg class={"w-4 h-4 transition-transform duration-200 " + (showToolsDropdown ? "rotate-180" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {#if showToolsDropdown}
                <div class="absolute top-full mt-2 right-0 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg shadow-xl py-2 min-w-[200px]">
                    {#each tools as tool}
                        <a
                            href={tool.path}
                            onclick={() => showToolsDropdown = false}
                            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white duration-200"
                        >
                            {tool.name}
                        </a>
                    {/each}
                </div>
            {/if}
        </div>
        <button
            onclick={() => theme.toggle()}
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle theme"
        >
            {#if currentTheme === 'dark'}
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
            {:else}
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
            {/if}
        </button>
        <button
            class="relative overflow-hidden px-5 py-2 group rounded-full bg-black dark:bg-white text-white dark:text-black transition-all hover:scale-105"
            onclick={() => window.location.href = "https://linkedin.com/in/aliirsyaadn"}
        >
            <div
                class="absolute top-0 right-full w-full h-full bg-gray-600 dark:bg-gray-400 opacity-20 group-hover:translate-x-full z-0 duration-200"
            ></div>
            <h4 class="relative z-9">Contact Me</h4>
        </button>
    </div>
</header>
