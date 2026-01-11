<script>
    import projects from '../../data/projects.json';
    import { SearchInput } from '../../components/tools';
    import { getTechIcon } from '$lib/techstackIcons';

    let searchQuery = $state('');
    let selectedTag = $state('');

    // Get all unique tags
    let allTags = $derived([...new Set(projects.flatMap(p => p.tags))].sort());

    // Filter projects based on search and tag
    let filteredProjects = $derived(
        projects.filter(project => {
            const matchesSearch = searchQuery === '' ||
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTag = selectedTag === '' ||
                project.tags.includes(selectedTag);

            return matchesSearch && matchesTag;
        })
    );

    function clearFilters() {
        searchQuery = '';
        selectedTag = '';
    }
</script>

<svelte:head>
    <title>Projects | Ali Irsyaad</title>
    <meta name="description" content="Browse my portfolio of software engineering projects" />
</svelte:head>

<div class="min-h-screen pt-32 pb-24 px-6">
    <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-16 page-enter">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style="background: var(--bg-secondary); border: 1px solid var(--border);">
                <i class="fa-solid fa-folder-open text-2xl" style="color: var(--accent);"></i>
            </div>
            <h1 class="text-4xl sm:text-5xl font-display font-bold mb-4">
                Curated <span class="text-accent-gradient">Projects</span>
            </h1>
            <p class="text-lg max-w-xl mx-auto" style="color: var(--text-secondary);">
                Showcase of my projects that I'm proud of
            </p>
        </div>

        <!-- Search and Filter -->
        <div class="flex flex-col gap-6 mb-12">
            <!-- Search Input with overlapping icon -->
            <div class="max-w-xl mx-auto w-full">
                <SearchInput bind:value={searchQuery} placeholder="Search projects..." />
            </div>

            <!-- Tag Filter - Below search -->
            <div class="flex flex-wrap gap-2 items-center justify-center">
                <button
                    onclick={() => selectedTag = ''}
                    class="filter-tag {selectedTag === '' ? 'active' : ''}"
                >
                    <i class="fa-solid fa-layer-group"></i>
                    All
                </button>
                {#each allTags.slice(0, 8) as tag}
                    <button
                        onclick={() => selectedTag = selectedTag === tag ? '' : tag}
                        class="filter-tag {selectedTag === tag ? 'active' : ''}"
                    >
                        <i class={getTechIcon(tag)}></i>
                        {tag}
                    </button>
                {/each}
            </div>
        </div>

        <!-- Results count -->
        {#if searchQuery || selectedTag}
            <div class="flex items-center justify-between mb-8">
                <p class="text-sm" style="color: var(--text-muted);">
                    Found {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                </p>
                <button onclick={clearFilters} class="text-sm link-hover">
                    Clear filters
                </button>
            </div>
        {/if}

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {#each filteredProjects as project, i}
                <article class="card p-8 stagger-item" style="animation-delay: {i * 0.1}s">
                    <div class="flex items-start justify-between mb-4">
                        <div class="w-12 h-12 rounded-xl flex items-center justify-center"
                            style="background: var(--bg-tertiary);">
                            <i class="fa-solid fa-code-branch text-xl" style="color: var(--accent);"></i>
                        </div>
                        <div class="flex gap-3">
                            {#if project.github}
                                <a href={project.github} target="_blank" rel="noopener noreferrer"
                                    aria-label="View source on GitHub"
                                    class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--bg-tertiary)]"
                                    style="color: var(--text-muted);">
                                    <i class="fa-brands fa-github"></i>
                                </a>
                            {/if}
                            {#if project.demo}
                                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                                    aria-label="View live demo"
                                    class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--bg-tertiary)]"
                                    style="color: var(--text-muted);">
                                    <i class="fa-solid fa-external-link"></i>
                                </a>
                            {/if}
                        </div>
                    </div>

                    <h2 class="font-display font-bold text-xl mb-3" style="color: var(--text-primary);">
                        {project.title}
                    </h2>

                    <p class="text-sm mb-6 line-clamp-3" style="color: var(--text-secondary);">
                        {project.description}
                    </p>

                    <div class="flex flex-wrap gap-2">
                        {#each project.tags as tag}
                            <span class="tech-tag">
                                <i class={getTechIcon(tag)}></i>
                                {tag}
                            </span>
                        {/each}
                    </div>
                </article>
            {/each}
        </div>

        <!-- Empty state -->
        {#if filteredProjects.length === 0}
            <div class="text-center py-16">
                <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style="background: var(--bg-secondary);">
                    <i class="fa-solid fa-search text-xl" style="color: var(--text-muted);"></i>
                </div>
                <p class="text-lg mb-2" style="color: var(--text-primary);">No projects found</p>
                <p class="text-sm" style="color: var(--text-muted);">Try adjusting your search or filter</p>
            </div>
        {/if}
    </div>
</div>

<style>
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .filter-tag {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        color: var(--text-secondary);
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 9999px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .filter-tag:hover {
        color: var(--accent);
        border-color: var(--accent);
        transform: translateY(-2px);
    }

    .filter-tag.active {
        background: var(--accent);
        border-color: var(--accent);
        color: white;
        box-shadow: 0 4px 12px var(--accent-glow);
    }

    .filter-tag i {
        font-size: 0.875rem;
    }

    .tech-tag {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.375rem 0.75rem;
        font-size: 0.75rem;
        color: var(--text-secondary);
        background: var(--bg-tertiary);
        border: 1px solid var(--border);
        border-radius: 6px;
        transition: all 0.2s ease;
    }

    .tech-tag:hover {
        color: var(--accent);
        border-color: var(--accent);
    }

    .tech-tag i {
        font-size: 0.875rem;
        color: var(--accent);
    }
</style>
