<script>
    let { checked = $bindable(false), label, disabled = false } = $props();
</script>

<label class="tool-checkbox-wrapper" class:disabled>
    <input
        type="checkbox"
        bind:checked
        {disabled}
        class="tool-checkbox-input"
    />
    <span class="tool-checkbox-box">
        {#if checked}
            <i class="fa-solid fa-check"></i>
        {/if}
    </span>
    {#if label}
        <span class="tool-checkbox-label">{label}</span>
    {/if}
</label>

<style>
    .tool-checkbox-wrapper {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
        user-select: none;
    }

    .tool-checkbox-wrapper.disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .tool-checkbox-input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }

    .tool-checkbox-box {
        width: 20px;
        height: 20px;
        border: 2px solid var(--border);
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        background: var(--bg-secondary);
        font-size: 0.75rem;
        color: white;
    }

    .tool-checkbox-input:checked + .tool-checkbox-box {
        background: var(--accent);
        border-color: var(--accent);
    }

    .tool-checkbox-input:focus + .tool-checkbox-box {
        box-shadow: 0 0 0 3px var(--accent-glow);
    }

    .tool-checkbox-label {
        font-size: 0.875rem;
        color: var(--text-secondary);
    }
</style>
