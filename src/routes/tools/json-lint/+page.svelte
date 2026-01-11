<script>
    import { browser } from '$app/environment';
    import { ToolLayout, ToolSection, ToolButton, ToolTextarea } from '../../../components/tools';

    let input = $state('');
    let output = $state('');
    let error = $state('');
    let copied = $state(false);

    function processJSON(compress = false) {
        error = '';
        output = '';

        if (!input.trim()) {
            error = 'Please enter JSON data';
            return;
        }

        try {
            const parsed = JSON.parse(input);
            output = compress ? JSON.stringify(parsed) : JSON.stringify(parsed, null, 2);
        } catch (e) {
            error = `Invalid JSON: ${e.message}`;
        }
    }

    async function copyToClipboard() {
        await navigator.clipboard.writeText(output);
        copied = true;
        setTimeout(() => copied = false, 2000);
    }

    function clearAll() {
        input = '';
        output = '';
        error = '';
    }
</script>

<ToolLayout
    title="JSON Lint"
    description="Validate, beautify, and compress JSON data"
    icon="fa-solid fa-code"
>
    <!-- Actions -->
    <ToolSection title="Actions">
        <div class="flex flex-wrap gap-3">
            <ToolButton onclick={() => processJSON(false)}>
                <i class="fa-solid fa-check"></i>
                Validate & Beautify
            </ToolButton>
            <ToolButton variant="secondary" onclick={() => processJSON(true)}>
                <i class="fa-solid fa-compress"></i>
                Compress
            </ToolButton>
            <ToolButton variant="secondary" onclick={clearAll}>
                <i class="fa-solid fa-trash"></i>
                Clear
            </ToolButton>
        </div>
    </ToolSection>

    <!-- Error display -->
    {#if error}
        <div class="error-message">
            <i class="fa-solid fa-circle-exclamation"></i>
            {error}
        </div>
    {/if}

    <!-- Input/Output -->
    <div class="grid lg:grid-cols-2 gap-6">
        <ToolSection title="Input">
            <div class="flex items-center justify-between mb-2">
                <span class="char-count">{input.length} characters</span>
            </div>
            <ToolTextarea
                bind:value={input}
                placeholder="Paste your JSON here..."
                rows={16}
                monospace
            />
            <p class="hint">Press Ctrl+Enter to validate</p>
        </ToolSection>

        <ToolSection title="Output">
            <div class="flex items-center justify-between mb-2">
                <span class="char-count">{output.length} characters</span>
                {#if output}
                    <button onclick={copyToClipboard} class="copy-btn">
                        <i class="fa-solid {copied ? 'fa-check' : 'fa-copy'}"></i>
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                {/if}
            </div>
            <ToolTextarea
                bind:value={output}
                placeholder="Formatted JSON will appear here..."
                rows={16}
                monospace
                readonly
            />
        </ToolSection>
    </div>

    <!-- Info -->
    <ToolSection title="Features">
        <ul class="feature-list">
            <li><i class="fa-solid fa-check"></i> Validate JSON syntax and structure</li>
            <li><i class="fa-solid fa-check"></i> Beautify JSON with proper indentation</li>
            <li><i class="fa-solid fa-check"></i> Compress JSON by removing whitespace</li>
            <li><i class="fa-solid fa-check"></i> Copy formatted output to clipboard</li>
        </ul>
    </ToolSection>
</ToolLayout>

<style>
    .error-message {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 1rem;
        background: rgba(239, 68, 68, 0.1);
        border: 1px solid #ef4444;
        border-radius: 8px;
        color: #ef4444;
        font-size: 0.875rem;
    }

    .char-count {
        font-size: 0.75rem;
        color: var(--text-muted);
    }

    .copy-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem 0.75rem;
        font-size: 0.75rem;
        color: var(--text-secondary);
        background: var(--bg-tertiary);
        border: 1px solid var(--border);
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .copy-btn:hover {
        color: var(--accent);
        border-color: var(--accent);
    }

    .hint {
        font-size: 0.75rem;
        color: var(--text-muted);
        margin-top: 0.5rem;
    }

    .feature-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        color: var(--text-secondary);
        font-size: 0.875rem;
    }

    .feature-list li {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .feature-list i {
        color: var(--accent);
        width: 16px;
    }
</style>
