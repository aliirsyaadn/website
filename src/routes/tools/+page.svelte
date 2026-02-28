<script>
    import tools from "../../data/tools.json";
    import { SearchInput } from "../../components/tools";

    let searchQuery = $state("");
    let selectedTag = $state("");

    // Get all unique tags
    let allTags = $derived([...new Set(tools.flatMap((t) => t.tags))].sort());

    // Filter tools based on search and tag
    let filteredTools = $derived(
        tools.filter((tool) => {
            const matchesSearch =
                searchQuery === "" ||
                tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

            const matchesTag =
                selectedTag === "" || tool.tags.includes(selectedTag);

            return matchesSearch && matchesTag;
        }),
    );

    function clearFilters() {
        searchQuery = "";
        selectedTag = "";
    }
</script>

<svelte:head>
    <title>Tools | Ali Irsyaad</title>
    <meta
        name="description"
        content="Developer utility tools for everyday tasks"
    />
</svelte:head>

<div class="min-h-screen pt-32 pb-24 px-6">
    <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-16 page-enter">
            <div
                class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style="background: var(--bg-secondary); border: 1px solid var(--border);"
            >
                <i
                    class="fa-solid fa-wrench text-2xl"
                    style="color: var(--accent);"
                ></i>
            </div>
            <h1 class="text-4xl sm:text-5xl font-display font-bold mb-4">
                Utility <span class="text-accent-gradient">Tools</span>
            </h1>
            <p
                class="text-lg max-w-xl mx-auto"
                style="color: var(--text-secondary);"
            >
                Handy utilities for everyday tasks, development, and more
            </p>
        </div>

        <!-- Search -->
        <div class="max-w-xl mx-auto mb-12">
            <SearchInput
                bind:value={searchQuery}
                placeholder="Search tools..."
            />
        </div>

        <!-- Tag Filter -->
        <div class="flex flex-wrap justify-center gap-2 mb-12">
            <button
                onclick={() => (selectedTag = "")}
                class="tag cursor-pointer {selectedTag === ''
                    ? 'tag-accent'
                    : ''}"
            >
                All
            </button>
            {#each allTags as tag}
                <button
                    onclick={() =>
                        (selectedTag = selectedTag === tag ? "" : tag)}
                    class="tag cursor-pointer {selectedTag === tag
                        ? 'tag-accent'
                        : ''}"
                >
                    {tag}
                </button>
            {/each}
        </div>

        <!-- Results count -->
        {#if searchQuery || selectedTag}
            <div class="flex items-center justify-center gap-4 mb-8">
                <p class="text-sm" style="color: var(--text-muted);">
                    Found {filteredTools.length} tool{filteredTools.length !== 1
                        ? "s"
                        : ""}
                </p>
                <button onclick={clearFilters} class="text-sm link-hover">
                    Clear filters
                </button>
            </div>
        {/if}

        <!-- Tools Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each filteredTools as tool, i}
                <a
                    href="/tools/{tool.slug}"
                    class="card p-6 block group stagger-item text-center"
                    style="animation-delay: {i * 0.1}s"
                >
                    <div
                        class="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110"
                        style="background: var(--bg-tertiary);"
                    >
                        <i
                            class="{tool.icon} text-2xl"
                            style="color: var(--accent);"
                        ></i>
                    </div>

                    <h2
                        class="font-display font-bold text-lg mb-2 group-hover:text-accent transition-colors"
                        style="color: var(--text-primary);"
                    >
                        {tool.title}
                    </h2>

                    <p
                        class="text-sm mb-4"
                        style="color: var(--text-secondary);"
                    >
                        {tool.description}
                    </p>

                    <div class="flex flex-wrap justify-center gap-2">
                        {#each tool.tags as tag}
                            <span class="tag text-xs">{tag}</span>
                        {/each}
                    </div>
                </a>
            {/each}
        </div>

        <!-- Empty state -->
        {#if filteredTools.length === 0}
            <div class="text-center py-16">
                <div
                    class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style="background: var(--bg-secondary);"
                >
                    <i
                        class="fa-solid fa-search text-xl"
                        style="color: var(--text-muted);"
                    ></i>
                </div>
                <p class="text-lg mb-2" style="color: var(--text-primary);">
                    No tools found
                </p>
                <p class="text-sm" style="color: var(--text-muted);">
                    Try adjusting your search or filter
                </p>
            </div>
        {/if}
    </div>
</div>

<style>
    .group:hover .group-hover\:text-accent {
        color: var(--accent);
    }
</style>
