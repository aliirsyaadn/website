<script>
    import { browser } from '$app/environment';
    
    let jwtInput = $state('');
    let header = $state(null);
    let payload = $state(null);
    let signature = $state('');
    let error = $state('');
    let activeTab = $state('decode');
    
    let generateAlg = $state('HS256');
    let generatePayload = $state('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}');
    let generateSecret = $state('your-256-bit-secret');
    let generatedJWT = $state('');
    
    // History management
    let history = $state([]);
    let showHistory = $state(false);
    const HISTORY_KEY = 'jwt-parser-history';
    const MAX_HISTORY = 20;
    
    // Load history from localStorage
    if (browser) {
        const saved = localStorage.getItem(HISTORY_KEY);
        if (saved) {
            history = JSON.parse(saved);
        }
    }
    
    function saveToHistory(jwt, type = 'decode') {
        if (!jwt || !jwt.trim()) return;
        
        const entry = {
            id: Date.now(),
            jwt: jwt,
            type: type,
            timestamp: new Date().toISOString(),
            preview: jwt.length > 50 ? jwt.substring(0, 50) + '...' : jwt
        };
        
        // Remove duplicate if exists
        history = history.filter(h => h.jwt !== jwt);
        
        // Add to beginning and limit size
        history = [entry, ...history].slice(0, MAX_HISTORY);
        
        if (browser) {
            localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        }
    }
    
    function loadFromHistory(entry) {
        jwtInput = entry.jwt;
        showHistory = false;
        decodeJWT();
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
            // Try to decode header
            let decodedHeader;
            try {
                decodedHeader = JSON.parse(atob(parts[0]));
            } catch (e) {
                error = 'Invalid JWT: The header is not properly base64 encoded or contains invalid JSON.';
                return;
            }
            
            // Try to decode payload
            let decodedPayload;
            try {
                decodedPayload = JSON.parse(atob(parts[1]));
            } catch (e) {
                error = 'Invalid JWT: The payload is not properly base64 encoded or contains invalid JSON.';
                return;
            }
            
            header = decodedHeader;
            payload = decodedPayload;
            signature = parts[2];
            
            // Save to history on successful decode
            saveToHistory(jwtInput, 'decode');
            
        } catch (e) {
            error = 'Invalid JWT: Unable to decode the token. Please check if it\'s a valid JWT.';
        }
    }
    
    function generateJWT() {
        error = '';
        generatedJWT = '';
        
        try {
            const payloadObj = JSON.parse(generatePayload);
            
            const headerObj = {
                alg: generateAlg,
                typ: 'JWT'
            };
            
            const base64Header = btoa(JSON.stringify(headerObj));
            const base64Payload = btoa(JSON.stringify(payloadObj));
            
            // Note: This is a simplified version. In production, use a proper crypto library
            const mockSignature = btoa(generateSecret + base64Header + base64Payload).replace(/=/g, '');
            
            generatedJWT = `${base64Header}.${base64Payload}.${mockSignature}`;
            
            // Save to history on successful generation
            saveToHistory(generatedJWT, 'generate');
            
        } catch (e) {
            error = `Failed to generate JWT: ${e.message}`;
        }
    }
    
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text);
    }
    
    function formatJSON(obj) {
        return JSON.stringify(obj, null, 2);
    }
    
    // Remove automatic decode - user must press button or Enter
</script>

<svelte:head>
    <title>JWT Parser | aliirsyaadn</title>
</svelte:head>

<div class="max-w-6xl mx-auto w-full">
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
        <span class="poppins">JWT Parser</span>
    </h1>
    
    <div class="mb-6">
        <div class="flex gap-2 border-b border-gray-200 dark:border-zinc-800">
            <button
                onclick={() => activeTab = 'decode'}
                class={"px-6 py-3 font-semibold transition-colors " + 
                    (activeTab === 'decode' 
                        ? "text-black dark:text-white border-b-2 border-black dark:border-white" 
                        : "text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white")}
            >
                Decode JWT
            </button>
            <button
                onclick={() => activeTab = 'generate'}
                class={"px-6 py-3 font-semibold transition-colors " + 
                    (activeTab === 'generate' 
                        ? "text-black dark:text-white border-b-2 border-black dark:border-white" 
                        : "text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-white")}
            >
                Generate JWT
            </button>
        </div>
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
                <h3 class="text-lg font-semibold">Recent JWTs</h3>
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
    
    {#if activeTab === 'decode'}
        <div class="space-y-6">
            <div>
                <label class="block text-lg font-semibold mb-2 poppins text-gray-900 dark:text-white">JWT Token</label>
                <textarea
                    bind:value={jwtInput}
                    placeholder="Paste your JWT token here..."
                    onkeydown={(e) => { if (e.key === 'Enter' && e.ctrlKey) decodeJWT(); }}
                    class="w-full h-32 p-4 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-900 dark:text-white font-mono text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-white resize-none"
                ></textarea>
                <div class="mt-4 flex gap-4">
                    <button
                        onclick={decodeJWT}
                        class="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    >
                        Decode JWT
                    </button>
                    <span class="text-sm text-gray-500 dark:text-zinc-500 self-center">or press Ctrl+Enter</span>
                </div>
            </div>
            
            {#if header || payload}
                <div class="grid md:grid-cols-3 gap-6">
                    <div class="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-gray-200 dark:border-zinc-800">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-xl font-bold text-red-400 poppins">Header</h3>
                            {#if header}
                                <button
                                    onclick={() => copyToClipboard(formatJSON(header))}
                                    class="p-2 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                                    title="Copy"
                                >
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                    </svg>
                                </button>
                            {/if}
                        </div>
                        {#if header}
                            <pre class="text-sm font-mono text-gray-700 dark:text-zinc-300 overflow-x-auto">{formatJSON(header)}</pre>
                        {:else}
                            <p class="text-gray-600 dark:text-gray-500">No header data</p>
                        {/if}
                    </div>
                    
                    <div class="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-gray-200 dark:border-zinc-800">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-xl font-bold text-purple-400 poppins">Payload</h3>
                            {#if payload}
                                <button
                                    onclick={() => copyToClipboard(formatJSON(payload))}
                                    class="p-2 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                                    title="Copy"
                                >
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                    </svg>
                                </button>
                            {/if}
                        </div>
                        {#if payload}
                            <pre class="text-sm font-mono text-gray-700 dark:text-zinc-300 overflow-x-auto">{formatJSON(payload)}</pre>
                        {:else}
                            <p class="text-gray-600 dark:text-gray-500">No payload data</p>
                        {/if}
                    </div>
                    
                    <div class="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-gray-200 dark:border-zinc-800">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-xl font-bold text-blue-400 poppins">Signature</h3>
                            {#if signature}
                                <button
                                    onclick={() => copyToClipboard(signature)}
                                    class="p-2 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                                    title="Copy"
                                >
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                    </svg>
                                </button>
                            {/if}
                        </div>
                        {#if signature}
                            <p class="text-sm font-mono text-gray-700 dark:text-zinc-300 break-all">{signature}</p>
                        {:else}
                            <p class="text-gray-600 dark:text-gray-500">No signature</p>
                        {/if}
                    </div>
                </div>
            {/if}
        </div>
    {:else}
        <div class="space-y-6">
            <div class="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-gray-200 dark:border-zinc-800">
                <h3 class="text-xl font-bold mb-4 poppins text-gray-900 dark:text-white">Generate JWT Token</h3>
                
                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-zinc-300">Algorithm</label>
                        <select
                            bind:value={generateAlg}
                            class="w-full px-4 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                        >
                            <option value="HS256">HS256</option>
                            <option value="HS384">HS384</option>
                            <option value="HS512">HS512</option>
                            <option value="RS256">RS256</option>
                            <option value="RS384">RS384</option>
                            <option value="RS512">RS512</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-zinc-300">Payload (JSON)</label>
                        <textarea
                            bind:value={generatePayload}
                            class="w-full h-32 p-4 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:border-black dark:focus:border-white resize-none"
                        ></textarea>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-zinc-300">Secret Key</label>
                        <input
                            type="text"
                            bind:value={generateSecret}
                            placeholder="Enter your secret key..."
                            class="w-full px-4 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-white"
                        />
                    </div>
                    
                    <button
                        onclick={generateJWT}
                        class="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    >
                        Generate JWT
                    </button>
                </div>
                
                {#if generatedJWT}
                    <div class="mt-6">
                        <div class="flex items-center justify-between mb-2">
                            <label class="block text-sm font-semibold text-gray-700 dark:text-zinc-300">Generated JWT</label>
                            <button
                                onclick={() => copyToClipboard(generatedJWT)}
                                class="p-2 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                                title="Copy"
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                                </svg>
                            </button>
                        </div>
                        <textarea
                            value={generatedJWT}
                            readonly
                            class="w-full h-24 p-4 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-900 dark:text-white font-mono text-sm focus:outline-none resize-none"
                        ></textarea>
                    </div>
                {/if}
            </div>
            
            <div class="bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-600 rounded-lg p-4">
                <p class="text-yellow-700 dark:text-yellow-300 text-sm">
                    <strong>Note:</strong> This is a simplified JWT generator for demonstration purposes. 
                    For production use, please use proper cryptographic libraries and secure key management.
                </p>
            </div>
        </div>
    {/if}
</div>