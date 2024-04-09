<script>
    export let data;
</script>

<a
    href="{data.href}"
    target="_blank"
    class="p-4 sm:p-6 md:p-8 flex flex-col gap-4 rounded-lg border border-solid border-blue-700 text-center cursor-pointer group hover:border-blue-400 duration-200"
>
    <div
        class="bg-slate-950 grid place-items-end px-4 text-5xl md:text-6xl -mt-10 sm:-mt-12 md:-mt-14 lg:-mt-16 mx-auto duration-200"
    >
             <p
                        class="poppins text-2xl sm:text-5xl md:text-6xl text-white font-semibold"
                    >
                        {data.number}
                    </p>
        
    </div>
    <h3 class="font-medium text-blue-500 text-xl sm:text-2xl md:text-3xl">
        {data.company}
    </h3>
    <div class="flex justify-between">
        <p class="text-sm sm:text-base text-slate-300">
            {data.role}
        </p>
        <p class="text-sm sm:text-base text-slate-300">
            {data.period}
        </p>
    </div>
    <p>
        {@html data.description} 
    </p>
    <div class="flex-1 flex gap-4 pt-8 items-end">
        <slot/>
    </div>
</a>
