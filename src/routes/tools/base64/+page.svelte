<script>
    import { browser } from '$app/environment';
    
    let input = $state('');
    let output = $state('');
    let error = $state('');
    let mode = $state('encode');
    let encoding = $state('base64');
    
    // History management
    let history = $state([]);
    let showHistory = $state(false);
    const HISTORY_KEY = 'base64-history';
    const MAX_HISTORY = 20;
    
    // Load history from localStorage
    if (browser) {
        const saved = localStorage.getItem(HISTORY_KEY);
        if (saved) {
            history = JSON.parse(saved);
        }
    }
    
    function saveToHistory(input, output, mode, encoding) {
        if (!input || !input.trim()) return;
        
        const entry = {
            id: Date.now(),
            input: input,
            output: output,
            mode: mode,
            encoding: encoding,
            timestamp: new Date().toISOString(),
            preview: input.length > 50 ? input.substring(0, 50) + '...' : input
        };
        
        // Remove duplicate if exists
        history = history.filter(h => h.input !== input || h.mode !== mode || h.encoding !== encoding);
        
        // Add to beginning and limit size
        history = [entry, ...history].slice(0, MAX_HISTORY);
        
        if (browser) {
            localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        }
    }
    
    function loadFromHistory(entry) {
        input = entry.input;
        mode = entry.mode;
        encoding = entry.encoding;
        showHistory = false;
        processInput();
    }
    
    function deleteFromHistory(id) {
        history = history.filter(h => h.id !== id);
        if (browser) {
            localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        }
    }
    
    function clearHistory() {
        history = [];
        if (browser) {
            localStorage.removeItem(HISTORY_KEY);
        }
    }
    
    const encodings = {
        base64: {
            encode: (str) => btoa(str),
            decode: (str) => atob(str)
        },
        base32: {
            encode: (str) => {
                const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
                let result = '';
                let bits = '';
                
                for (let i = 0; i < str.length; i++) {
                    bits += str.charCodeAt(i).toString(2).padStart(8, '0');
                }
                
                while (bits.length % 5 !== 0) {
                    bits += '0';
                }
                
                for (let i = 0; i < bits.length; i += 5) {
                    const chunk = bits.substr(i, 5);
                    result += alphabet[parseInt(chunk, 2)];
                }
                
                while (result.length % 8 !== 0) {
                    result += '=';
                }
                
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
            encode: (str) => {
                let result = '';
                for (let i = 0; i < str.length; i++) {
                    result += str.charCodeAt(i).toString(16).padStart(2, '0');
                }
                return result;
            },
            decode: (str) => {
                let result = '';
                for (let i = 0; i < str.length; i += 2) {
                    result += String.fromCharCode(parseInt(str.substr(i, 2), 16));
                }
                return result;
            }
        },
        url: {
            encode: (str) => encodeURIComponent(str),
            decode: (str) => decodeURIComponent(str)
        }
    };
    
    const hashes = ['MD5', 'SHA-1', 'SHA-256', 'SHA-512'];
    
    async function processInput() {
        error = '';
        output = '';
        
        if (!input) {
            return;
        }
        
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
                if (mode === 'encode') {
                    output = codec.encode(input);
                } else {
                    output = codec.decode(input);
                }
            }
            
            // Save to history on successful process
            if (output) {
                saveToHistory(input, output, mode, encoding);
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
        processInput();
    }
    
    function copyToClipboard() {
        navigator.clipboard.writeText(output);
    }
    
    function clearAll() {
        input = '';
        output = '';
        error = '';
    }
    
    // Remove automatic processing - user must press button or Enter
</script>

<svelte:head>
    <title>Base64 Encoder | aliirsyaadn</title>
</svelte:head>

<div class="max-w-6xl mx-auto w-full">
    <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
            <span class="poppins">Encoder / Decoder</span>
        </h1>
        <button
            onclick={() => showHistory = !showHistory}
            class="px-4 py-2 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
        >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            History ({history.length})
        </button>
    </div>
    
    {#if showHistory}
        <div class="mb-6 bg-white dark:bg-zinc-900 rounded-lg p-6 border border-gray-200 dark:border-zinc-800">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold">Recent Conversions</h3>
                {#if history.length > 0}
                    <button
                        onclick={clearHistory}
                        class="text-sm px-3 py-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                        Clear All
                    </button>
                {/if}
            </div>
            
            {#if history.length === 0}
                <p class="text-gray-500 dark:text-zinc-500 text-center py-4">No history yet</p>
            {:else}
                <div class="space-y-2 max-h-64 overflow-y-auto">
                    {#each history as item}
                        <div class="flex items-center gap-2 p-3 bg-gray-50 dark:bg-zinc-800 rounded-lg group">
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-mono truncate">{item.preview}</p>
                                <p class="text-xs text-gray-500 dark:text-zinc-500">
                                    {item.encoding} • {item.mode} • {new Date(item.timestamp).toLocaleString()}
                                </p>
                            </div>
                            <button
                                onclick={() => loadFromHistory(item)}
                                class="px-3 py-1 text-sm bg-black dark:bg-white text-white dark:text-black rounded hover:bg-gray-800 dark:hover:bg-gray-200"
                            >
                                Load
                            </button>
                            <button
                                onclick={() => deleteFromHistory(item.id)}
                                class="p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
    
    <div class="mb-6 bg-white dark:bg-zinc-900 rounded-lg p-6 border border-gray-200 dark:border-zinc-800">
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-zinc-300">Mode</label>
                <select
                    bind:value={mode}
                    disabled={encoding.startsWith('hash-')}
                    class="w-full px-4 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white disabled:opacity-50"
                >
                    <option value="encode">Encode</option>
                    <option value="decode">Decode</option>
                </select>
            </div>
            
            <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-zinc-300">Encoding</label>
                <select
                    bind:value={encoding}
                    class="w-full px-4 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                >
                    <optgroup label="Encodings">
                        <option value="base64">Base64</option>
                        <option value="base32">Base32</option>
                        <option value="hex">Hex</option>
                        <option value="url">URL</option>
                    </optgroup>
                    <optgroup label="Hashes">
                        <option value="hash-SHA-1">SHA-1</option>
                        <option value="hash-SHA-256">SHA-256</option>
                        <option value="hash-SHA-384">SHA-384</option>
                        <option value="hash-SHA-512">SHA-512</option>
                    </optgroup>
                </select>
            </div>
            
            <div class="flex items-end">
                <button
                    onclick={clearAll}
                    class="w-full px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                    Clear All
                </button>
            </div>
        </div>
    </div>
    
    {#if error}
        <div class="mb-4 p-4 bg-red-100 dark:bg-red-900/50 border border-red-500 rounded-lg text-red-700 dark:text-red-300">
            {error}
        </div>
    {/if}
    
    <div class="grid lg:grid-cols-2 gap-6">
        <div>
            <div class="flex items-center justify-between mb-2">
                <h2 class="text-xl font-bold poppins text-gray-900 dark:text-white">Input</h2>
                <span class="text-sm text-gray-600 dark:text-zinc-400">{input.length} characters</span>
            </div>
            <textarea
                bind:value={input}
                onkeydown={(e) => { if (e.key === 'Enter' && e.ctrlKey) processInput(); }}
                placeholder={encoding.startsWith('hash-') ? "Enter text to hash..." : mode === 'encode' ? "Enter text to encode..." : "Enter text to decode..."}
                class="w-full h-64 p-4 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-900 dark:text-white font-mono text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-white resize-none"
            ></textarea>
        </div>
        
        <div>
            <div class="flex items-center justify-between mb-2">
                <h2 class="text-xl font-bold poppins text-gray-900 dark:text-white">Output</h2>
                <div class="flex items-center gap-2">
                    {#if output}
                        <span class="text-sm text-gray-600 dark:text-zinc-400">{output.length} characters</span>
                        <button
                            onclick={copyToClipboard}
                            class="p-2 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                            title="Copy to clipboard"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                            </svg>
                        </button>
                    {/if}
                </div>
            </div>
            <textarea
                bind:value={output}
                readonly
                class="w-full h-64 p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-900 dark:text-white font-mono text-sm focus:outline-none resize-none"
            ></textarea>
        </div>
    </div>
    
    <div class="mt-6 flex justify-center gap-4">
        <button
            onclick={processInput}
            class="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center gap-2"
        >
            {encoding.startsWith('hash-') ? 'Generate Hash' : mode === 'encode' ? 'Encode' : 'Decode'}
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
            </svg>
        </button>
        <button
            onclick={clearAll}
            class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
            Clear
        </button>
        <span class="text-sm text-gray-500 dark:text-zinc-500 self-center">or press Ctrl+Enter</span>
    </div>
    
    {#if !encoding.startsWith('hash-')}
        <div class="mt-4 flex justify-center">
            <button
                onclick={swapInputOutput}
                class="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                </svg>
                Swap Input/Output
            </button>
        </div>
    {/if}
    
    <div class="mt-8 grid md:grid-cols-2 gap-6">
        <div class="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-gray-200 dark:border-zinc-800">
            <h2 class="text-xl font-bold mb-4 poppins text-gray-900 dark:text-white">Encoding Types</h2>
            <ul class="space-y-2 text-gray-700 dark:text-zinc-300 text-sm">
                <li><strong class="text-gray-900 dark:text-white">Base64:</strong> Binary-to-text encoding using 64 characters</li>
                <li><strong class="text-gray-900 dark:text-white">Base32:</strong> Binary-to-text encoding using 32 characters</li>
                <li><strong class="text-gray-900 dark:text-white">Hex:</strong> Hexadecimal representation</li>
                <li><strong class="text-gray-900 dark:text-white">URL:</strong> URL-safe encoding for web</li>
            </ul>
        </div>
        
        <div class="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-gray-200 dark:border-zinc-800">
            <h2 class="text-xl font-bold mb-4 poppins text-gray-900 dark:text-white">Hash Functions</h2>
            <ul class="space-y-2 text-gray-700 dark:text-zinc-300 text-sm">
                <li><strong class="text-gray-900 dark:text-white">SHA-1:</strong> 160-bit hash (deprecated for security)</li>
                <li><strong class="text-gray-900 dark:text-white">SHA-256:</strong> 256-bit hash (recommended)</li>
                <li><strong class="text-gray-900 dark:text-white">SHA-384:</strong> 384-bit hash</li>
                <li><strong class="text-gray-900 dark:text-white">SHA-512:</strong> 512-bit hash</li>
            </ul>
        </div>
    </div>
</div>