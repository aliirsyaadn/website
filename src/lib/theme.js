import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Theme colors configuration - Minimalist black/white design
export const themes = {
    dark: {
        // Background colors
        bgPrimary: 'bg-black',
        bgSecondary: 'bg-zinc-900',
        bgTertiary: 'bg-zinc-800',
        bgHover: 'hover:bg-zinc-800',
        
        // Text colors
        textPrimary: 'text-white',
        textSecondary: 'text-zinc-300',
        textTertiary: 'text-zinc-400',
        textMuted: 'text-zinc-500',
        
        // Border colors
        borderPrimary: 'border-zinc-800',
        borderSecondary: 'border-zinc-700',
        
        // Accent colors
        accentPrimary: 'text-white',
        accentSecondary: 'text-zinc-300',
        accentHover: 'hover:text-zinc-300',
        
        // Button colors
        btnPrimary: 'bg-white hover:bg-zinc-200 text-black',
        btnSecondary: 'bg-zinc-800 hover:bg-zinc-700',
        btnDanger: 'bg-red-600 hover:bg-red-700',
        
        // Special colors
        errorBg: 'bg-red-950/20',
        errorBorder: 'border-red-800',
        errorText: 'text-red-400',
        
        // Component specific
        headerBg: 'bg-black/80 backdrop-blur-md',
        dropdownBg: 'bg-zinc-900',
        inputBg: 'bg-zinc-900',
    },
    light: {
        // Background colors
        bgPrimary: 'bg-white',
        bgSecondary: 'bg-gray-50',
        bgTertiary: 'bg-gray-100',
        bgHover: 'hover:bg-gray-100',
        
        // Text colors
        textPrimary: 'text-black',
        textSecondary: 'text-gray-700',
        textTertiary: 'text-gray-600',
        textMuted: 'text-gray-500',
        
        // Border colors
        borderPrimary: 'border-gray-200',
        borderSecondary: 'border-gray-300',
        
        // Accent colors
        accentPrimary: 'text-black',
        accentSecondary: 'text-gray-700',
        accentHover: 'hover:text-gray-700',
        
        // Button colors
        btnPrimary: 'bg-black hover:bg-gray-800 text-white',
        btnSecondary: 'bg-gray-100 hover:bg-gray-200',
        btnDanger: 'bg-red-600 hover:bg-red-700',
        
        // Special colors
        errorBg: 'bg-red-50',
        errorBorder: 'border-red-200',
        errorText: 'text-red-600',
        
        // Component specific
        headerBg: 'bg-white/80 backdrop-blur-md',
        dropdownBg: 'bg-white',
        inputBg: 'bg-gray-50',
    }
};

function createThemeStore() {
    const { subscribe, set, update } = writable('dark');
    
    return {
        subscribe,
        toggle: () => update(theme => {
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            if (browser) {
                localStorage.setItem('theme', newTheme);
                document.documentElement.classList.toggle('dark', newTheme === 'dark');
            }
            return newTheme;
        }),
        init: () => {
            if (browser) {
                const savedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = savedTheme || (prefersDark ? 'dark' : 'light');
                set(theme);
                document.documentElement.classList.toggle('dark', theme === 'dark');
            }
        }
    };
}

export const theme = createThemeStore();

// Helper function to get theme classes
export function getThemeClass(isDark, classKey) {
    const currentTheme = isDark ? themes.dark : themes.light;
    return currentTheme[classKey] || '';
}