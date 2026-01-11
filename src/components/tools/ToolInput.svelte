<script>
    let {
        type = 'text',
        value = $bindable(''),
        placeholder = '',
        label,
        disabled = false,
        min,
        max,
        step
    } = $props();
</script>

<div class="tool-input-wrapper">
    {#if label}
        <label class="tool-label">{label}</label>
    {/if}
    <input
        {type}
        bind:value
        {placeholder}
        {disabled}
        {min}
        {max}
        {step}
        class="tool-input"
    />
</div>

<style>
    .tool-input-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .tool-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-secondary);
    }

    .tool-input {
        width: 100%;
        padding: 0.75rem 1rem;
        background-color: var(--bg-secondary);
        border: 1px solid var(--border);
        color: var(--text-primary);
        border-radius: 8px;
        font-size: 0.875rem;
        transition: all 0.2s ease;
    }

    .tool-input:focus {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px var(--accent-glow);
    }

    .tool-input::placeholder {
        color: var(--text-muted);
    }

    .tool-input:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
</style>
