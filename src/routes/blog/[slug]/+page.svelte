<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import mermaid from "mermaid";

    let { data } = $props();

    function formatDate(dateString) {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }

    let post = $derived(data.metadata);
    let Content = $derived(data.content);

    onMount(() => {
        // Initialize Mermaid after the DOM is fully mounted
        mermaid.initialize({
            startOnLoad: false,
            theme: "dark", // Fits the 'poimandres' aesthetic
            securityLevel: "loose", // Needed for custom styling inside mdsvex output
        });

        // Wait a tick for mdsvex content to fully paint, then run Mermaid generator
        setTimeout(() => {
            mermaid
                .run({
                    querySelector: ".mermaid",
                })
                .catch((e) => console.error("Mermaid rendering failed", e));
        }, 100);
    });
</script>

<svelte:head>
    {#if post}
        <title>{post.title} | Ali Irsyaad</title>
        <meta name="description" content={post.excerpt} />
    {/if}
</svelte:head>

{#if post && Content}
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
                {#if post.tags}
                    <div class="flex flex-wrap gap-2 mb-4">
                        {#each post.tags as tag}
                            <span class="tag">{tag}</span>
                        {/each}
                    </div>
                {/if}

                <!-- Title -->
                <h1
                    class="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-6"
                    style="color: var(--text-primary);"
                >
                    {post.title}
                </h1>

                <!-- Meta -->
                <div
                    class="flex flex-wrap items-center gap-4 text-sm"
                    style="color: var(--text-muted);"
                >
                    {#if post.date}
                        <span class="flex items-center gap-2">
                            <i class="fa-regular fa-calendar"></i>
                            {formatDate(post.date)}
                        </span>
                    {/if}
                    {#if post.readTime}
                        <span class="flex items-center gap-2">
                            <i class="fa-regular fa-clock"></i>
                            {post.readTime}
                        </span>
                    {/if}
                </div>
            </header>

            <!-- MDX Content -->
            <div class="prose">
                <Content />
            </div>

            <!-- Author -->
            <div class="mt-16 pt-8 border-t border-theme">
                <div class="flex items-center gap-4">
                    <div
                        class="w-12 h-12 rounded-full overflow-hidden"
                        style="background: var(--bg-secondary);"
                    >
                        <img
                            src="/images/profile.png"
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

            <!-- Share -->
            <div class="mt-8 flex items-center gap-4">
                <span class="text-sm" style="color: var(--text-muted);"
                    >Share:</span
                >
                <a
                    href="https://x.com/intent/post?url={encodeURIComponent(
                        $page.url.href,
                    )}&text={encodeURIComponent(post.title)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on X"
                    class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--bg-secondary)]"
                    style="color: var(--text-secondary);"
                >
                    <i class="fa-brands fa-x-twitter"></i>
                </a>
                <a
                    href="https://www.linkedin.com/shareArticle?mini=true&url={encodeURIComponent(
                        $page.url.href,
                    )}&title={encodeURIComponent(post.title)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on LinkedIn"
                    class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--bg-secondary)]"
                    style="color: var(--text-secondary);"
                >
                    <i class="fa-brands fa-linkedin"></i>
                </a>
            </div>
        </div>
    </article>
{:else}
    <div class="min-h-screen pt-32 pb-24 px-6">
        <div class="max-w-3xl mx-auto text-center">
            <div
                class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style="background: var(--bg-secondary);"
            >
                <i
                    class="fa-solid fa-exclamation text-xl"
                    style="color: var(--text-muted);"
                ></i>
            </div>
            <h1
                class="text-2xl font-display font-bold mb-4"
                style="color: var(--text-primary);"
            >
                Post not found
            </h1>
            <a href="/blog" class="btn-primary inline-flex items-center gap-2">
                <i class="fa-solid fa-arrow-left"></i>
                Back to blog
            </a>
        </div>
    </div>
{/if}
