<script>
    let { title, description, icon = 'fa-solid fa-wrench', children } = $props();
</script>

<svelte:head>
    <title>{title} | Ali Irsyaad</title>
    <meta name="description" content={description} />
</svelte:head>

<div class="tool-page page-enter">
    <!-- Header -->
    <div class="tool-header">
        <div class="tool-icon">
            <i class={icon}></i>
        </div>
        <h1 class="tool-title font-display">{title}</h1>
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
        width: 64px;
        height: 64px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 1.5rem;
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        font-size: 1.5rem;
        color: var(--accent);
    }

    .tool-title {
        font-size: 2.5rem;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 0.5rem;
        background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
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
