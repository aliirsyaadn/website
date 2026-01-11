<script>
    import experiences from '../../data/experiences.json';
    import { getTechIcon } from '$lib/techstackIcons';

    const skills = [
        { category: 'Languages', items: ['Go', 'Python', 'Java', 'JavaScript'] },
        { category: 'Backend', items: ['gRPC', 'GraphQL', 'REST API', 'Microservices'] },
        { category: 'Databases', items: ['PostgreSQL', 'MySQL', 'Redis', 'Elasticsearch'] },
        { category: 'Cloud & DevOps', items: ['GCP', 'Docker', 'Kubernetes', 'RabbitMQ'] },
        { category: 'AI & Integration', items: ['OCR', 'Payment Systems', 'Third-party APIs'] },
        { category: 'Soft Skills', items: ['Leadership', 'Problem Solving', 'Strategic Thinking'] }
    ];

    const facts = [
        { icon: 'fa-solid fa-briefcase', label: 'Years of Experience', value: '4+' },
        { icon: 'fa-solid fa-building', label: 'Companies Worked', value: '4' },
        { icon: 'fa-solid fa-graduation-cap', label: 'Education', value: 'CS @ UI' }
    ];
</script>

<svelte:head>
    <title>About | Ali Irsyaad Nursyaban</title>
    <meta name="description" content="Ali Irsyaad Nursyaban - Software Engineer specializing in Backend Engineering and AI implementation. Expertise in Go, system architecture, and enterprise solutions." />
</svelte:head>

<div class="min-h-screen pt-32 pb-24 px-6">
    <div class="max-w-6xl mx-auto">
        <!-- Hero Section -->
        <section class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 page-enter">
            <!-- Photo -->
            <div class="relative">
                <div class="aspect-square max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden"
                    style="background: var(--bg-secondary); border: 1px solid var(--border);">
                    <img
                        src="/images/profile.png"
                        alt="Ali Irsyaad"
                        class="w-full h-full object-cover"
                    />
                </div>
                <!-- Decorative elements -->
                <div class="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl -z-10"
                    style="background: var(--accent); opacity: 0.2;"></div>
                <div class="absolute -top-4 -left-4 w-16 h-16 rounded-xl -z-10"
                    style="background: var(--accent); opacity: 0.1;"></div>
            </div>

            <!-- Info -->
            <div class="flex flex-col justify-center">
                <h1 class="text-4xl sm:text-5xl font-display font-bold mb-6">
                    About <span class="text-accent-gradient">Me</span>
                </h1>

                <p class="text-lg mb-6" style="color: var(--text-secondary);">
                    Hi, I'm Ali Irsyaad Nursyaban, a Software Engineer specializing in Backend Engineering and AI implementation based in Jakarta, Indonesia.
                </p>

                <p class="mb-4" style="color: var(--text-secondary);">
                    With expertise in Go and system architecture, I excel in solving complex problems and optimizing workflows using AI-driven solutions. Beyond technical execution, I focus on product understanding and managerial aspects—believing engineers deliver better solutions when they truly understand client needs.
                </p>

                <p class="mb-8" style="color: var(--text-secondary);">
                    I've had the privilege to work with amazing companies like Tokopedia, Mindtera, and Paper.id, where I've built microservices handling enterprise-scale operations and implemented AI features like OCR and automated payment reconciliation.
                </p>

                <!-- Quick facts -->
                <div class="grid grid-cols-3 gap-4 mb-8">
                    {#each facts as fact}
                        <div class="text-center p-4 rounded-xl" style="background: var(--bg-secondary);">
                            <div class="text-2xl font-display font-bold mb-1" style="color: var(--accent);">
                                {fact.value}
                            </div>
                            <div class="text-xs" style="color: var(--text-muted);">
                                {fact.label}
                            </div>
                        </div>
                    {/each}
                </div>

                <!-- CTA -->
                <div class="flex gap-4">
                    <a href="mailto:aliirsyaadn@gmail.com" class="btn-primary inline-flex items-center gap-2">
                        <i class="fa-solid fa-envelope"></i>
                        Contact Me
                    </a>
                    <a href="/resume.pdf" target="_blank" class="btn-secondary inline-flex items-center gap-2">
                        <i class="fa-solid fa-download"></i>
                        Resume
                    </a>
                </div>
            </div>
        </section>

        <!-- Skills Section -->
        <section class="mb-24">
            <h2 class="text-3xl font-display font-bold mb-8 text-center">
                Skills & <span class="text-accent-gradient">Technologies</span>
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each skills as skill, i}
                    <div class="card p-6 stagger-item" style="animation-delay: {i * 0.1}s">
                        <h3 class="font-display font-semibold mb-4" style="color: var(--accent);">
                            {skill.category}
                        </h3>
                        <div class="flex flex-wrap gap-2">
                            {#each skill.items as item}
                                <span class="tech-tag">
                                    <i class={getTechIcon(item)}></i>
                                    {item}
                                </span>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Experience Section -->
        <section class="mb-24">
            <h2 class="text-3xl font-display font-bold mb-8 text-center">
                Work <span class="text-accent-gradient">Experience</span>
            </h2>

            <div class="relative">
                <!-- Timeline line -->
                <div class="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px hidden lg:block"
                    style="background: var(--border);"></div>

                {#each experiences as exp, i}
                    <div class="relative mb-8 lg:mb-12 stagger-item" style="animation-delay: {i * 0.15}s">
                        <div class="lg:grid lg:grid-cols-2 lg:gap-8 {i % 2 === 0 ? '' : 'lg:flex-row-reverse'}">
                            <!-- Content -->
                            <div class="{i % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:col-start-2 lg:pl-12'}">
                                <div class="card p-6">
                                    <!-- Company and period -->
                                    <div class="flex items-center gap-3 mb-3 {i % 2 === 0 ? 'lg:flex-row-reverse' : ''}">
                                        <a href={exp.href} target="_blank" rel="noopener noreferrer"
                                            class="font-display font-semibold hover:text-accent transition-colors"
                                            style="color: var(--text-primary);">
                                            {exp.company}
                                        </a>
                                        <span class="tag text-xs">{exp.type}</span>
                                    </div>

                                    <!-- Role -->
                                    <h3 class="text-lg font-semibold mb-2" style="color: var(--accent);">
                                        {exp.role}
                                    </h3>

                                    <!-- Period -->
                                    <p class="text-sm mb-4" style="color: var(--text-muted);">
                                        {exp.period}
                                    </p>

                                    <!-- Description -->
                                    <p class="text-sm mb-4" style="color: var(--text-secondary);">
                                        {exp.description}
                                    </p>

                                    <!-- Tech stack -->
                                    <div class="flex flex-wrap gap-2 {i % 2 === 0 ? 'lg:justify-end' : ''}">
                                        {#each exp.techstacks as tech}
                                            <span class="tech-tag text-xs">
                                                <i class={getTechIcon(tech)}></i>
                                                {tech}
                                            </span>
                                        {/each}
                                    </div>
                                </div>
                            </div>

                            <!-- Timeline dot (hidden on mobile) -->
                            <div class="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full hidden lg:block"
                                style="background: var(--accent); top: 1.5rem;"></div>
                        </div>
                    </div>
                {/each}
            </div>
        </section>

        <!-- Education Section -->
        <section class="mb-24">
            <h2 class="text-3xl font-display font-bold mb-8 text-center">
                <span class="text-accent-gradient">Education</span>
            </h2>

            <div class="max-w-2xl mx-auto">
                <div class="card p-8 stagger-item">
                    <div class="flex items-start gap-6">
                        <div class="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
                            style="background: var(--bg-tertiary);">
                            <i class="fa-solid fa-graduation-cap text-2xl" style="color: var(--accent);"></i>
                        </div>
                        <div>
                            <h3 class="font-display font-bold text-xl mb-1" style="color: var(--text-primary);">
                                University of Indonesia
                            </h3>
                            <p class="font-semibold mb-2" style="color: var(--accent);">
                                Bachelor's Degree of Computer Science
                            </p>
                            <p class="text-sm mb-3" style="color: var(--text-muted);">
                                2018 - 2022 • GPA: 3.67
                            </p>
                            <p class="text-sm" style="color: var(--text-secondary);">
                                Member of RISTEK NetSOS (Network Security & Operating System), participated in CTF competitions and mentored students in Cyber Security.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Values Section -->
        <section>
            <h2 class="text-3xl font-display font-bold mb-8 text-center">
                What I <span class="text-accent-gradient">Value</span>
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="card p-6 text-center stagger-item">
                    <div class="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                        style="background: var(--bg-tertiary);">
                        <i class="fa-solid fa-lightbulb text-xl" style="color: var(--accent);"></i>
                    </div>
                    <h3 class="font-display font-semibold mb-2" style="color: var(--text-primary);">
                        Customer Focus
                    </h3>
                    <p class="text-sm" style="color: var(--text-secondary);">
                        Engineers deliver better solutions when they truly understand client needs. User is our boss.
                    </p>
                </div>

                <div class="card p-6 text-center stagger-item" style="animation-delay: 0.1s">
                    <div class="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                        style="background: var(--bg-tertiary);">
                        <i class="fa-solid fa-chess text-xl" style="color: var(--accent);"></i>
                    </div>
                    <h3 class="font-display font-semibold mb-2" style="color: var(--text-primary);">
                        Strategic Thinking
                    </h3>
                    <p class="text-sm" style="color: var(--text-secondary);">
                        Combining technical expertise with product understanding and managerial aspects for holistic solutions.
                    </p>
                </div>

                <div class="card p-6 text-center stagger-item" style="animation-delay: 0.2s">
                    <div class="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                        style="background: var(--bg-tertiary);">
                        <i class="fa-solid fa-rocket text-xl" style="color: var(--accent);"></i>
                    </div>
                    <h3 class="font-display font-semibold mb-2" style="color: var(--text-primary);">
                        AI-Driven Innovation
                    </h3>
                    <p class="text-sm" style="color: var(--text-secondary);">
                        Leveraging technology and AI to improve efficiency and optimize workflows for real business impact.
                    </p>
                </div>
            </div>
        </section>
    </div>
</div>

<style>
    .tech-tag {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
        padding: 0.375rem 0.75rem;
        font-size: 0.75rem;
        color: var(--text-secondary);
        background: var(--bg-tertiary);
        border: 1px solid var(--border);
        border-radius: 6px;
        transition: all 0.2s ease;
    }

    .tech-tag:hover {
        color: var(--accent);
        border-color: var(--accent);
    }

    .tech-tag i {
        font-size: 0.875rem;
        color: var(--accent);
    }
</style>
