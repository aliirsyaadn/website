<script>
    let {
        value = $bindable(''),
        placeholder = '',
        label,
        rows = 6,
        disabled = false,
        readonly = false,
        monospace = false
    } = $props();
</script>

<div class="tool-textarea-wrapper">
    {#if label}
        <label class="tool-label">{label}</label>
    {/if}
    <textarea
        bind:value
        {placeholder}
        {rows}
        {disabled}
        {readonly}
        class="tool-textarea"
        class:monospace
    ></textarea>
</div>

<style>
    .tool-textarea-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .tool-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-secondary);
    }

    .tool-textarea {
        width: 100%;
        padding: 1rem;
        background-color: var(--bg-secondary);
        border: 1px solid var(--border);
        color: var(--text-primary);
        border-radius: 8px;
        font-size: 0.875rem;
        line-height: 1.6;
        resize: vertical;
        transition: all 0.2s ease;
    }

    .tool-textarea.monospace {
        font-family: 'JetBrains Mono', monospace;
    }

    .tool-textarea:focus {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px var(--accent-glow);
    }

    .tool-textarea::placeholder {
        color: var(--text-muted);
    }

    .tool-textarea:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .tool-textarea:read-only {
        cursor: default;
    }
</style>
