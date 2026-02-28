<script>
    import { page } from "$app/stores";
    let { children } = $props();

    // Check if we're on a tool subpage (not the tools index)
    let isToolSubpage = $derived($page.url.pathname !== "/tools");
</script>

{#if isToolSubpage}
    <!-- Tool subpage layout with back button -->
    <div class="min-h-screen pt-24 pb-24 px-6">
        <div class="max-w-5xl mx-auto flex flex-col items-start w-full gap-8">
            <a
                href="/tools"
                class="inline-flex items-center gap-2 group px-4 py-2 rounded-lg transition-all duration-300 hover:-translate-x-1"
                style="background: var(--bg-secondary); border: 1px solid var(--border);"
            >
                <i
                    class="fa-solid fa-arrow-left text-accent transition-transform duration-300 group-hover:-translate-x-1"
                ></i>
                <span
                    class="text-sm font-medium"
                    style="color: var(--text-primary);">Tools</span
                >
            </a>
            {#if children}{@render children()}{/if}
        </div>
    </div>
{:else}
    <!-- Tools index page -->
    {#if children}{@render children()}{/if}
{/if}
