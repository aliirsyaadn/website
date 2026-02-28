import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function reveal(node, { threshold = 0.1, duration = '0.6s', delay = '0s', distance = '30px' } = {}) {
    if (typeof window === 'undefined') return { destroy() { } };

    // Parse string defaults from the old CSS-based API API safely
    const durNum = typeof duration === 'string' ? parseFloat(duration) : duration;
    const delNum = typeof delay === 'string' ? parseFloat(delay) : delay;

    // Parse distance (like '30px' into 30)
    let distNum = distance;
    if (typeof distance === 'string') {
        distNum = parseFloat(distance);
        if (distance.includes('-')) distNum = -Math.abs(distNum);
    }

    // Prepare node for animation (hide it immediately without flashing)
    gsap.set(node, {
        y: distNum,
        autoAlpha: 0
    });

    // Create the GSAP ScrollTrigger animation
    const anim = gsap.to(node, {
        scrollTrigger: {
            trigger: node,
            start: `top ${100 - (threshold * 100)}%`, // e.g. "top 90%"
            toggleActions: "play none none none",
        },
        y: 0,
        autoAlpha: 1,
        duration: durNum,
        delay: delNum,
        ease: "power3.out",
        clearProps: "transform" // Clean up transform layer post-animation
    });

    return {
        destroy() {
            if (anim.scrollTrigger) {
                anim.scrollTrigger.kill();
            }
            anim.kill();
        }
    };
}
