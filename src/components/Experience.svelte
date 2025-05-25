<script>
    let { data, children } = $props();
</script>

<div
    class="p-6 sm:p-8 md:p-10 flex flex-col gap-4 rounded-xl border border-solid border-gray-200 dark:border-zinc-800 text-center cursor-pointer group hover:border-gray-400 dark:hover:border-zinc-600 duration-200 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-lg transition-all"
>
    <div
        class="bg-gray-50 dark:bg-black grid place-items-end px-4 text-5xl md:text-6xl -mt-10 sm:-mt-12 md:-mt-14 lg:-mt-16 mx-auto duration-200 rounded-lg shadow-md"
    >
             <p
                        class="poppins text-2xl sm:text-5xl md:text-6xl text-black dark:text-white font-bold"
                    >
                        {data.number}
                    </p>
        
    </div>
    <h3 class="font-bold text-black dark:text-white text-xl sm:text-2xl md:text-3xl">
        {data.company}
    </h3>
    <div class="flex justify-between">
        <p class="text-sm sm:text-base text-gray-600 dark:text-zinc-400">
            {data.role}
        </p>
        <p class="text-sm sm:text-base text-gray-600 dark:text-zinc-400">
            {data.period}
        </p>
    </div>
    <p class="text-gray-600 dark:text-zinc-400 leading-relaxed">
        {@html data.description} 
    </p>
    <div class="flex-1 flex gap-4 pt-8 items-end">
        {#if children}{@render children()}{/if}
    </div>
    <a href="{data.href}" target="_blank" class="text-xs text-gray-500 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300 transition-colors mt-2">
        View Company →
    </a>
</div>
