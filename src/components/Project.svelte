<script>
    export let data;
</script>

<a
    href={data.href}
    target="_blank"
    class="p-4 sm:p-6 md:p-8 flex flex-col gap-4 rounded-lg border border-solid border-blue-700 text-start cursor-pointer group hover:border-blue-400 duration-200"
>
    <div
        class="bg-slate-950 grid place-items-center px-4 text-5xl md:text-6xl -mt-10 sm:-mt-12 md:-mt-14 lg:-mt-16 mx-auto duration-200"
    >
        <i class={data.icon} />
    </div>
    <h3 class=" text-blue-500 font-medium text-xl sm:text-2xl md:text-3xl text-center">
        {data.name}
    </h3>
    <h4 class="text-lg font-medium">
        {data.title}
    </h4>
    <p >
        {data.description}
    </p>
    <slot />
    <div class="flex-1 flex justify-between gap-4 items-end">
        <div
            class="ml-auto cursor-pointer hover:text-slate-950 duration-200 relative after:absolute after:top-0 after:h-0 after:right-full after:bg-white after:w-full after:h-full after:duration-200 hover:after:translate-x-full after:z-[-1] overflow-hidden"
        >
        </div>
    </div>
</a>
