export async function load({ params }) {
    try {
        // Dynamically import the markdown file
        const post = await import(`../../../content/blog/${params.slug}.md`);

        return {
            content: post.default,
            metadata: post.metadata
        };
    } catch (error) {
        return {
            content: null,
            metadata: null
        };
    }
}
