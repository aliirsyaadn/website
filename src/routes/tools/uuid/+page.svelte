<script>
    import { ToolLayout, ToolSection, ToolButton, ToolInput, ToolSelect, ToolCheckbox } from '../../../components/tools';

    let uuids = $state([]);
    let version = $state('v4');
    let count = $state(1);
    let uppercase = $state(false);
    let hyphens = $state(true);
    let copied = $state(null);

    const versionOptions = [
        { value: 'v4', label: 'UUID v4 (Random)' },
        { value: 'v1', label: 'UUID v1 (Timestamp)' }
    ];

    function generateUUID() {
        const newUUIDs = [];

        for (let i = 0; i < count; i++) {
            let uuid = version === 'v4' ? generateV4() : generateV1();

            if (!hyphens) uuid = uuid.replace(/-/g, '');
            if (uppercase) uuid = uuid.toUpperCase();

            newUUIDs.push({
                id: Date.now() + i,
                value: uuid,
                createdAt: new Date().toLocaleTimeString()
            });
        }

        uuids = [...newUUIDs, ...uuids].slice(0, 100);
    }

    function generateV4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function generateV1() {
        const timestamp = Date.now().toString(16);
        const random = Math.random().toString(16).substr(2, 8);
        return `${timestamp.substr(0, 8)}-${timestamp.substr(8, 4)}-1${timestamp.substr(13, 3)}-${random.substr(0, 4)}-${random.substr(4, 12)}`;
    }

    async function copyToClipboard(text, id) {
        await navigator.clipboard.writeText(text);
        copied = id;
        setTimeout(() => copied = null, 2000);
    }

    async function copyAll() {
        const allUUIDs = uuids.map(u => u.value).join('\n');
        await navigator.clipboard.writeText(allUUIDs);
        copied = 'all';
        setTimeout(() => copied = null, 2000);
    }

    function clearAll() {
        uuids = [];
    }

    function deleteUUID(id) {
        uuids = uuids.filter(u => u.id !== id);
    }

    $effect(() => {
        if (uuids.length === 0) generateUUID();
    });
</script>

<ToolLayout
    title="UUID Generator"
    description="Generate universally unique identifiers (UUIDs) in v1 or v4 format"
    icon="fa-solid fa-fingerprint"
>
    <!-- Options Section -->
    <ToolSection title="Options">
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ToolSelect
                bind:value={version}
                label="Version"
                options={versionOptions}
            />
            <ToolInput
                type="number"
                bind:value={count}
                label="Count"
                min="1"
                max="20"
            />
            <div class="flex items-end">
                <ToolCheckbox bind:checked={uppercase} label="Uppercase" />
            </div>
            <div class="flex items-end">
                <ToolCheckbox bind:checked={hyphens} label="Include Hyphens" />
            </div>
        </div>

        <div class="flex flex-wrap gap-3 mt-4">
            <ToolButton onclick={generateUUID}>
                <i class="fa-solid fa-rotate"></i>
                Generate
            </ToolButton>
            {#if uuids.length > 0}
                <ToolButton variant="secondary" onclick={copyAll}>
                    <i class="fa-solid fa-copy"></i>
                    {copied === 'all' ? 'Copied!' : 'Copy All'}
                </ToolButton>
                <ToolButton variant="secondary" onclick={clearAll}>
                    <i class="fa-solid fa-trash"></i>
                    Clear
                </ToolButton>
            {/if}
        </div>
    </ToolSection>

    <!-- Results Section -->
    <ToolSection title="Generated UUIDs">
        <div class="uuid-list">
            {#each uuids as uuid (uuid.id)}
                <div class="uuid-item">
                    <code class="uuid-value">{uuid.value}</code>
                    <span class="uuid-time">{uuid.createdAt}</span>
                    <div class="uuid-actions">
                        <button
                            onclick={() => copyToClipboard(uuid.value, uuid.id)}
                            class="uuid-action-btn"
                            title="Copy"
                        >
                            <i class="fa-solid {copied === uuid.id ? 'fa-check' : 'fa-copy'}"></i>
                        </button>
                        <button
                            onclick={() => deleteUUID(uuid.id)}
                            class="uuid-action-btn delete"
                            title="Delete"
                        >
                            <i class="fa-solid fa-times"></i>
                        </button>
                    </div>
                </div>
            {:else}
                <div class="empty-state">
                    Click "Generate" to create UUIDs
                </div>
            {/each}
        </div>
    </ToolSection>

    <!-- Info Section -->
    <ToolSection title="About UUIDs">
        <div class="info-content">
            <p>
                <strong>UUID v4:</strong> Uses random or pseudo-random numbers.
                Has 122 bits of randomness, making collisions extremely unlikely.
            </p>
            <p>
                <strong>UUID v1:</strong> Based on timestamp and MAC address.
                Can be useful when you need time-ordered UUIDs.
            </p>
            <p class="format-info">
                Format: <code>xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx</code><br/>
                M = version, N = variant
            </p>
        </div>
    </ToolSection>
</ToolLayout>

<style>
    .uuid-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .uuid-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem 1rem;
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 8px;
        transition: border-color 0.2s ease;
    }

    .uuid-item:hover {
        border-color: var(--accent);
    }

    .uuid-value {
        flex: 1;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.875rem;
        color: var(--text-primary);
    }

    .uuid-time {
        font-size: 0.75rem;
        color: var(--text-muted);
    }

    .uuid-actions {
        display: flex;
        gap: 0.25rem;
        opacity: 0;
        transition: opacity 0.2s ease;
    }

    .uuid-item:hover .uuid-actions {
        opacity: 1;
    }

    .uuid-action-btn {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        color: var(--text-muted);
        transition: all 0.2s ease;
        background: transparent;
        border: none;
        cursor: pointer;
    }

    .uuid-action-btn:hover {
        color: var(--accent);
        background: var(--bg-tertiary);
    }

    .uuid-action-btn.delete:hover {
        color: #ef4444;
    }

    .empty-state {
        text-align: center;
        padding: 2rem;
        color: var(--text-muted);
    }

    .info-content {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        color: var(--text-secondary);
        font-size: 0.875rem;
    }

    .info-content strong {
        color: var(--text-primary);
    }

    .info-content code {
        background: var(--bg-tertiary);
        padding: 0.125rem 0.375rem;
        border-radius: 4px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8125rem;
    }

    .format-info {
        color: var(--text-muted);
        font-size: 0.8125rem;
    }
</style>
