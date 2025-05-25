<script>
    let uuids = $state([]);
    let version = $state('v4');
    let count = $state(1);
    let uppercase = $state(false);
    let hyphens = $state(true);
    
    function generateUUID() {
        const newUUIDs = [];
        
        for (let i = 0; i < count; i++) {
            let uuid;
            
            if (version === 'v4') {
                uuid = generateV4();
            } else if (version === 'v1') {
                uuid = generateV1();
            }
            
            if (!hyphens) {
                uuid = uuid.replace(/-/g, '');
            }
            
            if (uppercase) {
                uuid = uuid.toUpperCase();
            }
            
            newUUIDs.push({
                id: Date.now() + i,
                value: uuid,
                createdAt: new Date().toLocaleTimeString()
            });
        }
        
        uuids = [...newUUIDs, ...uuids].slice(0, 100); // Keep max 100 UUIDs
    }
    
    function generateV4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    function generateV1() {
        // Simplified v1 UUID (not fully compliant, for demo purposes)
        const timestamp = Date.now().toString(16);
        const random = Math.random().toString(16).substr(2, 8);
        
        return `${timestamp.substr(0, 8)}-${timestamp.substr(8, 4)}-1${timestamp.substr(13, 3)}-${random.substr(0, 4)}-${random.substr(4, 12)}`;
    }
    
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text);
    }
    
    function copyAll() {
        const allUUIDs = uuids.map(u => u.value).join('\n');
        navigator.clipboard.writeText(allUUIDs);
    }
    
    function clearAll() {
        uuids = [];
    }
    
    function deleteUUID(id) {
        uuids = uuids.filter(u => u.id !== id);
    }
    
    // Generate one UUID on load
    $effect(() => {
        if (uuids.length === 0) {
            generateUUID();
        }
    });
</script>

<svelte:head>
    <title>UUID Generator | aliirsyaadn</title>
</svelte:head>

<div class="max-w-4xl mx-auto w-full">
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
        <span class="poppins">UUID Generator</span>
    </h1>
    
    <div class="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-gray-200 dark:border-zinc-800 mb-6">
        <h2 class="text-xl font-bold mb-4 poppins text-gray-900 dark:text-white">Options</h2>
        
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-zinc-300">Version</label>
                <select
                    bind:value={version}
                    class="w-full px-4 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                >
                    <option value="v4">UUID v4 (Random)</option>
                    <option value="v1">UUID v1 (Timestamp)</option>
                </select>
            </div>
            
            <div>
                <label class="block text-sm font-semibold mb-2 text-gray-700 dark:text-zinc-300">Count</label>
                <input
                    type="number"
                    bind:value={count}
                    min="1"
                    max="20"
                    class="w-full px-4 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                />
            </div>
            
            <div class="flex items-end">
                <label class="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        bind:checked={uppercase}
                        class="w-5 h-5 text-black dark:text-white bg-gray-100 dark:bg-zinc-700 border-gray-300 dark:border-gray-600 rounded focus:ring-black dark:focus:ring-white"
                    />
                    <span class="text-sm font-semibold text-gray-700 dark:text-zinc-300">Uppercase</span>
                </label>
            </div>
            
            <div class="flex items-end">
                <label class="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        bind:checked={hyphens}
                        class="w-5 h-5 text-black dark:text-white bg-gray-100 dark:bg-zinc-700 border-gray-300 dark:border-gray-600 rounded focus:ring-black dark:focus:ring-white"
                    />
                    <span class="text-sm font-semibold text-gray-700 dark:text-zinc-300">Include Hyphens</span>
                </label>
            </div>
        </div>
        
        <div class="mt-6 flex flex-wrap gap-4">
            <button
                onclick={generateUUID}
                class="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
                Generate UUID
            </button>
            {#if uuids.length > 0}
                <button
                    onclick={copyAll}
                    class="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                    Copy All
                </button>
                <button
                    onclick={clearAll}
                    class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                    Clear All
                </button>
            {/if}
        </div>
    </div>
    
    <div class="space-y-2">
        {#each uuids as uuid (uuid.id)}
            <div class="bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-4 flex items-center justify-between group">
                <div class="flex-1">
                    <code class="text-black dark:text-white font-mono">{uuid.value}</code>
                    <span class="text-xs text-gray-600 dark:text-gray-500 ml-4">{uuid.createdAt}</span>
                </div>
                <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onclick={() => copyToClipboard(uuid.value)}
                        class="p-2 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                        title="Copy"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                    </button>
                    <button
                        onclick={() => deleteUUID(uuid.id)}
                        class="p-2 text-gray-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Delete"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        {:else}
            <div class="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-lg p-8 text-center text-gray-600 dark:text-gray-500">
                Click "Generate UUID" to create new UUIDs
            </div>
        {/each}
    </div>
    
    <div class="mt-8 bg-white dark:bg-zinc-900 rounded-lg p-6 border border-gray-200 dark:border-zinc-800">
        <h2 class="text-xl font-bold mb-4 poppins text-gray-900 dark:text-white">About UUIDs</h2>
        <div class="space-y-3 text-gray-700 dark:text-zinc-300">
            <p>
                <strong class="text-gray-900 dark:text-white">UUID v4:</strong> Uses random or pseudo-random numbers. 
                Has 122 bits of randomness, making collisions extremely unlikely.
            </p>
            <p>
                <strong class="text-gray-900 dark:text-white">UUID v1:</strong> Based on timestamp and MAC address. 
                Can be useful when you need time-ordered UUIDs.
            </p>
            <p class="text-sm text-gray-600 dark:text-zinc-400">
                Format: xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx<br/>
                M = version, N = variant
            </p>
        </div>
    </div>
</div>