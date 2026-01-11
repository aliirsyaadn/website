<script>
    import { onMount } from 'svelte';
    import { SearchInput } from '../../components/tools';
    import { getTechIcon } from '$lib/techstackIcons';

    let { data } = $props();

    let searchQuery = $state('');
    let selectedTag = $state('');
    let sortBy = $state('date');

    // Get all unique tags from loaded posts
    let allTags = $derived([...new Set(data.posts.flatMap(b => b.tags || []))].sort());

    // Filter and sort blogs
    let filteredBlogs = $derived(() => {
        let result = data.posts.filter(blog => {
            const matchesSearch = searchQuery === '' ||
                blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (blog.excerpt && blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesTag = selectedTag === '' ||
                (blog.tags && blog.tags.includes(selectedTag));

            return matchesSearch && matchesTag;
        });

        // Sort
        result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date));

        return result;
    });

    function clearFilters() {
        searchQuery = '';
        selectedTag = '';
    }

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
</script>

<svelte:head>
    <title>Blog | Ali Irsyaad</title>
    <meta name="description" content="Thoughts, tutorials, and insights about software development" />
</svelte:head>

<div class="min-h-screen pt-32 pb-24 px-6">
    <div class="max-w-6xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-16 page-enter">
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                style="background: var(--bg-secondary); border: 1px solid var(--border);">
                <i class="fa-solid fa-pen-nib text-2xl" style="color: var(--accent);"></i>
            </div>
            <h1 class="text-4xl sm:text-5xl font-display font-bold mb-4">
                The <span class="text-accent-gradient">Blog</span>
            </h1>
            <p class="text-lg max-w-xl mx-auto" style="color: var(--text-secondary);">
                Thoughts, mental models, and tutorials about software development
            </p>
        </div>

        <!-- Search -->
        <div class="max-w-xl mx-auto mb-12">
            <SearchInput bind:value={searchQuery} placeholder="Search articles..." />
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <!-- Main content -->
            <div class="lg:col-span-3">
                <!-- Results info -->
                {#if searchQuery || selectedTag}
                    <div class="flex items-center justify-between mb-6">
                        <p class="text-sm" style="color: var(--text-muted);">
                            Found {filteredBlogs().length} article{filteredBlogs().length !== 1 ? 's' : ''}
                        </p>
                        <button onclick={clearFilters} class="text-sm link-hover cursor-pointer">
                            Clear filters
                        </button>
                    </div>
                {/if}

                <!-- Blog List -->
                <div class="space-y-8">
                    {#each filteredBlogs() as post, i}
                        <a href="/blog/{post.slug}"
                            class="card p-6 block group stagger-item"
                            style="animation-delay: {i * 0.1}s">
                            <div class="flex flex-col md:flex-row gap-6">
                                <div class="flex-1">
                                    <!-- Date and badge -->
                                    <div class="flex items-center gap-3 mb-3">
                                        <span class="text-sm" style="color: var(--text-muted);">
                                            {formatDate(post.date)}
                                        </span>
                                        {#if i === 0 && !searchQuery && !selectedTag}
                                            <span class="text-xs px-2 py-1 rounded-full"
                                                style="background: var(--accent); color: white;">
                                                Latest
                                            </span>
                                        {/if}
                                    </div>

                                    <!-- Title -->
                                    <h2 class="font-display font-bold text-xl mb-2 group-hover:text-accent transition-colors"
                                        style="color: var(--text-primary);">
                                        {post.title}
                                    </h2>

                                    <!-- Excerpt -->
                                    <p class="text-sm mb-4 line-clamp-2" style="color: var(--text-secondary);">
                                        {post.excerpt}
                                    </p>

                                    <!-- Meta -->
                                    <div class="flex items-center gap-4 text-sm" style="color: var(--text-muted);">
                                        {#if post.readTime}
                                            <span class="flex items-center gap-1">
                                                <i class="fa-regular fa-clock text-xs"></i>
                                                {post.readTime}
                                            </span>
                                        {/if}
                                    </div>
                                </div>

                                <!-- Tags on right side -->
                                {#if post.tags}
                                    <div class="flex flex-wrap md:flex-col gap-2 md:items-end">
                                        {#each post.tags as tag}
                                            <span class="tech-tag">
                                                <i class={getTechIcon(tag)}></i>
                                                {tag}
                                            </span>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        </a>
                    {/each}
                </div>

                <!-- Empty state -->
                {#if filteredBlogs().length === 0}
                    <div class="text-center py-16">
                        <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                            style="background: var(--bg-secondary);">
                            <i class="fa-solid fa-search text-xl" style="color: var(--text-muted);"></i>
                        </div>
                        <p class="text-lg mb-2" style="color: var(--text-primary);">No articles found</p>
                        <p class="text-sm" style="color: var(--text-muted);">Try adjusting your search or filter</p>
                    </div>
                {/if}
            </div>

            <!-- Sidebar -->
            <aside class="lg:col-span-1">
                <!-- Topics -->
                <div>
                    <h3 class="font-display font-semibold mb-4 flex items-center gap-2"
                        style="color: var(--text-primary);">
                        <i class="fa-solid fa-tags text-sm" style="color: var(--accent);"></i>
                        Topics
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        {#each allTags as tag}
                            <button
                                onclick={() => selectedTag = selectedTag === tag ? '' : tag}
                                class="tech-tag cursor-pointer {selectedTag === tag ? 'active' : ''}"
                            >
                                <i class={getTechIcon(tag)}></i>
                                {tag}
                            </button>
                        {/each}
                    </div>
                </div>
            </aside>
        </div>
    </div>
</div>

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .group:hover .group-hover\:text-accent {
        color: var(--accent);
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

    .tech-tag.active {
        background: var(--accent);
        border-color: var(--accent);
        color: white;
    }

    .tech-tag i {
        font-size: 0.875rem;
        color: var(--accent);
    }

    .tech-tag.active i {
        color: white;
    }
</style>
