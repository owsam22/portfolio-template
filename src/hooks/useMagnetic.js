import { useEffect, useRef } from 'react';

export const useMagnetic = (strength = 0.5) => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = element.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const deltaX = clientX - centerX;
            const deltaY = clientY - centerY;

            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

            // Activate effect if mouse is within a reasonable range (e.g. 100px)
            if (distance < 100) {
                const moveX = deltaX * strength;
                const moveY = deltaY * strength;
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else {
                element.style.transform = `translate(0px, 0px)`;
            }
        };

        const handleMouseLeave = () => {
            element.style.transform = `translate(0px, 0px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return ref;
};
