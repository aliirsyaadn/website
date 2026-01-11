export async function load() {
    const posts = [];

    // Import all markdown files from content/blog
    const modules = import.meta.glob('/src/content/blog/*.md', { eager: true });

    for (const path in modules) {
        const module = modules[path];
        const slug = path.split('/').pop().replace('.md', '');

        if (module.metadata) {
            posts.push({
                slug,
                ...module.metadata
            });
        }
    }

    // Sort by date descending
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    return {
        posts
    };
}
