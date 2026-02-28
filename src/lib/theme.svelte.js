import { browser } from '$app/environment';

const THEME_KEY = 'site-theme-mode';

function createThemeManager() {
    let currentMode = $state('serious');

    return {
        get value() {
            return currentMode;
        },
        init() {
            if (browser) {
                const stored = localStorage.getItem(THEME_KEY);
                const mode = stored || 'serious';
                currentMode = mode;
                document.documentElement.setAttribute('data-theme', mode);
                document.documentElement.classList.remove('serious', 'fun');
                document.documentElement.classList.add(mode);
            }
        },
        toggle() {
            const newMode = currentMode === 'serious' ? 'fun' : 'serious';
            currentMode = newMode;
            if (browser) {
                localStorage.setItem(THEME_KEY, newMode);
                document.documentElement.setAttribute('data-theme', newMode);
                document.documentElement.classList.remove('serious', 'fun');
                document.documentElement.classList.add(newMode);
            }
            return newMode;
        },
        setMode(mode) {
            currentMode = mode;
            if (browser) {
                localStorage.setItem(THEME_KEY, mode);
                document.documentElement.setAttribute('data-theme', mode);
                document.documentElement.classList.remove('serious', 'fun');
                document.documentElement.classList.add(mode);
            }
        }
    };
}

export const themeState = createThemeManager();
