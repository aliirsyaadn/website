<script>
    import Footer from "../components/Footer.svelte";
    import Header from "../components/Header.svelte";
    import "../app.css";
    import { theme } from '$lib/theme.js';
    import { onMount } from 'svelte';
    
    let y = $state();
    let innerWidth = $state(0);
    let innerHeight = $state(0);
    
    let { children } = $props();
    
    let scrollButtonClass = $derived(
        "fixed bottom-0 w-full duration-200 flex p-10 z-[10] " +
        (y > 0
            ? " opacity-full pointer-events-auto"
            : " pointer-events-none opacity-0")
    );

    function goTop() {
        document.body.scrollIntoView();
    }
    
    onMount(() => {
        theme.init();
    });
</script>

<div
    class="relative flex flex-col w-full text-sm sm:text-base min-h-screen"
>
    <div
        class={scrollButtonClass}
    >
        <button
            onclick={goTop}
            aria-label="Scroll to top"
            class="ml-auto rounded-full bg-black dark:bg-white text-white dark:text-black px-3 sm:px-4 hover:bg-gray-800 dark:hover:bg-gray-200 cursor-pointer aspect-square grid place-items-center shadow-lg"
        >
            <i class="fa-solid fa-arrow-up"></i>
        </button>
    </div>
    <Header {y} {innerHeight}/>
    {#if children}{@render children()}{/if}
    <Footer />
</div>
<svelte:window bind:scrollY={y} bind:innerHeight bind:innerWidth />
