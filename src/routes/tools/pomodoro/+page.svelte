<script>
    import { browser } from '$app/environment';
    
    let minutes = $state(25);
    let seconds = $state(0);
    let isRunning = $state(false);
    let isBreak = $state(false);
    let intervalId = null;
    
    // Custom time inputs
    let customMinutes = $state(25);
    let customSeconds = $state(0);
    let customBreakMinutes = $state(5);
    let customBreakSeconds = $state(0);
    let showCustomTime = $state(false);
    
    let todos = $state([]);
    let newTodo = $state('');
    let editingId = $state(null);
    let editingText = $state('');
    
    const STORAGE_KEY = 'pomodoro-todos';
    
    if (browser) {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            todos = JSON.parse(saved);
        }
    }
    
    function saveTodos() {
        if (browser) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        }
    }
    
    function startTimer() {
        isRunning = true;
        intervalId = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    stopTimer();
                    playNotification();
                    if (isBreak) {
                        minutes = customMinutes;
                        seconds = customSeconds;
                        isBreak = false;
                    } else {
                        minutes = customBreakMinutes;
                        seconds = customBreakSeconds;
                        isBreak = true;
                    }
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
        }, 1000);
    }
    
    function stopTimer() {
        isRunning = false;
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }
    
    function resetTimer() {
        stopTimer();
        minutes = isBreak ? customBreakMinutes : customMinutes;
        seconds = isBreak ? customBreakSeconds : customSeconds;
    }
    
    function setCustomTime() {
        if (!isRunning) {
            minutes = isBreak ? customBreakMinutes : customMinutes;
            seconds = isBreak ? customBreakSeconds : customSeconds;
        }
    }
    
    function validateTimeInput(value, max) {
        const num = parseInt(value) || 0;
        return Math.min(Math.max(0, num), max);
    }
    
    function playNotification() {
        if (browser && 'Notification' in window) {
            if (Notification.permission === 'granted') {
                new Notification('Pomodoro Timer', {
                    body: isBreak ? 'Break time is over!' : 'Time for a break!',
                    icon: '/favicon.png'
                });
            }
        }
    }
    
    function addTodo() {
        if (newTodo.trim()) {
            todos = [...todos, {
                id: Date.now(),
                text: newTodo.trim(),
                completed: false,
                createdAt: new Date().toISOString()
            }];
            newTodo = '';
            saveTodos();
        }
    }
    
    function toggleTodo(id) {
        todos = todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        saveTodos();
    }
    
    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodos();
    }
    
    function startEditing(id, text) {
        editingId = id;
        editingText = text;
    }
    
    function saveEdit() {
        if (editingText.trim()) {
            todos = todos.map(todo =>
                todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
            );
            saveTodos();
        }
        editingId = null;
        editingText = '';
    }
    
    function cancelEdit() {
        editingId = null;
        editingText = '';
    }
    
    $effect(() => {
        if (browser && 'Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    });
</script>

<svelte:head>
    <title>Pomodoro Timer | aliirsyaadn</title>
</svelte:head>

<div class="max-w-4xl mx-auto w-full">
    <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
        <span class="poppins">Pomodoro Timer</span>
    </h1>
    
    <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-gray-200 dark:border-zinc-800">
            <div class="text-center mb-8">
                <div class="text-6xl font-mono font-bold text-black dark:text-white mb-4">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
                <div class="text-xl text-gray-600 dark:text-zinc-400 mb-6">
                    {isBreak ? 'Break Time' : 'Focus Time'}
                </div>
                
                <div class="flex gap-4 justify-center">
                    {#if !isRunning}
                        <button
                            onclick={startTimer}
                            class="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                        >
                            Start
                        </button>
                    {:else}
                        <button
                            onclick={stopTimer}
                            class="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Pause
                        </button>
                    {/if}
                    <button
                        onclick={resetTimer}
                        class="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Reset
                    </button>
                </div>
            </div>
            
            <div class="mb-6">
                <button
                    onclick={() => showCustomTime = !showCustomTime}
                    class="w-full px-4 py-2 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors text-sm flex items-center justify-center gap-2"
                >
                    <svg class={"w-4 h-4 transition-transform " + (showCustomTime ? "rotate-180" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                    Custom Time Settings
                </button>
                
                {#if showCustomTime}
                    <div class="mt-4 space-y-4 p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
                        <div>
                            <label class="block text-sm font-medium mb-2">Focus Time</label>
                            <div class="flex gap-2 items-center">
                                <input
                                    type="number"
                                    bind:value={customMinutes}
                                    onchange={() => { customMinutes = validateTimeInput(customMinutes, 99); setCustomTime(); }}
                                    min="0"
                                    max="99"
                                    class="w-20 px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded text-center"
                                    disabled={isRunning}
                                />
                                <span class="text-gray-600 dark:text-zinc-400">:</span>
                                <input
                                    type="number"
                                    bind:value={customSeconds}
                                    onchange={() => { customSeconds = validateTimeInput(customSeconds, 59); setCustomTime(); }}
                                    min="0"
                                    max="59"
                                    class="w-20 px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded text-center"
                                    disabled={isRunning}
                                />
                                <span class="text-sm text-gray-600 dark:text-zinc-400">min : sec</span>
                            </div>
                        </div>
                        
                        <div>
                            <label class="block text-sm font-medium mb-2">Break Time</label>
                            <div class="flex gap-2 items-center">
                                <input
                                    type="number"
                                    bind:value={customBreakMinutes}
                                    onchange={() => { customBreakMinutes = validateTimeInput(customBreakMinutes, 99); setCustomTime(); }}
                                    min="0"
                                    max="99"
                                    class="w-20 px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded text-center"
                                    disabled={isRunning}
                                />
                                <span class="text-gray-600 dark:text-zinc-400">:</span>
                                <input
                                    type="number"
                                    bind:value={customBreakSeconds}
                                    onchange={() => { customBreakSeconds = validateTimeInput(customBreakSeconds, 59); setCustomTime(); }}
                                    min="0"
                                    max="59"
                                    class="w-20 px-3 py-2 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded text-center"
                                    disabled={isRunning}
                                />
                                <span class="text-sm text-gray-600 dark:text-zinc-400">min : sec</span>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
            
            <div class="flex gap-4 justify-center">
                <button
                    onclick={() => { isBreak = false; minutes = customMinutes; seconds = customSeconds; stopTimer(); }}
                    class={"px-4 py-2 rounded-lg transition-colors " + (!isBreak ? "bg-black dark:bg-white text-white dark:text-black" : "bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700")}
                >
                    Focus ({customMinutes}m {customSeconds > 0 ? customSeconds + 's' : ''})
                </button>
                <button
                    onclick={() => { isBreak = true; minutes = customBreakMinutes; seconds = customBreakSeconds; stopTimer(); }}
                    class={"px-4 py-2 rounded-lg transition-colors " + (isBreak ? "bg-black dark:bg-white text-white dark:text-black" : "bg-gray-50 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:bg-gray-200 dark:hover:bg-zinc-700")}
                >
                    Break ({customBreakMinutes}m {customBreakSeconds > 0 ? customBreakSeconds + 's' : ''})
                </button>
            </div>
        </div>
        
        <div class="bg-white dark:bg-zinc-900 rounded-lg p-6 border border-gray-200 dark:border-zinc-800">
            <h2 class="text-2xl font-bold mb-4 poppins text-gray-900 dark:text-white">Todo List</h2>
            
            <form onsubmit={(e) => { e.preventDefault(); addTodo(); }} class="mb-4">
                <div class="flex gap-2">
                    <input
                        type="text"
                        bind:value={newTodo}
                        placeholder="Add a new task..."
                        class="flex-1 px-4 py-2 bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-800 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-black dark:focus:border-white"
                    />
                    <button
                        type="submit"
                        class="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
                    >
                        Add
                    </button>
                </div>
            </form>
            
            <div class="space-y-2 max-h-96 overflow-y-auto">
                {#each todos as todo (todo.id)}
                    <div class="flex items-center gap-2 p-2 bg-gray-50 dark:bg-zinc-800 rounded-lg group">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onchange={() => toggleTodo(todo.id)}
                            class="w-5 h-5 text-black dark:text-white bg-gray-100 dark:bg-zinc-700 border-gray-300 dark:border-gray-600 rounded focus:ring-black dark:focus:ring-white"
                        />
                        
                        {#if editingId === todo.id}
                            <input
                                type="text"
                                bind:value={editingText}
                                onkeydown={(e) => {
                                    if (e.key === 'Enter') saveEdit();
                                    if (e.key === 'Escape') cancelEdit();
                                }}
                                class="flex-1 px-2 py-1 bg-gray-100 dark:bg-zinc-700 border border-gray-200 dark:border-zinc-800 rounded text-gray-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                                autofocus
                            />
                            <button
                                onclick={saveEdit}
                                class="p-1 text-green-500 hover:text-green-400"
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </button>
                            <button
                                onclick={cancelEdit}
                                class="p-1 text-red-500 hover:text-red-400"
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        {:else}
                            <span
                                class={"flex-1 cursor-pointer " + (todo.completed ? "line-through text-gray-500" : "text-gray-900 dark:text-white")}
                                ondblclick={() => startEditing(todo.id, todo.text)}
                            >
                                {todo.text}
                            </span>
                            <button
                                onclick={() => startEditing(todo.id, todo.text)}
                                class="p-1 text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                </svg>
                            </button>
                            <button
                                onclick={() => deleteTodo(todo.id)}
                                class="p-1 text-gray-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        {/if}
                    </div>
                {:else}
                    <p class="text-gray-500 text-center py-4">No tasks yet. Add one above!</p>
                {/each}
            </div>
        </div>
    </div>
</div>