<script>
    import { themeState } from "$lib/theme.svelte.js";
    import { reveal } from "$lib/animations";
    import projects from "../data/projects.json";
    import blogs from "../data/blogs.json";

    let featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
    let recentBlogs = blogs.slice(0, 3);

    const socialLinks = [
        {
            icon: "fa-brands fa-github",
            href: "https://github.com/aliirsyaadn",
            label: "GitHub",
        },
        {
            icon: "fa-brands fa-linkedin",
            href: "https://linkedin.com/in/aliirsyaadn",
            label: "LinkedIn",
        },
        {
            icon: "fa-brands fa-x-twitter",
            href: "https://x.com/aliirsyaadn",
            label: "X",
        },
    ];
</script>

<svelte:head>
    <title>Ali Irsyaad | Software Engineer</title>
    <meta
        name="description"
        content="Software Engineer specializing in Backend Engineering with Go and Python"
    />
</svelte:head>

<!-- Hero Section -->
<section
    class="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center justify-center px-6 pt-24 pb-16"
>
    <div class="max-w-4xl mx-auto text-center lg:text-left page-enter">
        <!-- Status Badge -->
        <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style="background: var(--bg-secondary); border: 1px solid var(--border);"
        >
            <span
                class="w-2 h-2 rounded-full animate-pulse"
                style="background: var(--accent);"
            ></span>
            <span class="text-sm" style="color: var(--text-secondary);"
                >Building at Paper.id</span
            >
        </div>

        <!-- Main Title -->
        <h1
            class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-tight"
        >
            <span style="color: var(--text-primary);">I'm </span>
            <span class="text-accent-gradient">Ali Irsyaad</span>
        </h1>

        <!-- Subtitle -->
        <p
            class="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto lg:mx-0"
            style="color: var(--text-secondary);"
        >
            Software Engineer specializing in
            <span style="color: var(--accent);">Backend Development</span>
            with Go, Python, and cloud-native technologies.
        </p>

        <!-- CTA Buttons -->
        <div
            class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
        >
            <a
                href="/projects"
                class="btn-primary inline-flex items-center gap-2"
            >
                <span>View Projects</span>
                <i class="fa-solid fa-arrow-right text-sm"></i>
            </a>
            <a
                href="/about"
                class="btn-secondary inline-flex items-center gap-2"
            >
                <span>About Me</span>
            </a>
        </div>

        <!-- Social Links -->
        <div class="flex items-center justify-center lg:justify-start gap-6">
            {#each socialLinks as link}
                <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style="background: var(--bg-secondary); border: 1px solid var(--border); color: var(--text-secondary);"
                    aria-label={link.label}
                >
                    <i class={link.icon}></i>
                </a>
            {/each}
        </div>
    </div>
    <div class="relative grid place-items-center">
        <!-- svelte-ignore a11y_img_redundant_alt -->
        <div class="relative max-h-[70vh]">
            <!-- Serious Image -->
            <div
                class="transition-opacity duration-500 ease-in-out"
                class:opacity-100={themeState.value === "serious"}
                class:opacity-0={themeState.value !== "serious"}
            >
                <img
                    src={"/images/anime_profile_serious.png"}
                    alt="Serious Ali Irsyaad"
                    class="object-cover relative z-[1] max-h-[70vh] saturate-0"
                />
                <div
                    class="absolute inset-0 bg-gradient-to-t from-transparent to-black z-[2]"
                    class:opacity-50={themeState.value === "serious"}
                    class:opacity-0={themeState.value !== "serious"}
                ></div>
            </div>

            <!-- Fun Image -->
            <div
                class="absolute inset-0 transition-opacity duration-500 ease-in-out"
                class:opacity-100={themeState.value === "fun"}
                class:opacity-0={themeState.value !== "fun"}
            >
                <img
                    src={"/images/anime_profile_fun.png"}
                    alt="Fun Ali Irsyaad"
                    class="object-cover w-full h-full max-h-[70vh] z-[0] saturate-150"
                />
            </div>
        </div>
    </div>
</section>

<!-- Featured Projects Section -->
<section class="py-24 px-6" use:reveal={{ duration: "0.8s", distance: "40px" }}>
    <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between mb-12">
            <div>
                <h2 class="text-3xl sm:text-4xl font-display font-bold mb-2">
                    Featured <span class="text-accent-gradient">Projects</span>
                </h2>
                <p style="color: var(--text-secondary);">
                    Some of my recent work
                </p>
            </div>
            <a
                href="/projects"
                class="link-hover text-sm flex items-center gap-2"
            >
                View all <i class="fa-solid fa-arrow-right text-xs"></i>
            </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each featuredProjects as project, i}
                <article
                    class="card p-6 stagger-item"
                    style="animation-delay: {i * 0.1}s"
                >
                    <div class="flex items-center gap-3 mb-4">
                        <div
                            class="w-10 h-10 rounded-lg flex items-center justify-center"
                            style="background: var(--bg-tertiary);"
                        >
                            <i
                                class="fa-solid fa-folder"
                                style="color: var(--accent);"
                            ></i>
                        </div>
                        <h3
                            class="font-display font-semibold"
                            style="color: var(--text-primary);"
                        >
                            {project.title}
                        </h3>
                    </div>

                    <p
                        class="text-sm mb-4 line-clamp-3"
                        style="color: var(--text-secondary);"
                    >
                        {project.description}
                    </p>

                    <div class="flex flex-wrap gap-2">
                        {#each project.tags.slice(0, 3) as tag}
                            <span class="tag">{tag}</span>
                        {/each}
                    </div>
                </article>
            {/each}
        </div>
    </div>
</section>

<!-- Recent Blogs Section -->
<section
    class="py-24 px-6 relative z-10"
    use:reveal={{ duration: "0.8s", distance: "40px" }}
>
    <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between mb-12">
            <div>
                <h2 class="text-3xl sm:text-4xl font-display font-bold mb-2">
                    Recent <span class="text-accent-gradient">Writings</span>
                </h2>
                <p style="color: var(--text-secondary);">
                    Thoughts and tutorials
                </p>
            </div>
            <a href="/blog" class="link-hover text-sm flex items-center gap-2">
                View all <i class="fa-solid fa-arrow-right text-xs"></i>
            </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each recentBlogs as post, i}
                <a
                    href="/blog/{post.slug}"
                    class="card p-6 stagger-item block group"
                    style="animation-delay: {i * 0.1}s"
                >
                    <div
                        class="flex items-center gap-2 mb-4 text-sm"
                        style="color: var(--text-muted);"
                    >
                        <span>{post.date}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                    </div>

                    <h3
                        class="font-display font-semibold text-lg mb-2 group-hover:text-accent transition-colors"
                        style="color: var(--text-primary);"
                    >
                        {post.title}
                    </h3>

                    <p
                        class="text-sm mb-4 line-clamp-2"
                        style="color: var(--text-secondary);"
                    >
                        {post.excerpt}
                    </p>

                    <div class="flex flex-wrap gap-2">
                        {#each post.tags.slice(0, 2) as tag}
                            <span class="tag">{tag}</span>
                        {/each}
                    </div>
                </a>
            {/each}
        </div>
    </div>
</section>

<!-- CTA Section -->
<section class="py-24 px-6" use:reveal={{ duration: "0.8s", distance: "40px" }}>
    <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl sm:text-4xl font-display font-bold mb-4">
            Let's <span class="text-accent-gradient">Connect</span>
        </h2>
        <p class="mb-8" style="color: var(--text-secondary);">
            Interested in working together or just want to say hi?
        </p>
        <a
            href="mailto:ali.irsyaad.n@gmail.com"
            class="btn-primary inline-flex items-center gap-2"
        >
            <i class="fa-solid fa-envelope"></i>
            <span>Get in Touch</span>
        </a>
    </div>
</section>

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
    .text-accent {
        color: var(--accent);
    }
    .group:hover .group-hover\:text-accent {
        color: var(--accent);
    }
</style>
