<script>
    let input = $state('');
    let output = $state('');
    let error = $state('');
    let history = $state([]);
    let showHistory = $state(false);
    
    $effect(() => {
        const savedHistory = localStorage.getItem('jsonEscapeHistory');
        if (savedHistory) {
            history = JSON.parse(savedHistory);
        }
    });
    
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
        try {
            output = escapeJson(input);
            addToHistory(input, 'escape');
        } catch (e) {
            error = 'Error escaping text';
        }
    }
    
    function handleUnescape() {
        if (!input.trim()) {
            error = 'Please enter some text to unescape';
            return;
        }
        
        error = '';
        try {
            output = unescapeJson(input);
            addToHistory(input, 'unescape');
        } catch (e) {
            error = 'Error unescaping text';
        }
    }
    
    function addToHistory(content, type) {
        const newEntry = {
            id: Date.now(),
            content,
            type,
            timestamp: new Date().toISOString(),
            preview: content.length > 50 ? content.substring(0, 50) + '...' : content
        };
        
        history = [newEntry, ...history.slice(0, 9)];
        localStorage.setItem('jsonEscapeHistory', JSON.stringify(history));
    }
    
    function loadFromHistory(item) {
        input = item.content;
        showHistory = false;
    }
    
    function deleteFromHistory(id) {
        history = history.filter(h => h.id !== id);
        localStorage.setItem('jsonEscapeHistory', JSON.stringify(history));
    }
    
    function clearHistory() {
        history = [];
        localStorage.removeItem('jsonEscapeHistory');
    }
    
    function copyToClipboard() {
        navigator.clipboard.writeText(output);
    }
    
    function clear() {
        input = '';
        output = '';
        error = '';
    }
</script>

<svelte:head>
    <title>JSON Escape/Unescape Tool | aliirsyaadn</title>
</svelte:head>

<div class="max-w-4xl mx-auto w-full">
    <h1 class="text-3xl font-bold mb-6 poppins">JSON Escape/Unescape Tool</h1>
    
    <div class="mb-6">
        <button
            onclick={() => showHistory = !showHistory}
            class="ml-auto px-4 py-2 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
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
                <h3 class="text-lg font-semibold">Recent History</h3>
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
                                <div class="flex items-center gap-2 mb-1">
                                    <span class={"text-xs font-medium px-2 py-0.5 rounded " + (item.type === 'escape' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400')}>
                                        {item.type === 'escape' ? 'Escaped' : 'Unescaped'}
                                    </span>
                                    <p class="text-xs text-gray-500 dark:text-zinc-500">
                                        {new Date(item.timestamp).toLocaleString()}
                                    </p>
                                </div>
                                <p class="text-sm font-mono truncate">{item.preview || item.content}</p>
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
    
    <div class="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-gray-200 dark:border-zinc-800 mb-6">
        <div class="mb-4">
            <label for="input" class="block text-sm font-medium mb-2">Input Text</label>
            <textarea
                id="input"
                bind:value={input}
                placeholder="Enter text to escape or unescape..."
                class="w-full h-48 p-4 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white font-mono text-sm"
            ></textarea>
            <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {input.length} characters
            </div>
        </div>
        
        {#if error}
            <div class="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
                {error}
            </div>
        {/if}
        
        <div class="flex gap-4 flex-wrap">
            <button
                onclick={handleEscape}
                class="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
                Escape
            </button>
            <button
                onclick={handleUnescape}
                class="px-6 py-2 bg-purple-600 dark:bg-purple-500 text-white rounded-lg hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
            >
                Unescape
            </button>
            <button
                onclick={clear}
                class="px-6 py-2 bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors"
            >
                Clear
            </button>
        </div>
    </div>
    
    {#if output}
        <div class="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-gray-200 dark:border-zinc-800 mb-6">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-lg font-semibold">Output</h2>
                <button
                    onclick={copyToClipboard}
                    class="px-4 py-2 bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors text-sm"
                >
                    Copy to Clipboard
                </button>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg font-mono text-sm whitespace-pre-wrap break-all">
                {output}
            </div>
            <div class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {output.length} characters
            </div>
        </div>
    {/if}
    
    <div class="mt-8 bg-gray-50 dark:bg-zinc-800 rounded-lg p-6">
        <h2 class="text-lg font-semibold mb-4">About JSON Escape/Unescape</h2>
        <div class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p>This tool helps you escape or unescape special characters in JSON strings.</p>
            <div>
                <p class="font-medium text-gray-700 dark:text-gray-300 mb-2">Escape converts:</p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                    <li>Double quotes (") → \"</li>
                    <li>Backslashes (\) → \\</li>
                    <li>Newlines → \n</li>
                    <li>Tabs → \t</li>
                    <li>And other special characters</li>
                </ul>
            </div>
            <div>
                <p class="font-medium text-gray-700 dark:text-gray-300 mb-2">Unescape reverses the process:</p>
                <ul class="list-disc list-inside space-y-1 ml-4">
                    <li>\" → Double quotes (")</li>
                    <li>\\ → Backslashes (\)</li>
                    <li>\n → Newlines</li>
                    <li>\t → Tabs</li>
                </ul>
            </div>
            <p>Useful when working with JSON data in strings, API responses, or configuration files.</p>
        </div>
    </div>
</div>