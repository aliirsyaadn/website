<script>
    import { ToolLayout } from "../../../components/tools";

    let password = $state("");
    let length = $state(16);
    let useUppercase = $state(true);
    let useLowercase = $state(true);
    let useNumbers = $state(true);
    let useSymbols = $state(true);
    let copied = $state(false);

    const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
    const NUMBERS = "0123456789";
    const SYMBOLS = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    function generatePassword() {
        let chars = "";
        if (useUppercase) chars += UPPERCASE;
        if (useLowercase) chars += LOWERCASE;
        if (useNumbers) chars += NUMBERS;
        if (useSymbols) chars += SYMBOLS;

        // Fallback if all unchecked
        if (chars === "") {
            useLowercase = true;
            chars = LOWERCASE;
        }

        let newPassword = "";
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            newPassword += chars[array[i] % chars.length];
        }

        password = newPassword;
        copied = false;
    }

    async function copyToClipboard() {
        if (!password) return;
        await navigator.clipboard.writeText(password);
        copied = true;
        setTimeout(() => (copied = false), 2000);
    }

    // Generate initial password on load
    $effect(() => {
        // Only run once on mount or when dependencies explicitly change
        // We use untrack to prevent infinite loops if we were binding it differently,
        // but here we just want it to react to length/checkbox changes.
        generatePassword();
    });
</script>

<ToolLayout
    title="Password Generator"
    description="Instantly create a secure, random password."
    icon="fa-solid fa-key"
>
    <!-- Output Section (LastPass style) -->
    <div class="password-display-card group">
        <div
            class="password-output"
            aria-label="Generated Password"
            style={password.length > 40 ? "font-size: 1.25rem;" : ""}
        >
            {password || "Click Generate..."}
        </div>

        <div class="actions">
            <button
                onclick={generatePassword}
                class="icon-btn"
                aria-label="Regenerate password"
                title="Regenerate"
            >
                <i class="fa-solid fa-rotate-right"></i>
            </button>
            <button
                onclick={copyToClipboard}
                class="copy-btn btn-primary aspect-square !px-3"
                aria-label="Copy password"
                title={copied ? "Copied" : "Copy password"}
            >
                <i class="fa-solid {copied ? 'fa-check' : 'fa-copy'} text-lg"
                ></i>
            </button>
        </div>
    </div>

    <!-- Controls Section Layout -->
    <div class="controls-card mt-6">
        <!-- Length Slider row -->
        <div class="control-row mb-8">
            <div
                class="font-semibold w-52 text-sm whitespace-nowrap label-text flex items-center"
            >
                Password Length
                <input
                    type="number"
                    min="4"
                    max="64"
                    bind:value={length}
                    class="w-14 ml-2 bg-transparent text-accent font-bold text-base border-b border-transparent hover:border-accent focus:border-accent outline-none text-center transition-colors !p-0"
                />
            </div>

            <div class="slider-container flex-1 ml-4">
                <input
                    type="range"
                    min="4"
                    max="64"
                    bind:value={length}
                    class="slider-input"
                    aria-label="Password length slider"
                />
            </div>
        </div>

        <!-- Checkboxes row -->
        <div class="control-row items-center mt-2">
            <div class="checkbox-group flex-wrap flex gap-3">
                <button
                    class="tag cursor-pointer {useUppercase
                        ? 'tag-accent'
                        : ''}"
                    onclick={() => (useUppercase = !useUppercase)}
                >
                    <i
                        class="fa-solid fa-check text-[10px] mr-1 {useUppercase
                            ? 'inline-block'
                            : 'hidden'}"
                    ></i>
                    Uppercase
                </button>

                <button
                    class="tag cursor-pointer {useLowercase
                        ? 'tag-accent'
                        : ''}"
                    onclick={() => (useLowercase = !useLowercase)}
                >
                    <i
                        class="fa-solid fa-check text-[10px] mr-1 {useLowercase
                            ? 'inline-block'
                            : 'hidden'}"
                    ></i>
                    Lowercase
                </button>

                <button
                    class="tag cursor-pointer {useNumbers ? 'tag-accent' : ''}"
                    onclick={() => (useNumbers = !useNumbers)}
                >
                    <i
                        class="fa-solid fa-check text-[10px] mr-1 {useNumbers
                            ? 'inline-block'
                            : 'hidden'}"
                    ></i>
                    Numbers
                </button>

                <button
                    class="tag cursor-pointer {useSymbols ? 'tag-accent' : ''}"
                    onclick={() => (useSymbols = !useSymbols)}
                >
                    <i
                        class="fa-solid fa-check text-[10px] mr-1 {useSymbols
                            ? 'inline-block'
                            : 'hidden'}"
                    ></i>
                    Symbols
                </button>
            </div>
        </div>
    </div>
</ToolLayout>

<style>
    /* Display Card - mimicking the white/bordered Look */
    .password-display-card {
        background: var(--bg-secondary);
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 1.5rem 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
        transition: border-color 0.2s;
    }

    .password-display-card:hover {
        border-color: var(--accent);
    }

    .password-output {
        font-family: "JetBrains Mono", monospace;
        font-size: 1.75rem;
        color: var(--text-primary);
        font-weight: 500;
        flex-grow: 1;
        margin-right: 1rem;
        word-break: break-all;
        line-height: 1.2;
    }

    .actions {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .icon-btn {
        background: transparent;
        border: none;
        color: var(--text-muted);
        font-size: 1.25rem;
        cursor: pointer;
        transition:
            color 0.2s,
            transform 0.2s;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon-btn:hover {
        color: var(--accent);
        transform: rotate(45deg);
    }

    .copy-btn {
        gap: 0.5rem;
        padding: 0.75rem 1.25rem;
        border-radius: 6px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 0.875rem;
    }

    /* Controls card - mimicking the slight green pastel tint look, adapted to our theme */
    .controls-card {
        background: color-mix(
            in srgb,
            var(--accent) 5%,
            var(--bg-secondary) 95%
        );
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 2.5rem 2rem;
        position: relative;
    }

    /* Little pointy arrow on top of controls (LastPass style) */
    .controls-card::before {
        content: "";
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%) rotate(45deg);
        width: 20px;
        height: 20px;
        background: color-mix(
            in srgb,
            var(--accent) 5%,
            var(--bg-secondary) 95%
        );
        border-top: 1px solid var(--border);
        border-left: 1px solid var(--border);
    }

    .control-row {
        display: flex;
        align-items: center;
    }

    .label-text {
        color: var(--text-primary);
    }

    /* Custom Slider */
    .slider-container {
        display: flex;
        align-items: center;
    }

    .slider-input {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 6px;
        background: var(--border);
        border-radius: 3px;
        outline: none;
        cursor: pointer;
    }

    .slider-input::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: white;
        border: 2px solid var(--text-primary);
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.1s;
    }

    .slider-input::-webkit-slider-thumb:hover,
    .slider-input::-webkit-slider-thumb:active {
        transform: scale(1.1);
    }

    .slider-input::-moz-range-thumb {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: white;
        border: 2px solid var(--text-primary);
        cursor: pointer;
    }

    /* Custom Checkboxes / Chips */
    .checkbox-group {
        display: flex;
        align-items: center;
    }

    /* Responsive adjustments */
    @media (max-width: 640px) {
        .password-display-card {
            flex-direction: column;
            gap: 1.5rem;
            padding: 1.5rem;
        }
        .password-output {
            margin-right: 0;
            font-size: 1.5rem;
            text-align: center;
        }
        .control-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
        }
        .slider-container,
        .checkbox-group {
            margin-left: 0;
            width: 100%;
        }
    }
</style>
