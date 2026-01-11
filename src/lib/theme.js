import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Theme modes: 'serious' | 'fun'
const THEME_KEY = 'site-theme-mode';

function createThemeStore() {
    const { subscribe, set, update } = writable('serious');

    return {
        subscribe,
        init() {
            if (browser) {
                const stored = localStorage.getItem(THEME_KEY);
                const mode = stored || 'serious';
                set(mode);
                document.documentElement.setAttribute('data-theme', mode);
                document.documentElement.classList.remove('serious', 'fun');
                document.documentElement.classList.add(mode);
            }
        },
        toggle() {
            update(current => {
                const newMode = current === 'serious' ? 'fun' : 'serious';
                if (browser) {
                    localStorage.setItem(THEME_KEY, newMode);
                    document.documentElement.setAttribute('data-theme', newMode);
                    document.documentElement.classList.remove('serious', 'fun');
                    document.documentElement.classList.add(newMode);
                }
                return newMode;
            });
        },
        setMode(mode) {
            set(mode);
            if (browser) {
                localStorage.setItem(THEME_KEY, mode);
                document.documentElement.setAttribute('data-theme', mode);
                document.documentElement.classList.remove('serious', 'fun');
                document.documentElement.classList.add(mode);
            }
        }
    };
}

export const theme = createThemeStore();
