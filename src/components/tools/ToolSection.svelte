<script>
    let { title, children } = $props();
</script>

<div class="tool-section card">
    {#if title}
        <h2 class="section-title font-display">{title}</h2>
    {/if}
    <div class="section-content">
        {#if children}{@render children()}{/if}
    </div>
</div>

<style>
    .tool-section {
        padding: 1.5rem;
    }

    .section-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 1rem;
    }

    .section-content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
</style>
