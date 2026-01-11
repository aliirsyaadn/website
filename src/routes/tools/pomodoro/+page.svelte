<script>
    import { browser } from '$app/environment';
    import { ToolLayout, ToolSection, ToolButton, ToolInput } from '../../../components/tools';

    let minutes = $state(25);
    let seconds = $state(0);
    let isRunning = $state(false);
    let isBreak = $state(false);
    let intervalId = null;

    // Settings
    let focusMinutes = $state(25);
    let breakMinutes = $state(5);

    // Todo list
    let todos = $state([]);
    let newTodo = $state('');
    let editingId = $state(null);
    let editingText = $state('');

    const STORAGE_KEY = 'pomodoro-todos';

    if (browser) {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) todos = JSON.parse(saved);
    }

    function saveTodos() {
        if (browser) localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }

    function startTimer() {
        isRunning = true;
        intervalId = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    stopTimer();
                    playNotification();
                    if (isBreak) {
                        minutes = focusMinutes;
                        isBreak = false;
                    } else {
                        minutes = breakMinutes;
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
        minutes = isBreak ? breakMinutes : focusMinutes;
        seconds = 0;
    }

    function switchMode(toBreak) {
        stopTimer();
        isBreak = toBreak;
        minutes = toBreak ? breakMinutes : focusMinutes;
        seconds = 0;
    }

    function playNotification() {
        if (browser && 'Notification' in window && Notification.permission === 'granted') {
            new Notification('Pomodoro Timer', {
                body: isBreak ? 'Break time is over!' : 'Time for a break!',
            });
        }
    }

    function addTodo() {
        if (newTodo.trim()) {
            todos = [...todos, {
                id: Date.now(),
                text: newTodo.trim(),
                completed: false
            }];
            newTodo = '';
            saveTodos();
        }
    }

    function toggleTodo(id) {
        todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        saveTodos();
    }

    function deleteTodo(id) {
        todos = todos.filter(t => t.id !== id);
        saveTodos();
    }

    function startEditing(id, text) {
        editingId = id;
        editingText = text;
    }

    function saveEdit() {
        if (editingText.trim()) {
            todos = todos.map(t => t.id === editingId ? { ...t, text: editingText.trim() } : t);
            saveTodos();
        }
        editingId = null;
        editingText = '';
    }

    $effect(() => {
        if (browser && 'Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    });
</script>

<ToolLayout
    title="Pomodoro Timer"
    description="Stay focused with the Pomodoro technique"
    icon="fa-solid fa-clock"
>
    <div class="grid md:grid-cols-2 gap-6">
        <!-- Timer Section -->
        <ToolSection>
            <div class="timer-display">
                <div class="timer-time">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
                <div class="timer-label">
                    {isBreak ? 'Break Time' : 'Focus Time'}
                </div>
            </div>

            <div class="flex gap-3 justify-center mb-6">
                {#if !isRunning}
                    <ToolButton onclick={startTimer}>
                        <i class="fa-solid fa-play"></i>
                        Start
                    </ToolButton>
                {:else}
                    <ToolButton variant="danger" onclick={stopTimer}>
                        <i class="fa-solid fa-pause"></i>
                        Pause
                    </ToolButton>
                {/if}
                <ToolButton variant="secondary" onclick={resetTimer}>
                    <i class="fa-solid fa-rotate-right"></i>
                    Reset
                </ToolButton>
            </div>

            <!-- Mode switches -->
            <div class="flex gap-2 justify-center mb-6">
                <button
                    onclick={() => switchMode(false)}
                    class="mode-btn"
                    class:active={!isBreak}
                >
                    Focus ({focusMinutes}m)
                </button>
                <button
                    onclick={() => switchMode(true)}
                    class="mode-btn"
                    class:active={isBreak}
                >
                    Break ({breakMinutes}m)
                </button>
            </div>

            <!-- Settings -->
            <div class="settings">
                <div class="setting-row">
                    <label>Focus (min)</label>
                    <input
                        type="number"
                        bind:value={focusMinutes}
                        min="1"
                        max="99"
                        disabled={isRunning}
                        class="setting-input"
                    />
                </div>
                <div class="setting-row">
                    <label>Break (min)</label>
                    <input
                        type="number"
                        bind:value={breakMinutes}
                        min="1"
                        max="99"
                        disabled={isRunning}
                        class="setting-input"
                    />
                </div>
            </div>
        </ToolSection>

        <!-- Todo List -->
        <ToolSection title="Tasks">
            <form onsubmit={(e) => { e.preventDefault(); addTodo(); }} class="flex gap-2 mb-4">
                <input
                    type="text"
                    bind:value={newTodo}
                    placeholder="Add a task..."
                    class="todo-input"
                />
                <ToolButton type="submit">
                    <i class="fa-solid fa-plus"></i>
                </ToolButton>
            </form>

            <div class="todo-list">
                {#each todos as todo (todo.id)}
                    <div class="todo-item" class:completed={todo.completed}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onchange={() => toggleTodo(todo.id)}
                            class="todo-checkbox"
                        />

                        {#if editingId === todo.id}
                            <input
                                type="text"
                                bind:value={editingText}
                                onkeydown={(e) => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') editingId = null; }}
                                class="todo-edit-input"
                                autofocus
                            />
                            <button onclick={saveEdit} class="todo-action save">
                                <i class="fa-solid fa-check"></i>
                            </button>
                        {:else}
                            <span
                                class="todo-text"
                                ondblclick={() => startEditing(todo.id, todo.text)}
                            >
                                {todo.text}
                            </span>
                            <button onclick={() => startEditing(todo.id, todo.text)} class="todo-action edit">
                                <i class="fa-solid fa-pen"></i>
                            </button>
                            <button onclick={() => deleteTodo(todo.id)} class="todo-action delete">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        {/if}
                    </div>
                {:else}
                    <p class="empty-todos">No tasks yet. Add one above!</p>
                {/each}
            </div>
        </ToolSection>
    </div>
</ToolLayout>

<style>
    .timer-display {
        text-align: center;
        margin-bottom: 2rem;
    }

    .timer-time {
        font-family: 'JetBrains Mono', monospace;
        font-size: 5rem;
        font-weight: 700;
        color: var(--text-primary);
        line-height: 1;
    }

    .timer-label {
        font-size: 1.25rem;
        color: var(--accent);
        margin-top: 0.5rem;
    }

    .mode-btn {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        color: var(--text-secondary);
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .mode-btn.active {
        background: var(--accent);
        border-color: var(--accent);
        color: white;
    }

    .settings {
        display: flex;
        gap: 1rem;
        justify-content: center;
        padding-top: 1rem;
        border-top: 1px solid var(--border);
    }

    .setting-row {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        align-items: center;
    }

    .setting-row label {
        font-size: 0.75rem;
        color: var(--text-muted);
    }

    .setting-input {
        width: 60px;
        padding: 0.375rem;
        text-align: center;
        font-size: 0.875rem;
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 6px;
        color: var(--text-primary);
    }

    .setting-input:focus {
        outline: none;
        border-color: var(--accent);
    }

    .setting-input:disabled {
        opacity: 0.5;
    }

    .todo-input {
        flex: 1;
        padding: 0.75rem 1rem;
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 8px;
        color: var(--text-primary);
        font-size: 0.875rem;
    }

    .todo-input:focus {
        outline: none;
        border-color: var(--accent);
    }

    .todo-input::placeholder {
        color: var(--text-muted);
    }

    .todo-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-height: 320px;
        overflow-y: auto;
    }

    .todo-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem;
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 8px;
    }

    .todo-item.completed .todo-text {
        text-decoration: line-through;
        color: var(--text-muted);
    }

    .todo-checkbox {
        width: 18px;
        height: 18px;
        accent-color: var(--accent);
    }

    .todo-text {
        flex: 1;
        font-size: 0.875rem;
        color: var(--text-primary);
        cursor: pointer;
    }

    .todo-edit-input {
        flex: 1;
        padding: 0.25rem 0.5rem;
        background: var(--bg-tertiary);
        border: 1px solid var(--border);
        border-radius: 4px;
        color: var(--text-primary);
        font-size: 0.875rem;
    }

    .todo-action {
        padding: 0.25rem;
        background: transparent;
        border: none;
        color: var(--text-muted);
        cursor: pointer;
        opacity: 0;
        transition: all 0.2s ease;
    }

    .todo-item:hover .todo-action {
        opacity: 1;
    }

    .todo-action.edit:hover { color: var(--accent); }
    .todo-action.delete:hover { color: #ef4444; }
    .todo-action.save:hover { color: #22c55e; }

    .empty-todos {
        text-align: center;
        padding: 2rem;
        color: var(--text-muted);
        font-size: 0.875rem;
    }
</style>
