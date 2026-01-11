<script>
    let { value = $bindable(''), placeholder = 'Search...', onchange } = $props();
</script>

<div class="search-container">
    <div class="search-icon">
        <i class="fa-solid fa-search"></i>
    </div>
    <input
        type="text"
        bind:value
        {placeholder}
        oninput={onchange}
        class="search-input"
    />
</div>

<style>
    .search-container {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
    }

    .search-icon {
        position: absolute;
        left: 1rem;
        top: 50%;
        transform: translateY(-50%);
        color: var(--accent);
        z-index: 2;
        pointer-events: none;
    }

    .search-input {
        width: 100%;
        padding: 0.875rem 1rem 0.875rem 2.75rem;
        background-color: var(--bg-secondary);
        border: 1px solid var(--border);
        color: var(--text-primary);
        border-radius: 12px;
        font-size: 1rem;
        transition: all 0.3s ease;
    }

    .search-input:focus {
        outline: none;
        border-color: var(--accent);
        box-shadow: 0 0 0 3px var(--accent-glow);
    }

    .search-input::placeholder {
        color: var(--text-muted);
    }
</style>
