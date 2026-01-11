// Blog post loading utilities

export async function getAllPosts() {
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

    return posts;
}

export async function getPostBySlug(slug) {
    try {
        const modules = import.meta.glob('/src/content/blog/*.md', { eager: true });
        const path = `/src/content/blog/${slug}.md`;

        if (modules[path]) {
            const module = modules[path];
            return {
                slug,
                metadata: module.metadata,
                component: module.default
            };
        }

        return null;
    } catch (error) {
        console.error('Error loading post:', error);
        return null;
    }
}

export function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
