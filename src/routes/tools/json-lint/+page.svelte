<script>
    import { browser } from '$app/environment';
    
    let input = $state('');
    let output = $state('');
    let error = $state('');
    let formatted = $state(true);
    let compressed = $state(false);
    
    // History management
    let history = $state([]);
    let showHistory = $state(false);
    const HISTORY_KEY = 'json-lint-history';
    const MAX_HISTORY = 20;
    
    // Load history from localStorage
    if (browser) {
        const saved = localStorage.getItem(HISTORY_KEY);
        if (saved) {
            history = JSON.parse(saved);
        }
    }
    
    function saveToHistory(json) {
        if (!json || !json.trim()) return;
        
        const entry = {
            id: Date.now(),
            json: json,
            timestamp: new Date().toISOString(),
            preview: json.length > 100 ? json.substring(0, 100) + '...' : json
        };
        
        // Remove duplicate if exists
        history = history.filter(h => h.json !== json);
        
        // Add to beginning and limit size
        history = [entry, ...history].slice(0, MAX_HISTORY);
        
        if (browser) {
            localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        }
    }
    
    function loadFromHistory(entry) {
        input = entry.json;
        showHistory = false;
        processJSON();
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
    
    function processJSON() {
        error = '';
        output = '';
        
        if (!input.trim()) {
            error = 'Please enter JSON data';
            return;
        }
        
        try {
            const parsed = JSON.parse(input);
            
            if (compressed) {
                output = JSON.stringify(parsed);
            } else if (formatted) {
                output = JSON.stringify(parsed, null, 2);
            } else {
                output = JSON.stringify(parsed, null, 4);
            }
            
            // Save to history on successful parse
            saveToHistory(input);
            
        } catch (e) {
            error = `Invalid JSON: ${e.message}`;
        }
    }
    
    function copyToClipboard() {
        navigator.clipboard.writeText(output);
    }
    
    function clearAll() {
        input = '';
        output = '';
        error = '';
    }
    
    function beautify() {
        formatted = true;
        compressed = false;
        processJSON();
    }
    
    function compress() {
        compressed = true;
        formatted = false;
        processJSON();
    }
</script>

<svelte:head>
    <title>JSON Lint | aliirsyaadn</title>
</svelte:head>

<div class="max-w-6xl mx-auto w-full">
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
        <span class="poppins">JSON Lint</span>
    </h1>
    
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-wrap gap-4">
            <button
                onclick={processJSON}
                class="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
                Validate JSON
            </button>
            <button
                onclick={beautify}
                class="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
                Beautify
            </button>
            <button
                onclick={compress}
                class="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
                Compress
            </button>
            <button
                onclick={clearAll}
                class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
            >
                Clear
            </button>
        </div>
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
                <h3 class="text-lg font-semibold">Recent JSON</h3>
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
                                    {new Date(item.timestamp).toLocaleString()}
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
                placeholder="Paste your JSON here..."
                onkeydown={(e) => { if (e.key === 'Enter' && e.ctrlKey) processJSON(); }}
                class="w-full h-96 p-4 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-900 dark:text-white font-mono text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-white resize-none"
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
                class="w-full h-96 p-4 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-900 dark:text-white font-mono text-sm focus:outline-none resize-none"
            ></textarea>
        </div>
    </div>
    
    <div class="mt-8 bg-white dark:bg-zinc-900 rounded-lg p-6 border border-gray-200 dark:border-zinc-800">
        <h2 class="text-xl font-bold mb-4 poppins text-gray-900 dark:text-white">Features</h2>
        <ul class="space-y-2 text-gray-700 dark:text-zinc-300">
            <li class="flex items-start gap-2">
                <svg class="w-5 h-5 text-black dark:text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Validate JSON syntax and structure</span>
            </li>
            <li class="flex items-start gap-2">
                <svg class="w-5 h-5 text-black dark:text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Beautify JSON with proper indentation</span>
            </li>
            <li class="flex items-start gap-2">
                <svg class="w-5 h-5 text-black dark:text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Compress JSON by removing whitespace</span>
            </li>
            <li class="flex items-start gap-2">
                <svg class="w-5 h-5 text-black dark:text-white mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Real-time validation as you type</span>
            </li>
        </ul>
    </div>
</div>