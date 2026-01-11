<script>
    let { value = $bindable(''), label, options = [], disabled = false } = $props();
</script>

<div class="tool-select-wrapper">
    {#if label}
        <label class="tool-label">{label}</label>
    {/if}
    <div class="select-container">
        <select bind:value {disabled} class="tool-select">
            {#each options as option}
                <option value={option.value}>{option.label}</option>
            {/each}
        </select>
        <i class="fa-solid fa-chevron-down select-icon"></i>
    </div>
</div>

<style>
    .tool-select-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .tool-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-secondary);
    }

    .select-container {
        position: relative;
    }

    .tool-select {
        width: 100%;
        padding: 0.75rem 2.5rem 0.75rem 1rem;
        background-color: var(--bg-secondary);
        border: 1px solid var(--border);
        color: var(--text-primary);
        border-radius: 8px;
        font-size: 0.875rem;
        appearance: none;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .tool-select:focus {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px var(--accent-glow);
    }

    .tool-select:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .select-icon {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--text-muted);
        pointer-events: none;
        font-size: 0.75rem;
    }
</style>
