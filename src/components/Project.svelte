<script>
    let { data, children } = $props();
</script>

<div
    class="p-6 sm:p-8 md:p-10 flex flex-col gap-4 rounded-xl border border-solid border-gray-200 dark:border-zinc-800 text-start cursor-pointer group hover:border-gray-400 dark:hover:border-zinc-600 duration-200 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-lg transition-all"
>
    <div
        class="bg-gray-50 dark:bg-black grid place-items-center px-4 text-5xl md:text-6xl -mt-10 sm:-mt-12 md:-mt-14 lg:-mt-16 mx-auto duration-200 rounded-lg shadow-md"
    >
        <i class={data.icon}></i>
    </div>

    <h3 class="text-black dark:text-white font-bold text-xl sm:text-2xl md:text-3xl text-center">
        {data.name}
    </h3>
    <h4 class="text-lg font-semibold text-gray-700 dark:text-zinc-300">
        {data.title}
    </h4>
    <p class="text-gray-600 dark:text-zinc-400 leading-relaxed">
        {data.description}
    </p>

   
   
    <div class="flex-1 flex gap-4 pt-8 items-end">
        {#if children}{@render children()}{/if}
    </div>
    
</div>
