<script>
    let { variant = 'primary', type = 'button', disabled = false, onclick, children } = $props();
</script>

<button
    {type}
    {disabled}
    {onclick}
    class="tool-btn tool-btn-{variant}"
    class:disabled
>
    {#if children}{@render children()}{/if}
</button>

<style>
    .tool-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        border-radius: 8px;
        transition: all 0.2s ease;
        cursor: pointer;
        border: none;
    }

    .tool-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .tool-btn-primary {
        background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
        color: white;
    }

    .tool-btn-primary:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px var(--accent-glow);
    }

    .tool-btn-secondary {
        background: var(--bg-secondary);
        color: var(--text-primary);
        border: 1px solid var(--border);
    }

    .tool-btn-secondary:hover:not(:disabled) {
        border-color: var(--accent);
        color: var(--accent);
    }

    .tool-btn-danger {
        background: #dc2626;
        color: white;
    }

    .tool-btn-danger:hover:not(:disabled) {
        background: #b91c1c;
    }

    .tool-btn-ghost {
        background: transparent;
        color: var(--text-secondary);
        padding: 0.5rem;
    }

    .tool-btn-ghost:hover:not(:disabled) {
        color: var(--accent);
        background: var(--bg-secondary);
    }
</style>
