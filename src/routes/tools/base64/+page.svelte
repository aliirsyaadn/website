<script>
    import { ToolLayout, ToolSection, ToolButton, ToolSelect, ToolTextarea } from '../../../components/tools';

    let input = $state('');
    let output = $state('');
    let error = $state('');
    let mode = $state('encode');
    let encoding = $state('base64');
    let copied = $state(false);

    const modeOptions = [
        { value: 'encode', label: 'Encode' },
        { value: 'decode', label: 'Decode' }
    ];

    const encodingOptions = [
        { value: 'base64', label: 'Base64' },
        { value: 'base32', label: 'Base32' },
        { value: 'hex', label: 'Hexadecimal' },
        { value: 'url', label: 'URL Encoding' },
        { value: 'hash-SHA-256', label: 'SHA-256 Hash' },
        { value: 'hash-SHA-512', label: 'SHA-512 Hash' }
    ];

    const encodings = {
        base64: {
            encode: (str) => btoa(str),
            decode: (str) => atob(str)
        },
        base32: {
            encode: (str) => {
                const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
                let result = '', bits = '';
                for (let i = 0; i < str.length; i++) {
                    bits += str.charCodeAt(i).toString(2).padStart(8, '0');
                }
                while (bits.length % 5 !== 0) bits += '0';
                for (let i = 0; i < bits.length; i += 5) {
                    result += alphabet[parseInt(bits.substr(i, 5), 2)];
                }
                while (result.length % 8 !== 0) result += '=';
                return result;
            },
            decode: (str) => {
                const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
                let bits = '';
                str = str.replace(/=/g, '');
                for (let i = 0; i < str.length; i++) {
                    const index = alphabet.indexOf(str[i]);
                    if (index === -1) throw new Error('Invalid Base32 character');
                    bits += index.toString(2).padStart(5, '0');
                }
                let result = '';
                for (let i = 0; i < bits.length - 7; i += 8) {
                    result += String.fromCharCode(parseInt(bits.substr(i, 8), 2));
                }
                return result;
            }
        },
        hex: {
            encode: (str) => Array.from(str).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(''),
            decode: (str) => str.match(/.{2}/g).map(byte => String.fromCharCode(parseInt(byte, 16))).join('')
        },
        url: {
            encode: (str) => encodeURIComponent(str),
            decode: (str) => decodeURIComponent(str)
        }
    };

    async function processInput() {
        error = '';
        output = '';
        if (!input) return;

        try {
            if (encoding.startsWith('hash-')) {
                const algorithm = encoding.replace('hash-', '');
                const encoder = new TextEncoder();
                const data = encoder.encode(input);
                const hashBuffer = await crypto.subtle.digest(algorithm, data);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                output = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            } else {
                const codec = encodings[encoding];
                output = mode === 'encode' ? codec.encode(input) : codec.decode(input);
            }
        } catch (e) {
            error = `Error: ${e.message}`;
        }
    }

    function swapInputOutput() {
        const temp = input;
        input = output;
        output = temp;
        mode = mode === 'encode' ? 'decode' : 'encode';
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
    title="Encoder / Decoder"
    description="Encode, decode, and hash text using various formats"
    icon="fa-solid fa-shuffle"
>
    <!-- Options -->
    <ToolSection title="Options">
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <ToolSelect
                bind:value={mode}
                label="Mode"
                options={modeOptions}
                disabled={encoding.startsWith('hash-')}
            />
            <ToolSelect
                bind:value={encoding}
                label="Encoding"
                options={encodingOptions}
            />
            <div class="flex items-end">
                <ToolButton variant="secondary" onclick={clearAll}>
                    <i class="fa-solid fa-trash"></i>
                    Clear
                </ToolButton>
            </div>
        </div>
    </ToolSection>

    <!-- Error -->
    {#if error}
        <div class="error-message">
            <i class="fa-solid fa-circle-exclamation"></i>
            {error}
        </div>
    {/if}

    <!-- Input/Output -->
    <div class="grid lg:grid-cols-2 gap-6">
        <ToolSection title="Input">
            <div class="char-count">{input.length} characters</div>
            <ToolTextarea
                bind:value={input}
                placeholder={encoding.startsWith('hash-') ? "Enter text to hash..." : mode === 'encode' ? "Enter text to encode..." : "Enter encoded text to decode..."}
                rows={10}
                monospace
            />
        </ToolSection>

        <ToolSection title="Output">
            <div class="flex justify-between items-center">
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
                placeholder="Result will appear here..."
                rows={10}
                monospace
                readonly
            />
        </ToolSection>
    </div>

    <!-- Actions -->
    <div class="flex justify-center gap-4 flex-wrap">
        <ToolButton onclick={processInput}>
            <i class="fa-solid fa-play"></i>
            {encoding.startsWith('hash-') ? 'Generate Hash' : mode === 'encode' ? 'Encode' : 'Decode'}
        </ToolButton>
        {#if !encoding.startsWith('hash-') && output}
            <ToolButton variant="secondary" onclick={swapInputOutput}>
                <i class="fa-solid fa-arrows-rotate"></i>
                Swap & Reverse
            </ToolButton>
        {/if}
    </div>

    <!-- Info -->
    <div class="grid md:grid-cols-2 gap-6">
        <ToolSection title="Encodings">
            <ul class="info-list">
                <li><strong>Base64:</strong> Binary-to-text encoding using 64 characters</li>
                <li><strong>Base32:</strong> Binary-to-text encoding using 32 characters</li>
                <li><strong>Hex:</strong> Hexadecimal representation</li>
                <li><strong>URL:</strong> URL-safe encoding for web</li>
            </ul>
        </ToolSection>

        <ToolSection title="Hash Functions">
            <ul class="info-list">
                <li><strong>SHA-256:</strong> 256-bit cryptographic hash (recommended)</li>
                <li><strong>SHA-512:</strong> 512-bit cryptographic hash</li>
            </ul>
        </ToolSection>
    </div>
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
        margin-bottom: 0.5rem;
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

    .info-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-size: 0.875rem;
        color: var(--text-secondary);
    }

    .info-list strong {
        color: var(--text-primary);
    }
</style>
