<script>
    let { children } = $props();
</script>

<main class="flex-1 flex flex-col p-6">
    {#if children}{@render children()}{/if}
</main>