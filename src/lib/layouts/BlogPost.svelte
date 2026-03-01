<script>
    export let title = "";
    export let date = "";
    export let excerpt = "";
    export let tags = [];
    export let readTime = "";
    export let image = "";

    function formatDate(dateString) {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }
</script>

<svelte:head>
    <title>{title} | Ali Irsyaad</title>
    <meta name="description" content={excerpt} />
</svelte:head>

<article class="min-h-screen pt-32 pb-24 px-6">
    <div class="max-w-3xl mx-auto page-enter">
        <!-- Back link -->
        <a
            href="/blog"
            class="inline-flex items-center gap-2 mb-8 link-hover text-sm"
        >
            <i class="fa-solid fa-arrow-left"></i>
            Back to blog
        </a>

        <!-- Header -->
        <header class="mb-12">
            <!-- Tags -->
            {#if tags && tags.length > 0}
                <div class="flex flex-wrap gap-2 mb-4">
                    {#each tags as tag}
                        <span class="tag">{tag}</span>
                    {/each}
                </div>
            {/if}

            <!-- Title -->
            <h1
                class="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6"
                style="color: var(--text-primary);"
            >
                {title}
            </h1>

            <!-- Meta -->
            <div
                class="flex flex-wrap items-center gap-4 text-sm"
                style="color: var(--text-muted);"
            >
                {#if date}
                    <span class="flex items-center gap-2">
                        <i class="fa-regular fa-calendar"></i>
                        {formatDate(date)}
                    </span>
                {/if}
                {#if readTime}
                    <span class="flex items-center gap-2">
                        <i class="fa-regular fa-clock"></i>
                        {readTime}
                    </span>
                {/if}
            </div>
        </header>

        <!-- Featured Image -->
        {#if image}
            <div
                class="mb-12 rounded-xl overflow-hidden"
                style="border: 1px solid var(--border);"
            >
                <img src={image} alt={title} class="w-full h-auto" />
            </div>
        {/if}

        <!-- Content -->
        <div class="prose prose-lg">
            <slot />
        </div>

        <!-- Author -->
        <div class="mt-16 pt-8 border-t border-theme">
            <div class="flex items-center gap-4">
                <div
                    class="w-12 h-12 rounded-full overflow-hidden"
                    style="background: var(--bg-secondary);"
                >
                    <img
                        src="/images/profile_ori.png"
                        alt="Ali Irsyaad"
                        class="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <p
                        class="font-display font-semibold"
                        style="color: var(--text-primary);"
                    >
                        Ali Irsyaad
                    </p>
                    <p class="text-sm" style="color: var(--text-muted);">
                        Software Engineer
                    </p>
                </div>
            </div>
        </div>
    </div>
</article>
