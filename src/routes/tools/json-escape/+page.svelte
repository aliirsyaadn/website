<script>
    import { ToolLayout, ToolSection, ToolButton, ToolTextarea } from '../../../components/tools';

    let input = $state('');
    let output = $state('');
    let error = $state('');
    let copied = $state(false);

    function escapeJson(str) {
        return str
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '\\r')
            .replace(/\t/g, '\\t')
            .replace(/\f/g, '\\f')
            .replace(/\b/g, '\\b');
    }

    function unescapeJson(str) {
        return str
            .replace(/\\"/g, '"')
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\r')
            .replace(/\\t/g, '\t')
            .replace(/\\f/g, '\f')
            .replace(/\\b/g, '\b')
            .replace(/\\\\/g, '\\');
    }

    function handleEscape() {
        if (!input.trim()) {
            error = 'Please enter some text to escape';
            return;
        }
        error = '';
        output = escapeJson(input);
    }

    function handleUnescape() {
        if (!input.trim()) {
            error = 'Please enter some text to unescape';
            return;
        }
        error = '';
        output = unescapeJson(input);
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
    title="JSON Escape"
    description="Escape and unescape special characters in JSON strings"
    icon="fa-solid fa-shield-halved"
>
    <!-- Input -->
    <ToolSection title="Input">
        <ToolTextarea
            bind:value={input}
            placeholder="Enter text to escape or unescape..."
            rows={8}
            monospace
        />
        <div class="flex justify-between items-center mt-2">
            <span class="char-count">{input.length} characters</span>
        </div>
    </ToolSection>

    <!-- Error -->
    {#if error}
        <div class="error-message">
            <i class="fa-solid fa-circle-exclamation"></i>
            {error}
        </div>
    {/if}

    <!-- Actions -->
    <div class="flex flex-wrap gap-3 justify-center">
        <ToolButton onclick={handleEscape}>
            <i class="fa-solid fa-arrow-right"></i>
            Escape
        </ToolButton>
        <ToolButton variant="secondary" onclick={handleUnescape}>
            <i class="fa-solid fa-arrow-left"></i>
            Unescape
        </ToolButton>
        <ToolButton variant="secondary" onclick={clearAll}>
            <i class="fa-solid fa-trash"></i>
            Clear
        </ToolButton>
    </div>

    <!-- Output -->
    {#if output}
        <ToolSection title="Output">
            <div class="flex justify-between items-center mb-2">
                <span class="char-count">{output.length} characters</span>
                <button onclick={copyToClipboard} class="copy-btn">
                    <i class="fa-solid {copied ? 'fa-check' : 'fa-copy'}"></i>
                    {copied ? 'Copied!' : 'Copy'}
                </button>
            </div>
            <div class="output-box">
                {output}
            </div>
        </ToolSection>
    {/if}

    <!-- Info -->
    <ToolSection title="Character Conversions">
        <div class="grid md:grid-cols-2 gap-6">
            <div>
                <h4 class="info-heading">Escape converts:</h4>
                <ul class="info-list">
                    <li><code>"</code> → <code>\"</code></li>
                    <li><code>\</code> → <code>\\</code></li>
                    <li>Newlines → <code>\n</code></li>
                    <li>Tabs → <code>\t</code></li>
                    <li>Carriage returns → <code>\r</code></li>
                </ul>
            </div>
            <div>
                <h4 class="info-heading">Unescape reverses:</h4>
                <ul class="info-list">
                    <li><code>\"</code> → <code>"</code></li>
                    <li><code>\\</code> → <code>\</code></li>
                    <li><code>\n</code> → Newlines</li>
                    <li><code>\t</code> → Tabs</li>
                    <li><code>\r</code> → Carriage returns</li>
                </ul>
            </div>
        </div>
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

    .output-box {
        padding: 1rem;
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 8px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.875rem;
        color: var(--text-primary);
        white-space: pre-wrap;
        word-break: break-all;
    }

    .info-heading {
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: 0.75rem;
        font-size: 0.875rem;
    }

    .info-list {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        font-size: 0.8125rem;
        color: var(--text-secondary);
    }

    .info-list code {
        background: var(--bg-tertiary);
        padding: 0.125rem 0.375rem;
        border-radius: 4px;
        font-family: 'JetBrains Mono', monospace;
    }
</style>
