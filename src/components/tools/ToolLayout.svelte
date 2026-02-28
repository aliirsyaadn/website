<script>
    let {
        title,
        description,
        icon = "fa-solid fa-wrench",
        children,
    } = $props();
</script>

<svelte:head>
    <title>{title} | Ali Irsyaad</title>
    <meta name="description" content={description} />
</svelte:head>

<div class="tool-page page-enter">
    <!-- Header -->
    <div class="tool-header">
        <div class="flex items-center gap-4 mb-2">
            <div class="tool-icon">
                <i class={icon}></i>
            </div>
            <h1 class="tool-title font-display">{title}</h1>
        </div>
        {#if description}
            <p class="tool-description">{description}</p>
        {/if}
    </div>

    <!-- Content -->
    <div class="tool-content">
        {#if children}{@render children()}{/if}
    </div>
</div>

<style>
    .tool-page {
        width: 100%;
    }

    .tool-header {
        margin-bottom: 2rem;
    }

    .tool-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        font-size: 1.5rem;
        color: var(--accent);
    }

    .tool-title {
        font-size: 2.25rem;
        font-weight: 700;
        color: var(--text-primary);
        background: linear-gradient(
            135deg,
            var(--gradient-start),
            var(--gradient-end)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .tool-description {
        font-size: 1rem;
        color: var(--text-secondary);
        max-width: 600px;
    }

    .tool-content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
</style>
