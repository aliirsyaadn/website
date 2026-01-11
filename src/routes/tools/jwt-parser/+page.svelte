<script>
    import { ToolLayout, ToolSection, ToolButton, ToolTextarea, ToolSelect, ToolInput } from '../../../components/tools';

    let jwtInput = $state('');
    let header = $state(null);
    let payload = $state(null);
    let signature = $state('');
    let error = $state('');
    let copied = $state(null);

    function decodeJWT() {
        error = '';
        header = null;
        payload = null;
        signature = '';

        if (!jwtInput.trim()) {
            error = 'Please enter a JWT token';
            return;
        }

        const parts = jwtInput.trim().split('.');
        if (parts.length !== 3) {
            error = 'Invalid JWT format. Expected 3 parts separated by dots.';
            return;
        }

        try {
            header = JSON.parse(atob(parts[0]));
            payload = JSON.parse(atob(parts[1]));
            signature = parts[2];
        } catch (e) {
            error = 'Invalid JWT: Unable to decode the token.';
        }
    }

    function formatJSON(obj) {
        return JSON.stringify(obj, null, 2);
    }

    function formatDate(timestamp) {
        const isMilliseconds = timestamp.toString().length === 13;
        const date = new Date(isMilliseconds ? timestamp : timestamp * 1000);
        return date.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' });
    }

    function isEpochField(key) {
        return ['iat', 'exp', 'nbf', 'auth_time'].includes(key);
    }

    async function copyToClipboard(text, id) {
        await navigator.clipboard.writeText(text);
        copied = id;
        setTimeout(() => copied = null, 2000);
    }

    function clearAll() {
        jwtInput = '';
        header = null;
        payload = null;
        signature = '';
        error = '';
    }
</script>

<ToolLayout
    title="JWT Parser"
    description="Decode and inspect JSON Web Tokens"
    icon="fa-solid fa-key"
>
    <!-- Input -->
    <ToolSection title="JWT Token">
        <ToolTextarea
            bind:value={jwtInput}
            placeholder="Paste your JWT token here (e.g., eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
            rows={4}
            monospace
        />
        <div class="flex gap-3 mt-4">
            <ToolButton onclick={decodeJWT}>
                <i class="fa-solid fa-unlock"></i>
                Decode JWT
            </ToolButton>
            <ToolButton variant="secondary" onclick={clearAll}>
                <i class="fa-solid fa-trash"></i>
                Clear
            </ToolButton>
        </div>
    </ToolSection>

    <!-- Error -->
    {#if error}
        <div class="error-message">
            <i class="fa-solid fa-circle-exclamation"></i>
            {error}
        </div>
    {/if}

    <!-- Decoded parts -->
    {#if header || payload}
        <div class="grid md:grid-cols-3 gap-6">
            <!-- Header -->
            <ToolSection>
                <div class="section-header header-color">
                    <span>Header</span>
                    {#if header}
                        <button onclick={() => copyToClipboard(formatJSON(header), 'header')} class="copy-icon">
                            <i class="fa-solid {copied === 'header' ? 'fa-check' : 'fa-copy'}"></i>
                        </button>
                    {/if}
                </div>
                {#if header}
                    <pre class="json-content">{formatJSON(header)}</pre>
                {/if}
            </ToolSection>

            <!-- Payload -->
            <ToolSection>
                <div class="section-header payload-color">
                    <span>Payload</span>
                    {#if payload}
                        <button onclick={() => copyToClipboard(formatJSON(payload), 'payload')} class="copy-icon">
                            <i class="fa-solid {copied === 'payload' ? 'fa-check' : 'fa-copy'}"></i>
                        </button>
                    {/if}
                </div>
                {#if payload}
                    <div class="json-content">
                        {#each Object.entries(payload) as [key, value]}
                            <div class="payload-line">
                                <span class="key">"{key}":</span>
                                <span class="value">
                                    {JSON.stringify(value)}
                                    {#if isEpochField(key) && typeof value === 'number'}
                                        <span class="date-tooltip">({formatDate(value)})</span>
                                    {/if}
                                </span>
                            </div>
                        {/each}
                    </div>
                {/if}
            </ToolSection>

            <!-- Signature -->
            <ToolSection>
                <div class="section-header signature-color">
                    <span>Signature</span>
                    {#if signature}
                        <button onclick={() => copyToClipboard(signature, 'signature')} class="copy-icon">
                            <i class="fa-solid {copied === 'signature' ? 'fa-check' : 'fa-copy'}"></i>
                        </button>
                    {/if}
                </div>
                {#if signature}
                    <p class="signature-text">{signature}</p>
                {/if}
            </ToolSection>
        </div>
    {/if}

    <!-- Info -->
    <ToolSection title="About JWT">
        <div class="info-grid">
            <div>
                <strong>Header:</strong> Contains the token type and signing algorithm
            </div>
            <div>
                <strong>Payload:</strong> Contains the claims (data) like user info, expiration
            </div>
            <div>
                <strong>Signature:</strong> Verifies the token hasn't been tampered with
            </div>
            <div>
                <strong>Common Claims:</strong> iat (issued at), exp (expiration), sub (subject)
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

    .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-weight: 600;
        font-size: 1rem;
        margin-bottom: 1rem;
    }

    .header-color { color: #f87171; }
    .payload-color { color: #a78bfa; }
    .signature-color { color: #60a5fa; }

    .copy-icon {
        padding: 0.25rem;
        color: var(--text-muted);
        background: transparent;
        border: none;
        cursor: pointer;
        transition: color 0.2s ease;
    }

    .copy-icon:hover {
        color: var(--accent);
    }

    .json-content {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8125rem;
        line-height: 1.6;
        color: var(--text-secondary);
        white-space: pre-wrap;
        word-break: break-all;
    }

    .payload-line {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem;
    }

    .key { color: #60a5fa; }
    .value { color: var(--text-primary); }

    .date-tooltip {
        color: var(--accent);
        font-size: 0.75rem;
    }

    .signature-text {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.8125rem;
        color: var(--text-secondary);
        word-break: break-all;
    }

    .info-grid {
        display: grid;
        gap: 0.75rem;
        font-size: 0.875rem;
        color: var(--text-secondary);
    }

    .info-grid strong {
        color: var(--text-primary);
    }
</style>
