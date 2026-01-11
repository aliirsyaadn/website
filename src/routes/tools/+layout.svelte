<script>
    import { page } from '$app/stores';
    let { children } = $props();

    // Check if we're on a tool subpage (not the tools index)
    let isToolSubpage = $derived($page.url.pathname !== '/tools');
</script>

{#if isToolSubpage}
    <!-- Tool subpage layout with back button -->
    <div class="min-h-screen pt-24 pb-24 px-6">
        <div class="max-w-4xl mx-auto">
            <a href="/tools" class="inline-flex items-center gap-2 mb-8 link-hover text-sm">
                <i class="fa-solid fa-arrow-left"></i>
                Back to tools
            </a>
            {#if children}{@render children()}{/if}
        </div>
    </div>
{:else}
    <!-- Tools index page -->
    {#if children}{@render children()}{/if}
{/if}
